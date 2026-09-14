/**
 * THE MENTALIST - Curiosidades & Secretos de Producción
 * Modal desclasificado de curiosidades y navegación interactiva
 */

const CURIOSITIES_DATA = {
  citroen: {
    badge: 'ICONO AUTOMOVILÍSTICO',
    title: 'El Citroën DS 21 Pallas (1971)',
    subtitle: 'La elección personal de Simon Baker y el homenaje a Columbo',
    img: 'img/citroenDS2.jpg',
    paragraphs: [
      'El icónico automóvil que conduce Patrick Jane a lo largo de toda la serie no es una simple elección de utilería, sino una decisión directa y personal del actor <strong>Simon Baker</strong>.',
      'Baker buscaba rendir homenaje al legendario detective televisivo <em>Columbo</em> (interpretado por Peter Falk), cuyo destartalado Peugeot 403 era una extensión de su excéntrica y desaliñada personalidad. Para Patrick Jane, Baker quería un vehículo europeo, de diseño curvilíneo y refinado, que desentonara deliberadamente con los agresivos Ford Crown Victoria y todoterrenos negros de la policía estadounidense.',
      'El Citroën DS —conocido popularmente en Francia como <em>«La Déesse»</em> (La Diosa)— cuenta con una revolucionaria suspensión hidroneumática de altura regulable que permite al vehículo deslizarse con una suavidad casi ingrávida sobre el asfalto. Esta calma aerodinámica refleja a la perfección la elegancia serena e inmutable de Jane, incluso cuando se dirige a las escenas de crimen más macabras de California.',
      'La producción llegó a utilizar tres modelos idénticos para el rodaje. El cariño de Simon Baker por el coche era tal que, en múltiples ocasiones durante el rodaje en Los Ángeles, prefería conducirlo él mismo entre localizaciones en lugar de viajar en los traslados de la producción.'
    ]
  },
  'tea-couch': {
    badge: 'RITUALES & PALACIO MENTAL',
    title: 'La Taza de Té & El Sofá Marrón',
    subtitle: 'El sanctasanctórum de Patrick Jane en el CBI y Austin, Texas',
    img: 'img/sillon&tea.jpg',
    paragraphs: [
      'En un entorno dominado por el estrés, las armas y el café de filtro policial recalentado en tazas térmicas de plástico, Patrick Jane se mantiene fiel a su mayor ancla de serenidad: <strong>el té caliente servido en taza de porcelana fina</strong>.',
      'Para Jane, el té no es solo una bebida reconfortante; es una declaración filosófica y una barrera psicológica frente a la barbarie del mundo: <em>«El café es un combustible agresivo; el té es civilización en una taza»</em>. Además, ofrecer una taza de té bien azucarada a sospechosos o testigos en shock es una de sus herramientas más sutiles para quebrar defensas y generar empatía inmediata.',
      'Su otro pilar indiscutible es el desgastado <strong>sofá de cuero marrón</strong> en el centro de la oficina de la brigada de Teresa Lisbon. Mientras los agentes teclean informes burocráticos, Jane descansa recostado con los ojos cerrados. Lejos de estar durmiendo, Patrick se encuentra en un estado alfa-theta de profunda concentración, caminando mentalmente por los infinitos pasillos de su palacio de la memoria para conectar indicios dispersos.',
      'La importancia de este sofá quedó sellada en la sexta temporada: cuando el agente especial Dennis Abbott recluta a Jane para incorporarse al FBI en Austin tras dos años de exilio en una isla, Patrick escribe una lista de condiciones innegociables. Entre ellas, junto al empleo para Lisbon y su remolque Airstream, exige que el FBI empaquete y transporte su sofá original del CBI desde California hasta Texas.'
    ]
  },
  'color-code': {
    badge: 'SIMBOLISMO DE PRODUCCIÓN',
    title: 'El Código Cromático Oculto',
    subtitle: '124 episodios con el color rojo y la transición a la luz',
    img: null,
    icon: '🎨',
    paragraphs: [
      'El creador de la serie, <strong>Bruno Heller</strong>, estableció desde el episodio piloto una de las tradiciones narrativas más singulares e ingeniosas de la televisión moderna: <strong>durante las cinco primeras temporadas y hasta el capítulo 6x08, cada uno de los 124 títulos originales de episodios contiene una palabra directamente referida al color rojo</strong>.',
      'Los títulos jugaban con todos los matices y sinónimos del espectro escarlata: <em>Red Hair and Silver Tape</em>, <em>Red Menace</em>, <em>Crimson Casanova</em>, <em>Bloodshot</em>, <em>Ruby Slippers</em>, <em>Cherry Picked</em>, <em>Rose-Colored Stemware</em>, <em>Strawberries and Cream</em>...',
      'Esta obsesión cromática en los títulos reflejaba la propia mente de Patrick Jane: una existencia completamente monotemática, teñida y condicionada por la sombra omnipresente del asesino de su familia.',
      'El quiebre ocurre en el episodio <strong>6x08 («Red John»)</strong>, donde Jane finalmente acorrala y estrangula a Thomas McAllister en el parque. Con la venganza consumada, el código rojo muere para siempre. A partir del capítulo 6x09 («My Blue Heaven»), los títulos exploran la paleta cromática completa: <em>Green Thumb</em>, <em>Silver Wings of Time</em>, <em>Black Helicopters</em>, <em>Grey Water</em>, <em>Violet</em>...',
      'La serie concluye en el episodio 7x13 con el luminoso título <strong>«White Orchids» (Orquídeas Blancas)</strong>: el blanco absoluto como símbolo de pureza, nuevo comienzo y redención en el enlace matrimonial de Jane y Teresa Lisbon.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCurioModal();
});

function initCurioModal() {
  const modal = document.getElementById('curioModal');
  const body = document.getElementById('curioModalBody');
  const closeBtn = document.getElementById('closeCurioModalBtn');

  if (!modal || !body) return;

  const curioButtons = document.querySelectorAll('.btn-read-curio');
  curioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const curioId = btn.getAttribute('data-curio');
      const data = CURIOSITIES_DATA[curioId];
      if (!data) return;

      body.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span class="badge badge-cbi" style="font-size: 0.75rem; letter-spacing: 0.1em; border-color: var(--green-bright); color: var(--green-bright);">
            ${data.badge}
          </span>
          <h3 style="font-family: var(--font-display, serif); font-size: 1.55rem; color: var(--cream-pure); margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1.25;">
            ${data.title}
          </h3>
          <p style="color: var(--amber-light, #d4b483); font-size: 0.9rem; font-style: italic; margin-top: 0.35rem;">
            ${data.subtitle}
          </p>
        </div>

        ${data.img ? `
          <div style="width: 100%; max-height: 220px; overflow: hidden; border-radius: 6px; margin-bottom: 1.35rem; border: 1px solid var(--green-border);">
            <img src="${data.img}" alt="${data.title}" style="width: 100%; height: 220px; object-fit: cover;">
          </div>
        ` : (data.icon ? `
          <div style="text-align: center; font-size: 2.8rem; margin-bottom: 1rem;">
            ${data.icon}
          </div>
        ` : '')}

        <div style="background: rgba(10, 14, 12, 0.7); border: 1px solid rgba(85, 194, 153, 0.25); border-left: 3px solid var(--green-bright); border-radius: 6px; padding: 1.35rem 1.4rem; margin-bottom: 1.5rem; line-height: 1.8; color: #dcd8d0; font-size: 0.94rem; text-align: left;">
          ${data.paragraphs.map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join('')}
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" id="closeCurioInnerBtn" style="padding: 0.5rem 1.35rem; font-size: 0.85rem; border-color: var(--green-border); color: #ecdcc2;">
            Cerrar Expediente
          </button>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const innerClose = document.getElementById('closeCurioInnerBtn');
      if (innerClose) {
        innerClose.addEventListener('click', closeCurioModal);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCurioModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCurioModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCurioModal();
    }
  });
}

function closeCurioModal() {
  const modal = document.getElementById('curioModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
