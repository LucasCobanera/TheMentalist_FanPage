/**
 * THE MENTALIST - EL PALACIO DE LA MEMORIA DE PATRICK JANE
 * Motor del juego mnemotécnico interactivo
 * Audio sintetizado (Web Audio API) y gestión de estados
 */

(function () {
  // 1. Sintetizador de Sonidos (Web Audio API)
  class SoundSynth {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Tic-tac suave de reloj
    playTick() {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    }

    // Chime cristalino de acierto mental (Acorde mayor brillante)
    playCorrect() {
      if (!this.ctx) return;
      try {
        const freqs = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + idx * 0.07);
          osc.stop(this.ctx.currentTime + idx * 0.07 + 0.55);
        });
      } catch (e) {}
    }

    // Sonido suave de error
    playWrong() {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.26);
      } catch (e) {}
    }

    // Fanfarria de victoria / evaluación final
    playVictory() {
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + idx * 0.12);
          osc.stop(this.ctx.currentTime + idx * 0.12 + 0.85);
        });
      } catch (e) {}
    }
  }

  // 2. Base de Datos de Habitaciones del Palacio Mental
  const ROOMS_DATA = [
    {
      id: 1,
      title: "El Despacho del CBI",
      subtitle: "Objetos y Escena del Crimen",
      icon: "🛋️",
      memorizeTime: 12, // segundos
      tip: "Asocia cada objeto con un punto cardinal o mueble de la oficina de Patrick Jane.",
      items: [
        {
          pos: "Esquina Norte",
          name: "Sofá & Taza de Té",
          detail: "El rincón sagrado de relax y reflexión de Jane",
          img: "img/sillon&tea.jpg"
        },
        {
          pos: "Mesa Central",
          name: "Citroën DS de 1971",
          detail: "El coche francés clásico que conduce Patrick",
          img: "img/citroenDS.jpg"
        },
        {
          pos: "Muro Este",
          name: "Carita de Red John",
          detail: "La marca sonriente trazada con tres dedos",
          img: "img/Red-John-Smiley-Face.png"
        },
        {
          pos: "Escritorio de Lisbon",
          name: "Expediente del Caso",
          detail: "La linterna iluminando la escena oculta",
          img: "img/linterna-smiley-web.jpg"
        }
      ],
      questions: [
        {
          q: "¿Qué vehículo clásico conduce Patrick Jane según las pistas de la estancia?",
          options: [
            "Citroën DS de 1971",
            "Ford Mustang Shelby 1968",
            "Chevrolet Impala 1967",
            "Austin Mini Cooper Clásico"
          ],
          correct: 0,
          explanation: "¡Exacto! El emblemático Citroën DS rojo burdeos de 1971 es su vehículo insignia."
        },
        {
          q: "¿En qué posición de la estancia se encontraba el sofá de cuero con la taza de té de Jane?",
          options: [
            "Muro Este",
            "Esquina Norte",
            "Mesa Central",
            "Escritorio de Lisbon"
          ],
          correct: 1,
          explanation: "¡Brillante! El sofá y el té reposaban en la Esquina Norte de su palacio mental."
        },
        {
          q: "¿Cuál de los siguientes objetos NO formaba parte de esta primera habitación?",
          options: [
            "Las llaves del Citroën DS",
            "La carita sonriente de Red John",
            "Una manzana verde cortada con navaja",
            "La linterna sobre el expediente del caso"
          ],
          correct: 2,
          explanation: "¡Gran deducción! La manzana nunca estuvo en la estancia, no te dejaste engañar por distractores."
        }
      ]
    },
    {
      id: 2,
      title: "La Galería de Sospechosos",
      subtitle: "La Lista de Red John",
      icon: "🔍",
      memorizeTime: 14,
      tip: "Jane memorizó la lista definitiva de 7 sospechosos mediante el Método de Loci.",
      items: [
        {
          pos: "Posición 1 (Izquierda)",
          name: "Gale Bertram",
          detail: "Director del CBI y miembro encubierto",
          img: "img/characters/gale_bertram.jpg"
        },
        {
          pos: "Posición 2 (Centro-Izq)",
          name: "Thomas McAllister",
          detail: "Sheriff del condado de Napa Valley",
          img: "img/characters/thomas_mcallister.jpg"
        },
        {
          pos: "Posición 3 (Centro-Der)",
          name: "Bob Kirkland",
          detail: "Agente encubierto de Seguridad Nacional",
          img: "img/characters/bob_kirkland.jpg"
        },
        {
          pos: "Posición 4 (Derecha)",
          name: "Brett Stiles",
          detail: "Carismático líder supremo de Visualize",
          img: "img/characters/brett_stiles.jpg"
        }
      ],
      questions: [
        {
          q: "¿Quién ocupaba la Posición 2 (Centro-Izquierda) en la fila de sospechosos?",
          options: [
            "Thomas McAllister",
            "Gale Bertram",
            "Brett Stiles",
            "Bob Kirkland"
          ],
          correct: 0,
          explanation: "¡Deducción perfecta! El Sheriff Thomas McAllister ocupaba la segunda posición."
        },
        {
          q: "¿Qué cargo oficial desempeñaba Gale Bertram dentro de la trama?",
          options: [
            "Sheriff rural",
            "Director del CBI",
            "Forense jefe de Sacramento",
            "Fiscal de distrito de California"
          ],
          correct: 1,
          explanation: "¡Así es! Bertram dirigía el California Bureau of Investigation."
        },
        {
          q: "¿A qué misteriosa organización lideraba el sospechoso Brett Stiles?",
          options: [
            "Visualize",
            "Asociación Blake",
            "Homeland Security",
            "Fundación El Silencio"
          ],
          correct: 0,
          explanation: "¡Correcto! Brett Stiles era el enigmático fundador y líder de Visualize."
        }
      ]
    },
    {
      id: 3,
      title: "El Gran Salón Mental",
      subtitle: "Deducción de Foco y Detalles",
      icon: "🧠",
      memorizeTime: 10,
      tip: "La velocidad es clave: fija los rasgos sutiles antes de que la niebla mental los oculte.",
      items: [
        {
          pos: "Punto Central",
          name: "Patrick Jane",
          detail: "Traje chaleco de tres piezas de lana azul",
          img: "img/characters/patrick_jane.jpg"
        },
        {
          pos: "Flanco Izquierdo",
          name: "Teresa Lisbon",
          detail: "Insignia dorada del CBI oficial #142",
          img: "img/characters/teresa_lisbon.jpg"
        },
        {
          pos: "Flanco Derecho",
          name: "Kimball Cho",
          detail: "Expresión imperturbable de hielo",
          img: "img/characters/kimball_cho.jpg"
        },
        {
          pos: "Estante Superior",
          name: "Té Caliente con Miel",
          detail: "Taza de porcelana inglesa humeante",
          img: "img/sillon&tea.jpg"
        }
      ],
      questions: [
        {
          q: "¿Cómo estaba preparado el té de Patrick en el estante superior?",
          options: [
            "Té negro humeante con miel",
            "Té helado de jazmín con limón",
            "Infusión de menta amarga",
            "Café espresso doble"
          ],
          correct: 0,
          explanation: "«El té es como un abrazo en una taza, Lisbon.» — Té negro con miel, impecable."
        },
        {
          q: "¿Qué vestimenta distintiva portaba Patrick Jane en el centro de tu enfoque?",
          options: [
            "Gabardina oscura de detective",
            "Traje chaleco de tres piezas azul",
            "Camisa arremangada sin corbata",
            "Chaqueta marrón de pana"
          ],
          correct: 1,
          explanation: "¡Exacto! El inconfundible traje de tres piezas con chaleco de Jane."
        },
        {
          q: "¿Quién custodiaba el flanco derecho con su expresión inquebrantable?",
          options: [
            "Kimball Cho",
            "Wayne Rigsby",
            "Grace Van Pelt",
            "Dennis Abbott"
          ],
          correct: 0,
          explanation: "¡El agente Cho! Frío, disciplinado e implacable en el interrogatorio."
        }
      ]
    }
  ];

  // 3. Controlador Principal del Juego
  class MemoryPalaceGame {
    constructor() {
      this.sound = new SoundSynth();
      this.currentRoomIndex = 0;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.correctAnswersCount = 0;
      this.totalQuestionsCount = 0;
      this.timerInterval = null;
      this.timeLeft = 0;
      this.questionStartTime = 0;
      this.highScore = 0;

      this.initDom();
      this.loadHighScore();
    }

    initDom() {
      // Elementos de la interfaz
      this.screenLobby = document.getElementById('screenLobby');
      this.screenMemorize = document.getElementById('screenMemorize');
      this.screenChallenge = document.getElementById('screenChallenge');
      this.screenResults = document.getElementById('screenResults');

      this.roomNameEl = document.getElementById('roomName');
      this.roomSubtitleEl = document.getElementById('roomSubtitle');
      this.roomIconEl = document.getElementById('roomIcon');
      this.scoreDisplayEl = document.getElementById('scoreDisplay');
      this.levelDisplayEl = document.getElementById('levelDisplay');

      // Botones
      this.btnStartGame = document.getElementById('btnStartGame');
      this.btnSkipTimer = document.getElementById('btnSkipTimer');
      this.btnRestart = document.getElementById('btnRestart');

      // Contenedores
      this.memoryGrid = document.getElementById('memoryGrid');
      this.memorizeTipEl = document.getElementById('memorizeTip');
      this.timerTextEl = document.getElementById('timerText');
      this.timeProgressBar = document.getElementById('timeProgressBar');

      this.questionCounterEl = document.getElementById('questionCounter');
      this.questionTextEl = document.getElementById('questionText');
      this.optionsContainer = document.getElementById('optionsContainer');
      this.feedbackBox = document.getElementById('feedbackBox');

      // Pantalla de resultados
      this.resultsRankEl = document.getElementById('resultsRank');
      this.finalScoreEl = document.getElementById('finalScore');
      this.finalCorrectEl = document.getElementById('finalCorrect');
      this.finalAccuracyEl = document.getElementById('finalAccuracy');
      this.resultsQuoteEl = document.getElementById('resultsQuote');

      this.bindEvents();
    }

    bindEvents() {
      if (this.btnStartGame) {
        this.btnStartGame.addEventListener('click', () => {
          this.sound.init();
          this.startGame();
        });
      }

      if (this.btnSkipTimer) {
        this.btnSkipTimer.addEventListener('click', () => {
          this.finishMemorizationPhase();
        });
      }

      if (this.btnRestart) {
        this.btnRestart.addEventListener('click', () => {
          this.startGame();
        });
      }
    }

    loadHighScore() {
      try {
        const stored = localStorage.getItem('the_mentalist_memory_palace_highscore');
        if (stored) {
          this.highScore = parseInt(stored, 10) || 0;
        }
      } catch (e) {}
    }

    saveHighScore() {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        try {
          localStorage.setItem('the_mentalist_memory_palace_highscore', this.highScore.toString());
        } catch (e) {}
      }
    }

    showScreen(screen) {
      [this.screenLobby, this.screenMemorize, this.screenChallenge, this.screenResults].forEach(s => {
        if (s) s.classList.remove('active');
      });
      if (screen) {
        screen.classList.add('active');
      }
    }

    startGame() {
      this.currentRoomIndex = 0;
      this.score = 0;
      this.correctAnswersCount = 0;
      this.totalQuestionsCount = 0;
      this.updateScoreDisplay();
      this.startRoom(this.currentRoomIndex);
    }

    startRoom(roomIdx) {
      const room = ROOMS_DATA[roomIdx];
      if (!room) {
        this.showFinalResults();
        return;
      }

      // Actualizar cabecera de la habitación
      if (this.roomNameEl) this.roomNameEl.textContent = room.title;
      if (this.roomSubtitleEl) this.roomSubtitleEl.textContent = room.subtitle;
      if (this.roomIconEl) this.roomIconEl.textContent = room.icon;
      if (this.levelDisplayEl) this.levelDisplayEl.textContent = `${roomIdx + 1} / ${ROOMS_DATA.length}`;
      if (this.memorizeTipEl) this.memorizeTipEl.innerHTML = `<strong>Técnica de Jane:</strong> ${room.tip}`;

      // Renderizar objetos de la habitación
      this.renderMemoryGrid(room.items);

      // Iniciar cuenta regresiva de memorización
      this.showScreen(this.screenMemorize);
      this.startMemorizationTimer(room.memorizeTime);
    }

    renderMemoryGrid(items) {
      if (!this.memoryGrid) return;
      this.memoryGrid.innerHTML = items.map(item => `
        <article class="memory-card">
          <span class="memory-card-pos">${escapeHtml(item.pos)}</span>
          <div class="memory-card-img-wrap">
            <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}" class="memory-card-img" onerror="this.style.display='none'">
          </div>
          <div class="memory-card-body">
            <h3 class="memory-card-name">${escapeHtml(item.name)}</h3>
            <p class="memory-card-detail">${escapeHtml(item.detail)}</p>
          </div>
        </article>
      `).join('');
    }

    startMemorizationTimer(seconds) {
      clearInterval(this.timerInterval);
      this.timeLeft = seconds;
      const totalSeconds = seconds;

      const updateTimerUi = () => {
        if (this.timerTextEl) {
          this.timerTextEl.textContent = `${this.timeLeft}s`;
        }
        if (this.timeProgressBar) {
          const percent = (this.timeLeft / totalSeconds) * 100;
          this.timeProgressBar.style.width = `${percent}%`;
        }
      };

      updateTimerUi();

      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        this.sound.playTick();
        updateTimerUi();

        if (this.timeLeft <= 0) {
          clearInterval(this.timerInterval);
          this.finishMemorizationPhase();
        }
      }, 1000);
    }

    finishMemorizationPhase() {
      clearInterval(this.timerInterval);
      this.currentQuestionIndex = 0;
      this.showScreen(this.screenChallenge);
      this.loadQuestion();
    }

    loadQuestion() {
      const room = ROOMS_DATA[this.currentRoomIndex];
      const qData = room.questions[this.currentQuestionIndex];

      if (!qData) {
        // Habitación completada -> Pasar a la siguiente
        this.currentRoomIndex++;
        if (this.currentRoomIndex < ROOMS_DATA.length) {
          this.startRoom(this.currentRoomIndex);
        } else {
          this.showFinalResults();
        }
        return;
      }

      this.totalQuestionsCount++;
      this.questionStartTime = Date.now();

      // UI
      if (this.questionCounterEl) {
        this.questionCounterEl.textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${room.questions.length}`;
      }
      if (this.questionTextEl) {
        this.questionTextEl.textContent = qData.q;
      }
      if (this.feedbackBox) {
        this.feedbackBox.className = 'challenge-feedback-box';
        this.feedbackBox.textContent = '';
      }

      // Renderizar 4 opciones
      if (this.optionsContainer) {
        const letters = ['A', 'B', 'C', 'D'];
        this.optionsContainer.innerHTML = qData.options.map((opt, idx) => `
          <button class="option-btn" data-idx="${idx}">
            <span class="option-letter">${letters[idx]}</span>
            <span class="option-text">${escapeHtml(opt)}</span>
          </button>
        `).join('');

        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
            this.handleAnswer(selectedIdx, qData, buttons);
          });
        });
      }
    }

    handleAnswer(selectedIdx, qData, buttons) {
      // Deshabilitar botones para evitar clics múltiples
      buttons.forEach(b => b.disabled = true);

      const timeTaken = (Date.now() - this.questionStartTime) / 1000;
      const isCorrect = (selectedIdx === qData.correct);

      // Feedback en el botón presionado y el correcto
      buttons[selectedIdx].classList.add(isCorrect ? 'correct' : 'incorrect');
      if (!isCorrect) {
        buttons[qData.correct].classList.add('correct');
        this.sound.playWrong();
      } else {
        this.sound.playCorrect();
        this.correctAnswersCount++;

        // Cálculo de puntos: 100 base + hasta 25 de bonus por velocidad (si responde en < 5s)
        let points = 100;
        if (timeTaken < 5) {
          points += Math.round((5 - timeTaken) * 5);
        }
        this.score += points;
        this.updateScoreDisplay();
      }

      // Feedback explicativo de Jane
      if (this.feedbackBox) {
        this.feedbackBox.textContent = qData.explanation;
        this.feedbackBox.className = `challenge-feedback-box show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
      }

      // Siguiente pregunta tras breve pausa
      setTimeout(() => {
        this.currentQuestionIndex++;
        this.loadQuestion();
      }, 1600);
    }

    updateScoreDisplay() {
      if (this.scoreDisplayEl) {
        this.scoreDisplayEl.textContent = this.score;
      }
    }

    showFinalResults() {
      this.saveHighScore();
      this.showScreen(this.screenResults);
      this.sound.playVictory();

      const accuracy = Math.round((this.correctAnswersCount / Math.max(1, this.totalQuestionsCount)) * 100);

      let rank = "Agente Novato";
      let quote = "«Tu mente divaga con facilidad, Lisbon. Tómate una taza de té y vuelve a concentrarte en los detalles.»";
      let icon = "📋";

      if (this.score >= 900) {
        rank = "Sucesor de Patrick Jane";
        quote = "«Impresionante. Tu memoria de loci es prodigiosa. Ni Red John ni el mejor ilusionista podrían esconderse de ti.»";
        icon = "🧠";
      } else if (this.score >= 700) {
        rank = "Mentalista Avanzado";
        quote = "«Tu palacio de la memoria tiene cimientos sólidos. Sabes leer más allá de lo evidente.»";
        icon = "🎯";
      } else if (this.score >= 450) {
        rank = "Detective del CBI";
        quote = "«Buena observación. Con un poco más de técnica mnemotécnica estarás listo para resolver cualquier caso.»";
        icon = "🕵️";
      }

      if (this.resultsRankEl) this.resultsRankEl.textContent = rank;
      if (this.finalScoreEl) this.finalScoreEl.textContent = `${this.score} PTS`;
      if (this.finalCorrectEl) this.finalCorrectEl.textContent = `${this.correctAnswersCount} / ${this.totalQuestionsCount}`;
      if (this.finalAccuracyEl) this.finalAccuracyEl.textContent = `${accuracy}%`;
      if (this.resultsQuoteEl) this.resultsQuoteEl.textContent = quote;

      const badgeIconEl = document.querySelector('.results-badge-icon');
      if (badgeIconEl) {
        badgeIconEl.textContent = icon;
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Inicializar al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    new MemoryPalaceGame();
  });
})();
