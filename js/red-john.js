/**
 * ============================================================================
 * THE MENTALIST - MISTERIO DE RED JOHN & ASOCIACIÓN BLAKE
 * ============================================================================
 * Control interactivo de desclasificación y gestión de spoilers.
 * 
 * ARQUITECTURA:
 * 1. initBlakeModal: Controla el despliegue del informe clasificado sobre la
 *    Asociación Blake ("Tyger Tyger"), gestionando scroll locks y descarte por ESC.
 * 2. initRedJohnSpoiler: Administra la revelación controlada del expediente
 *    de Thomas McAllister, alternando el overlay de advertencia, el contenido
 *    secreto y la mutación de insignias de alerta.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlakeModal();
  initRedJohnSpoiler();
});

/**
 * Inicializa los controladores para el modal de desclasificación de la
 * conspiración judicial y policial "Asociación Blake" (Tyger Tyger).
 */
function initBlakeModal() {
  const openBtn = document.getElementById('openBlakeReportBtn');
  const modal = document.getElementById('blakeModal');
  const closeBtn = document.getElementById('closeBlakeModalBtn');
  const innerCloseBtn = document.getElementById('closeBlakeInnerBtn');

  if (!modal) return;

  /**
   * Abre el modal y bloquea el desplazamiento del fondo.
   */
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal y restablece el comportamiento normal del scroll.
   */
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (innerCloseBtn) innerCloseBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic en el backdrop exterior
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Administra el panel de revelación de la identidad definitiva de Red John
 * (Thomas McAllister), alternando dinámicamente el velo de advertencia y las insignias.
 */
function initRedJohnSpoiler() {
  const revealBtn = document.getElementById('btnRevealRedJohn');
  const hideBtn = document.getElementById('btnHideRedJohn');
  const overlay = document.getElementById('redJohnSpoilerOverlay');
  const content = document.getElementById('redJohnRevealedContent');
  const badge = document.getElementById('mcallisterBadge');

  if (!revealBtn || !overlay || !content) return;

  // Revelar la identidad del asesino
  revealBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    content.style.display = 'block';
    if (badge) {
      badge.textContent = 'EL VERDADERO ASESINO';
      badge.classList.remove('badge-cbi');
      badge.classList.add('badge-crimson');
    }
  });

  // Ocultar de nuevo la identidad y restaurar la advertencia
  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      content.style.display = 'none';
      overlay.style.display = 'block';
      if (badge) {
        badge.textContent = 'ALERTA DE SPOILER';
        badge.classList.remove('badge-crimson');
        badge.classList.add('badge-cbi');
      }
    });
  }
}
