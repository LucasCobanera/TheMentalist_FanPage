/**
 * THE MENTALIST - Mini-juego interactivo: El Truco de Patrick Jane
 * Simula una lectura de pensamiento basada en psicología, microexpresiones
 * y la característica deducción de Patrick Jane.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMentalistGame();
});

const CARDS_DATA = [
  { id: '7H', name: '7 de Corazones', value: '7', suit: '♥', color: 'red', type: 'number' },
  { id: 'AS', name: 'As de Picas', value: 'A', suit: '♠', color: 'black', type: 'letter' },
  { id: 'QD', name: 'Reina de Diamantes', value: 'Q', suit: '♦', color: 'red', type: 'figure' },
  { id: 'KC', name: 'Rey de Tréboles', value: 'K', suit: '♣', color: 'black', type: 'figure' },
  { id: 'JH', name: 'Jota de Corazones', value: 'J', suit: '♥', color: 'red', type: 'figure' },
  { id: '10S', name: '10 de Picas', value: '10', suit: '♠', color: 'black', type: 'number' }
];

const JANE_OBSERVATIONS = [
  "Interesante... Tus ojos se desviaron hacia la esquina superior derecha por una fracción de segundo. Estás visualizando los bordes de la figura.",
  "Tus hombros se relajaron levemente cuando leíste esa opción. La respiración humana nunca miente a quien sabe mirar.",
  "Un clásico intento de despiste. Pero tu mente subconsciente ya había tomado la decisión antes de que tu dedo tocara la pantalla.",
  "Fascinante. La dilatación de tus pupilas delata una preferencia muy marcada. No necesitas decir una sola palabra."
];

function initMentalistGame() {
  const container = document.getElementById('mentalistGameBox');
  if (!container) return;

  let selectedCard = null;
  let currentStep = 1;

  const step1 = document.getElementById('gameStep1');
  const step2 = document.getElementById('gameStep2');
  const step3 = document.getElementById('gameStep3');
  const cardsGrid = document.getElementById('cardsGrid');
  const janeComment = document.getElementById('janeComment');
  const revealTarget = document.getElementById('revealTarget');
  const restartBtn = document.getElementById('restartTrickBtn');

  // Renderizar las cartas para el paso 1
  if (cardsGrid) {
    cardsGrid.innerHTML = CARDS_DATA.map(card => `
      <div class="mental-card ${card.color}" data-id="${card.id}">
        <span class="card-value">${card.value}</span>
        <span class="card-suit">${card.suit}</span>
        <span class="card-value">${card.value}</span>
      </div>
    `).join('');

    // Selección de carta
    cardsGrid.querySelectorAll('.mental-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const id = cardEl.getAttribute('data-id');
        selectedCard = CARDS_DATA.find(c => c.id === id);
        goToStep(2);
      });
    });
  }

  // Interacción en paso 2 (Preguntas psicológicas de Jane)
  const questionBtns = document.querySelectorAll('.psych-choice-btn');
  questionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Simular tiempo de deducción de Patrick Jane
      btn.classList.add('active');
      const randomObservation = JANE_OBSERVATIONS[Math.floor(Math.random() * JANE_OBSERVATIONS.length)];
      
      if (janeComment) {
        janeComment.innerHTML = `<em>"${randomObservation}"</em>`;
      }

      setTimeout(() => {
        goToStep(3);
        revealPrediction(selectedCard);
      }, 1400);
    });
  });

  // Reiniciar juego
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      selectedCard = null;
      questionBtns.forEach(b => b.classList.remove('active'));
      goToStep(1);
    });
  }

  function goToStep(step) {
    currentStep = step;
    [step1, step2, step3].forEach((s, idx) => {
      if (s) {
        if (idx + 1 === step) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      }
    });
  }

  function revealPrediction(card) {
    if (!revealTarget || !card) return;

    revealTarget.innerHTML = `
      <div class="revealed-card ${card.color}">
        <span class="card-value" style="font-size: 2rem; font-weight:800; font-family:var(--font-display);">${card.value}</span>
        <span class="card-suit" style="font-size: 3.5rem; line-height: 1;">${card.suit}</span>
        <span class="card-value" style="font-size: 2rem; font-weight:800; font-family:var(--font-display);">${card.value}</span>
      </div>
    `;
  }
}
