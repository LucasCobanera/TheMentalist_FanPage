/**
 * THE MENTALIST - Fanpage Script Principal
 * Control de navegación, síntesis de audio ambiental y utilidades globales.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRedJohnAudio();
  highlightActiveNavLink();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   Navegación Móvil & Scroll
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Efecto scroll en header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Alternar menú hamburguesa móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar al pulsar un enlace
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Resaltar Enlace Activo según URL
   -------------------------------------------------------------------------- */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Audio Exclusivo: Tema de Red John (J.S. Bach - Preludio en Do Mayor)
   - Exclusivo de red-john.html con botón flotante en el main container.
   - Activación automática por defecto al ingresar a la sección de Red John.
   -------------------------------------------------------------------------- */
let redJohnAudio = null;
let isRedJohnAudioPlaying = false;
let userPausedRedJohn = false;

function initRedJohnAudio() {
  const audioBtn = document.getElementById('redJohnAudioBtn');
  if (!audioBtn) return;

  redJohnAudio = new Audio('audio/js-bach--prelude-in-c-major.mp3');
  redJohnAudio.loop = true;
  redJohnAudio.volume = 0.55;

  const textSpan = audioBtn.querySelector('.btn-text');

  function updateButtonUI(playing) {
    if (playing) {
      audioBtn.classList.add('playing');
      if (textSpan) textSpan.textContent = 'Tema Red John: On';
      audioBtn.setAttribute('title', 'Pausar tema de Red John (J.S. Bach)');
    } else {
      audioBtn.classList.remove('playing');
      if (textSpan) textSpan.textContent = 'Tema Red John';
      audioBtn.setAttribute('title', 'Reproducir tema de Red John (J.S. Bach)');
    }
  }

  function startPlayback() {
    if (userPausedRedJohn || isRedJohnAudioPlaying) return;
    const playPromise = redJohnAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isRedJohnAudioPlaying = true;
        updateButtonUI(true);
        cleanupInteractionListeners();
      }).catch(err => {
        // Política de autoplay del navegador: aguardar primera interacción
        updateButtonUI(false);
        setupInteractionListeners();
      });
    }
  }

  function onFirstInteraction() {
    if (!userPausedRedJohn && !isRedJohnAudioPlaying) {
      startPlayback();
    }
    cleanupInteractionListeners();
  }

  const interactionEvents = ['click', 'keydown', 'scroll', 'touchstart'];
  function setupInteractionListeners() {
    interactionEvents.forEach(evt => {
      window.addEventListener(evt, onFirstInteraction, { once: true, passive: true });
    });
  }

  function cleanupInteractionListeners() {
    interactionEvents.forEach(evt => {
      window.removeEventListener(evt, onFirstInteraction);
    });
  }

  // Activar música por defecto al ingresar a la sección
  startPlayback();

  // Control interactivo del botón flotante
  audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isRedJohnAudioPlaying) {
      redJohnAudio.pause();
      isRedJohnAudioPlaying = false;
      userPausedRedJohn = true;
      updateButtonUI(false);
    } else {
      userPausedRedJohn = false;
      redJohnAudio.play().then(() => {
        isRedJohnAudioPlaying = true;
        updateButtonUI(true);
      }).catch(err => console.log('Error de reproducción:', err));
    }
  });

  // Pausar si el usuario cambia de pestaña y reanudar si estaba activo
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (isRedJohnAudioPlaying && redJohnAudio) {
        redJohnAudio.pause();
      }
    } else {
      if (isRedJohnAudioPlaying && !userPausedRedJohn && redJohnAudio) {
        redJohnAudio.play().catch(() => {});
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Botón Flotante Global "Volver Arriba" (Scroll-to-Top)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  if (document.getElementById('backToTopBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.className = 'back-to-top-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Volver arriba de la página');
  btn.setAttribute('title', 'Volver arriba');
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

