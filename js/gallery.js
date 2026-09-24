/**
 * ==========================================================================
 * THE MENTALIST - GALERÍA DE MOMENTOS ICÓNICOS (CARRUSEL & LIGHTBOX MODAL)
 * ==========================================================================
 * Provee interacción de alto rendimiento para:
 * 1. Desplazamiento fluido del carrusel con aceleración por hardware (GPU).
 * 2. Arrastre táctil y con ratón (Grab & Drag-to-scroll) ultra fluido y sin bloqueos.
 * 3. Apertura de Lightbox modal a pantalla completa al hacer clic en cualquier tarjeta.
 * 4. Navegación continua en el Lightbox con botones laterales y teclado (←, →, Esc).
 * ==========================================================================
 */

(function () {
  'use strict';

  // Bandera para diferenciar entre arrastre (scroll) y clic para abrir modal
  let hasDraggedCarousel = false;

  document.addEventListener('DOMContentLoaded', () => {
    initGalleryCarousel();
    initGalleryLightbox();
  });

  /**
   * Inicializa la navegación del carrusel de tarjetas con desplazamiento fluido
   */
  function initGalleryCarousel() {
    const viewport = document.getElementById('galleryViewport');
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    const counterEl = document.getElementById('galleryCounter');

    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll('.gallery-card'));
    const totalCards = cards.length;
    if (totalCards === 0) return;

    // Desactivar arrastre fantasma de imágenes nativo
    track.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
    });

    // Medición en caché para evitar Reflow / Layout Thrashing durante el scroll
    let cardStep = 360;
    function measureStep() {
      if (cards.length > 1) {
        cardStep = Math.max(1, cards[1].offsetLeft - cards[0].offsetLeft);
      } else if (cards.length > 0) {
        cardStep = cards[0].offsetWidth + 36;
      }
    }
    measureStep();
    window.addEventListener('resize', measureStep, { passive: true });

    // Actualización del indicador numérico (ej. "1 / 8") sincronizado con requestAnimationFrame
    let counterTicking = false;
    function updateCounter() {
      if (!counterEl || cardStep <= 0) return;
      const scrollLeft = viewport.scrollLeft;
      const currentIndex = Math.min(
        totalCards,
        Math.max(1, Math.round(scrollLeft / cardStep) + 1)
      );
      counterEl.textContent = `${currentIndex} / ${totalCards}`;
      counterTicking = false;
    }

    viewport.addEventListener('scroll', () => {
      if (!counterTicking) {
        requestAnimationFrame(updateCounter);
        counterTicking = true;
      }
    }, { passive: true });

    // Desplazamiento por botones de navegación
    function scrollByStep(direction) {
      const step = viewport.clientWidth > 900 ? cardStep * 1.5 : cardStep;
      viewport.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollByStep(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollByStep(1);
      });
    }

    // ------------------------------------------------------------------------
    // Soporte para Arrastre con Ratón (Desktop Grab & Drag-to-scroll)
    // ------------------------------------------------------------------------
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Solo botón principal
      isDown = true;
      hasDraggedCarousel = false;
      startX = e.pageX;
      scrollStart = viewport.scrollLeft;
      viewport.style.scrollBehavior = 'auto'; // Desactiva suavizado durante arrastre activo
      viewport.style.scrollSnapType = 'none'; // Desactiva snap durante arrastre
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = x - startX;
      if (Math.abs(walk) > 6) {
        hasDraggedCarousel = true;
      }
      viewport.scrollLeft = scrollStart - walk;
    });

    const endMouseDrag = () => {
      if (!isDown) return;
      isDown = false;
      viewport.style.scrollBehavior = '';
      viewport.style.scrollSnapType = '';
      setTimeout(() => {
        hasDraggedCarousel = false;
      }, 60);
    };

    window.addEventListener('mouseup', endMouseDrag);

    updateCounter();
  }

  /**
   * Inicializa el visor a pantalla completa (Lightbox Modal)
   */
  function initGalleryLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxSeason = document.getElementById('lightboxSeason');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    const backdrop = document.getElementById('lightboxBackdrop');

    const cards = Array.from(document.querySelectorAll('.gallery-card'));
    if (cards.length === 0) return;

    // Recolectar datos de cada tarjeta
    const galleryItems = cards.map((card, idx) => {
      return {
        index: idx,
        img: card.getAttribute('data-img') || card.querySelector('img')?.src || '',
        alt: card.querySelector('img')?.alt || 'Momento Icónico',
        title: card.getAttribute('data-title') || card.querySelector('.gallery-card-title')?.textContent || '',
        tag: card.getAttribute('data-tag') || card.querySelector('.gallery-card-tag')?.textContent || '',
        desc: card.getAttribute('data-desc') || card.querySelector('.gallery-card-desc')?.textContent || '',
        season: card.getAttribute('data-season') || '',
        element: card
      };
    });

    let currentItemIndex = 0;

    /**
     * Muestra la imagen en el índice dado
     */
    function showItem(index) {
      if (index < 0) index = galleryItems.length - 1;
      if (index >= galleryItems.length) index = 0;
      currentItemIndex = index;

      const item = galleryItems[currentItemIndex];
      if (!item) return;

      // Sincronizar estilo de la chincheta con la nota seleccionada
      const pushPin = document.getElementById('lightboxPushPin');
      if (pushPin && item.element) {
        const cardPin = item.element.querySelector('.push-pin');
        if (cardPin) {
          const pinColor = cardPin.classList.contains('pin-gold')
            ? 'pin-gold'
            : (cardPin.classList.contains('pin-silver') ? 'pin-silver' : 'pin-crimson');
          pushPin.className = `push-pin ${pinColor} lightbox-push-pin`;
        }
      }

      // Efecto suave de transición de imagen
      if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          lightboxImg.src = item.img;
          lightboxImg.alt = item.alt;
          lightboxImg.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }, 90);
      }

      if (lightboxTag) lightboxTag.textContent = item.tag;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxDesc) lightboxDesc.textContent = item.desc;
      if (lightboxSeason) lightboxSeason.textContent = item.season;
      if (lightboxCounter) lightboxCounter.textContent = `${currentItemIndex + 1} de ${galleryItems.length}`;
    }

    /**
     * Abre el Lightbox en el índice seleccionado
     */
    function openLightbox(index) {
      showItem(index);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    /**
     * Cierra el Lightbox
     */
    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function nextItem() {
      showItem(currentItemIndex + 1);
    }

    function prevItem() {
      showItem(currentItemIndex - 1);
    }

    // Vincular clics en las tarjetas (respetando la bandera de arrastre)
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (hasDraggedCarousel) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        openLightbox(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    // Controles de navegación del Lightbox
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevItem(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextItem(); });
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevItem();
      } else if (e.key === 'ArrowRight') {
        nextItem();
      }
    });

    // Soporte para gestos táctiles (Swipe) en celulares y tablets
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 45) {
        if (swipeDistance < 0) {
          nextItem();
        } else {
          prevItem();
        }
      }
    }
  }

})();
