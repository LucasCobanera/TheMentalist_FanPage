/**
 * ============================================================================
 * THE MENTALIST - GENERADOR INTERACTIVO DE FRASES ICÓNICAS
 * ============================================================================
 * Módulo de citas célebres con ambientación visual y copia al portapapeles.
 * 
 * ARQUITECTURA:
 * 1. QUOTES_LIST: Repertorio de frases representativas de Jane, Lisbon, Cho,
 *    Van Pelt y Red John, con temporadas y fondos temáticos.
 * 2. initQuoteGenerator: Inicializa la primera cita, controla la selección aleatoria
 *    sin repetición consecutiva, anima la transición visual (cross-fade y zoom sutil),
 *    y permite copiar la cita formateada a través de la Clipboard API con notificación flotante.
 * ============================================================================
 */

/**
 * Repertorio de citas célebres de la serie.
 * @type {Array<{quote: string, author: string, season: string, bg: string}>}
 */
const QUOTES_LIST = [
  {
    quote: "Si dejas de buscar la verdad en las palabras y comienzas a buscarla en los ojos, nadie podrá mentirte jamás.",
    author: "Patrick Jane",
    season: "Temporada 1",
    bg: "img/frases/jane.jpg"
  },
  {
    quote: "No existen los psíquicos. Solo personas con una excelente percepción y personas que desesperadamente quieren creer.",
    author: "Patrick Jane",
    season: "Temporada 2",
    bg: "img/frases/jane2.jpg"
  },
  {
    quote: "No hay nada más peligroso que un hombre que ya lo ha perdido todo y no tiene miedo al mañana.",
    author: "Teresa Lisbon",
    season: "Temporada 3",
    bg: "img/frases/lisbon.jpg"
  },
  {
    quote: "El té es civilización en una taza. El café es solo agua nerviosa.",
    author: "Patrick Jane",
    season: "Temporada 2",
    bg: "img/frases/jane3.jpg"
  },
  {
    quote: "¿Mi coartada? Estaba ocupado no cometiendo crímenes.",
    author: "Kimball Cho",
    season: "Temporada 4",
    bg: "img/frases/cho.jpg"
  },
  {
    quote: "Tyger, Tyger, burning bright, In the forests of the night...",
    author: "Red John (citando a William Blake)",
    season: "Temporada 2",
    bg: "img/frases/tigertiger.jpg"
  },
  {
    quote: "La venganza no devolverá a los muertos, Jane. Solo te dejará a solas con tus propios monstruos.",
    author: "Teresa Lisbon",
    season: "Temporada 5",
    bg: "img/frases/lisbon2.jpg"
  },
  {
    quote: "Una mentira bien construida es aquella que le da a la víctima exactamente lo que desea escuchar.",
    author: "Patrick Jane",
    season: "Temporada 3",
    bg: "img/frases/jane.jpg"
  },
  {
    quote: "No me importa si me consideras arrogante. Lo que importa es que tengo razón.",
    author: "Patrick Jane",
    season: "Temporada 6",
    bg: "img/frases/jane2.jpg"
  },
  {
    quote: "Tener fe no es ninguna debilidad. Es lo único que te mantiene en pie cuando todo lo demás se derrumba.",
    author: "Grace Van Pelt",
    season: "Temporada 2",
    bg: "img/frases/vanpelt.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initQuoteGenerator();
});

/**
 * Inicializa el carrusel aleatorio de citas, configurando la animación de cambio,
 * la actualización del fondo temático del héroe y la copia al portapapeles.
 */
function initQuoteGenerator() {
  const quoteText = document.getElementById('currentQuoteText');
  const quoteAuthor = document.getElementById('currentQuoteAuthor');
  const quoteBg = document.getElementById('quoteBgLayer');
  const nextBtn = document.getElementById('nextQuoteBtn');
  const copyBtn = document.getElementById('copyQuoteBtn');
  const copyToast = document.getElementById('copyToast');

  if (!quoteText || !nextBtn) return;

  /** @type {number} Índice de la cita mostrada actualmente */
  let currentIndex = 0;

  /** @type {number|null} Temporizador de transición para evitar carreras si se pulsa rápidamente */
  let quoteTransitionTimeout = null;

  /**
   * Muestra la cita seleccionada aplicando una suave transición de fundido
   * y zoom en la imagen de fondo.
   * @param {number} index Índice de la cita en QUOTES_LIST
   */
  function displayQuote(index) {
    const q = QUOTES_LIST[index];
    if (quoteTransitionTimeout) {
      clearTimeout(quoteTransitionTimeout);
      quoteTransitionTimeout = null;
    }

    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(6px)';
    if (quoteAuthor) {
      quoteAuthor.style.opacity = '0';
      quoteAuthor.style.transform = 'translateY(4px)';
    }
    
    if (quoteBg) {
      quoteBg.style.opacity = '0.35';
      quoteBg.style.transform = 'scale(1.02)';
    }
    
    quoteTransitionTimeout = setTimeout(() => {
      quoteText.textContent = `"${q.quote}"`;
      if (quoteAuthor) {
        quoteAuthor.textContent = `— ${q.author} (${q.season})`;
      }
      
      if (quoteBg && q.bg) {
        quoteBg.style.backgroundImage = `url('${q.bg}')`;
        quoteBg.style.opacity = '1';
        quoteBg.style.transform = 'scale(1)';
      }
      
      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
      quoteText.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

      if (quoteAuthor) {
        quoteAuthor.style.opacity = '1';
        quoteAuthor.style.transform = 'translateY(0)';
        quoteAuthor.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      }
    }, 130);
  }

  // Inicializar con la primera cita
  displayQuote(0);

  // Obtener siguiente cita aleatoria sin repetición consecutiva
  nextBtn.addEventListener('click', () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * QUOTES_LIST.length);
    } while (newIndex === currentIndex && QUOTES_LIST.length > 1);
    
    currentIndex = newIndex;
    displayQuote(currentIndex);
  });

  // Copiar frase con atribución al portapapeles
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = `${quoteText.textContent} ${quoteAuthor.textContent}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (copyToast) {
          copyToast.style.opacity = '1';
          setTimeout(() => {
            copyToast.style.opacity = '0';
          }, 2000);
        }
      });
    });
  }
}
