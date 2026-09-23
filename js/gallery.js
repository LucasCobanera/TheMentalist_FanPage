/**
 * ==========================================================================
 * THE MENTALIST - GALERÍA DE MOMENTOS ICÓNICOS (CARRUSEL & LIGHTBOX MODAL)
 * ==========================================================================
 * Provee interacción completa para:
 * 1. Desplazamiento fluido del carrusel con botones de avance / retroceso.
 * 2. Soporte para gestos táctiles (touch swipe) en móviles y tablets.
 * 3. Apertura de Lightbox modal a pantalla completa al hacer clic en cualquier tarjeta.
 * 4. Navegación continua en el Lightbox con botones laterales y teclado (←, →, Esc).
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initGalleryCarousel();
    initGalleryLightbox();
  });

  /**
   * Inicializa la navegación del carrusel de tarjetas
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

    // Actualiza el indicador numérico (ej. "1 / 8")
    function updateCounter() {
      if (!counterEl) return;
      const scrollLeft = viewport.scrollLeft;
      const cardStep = cards.length > 1 ? Math.max(1, cards[1].offsetLeft - cards[0].offsetLeft) : (cards[0].offsetWidth + 36);
      const currentIndex = Math.min(
        totalCards,
        Math.max(1, Math.round(scrollLeft / cardStep) + 1)
      );
      counterEl.textContent = `${currentIndex} / ${totalCards}`;
    }

    // Calcula el ancho de desplazamiento por clic
    function getScrollStep() {
      if (cards.length === 0) return 360;
      const cardStep = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : (cards[0].offsetWidth + 36);
      return viewport.clientWidth > 900 ? cardStep * 1.5 : cardStep;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Actualizar indicador durante el scroll pasivo
    let scrollTimeout;
    viewport.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateCounter, 60);
    }, { passive: true });

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
          const pinColor = cardPin.classList.contains('pin-gold') ? 'pin-gold' : (cardPin.classList.contains('pin-silver') ? 'pin-silver' : 'pin-crimson');
          pushPin.className = `push-pin ${pinColor} lightbox-push-pin`;
        }
      }

      // Efecto suave de transición de imagen
      if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          lightboxImg.src = item.img;
          lightboxImg.alt = item.alt;
          lightboxImg.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }, 120);
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
      document.body.style.overflow = 'hidden'; // Evita scroll de la página de fondo
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

    // Vincular clics en las tarjetas del carrusel
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
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
          nextItem(); // Deslizar hacia la izquierda = siguiente foto
        } else {
          prevItem(); // Deslizar hacia la derecha = foto anterior
        }
      }
    }
  }

})();
