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

/**
 * Inicializa la lógica del encabezado y la barra de navegación:
 * 1. Agrega clase 'scrolled' al hacer scroll hacia abajo para reforzar el fondo y sombra.
 * 2. Maneja el menú responsive móvil (hamburguesa) y accesibilidad mediante aria-expanded.
 * 3. Cierra el menú automáticamente al hacer clic en cualquier enlace de navegación.
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Efecto visual al descender: agrega clase de contraste
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Alternar menú hamburguesa móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al pulsar un enlace directo (que no sea disparador de dropdown en móvil)
    navMenu.querySelectorAll('.nav-link:not(.nav-dropdown-trigger)').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Soporte interactivo para desplegables (Desktop hover con debounce + Mobile acordeón)
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.nav-dropdown-trigger');
    let hoverTimeout = null;

    // En escritorio, añadir clase is-active con micro-retardo para evitar cierres accidentales
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 992) {
        clearTimeout(hoverTimeout);
        dropdownItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-active');
            const ot = other.querySelector('.nav-dropdown-trigger');
            if (ot) ot.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.add('is-active');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 992) {
        hoverTimeout = setTimeout(() => {
          item.classList.remove('is-active');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }, 150);
      }
    });

    // En móviles, alternar acordeón con clic
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const wasOpen = item.classList.contains('open');
          dropdownItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
              other.classList.remove('is-active');
              const ot = other.querySelector('.nav-dropdown-trigger');
              if (ot) ot.setAttribute('aria-expanded', 'false');
            }
          });
          const isOpen = item.classList.toggle('open', !wasOpen);
          item.classList.toggle('is-active', isOpen);
          trigger.setAttribute('aria-expanded', String(isOpen));
        }
      });
    }

    // Al pulsar un subenlace, cerrar el menú responsive móvil y desactivar estado
    item.querySelectorAll('.nav-dropdown-menu a').forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        item.classList.remove('open');
        item.classList.remove('is-active');
      });
    });
  });

  // Cerrar menús al hacer clic fuera en desktop
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('is-active');
        const trigger = item.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        item.classList.remove('is-active');
        const trigger = item.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
      if (navMenu) navMenu.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   Resaltar Enlace Activo según URL
   -------------------------------------------------------------------------- */

/**
 * Inspecciona la URL actual de la ventana y asigna la clase 'active' al enlace
 * correspondiente en la barra de navegación superior. Maneja tanto rutas relativas
 * directas como la raíz index.html por defecto.
 */
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
   - Exclusivo de red-john.html con botón flotante interactivo.
   - Manejo de restricciones de autoplay de navegadores y visibilidad de pestaña.
   -------------------------------------------------------------------------- */
let redJohnAudio = null;
let isRedJohnAudioPlaying = false;
let userPausedRedJohn = false;

/**
 * Inicializa el reproductor de audio ambiental para la sección del misterio de Red John.
 * Gestiona:
 * - Autoplay condicional (inicia automáticamente si el navegador lo permite; si se bloquea,
 *   espera el primer gesto de interacción del usuario).
 * - Sincronización visual del botón flotante y el ecualizador animado.
 * - Pausa automática al cambiar o minimizar la pestaña (Page Visibility API) para evitar ruidos no deseados.
 */
function initRedJohnAudio() {
  const audioBtn = document.getElementById('redJohnAudioBtn');
  if (!audioBtn) return;

  redJohnAudio = new Audio('audio/js-bach--prelude-in-c-major.mp3');
  redJohnAudio.loop = true;
  redJohnAudio.volume = 0.55;

  const textSpan = audioBtn.querySelector('.btn-text');

  /**
   * Actualiza el estado visual del botón flotante (animación del ecualizador y texto).
   * @param {boolean} playing - Indica si el audio se está reproduciendo.
   */
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

  /**
   * Intenta reproducir el audio manejando la promesa del navegador.
   */
  function startPlayback() {
    if (userPausedRedJohn || isRedJohnAudioPlaying) return;
    const playPromise = redJohnAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isRedJohnAudioPlaying = true;
        updateButtonUI(true);
        cleanupInteractionListeners();
      }).catch(() => {
        // Política de autoplay del navegador: aguarda la primera interacción del usuario
        updateButtonUI(false);
        setupInteractionListeners();
      });
    }
  }

  /**
   * Desencadenante ejecutado en el primer clic, scroll o toque del usuario.
   */
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

  // Intentar reproducción inmediata
  startPlayback();

  // Control interactivo del botón flotante (Play / Pause manual)
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
      }).catch(err => console.warn('Reproducción bloqueada:', err));
    }
  });

  // Pausar si el usuario cambia de pestaña y reanudar solo si estaba activo
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

/**
 * Inyecta dinámicamente y controla el botón flotante "Volver Arriba":
 * - Se hace visible cuando el usuario baja más de 350 píxeles.
 * - Desplaza suavemente la ventana hasta la parte superior al hacer clic.
 */
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

