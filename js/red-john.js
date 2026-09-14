/**
 * THE MENTALIST - MISTERIO DE RED JOHN
 * Control interactivo de desclasificación de la Asociación Blake y spoiler de Red John
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlakeModal();
  initRedJohnSpoiler();
});

function initBlakeModal() {
  const openBtn = document.getElementById('openBlakeReportBtn');
  const modal = document.getElementById('blakeModal');
  const closeBtn = document.getElementById('closeBlakeModalBtn');
  const innerCloseBtn = document.getElementById('closeBlakeInnerBtn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (innerCloseBtn) innerCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initRedJohnSpoiler() {
  const revealBtn = document.getElementById('btnRevealRedJohn');
  const hideBtn = document.getElementById('btnHideRedJohn');
  const overlay = document.getElementById('redJohnSpoilerOverlay');
  const content = document.getElementById('redJohnRevealedContent');
  const badge = document.getElementById('mcallisterBadge');

  if (!revealBtn || !overlay || !content) return;

  revealBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    content.style.display = 'block';
    if (badge) {
      badge.textContent = 'EL VERDADERO ASESINO';
      badge.classList.remove('badge-cbi');
      badge.classList.add('badge-crimson');
    }
  });

  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      content.style.display = 'none';
      overlay.style.display = 'block';
      if (badge) {
        badge.textContent = 'ALERTA DE SPOILER';
      }
    });
  }
}
