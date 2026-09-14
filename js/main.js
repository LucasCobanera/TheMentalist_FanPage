/**
 * THE MENTALIST - Fanpage Script Principal
 * Control de navegación, síntesis de audio ambiental y utilidades globales.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAmbientAudio();
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
   Audio Ambiental & Banda Sonora (Red John Theme / Web Audio API)
   - En red-john.html: Reproduce el preludio de J.S. Bach (audio/js-bach--prelude-in-c-major.mp3)
   - En las demás páginas: Genera el acorde suspendido con Web Audio API
   -------------------------------------------------------------------------- */
let audioCtx = null;
let masterGain = null;
let isAudioPlaying = false;
let ambientOscillators = [];
let redJohnThemeAudio = null;

function initAmbientAudio() {
  const audioBtn = document.getElementById('ambientAudioBtn');
  if (!audioBtn) return;

  const isRedJohnPage = window.location.pathname.includes('red-john');

  if (isRedJohnPage) {
    redJohnThemeAudio = new Audio('audio/js-bach--prelude-in-c-major.mp3');
    redJohnThemeAudio.loop = true;
    redJohnThemeAudio.volume = 0.55;
  }

  audioBtn.addEventListener('click', () => {
    // Si estamos en la página de Red John, reproducir el MP3 del tema oficial
    if (isRedJohnPage && redJohnThemeAudio) {
      if (!isAudioPlaying) {
        redJohnThemeAudio.play().then(() => {
          audioBtn.classList.add('playing');
          const textSpan = audioBtn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = 'Tema Red John: On';
          isAudioPlaying = true;
        }).catch(err => console.log('Reproducción interactiva requerida:', err));
      } else {
        redJohnThemeAudio.pause();
        audioBtn.classList.remove('playing');
        const textSpan = audioBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Tema Red John (Bach)';
        isAudioPlaying = false;
      }
      return;
    }

    // Para las demás páginas: síntesis de suspenso con Web Audio API
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isAudioPlaying) {
      startAmbientSound();
      audioBtn.classList.add('playing');
      const textSpan = audioBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Misterio Sonoro: On';
      isAudioPlaying = true;
    } else {
      stopAmbientSound();
      audioBtn.classList.remove('playing');
      const textSpan = audioBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Ambiente de Suspenso';
      isAudioPlaying = false;
    }
  });
}

function startAmbientSound() {
  if (!audioCtx) return;

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 2.5);
  masterGain.connect(audioCtx.destination);

  // Frecuencias para crear un acorde menor misterioso (Re menor / D minor, clásico de suspense)
  const notes = [73.42, 110.0, 146.83, 220.0]; // D2, A2, D3, A3

  ambientOscillators = notes.map((freq, index) => {
    const osc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    osc.type = index % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // LFO sutil para respiración sonora
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.2 + (index * 0.08);
    lfoGain.gain.value = 1.5;
    lfo.connect(osc.frequency);
    lfo.start();

    noteGain.gain.value = 0.25 / (index + 1);
    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start();
    return { osc, lfo };
  });
}

function stopAmbientSound() {
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      ambientOscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
          osc.disconnect();
          lfo.disconnect();
        } catch (e) {}
      });
      ambientOscillators = [];
    }, 1300);
  }
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

