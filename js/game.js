/**
 * ============================================================================
 * THE MENTALIST - EL PALACIO DE LA MEMORIA DE PATRICK JANE
 * ============================================================================
 * Motor del juego mnemotécnico interactivo.
 * 
 * ARQUITECTURA:
 * 1. SoundSynth: Sintetizador Web Audio API autónomo (sin dependencias externas)
 *    que genera efectos sonoros procesales (tic-tac, aciertos, fallos, fanfarria).
 * 2. ROOMS_DATA: Estructura de datos mnemotécnica de loci con objetos, pistas y preguntas.
 * 3. MemoryPalaceGame: Máquina de estados del juego (Lobby -> Memorización -> Desafío -> Resultados).
 *    Maneja persistencia de récord en LocalStorage, temporizador reactivo, cálculo de bonus
 *    por velocidad y evaluación final de rango mentalista.
 * ============================================================================
 */

(function () {
  /**
   * ==========================================================================
   * 1. SINTETIZADOR DE SONIDOS (Web Audio API)
   * ==========================================================================
   * Generador de audio procedural para proporcionar retroalimentación táctil-auditiva
   * inmediata sin necesidad de cargar archivos de audio externos.
   */
  class SoundSynth {
    constructor() {
      /** @type {AudioContext|null} Contexto de audio Web Audio API */
      this.ctx = null;
    }

    /**
     * Inicializa el AudioContext bajo demanda tras la primera interacción del usuario
     * para respetar la política de reproducción automática (autoplay) de navegadores modernos.
     */
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

    /**
     * Reproduce un pulso percusivo suave (onda senoidal a 800 Hz) que simula el tic-tac de un reloj.
     */
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

    /**
     * Reproduce un chime armónico ascendente (acorde de Mi Mayor: E5, G#5, B5, E6)
     * para indicar un acierto mental o deducción exitosa.
     */
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

    /**
     * Reproduce un tono disonante descendente (220 Hz a 140 Hz en onda triangular)
     * para indicar una deducción o respuesta errónea.
     */
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

    /**
     * Reproduce una fanfarria triunfal arpegiada (C5, E5, G5, C6) al finalizar
     * con éxito el recorrido del palacio de la memoria.
     */
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

    /**
     * Reproduce un pulso binaural / drone meditativo de baja frecuencia (65 Hz)
     * simulando el estado mental de concentración profunda de Patrick Jane.
     */
    playFocusPulse() {
      if (!this.ctx) return;
      try {
        this.stopFocusPulse();
        const now = this.ctx.currentTime;
        this.focusOsc = this.ctx.createOscillator();
        this.focusGain = this.ctx.createGain();

        this.focusOsc.type = 'sine';
        this.focusOsc.frequency.setValueAtTime(65, now);

        // Entrada suave para una inmersión natural
        this.focusGain.gain.setValueAtTime(0.001, now);
        this.focusGain.gain.exponentialRampToValueAtTime(0.04, now + 1.2);

        this.focusOsc.connect(this.focusGain);
        this.focusGain.connect(this.ctx.destination);
        this.focusOsc.start(now);
      } catch (e) {}
    }

    /**
     * Detiene con desvanecimiento suave el pulso de concentración mental.
     */
    stopFocusPulse() {
      if (!this.ctx || !this.focusOsc) return;
      try {
        const now = this.ctx.currentTime;
        if (this.focusGain) {
          this.focusGain.gain.setValueAtTime(this.focusGain.gain.value, now);
          this.focusGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        }
        this.focusOsc.stop(now + 0.55);
        this.focusOsc = null;
        this.focusGain = null;
      } catch (e) {}
    }
  }

  /**
   * ==========================================================================
   * 2. BASE DE DATOS DEL PALACIO DE LA MEMORIA (Mnemotecnia de Loci)
   * ==========================================================================
   * Habitaciones estructuradas con objetos asociados a coordenadas espaciales fijas,
   * pistas metodológicas y preguntas de validación cognitiva.
   */
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
          detail: "Llaves del mítico coche europeo de colección",
          img: "img/citroenDS2.jpg"
        },
        {
          pos: "Pizarra de Casos",
          name: "La Cara Sonriente",
          detail: "Firma macabra de Red John trazada en sangre",
          img: "img/red-john-face.jpg"
        },
        {
          pos: "Escritorio de Lisbon",
          name: "Placa Oficial del CBI",
          detail: "Insignia dorada del Departamento de Sacramento",
          img: "img/cbi-logo.png"
        }
      ],
      questions: [
        {
          q: "¿Qué objeto colocó Patrick Jane en la 'Esquina Norte' de su despacho?",
          options: [
            "La Placa Oficial del CBI",
            "El Sofá & Taza de Té",
            "El Citroën DS de 1971",
            "La Cara Sonriente de Red John"
          ],
          correct: 1,
          explanation: "¡Exacto! El sofá marrón y la taza de té ocupan la Esquina Norte, el santuario de descanso mental de Jane."
        },
        {
          q: "¿En qué posición de la habitación se encontraban las llaves del Citroën DS?",
          options: [
            "En la Pizarra de Casos",
            "En el Escritorio de Lisbon",
            "En la Mesa Central",
            "En la Esquina Norte"
          ],
          correct: 2,
          explanation: "¡Correcto! Las llaves del clásico Citroën reposaban sobre la Mesa Central."
        },
        {
          q: "¿Dónde estaba fijada la macabra firma de Red John?",
          options: [
            "En la Pizarra de Casos",
            "En el Respaldo del Sofá",
            "En el Suelo de Madera",
            "En la Ventana Principal"
          ],
          correct: 0,
          explanation: "¡Brillante! El símbolo sangriento de Red John dominaba el centro de la Pizarra de Casos."
        }
      ]
    },
    {
      id: 2,
      title: "La Galería de Sospechosos",
      subtitle: "Lista Secreta de Red John",
      icon: "🔍",
      memorizeTime: 12, // segundos
      tip: "Visualiza a cada sospechoso interactuando de forma insólita con su ubicación asignada.",
      items: [
        {
          pos: "Flanco Izquierdo",
          name: "Brett Stiles",
          detail: "Líder supremo y carismático de la secta Visualize",
          img: "img/characters/stiles.jpg"
        },
        {
          pos: "Balcón Superior",
          name: "Gale Bertram",
          detail: "Director del CBI y miembro de la conspiración Blake",
          img: "img/characters/bertram.jpg"
        },
        {
          pos: "Flanco Derecho",
          name: "Thomas McAllister",
          detail: "Alguacil del Condado de Napa con fobia a las palomas",
          img: "img/characters/mcallister.jpg"
        },
        {
          pos: "Piso Inferior",
          name: "Reede Smith",
          detail: "Agente del FBI tatuado con el secreto 'Tyger Tyger'",
          img: "img/characters/smith.jpg"
        }
      ],
      questions: [
        {
          q: "¿A quién ubicaste en el 'Balcón Superior' supervisando la conspiración?",
          options: [
            "Al Alguacil Thomas McAllister",
            "Al Director Gale Bertram",
            "Al Líder Brett Stiles",
            "Al Agente Reede Smith"
          ],
          correct: 1,
          explanation: "¡Magnífico! Gale Bertram, con su pose burocrática, ocupaba el Balcón Superior."
        },
        {
          q: "¿Quién se encontraba en el 'Flanco Derecho' de la galería?",
          options: [
            "Thomas McAllister",
            "Brett Stiles",
            "Kimball Cho",
            "Sam Bosco"
          ],
          correct: 0,
          explanation: "¡Deducción impecable! El Alguacil McAllister (quien más tarde se revelaría como Red John) estaba en el Flanco Derecho."
        },
        {
          q: "¿Qué rasgo distintivo memorizaste sobre Reede Smith en el Piso Inferior?",
          options: [
            "Su fobia insuperable a las palomas",
            "Su taza de té con dos terrones",
            "Su tatuaje de la Asociación Blake ('Tyger Tyger')",
            "Su liderazgo en la secta Visualize"
          ],
          correct: 2,
          explanation: "¡Muy bien! Reede Smith portaba el tatuaje de tres puntos de la Asociación Blake."
        }
      ]
    },
    {
      id: 3,
      title: "El Santuario de la Hipnosis",
      subtitle: "Objetos de Sugestión y Lectura Fría",
      icon: "🌀",
      memorizeTime: 10, // segundos
      tip: "Presta máxima atención a los colores y materiales; Jane memoriza los detalles sutiles.",
      items: [
        {
          pos: "Vitrina de Cristal",
          name: "Reloj de Bolsillo de Plata",
          detail: "Herencia del padre de Jane usado para inducir trance",
          img: "img/game/reloj.jpg"
        },
        {
          pos: "Pedestal de Mármol",
          name: "Vela de Llama Azul",
          detail: "Punto focal de fijación y relajación hipnótica",
          img: "img/game/vela.jpg"
        },
        {
          pos: "Caja Fuerte",
          name: "Moneda de Oro Falsa",
          detail: "Truco de prestidigitación aprendido en su juventud de feria",
          img: "img/game/moneda.jpg"
        },
        {
          pos: "Atril de Roble",
          name: "Poema 'The Tyger'",
          detail: "Manuscrito de William Blake: «Tyger Tyger burning bright»",
          img: "img/game/poema.jpg"
        }
      ],
      questions: [
        {
          q: "¿Qué objeto descansaba sobre el 'Pedestal de Mármol'?",
          options: [
            "La Vela de Llama Azul",
            "El Reloj de Bolsillo de Plata",
            "La Moneda de Oro Falsa",
            "El Manuscrito de William Blake"
          ],
          correct: 0,
          explanation: "¡Correcto! La Vela de Llama Azul servía como punto focal en el Pedestal de Mármol."
        },
        {
          q: "¿Dónde guardó Patrick Jane la 'Moneda de Oro Falsa'?",
          options: [
            "En el Atril de Roble",
            "Bajo la Vitrina",
            "En la Caja Fuerte",
            "En su bolsillo de chaleco"
          ],
          correct: 2,
          explanation: "¡Exacto! El truco de prestidigitación estaba custodiado dentro de la Caja Fuerte."
        },
        {
          q: "¿Qué pieza literaria se encontraba en el 'Atril de Roble'?",
          options: [
            "Las Obras Completas de Shakespeare",
            "El Poema 'The Tyger' de William Blake",
            "El Expediente de Lorelei Martins",
            "El Manual de Procedimientos del CBI"
          ],
          correct: 1,
          explanation: "¡Perfecto! En el atril descansaban las escalofriantes líneas de 'The Tyger'."
        }
      ]
    }
  ];

  /**
   * ==========================================================================
   * 3. CONTROLADOR PRINCIPAL DEL JUEGO (MemoryPalaceGame)
   * ==========================================================================
   * Maneja el ciclo de vida de las pantallas, temporizadores regresivos,
   * cálculo de puntuación reactivo con bonificación de tiempo, y rangos de mentalista.
   */
  class MemoryPalaceGame {
    constructor() {
      /** @type {SoundSynth} Sintetizador de audio procedural */
      this.sound = new SoundSynth();

      // Estado del juego
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

    /**
     * Cachea selectores del DOM y enlaza listeners de eventos clave.
     */
    initDom() {
      // Pantallas de juego
      this.screenLobby = document.getElementById('screenLobby') || document.getElementById('gameScreenLobby');
      this.screenMemorize = document.getElementById('screenMemorize') || document.getElementById('gameScreenMemorize');
      this.screenChallenge = document.getElementById('screenChallenge') || document.getElementById('gameScreenChallenge');
      this.screenResults = document.getElementById('screenResults') || document.getElementById('gameScreenResults');

      // Botones principales
      this.btnStartGame = document.getElementById('btnStartGame');
      this.btnSkipTimer = document.getElementById('btnSkipTimer');
      this.btnRestart = document.getElementById('btnRestart') || document.getElementById('btnRestartGame');

      // Elementos del HUD
      this.levelDisplayEl = document.getElementById('levelDisplay') || document.getElementById('gameLevelDisplay');
      this.scoreDisplayEl = document.getElementById('scoreDisplay') || document.getElementById('gameScoreDisplay');

      // Pantalla de Memorización
      this.roomNameEl = document.getElementById('roomName');
      this.roomSubtitleEl = document.getElementById('roomSubtitle');
      this.roomIconEl = document.getElementById('roomIcon');
      this.memoryGrid = document.getElementById('memoryGrid');
      this.memorizeTipEl = document.getElementById('memorizeTip');
      this.timerTextEl = document.getElementById('timerText');
      this.timeProgressBar = document.getElementById('timeProgressBar');

      // Pantalla de Desafío (Preguntas)
      this.questionCounterEl = document.getElementById('questionCounter');
      this.questionTextEl = document.getElementById('questionText');
      this.optionsContainer = document.getElementById('optionsContainer');
      this.feedbackBox = document.getElementById('feedbackBox');

      // Pantalla de Resultados
      this.resultsRankEl = document.getElementById('resultsRank');
      this.finalScoreEl = document.getElementById('finalScore');
      this.finalCorrectEl = document.getElementById('finalCorrect');
      this.finalAccuracyEl = document.getElementById('finalAccuracy');
      this.resultsQuoteEl = document.getElementById('resultsQuote');

      // Modo Concentración Cinemático (Idea 4)
      this.gameContainer = document.getElementById('gameContainer');
      this.focusOverlay = document.getElementById('mentalFocusOverlay');

      this.bindEvents();
    }

    /**
     * Enlaza controladores de clics a los botones de inicio, salto y reinicio.
     */
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

    /**
     * Carga el récord guardado en LocalStorage si existe.
     */
    loadHighScore() {
      try {
        const stored = localStorage.getItem('the_mentalist_memory_palace_highscore');
        if (stored) {
          this.highScore = parseInt(stored, 10) || 0;
        }
      } catch (e) {}
    }

    /**
     * Guarda un nuevo récord en LocalStorage si la puntuación actual supera la previa.
     */
    saveHighScore() {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        try {
          localStorage.setItem('the_mentalist_memory_palace_highscore', this.highScore.toString());
        } catch (e) {}
      }
    }

    /**
     * Activa una pantalla específica y desactiva las restantes con clase CSS 'active'.
     * @param {HTMLElement|null} screen Elemento contenedor de la pantalla a mostrar
     */
    showScreen(screen) {
      [this.screenLobby, this.screenMemorize, this.screenChallenge, this.screenResults].forEach(s => {
        if (s) s.classList.remove('active');
      });
      if (screen) {
        screen.classList.add('active');
      }
    }

    /**
     * Reinicia contadores y arranca la primera habitación del palacio mental.
     */
    startGame() {
      this.currentRoomIndex = 0;
      this.score = 0;
      this.correctAnswersCount = 0;
      this.totalQuestionsCount = 0;
      this.updateScoreDisplay();
      this.startRoom(this.currentRoomIndex);
    }

    /**
     * Configura y lanza la fase de memorización para la habitación dada.
     * @param {number} roomIdx Índice de la habitación en ROOMS_DATA
     */
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

      // Iniciar cuenta regresiva de memorización y activar modo concentración (Idea 4)
      this.showScreen(this.screenMemorize);
      if (this.gameContainer) this.gameContainer.classList.add('focus-mode-active');
      if (this.focusOverlay) this.focusOverlay.classList.add('active');
      this.sound.playFocusPulse();
      this.startMemorizationTimer(room.memorizeTime);
    }

    /**
     * Renderiza las tarjetas de objetos con su posición espacial y detalles mnemotécnicos.
     * @param {Array<Object>} items Lista de objetos de la habitación
     */
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

    /**
     * Ejecuta el temporizador de memorización visual y sonoro (reloj tick).
     * @param {number} seconds Segundos totales permitidos para memorizar
     */
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

    /**
     * Da por concluida la fase de memorización e inicia la fase de desafío y preguntas.
     */
    finishMemorizationPhase() {
      clearInterval(this.timerInterval);
      // Desactivar modo concentración cinemático
      if (this.gameContainer) this.gameContainer.classList.remove('focus-mode-active');
      if (this.focusOverlay) this.focusOverlay.classList.remove('active');
      this.sound.stopFocusPulse();

      this.currentQuestionIndex = 0;
      this.showScreen(this.screenChallenge);
      this.loadQuestion();
    }

    /**
     * Carga y renderiza la pregunta actual de la habitación en pantalla,
     * o transiciona a la siguiente habitación si ya se respondieron todas.
     */
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

      // Renderizar 4 opciones (A, B, C, D)
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
          btn.addEventListener('click', () => {
            const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
            this.handleAnswer(selectedIdx, qData, buttons);
          });
        });
      }
    }

    /**
     * Procesa la respuesta seleccionada, calcula puntos (base + bonus por velocidad),
     * reproduce feedback sonoro y avanza a la siguiente pregunta tras un breve delay.
     * @param {number} selectedIdx Índice de la opción elegida (0..3)
     * @param {Object} qData Objeto con datos de la pregunta
     * @param {NodeList} buttons Lista de botones de opciones para deshabilitar
     */
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

    /**
     * Actualiza el contador numérico de puntos en el HUD superior.
     */
    updateScoreDisplay() {
      if (this.scoreDisplayEl) {
        this.scoreDisplayEl.textContent = this.score;
      }
    }

    /**
     * Evalúa el desempeño final del usuario, calcula porcentaje de precisión,
     * asigna un rango con cita representativa de la serie y reproduce la fanfarria de victoria.
     */
    showFinalResults() {
      if (this.gameContainer) this.gameContainer.classList.remove('focus-mode-active');
      if (this.focusOverlay) this.focusOverlay.classList.remove('active');
      this.sound.stopFocusPulse();

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

  /**
   * Sanitiza cadenas de texto para evitar inserción involuntaria de HTML.
   * @param {string} str Texto original a escapar
   * @returns {string} Cadena sanitizada
   */
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
