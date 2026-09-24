/**
 * ============================================================================
 * THE MENTALIST - MISTERIO DE RED JOHN & TABLERO DE INVESTIGACIÓN
 * ============================================================================
 * Control interactivo del Tablero de Evidencias (Murder Board), hilos SVG de lana
 * roja dinámicos, estante de notas de Patrick Jane, filtros de conspiraciones,
 * panel forense lateral (Evidence Slide-Over Drawer) y desclasificación de McAllister.
 * 
 * ARQUITECTURA:
 * 1. EVIDENCE_DOSSIERS: Banco de datos clasificado de sospechosos y evidencias.
 * 2. openEvidenceDrawer / closeEvidenceDrawer: Panel lateral forense animado.
 * 3. initBlakeModal: Modal desclasificado de la conspiración judicial Tyger Tyger.
 * 4. initRedJohnSpoiler: Desclasificación controlada de la identidad de McAllister.
 * 5. EvidenceBoard: Motor de trazado de hilos de lana roja conectando el nodo
 *    central de Red John con las chinchetas de los 7 sospechosos y sus vínculos.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initPoemTranslation();
  initBlakeModal();
  initRedJohnSpoiler();
  initEvidenceBoard();
  initStickyFilters();
});

/**
 * BASE DE DATOS CLASIFICADA: DOSSIERS DE SOSPECHOSOS Y NOTAS DE EVIDENCIA
 */
const EVIDENCE_DOSSIERS = {
  // --- LOS 7 SOSPECHOSOS ---
  partridge: {
    type: 'suspect',
    name: 'Brett Partridge',
    role: 'Jefe Técnico Forense del CBI',
    img: 'img/characters/brett_partridge.jpg',
    status: 'DESCARTE FATAL',
    statusClass: 'badge-crimson',
    conspiracies: ['Asociación Blake (Tyger Tyger)'],
    evidence: 'Técnico forense del CBI con una fascinación morbosa y fetichista hacia los métodos sangrientos de Red John. Imitador aficionado en su juventud y miembro de la red clandestina judicial Blake. Red John lo emboscó y degolló en una vivienda abandonada en el episodio 6x01 ("Desert Rose") para tender una trampa a Lisbon y enviar una advertencia contundente a Jane.',
    janeDeduction: '«Partridge era un peón grotesco fascinado por el teatro de la muerte, pero carecía del intelecto y control emocional de Red John. Al morir en mis brazos murmurando "Tyger, Tyger", confirmó que la podredumbre llegaba hasta la morgue central.»',
    quote: 'Tyger, Tyger... Teresa... no me dejes desangrarme aquí...',
    outcome: 'Asesinado por Red John en 6x01; descartado de inmediato de la lista de los 7 sospechosos.'
  },

  kirkland: {
    type: 'suspect',
    name: 'Bob Kirkland',
    role: 'Agente Homeland Security',
    img: 'img/characters/bob_kirkland.jpg',
    status: 'VENGADOR CAÍDO',
    statusClass: 'badge-crimson',
    conspiracies: ['Investigación Clandestina Paralela'],
    evidence: 'Alto mando de Seguridad Nacional con acceso irrestricto a inteligencia federal. Irrumpió en el ático de Jane para fotografiar y copiar su tablero secreto de sospechosos. Su móvil real no era encubrir a Red John, sino cazarlo para vengar a su hermano gemelo Michael Kirkland, quien cayó en las redes del asesino y fue aniquilado.',
    janeDeduction: '«Kirkland era mi reflejo más oscuro: un hombre consumido exactamente por la misma sed ciega de venganza, pero dispuesto a secuestrar, torturar y ejecutar a sangre fría sin ningún límite ético.»',
    quote: 'Quiero mirarlo a los ojos antes de que muera. Sé perfectamente lo que esa bestia le hizo a mi hermano.',
    outcome: 'Acribillado a traición por el agente Reede Smith en 6x04 fingiendo un intento de fuga durante su traslado penal.'
  },

  haffner: {
    type: 'suspect',
    name: 'Ray Haffner',
    role: 'Ex-Agente Senior CBI / Detective Privado',
    img: 'img/characters/ray_haffner.jpg',
    status: 'EXPLOSIÓN MALIBÚ',
    statusClass: 'badge-crimson',
    conspiracies: ['Secta Visualize', 'Reunión de Malibú'],
    evidence: 'Ex-agente del CBI que formó su propia agencia privada de élite con clientes corporativos de alto nivel gracias al financiamiento directo de la secta Visualize. Intentó sistemáticamente reclutar a Lisbon para distanciarla del peligroso radio de acción de Jane.',
    janeDeduction: '«Tenía el aplomo, la elegancia superficial y la mirada calculadora que atribuí a Red John durante años, pero su lealtad última siempre perteneció a Brett Stiles y al culto de Visualize, no a la red de sangre.»',
    quote: 'Lisbon, aléjate de Patrick Jane antes de que sea tarde. Ese hombre te va a arrastrar al infierno con él.',
    outcome: 'Murió calcinado de forma instantánea en la explosión de la bomba en la residencia de Malibú (6x06).'
  },

  stiles: {
    type: 'suspect',
    name: 'Brett Stiles',
    role: 'Líder Supremo y Fundador de Visualize',
    img: 'img/characters/brett_stiles.jpg',
    status: 'EXPLOSIÓN MALIBÚ',
    statusClass: 'badge-crimson',
    conspiracies: ['Secta Visualize', 'Reunión de Malibú'],
    evidence: 'Líder carismático y omnipotente de la iglesia Visualize. Poseía información confidencial de los primeros crímenes de Red John ocurridos en 1988 en una granja comunitaria de Visualize en Elliston. Diagnosticado con cáncer terminal avanzado, aceptó acudir a la reunión convocada por Jane en Malibú sabiendo que moriría.',
    janeDeduction: '«Stiles no era Red John porque su ego descomunal exigía veneración pública a plena luz del día. Sin embargo, conocía su verdadera identidad desde hacía décadas y utilizó esa carta como su jugada de ajedrez final.»',
    quote: 'El tiempo se me acaba, Patrick. Pero sé cosas de tu enemigo que ni en tus peores pesadillas podrías imaginar.',
    outcome: 'Falleció voluntariamente en la explosión de Malibú (6x06), sabiendo que su final terrenal era inminente.'
  },

  mcallister: {
    type: 'suspect',
    name: 'Thomas McAllister',
    role: 'Sheriff del Condado de Napa // Red John',
    img: 'img/redjohn.jpeg',
    status: 'EL AUTÉNTICO RED JOHN',
    statusClass: 'badge-crimson',
    conspiracies: ['Asociación Blake (Fundador y Amo)', 'Reunión de Malibú'],
    evidence: 'Apareció en el segundo episodio de la serie (1x02) bajo la fachada inofensiva de un sheriff campechano aficionado a la caza en Napa Valley. Fundó y lideró en las sombras la Asociación Blake, corrompiendo a jueces, fiscales y policías en todo el estado. Fingió su muerte en la explosión de Malibú reemplazando su cuerpo por el cadáver de una víctima y alterando el ADN con la complicidad de Partridge.',
    janeDeduction: '«El escondite perfecto: un policía de pueblo con ornitofobia (pánico fóbico a las palomas) que se creía un dios invisible. Pero su narcisismo fue su tumba cuando vino en persona a la capilla para regodearse de mi supuesta sumisión.»',
    quote: 'Tyger, Tyger, burning bright... ¿Me rogaste piedad en tus oraciones Patrick? Ahora te toca mirarme a la cara.',
    outcome: 'Acorralado tras el truco de la paloma en la iglesia, herido de bala y estrangulado hasta la muerte por Patrick Jane en el parque (6x08).'
  },

  smith: {
    type: 'suspect',
    name: 'Reede Smith',
    role: 'Agente Especial del FBI',
    img: 'img/characters/reede_smith.jpg',
    status: 'CONFESOR VIVO',
    statusClass: 'badge-green',
    conspiracies: ['Asociación Blake', 'Reunión de Malibú'],
    evidence: 'Agente federal captado por la Asociación Blake tras encubrir un incidente de drogas durante una intervención. Portador del tatuaje identificatorio de tres puntos en el hombro izquierdo. Ejecutó a Bob Kirkland por órdenes de Bertram. Al resultar herido en Malibú y descubrir que la red ordenó eliminarlo, se entregó a Jane y Lisbon revelando la conspiración.',
    janeDeduction: '«Un peón atrapado por sus propias faltas morales. No era un asesino sociópata como McAllister, sino un hombre aterrorizado que vendió su placa y terminó siendo la palanca que demolió a toda la red Tyger Tyger.»',
    quote: 'Tyger, Tyger... si la red se entera de que sigo respirando en esta clínica, mandarán a degollarme.',
    outcome: 'Superviviente bajo protección federal tras brindar testimonio jurado que desmanteló la Asociación Blake ante los medios.'
  },

  bertram: {
    type: 'suspect',
    name: 'Gale Bertram',
    role: 'Director del CBI (Sacramento)',
    img: 'img/characters/gale_bertram.jpg',
    status: 'SEÑUELO EJECUTADO',
    statusClass: 'badge-crimson',
    conspiracies: ['Asociación Blake', 'Reunión de Malibú'],
    evidence: 'Director administrativo del CBI y miembro de alto rango en la Asociación Blake. Tras el estallido de Malibú, huyó como el sospechoso público número 1 en una cacería federal televisada a escala nacional. Intentó asesinar a Jane en el hospital citando el poema de Blake.',
    janeDeduction: '«Bertram era un político vanidoso, amante del póker y de citar poesía inglesa, pero carecía de la frialdad y genialidad maquiavélica de Red John. McAllister lo manipuló como el señuelo mediático descartable perfecto.»',
    quote: 'Hay hilos invisibles que manejan a este estado, Patrick. Ni tú ni Lisbon tienen jurisdicción sobre lo que viene.',
    outcome: 'Ejecutado por el agente corrupto Oscar Cordero en la capilla por orden directa de McAllister instantes antes de revelarse (6x08).'
  },

  // --- APUNTES Y NOTAS DE EVIDENCIA ---
  handshakes: {
    type: 'note',
    icon: 'fa-handshake',
    title: 'Los 2.164 Apretones de Manos',
    tag: 'METODOLOGÍA DEDUCTIVA // TEMPORADA 5',
    evidence: 'Durante una visita a prisión, Lorelei Martins filtró accidentalmente una revelación demoledora a Patrick Jane: «Me sorprende que tú y Red John no se hayan hecho amigos íntimos en cuanto se dieron la mano». Jane se recluyó en su ático durante meses reconstruyendo cada apretón de manos documentado en su memoria desde 2003, analizando a 2.164 individuos hasta reducir la lista a los 7 sospechosos definitivos.',
    janeDeduction: '«El tacto humano no miente: la textura de la piel, la fuerza del saludo, el contexto en el que ocurrió. Red John era tan vanidoso que no pudo resistir la tentación de estrechar mi mano y verme a los ojos mientras yo desconocía su identidad.»',
    quote: 'Lorelei Martins: «Me sorprende que no se hayan hecho amigos en cuanto se dieron la mano...»',
    outcome: 'Validado de forma escalofriante por Red John, quien grabó un CD con los 7 mismos nombres antes de que Jane los revelara al CBI.'
  },

  tyger: {
    type: 'note',
    icon: 'fa-shield-halved',
    title: 'La Asociación Blake & El Tatuaje Secreto',
    tag: 'ORGANIZACIÓN CLANDESTINA // IMPUNIDAD JUDICIAL',
    evidence: 'Sindicato secreto institucionalizado que penetró cada estamento policial, fiscal y judicial de California. Creado y comandado por Red John para obtener favores, ocultar pruebas periciales y eliminar testigos. Sus miembros se reconocían con la contraseña «Tyger, Tyger» del poema de William Blake (1794) y portaban un tatuaje de tres puntos en el hombro izquierdo.',
    janeDeduction: '«Un pacto faústico perfecto: "yo encubro tu homicidio imprudente hoy, tú pierdes la evidencia balística de mi masacre mañana". Red John no necesitaba esconderse de la policía porque la policía era su propia legión.»',
    quote: 'William Blake: «Tyger, Tyger, burning bright, in the forests of the night...»',
    outcome: 'Desmantelada por el agente Dennis Abbott del FBI tras el colapso del CBI y la confesión grabada de Reede Smith.'
  },

  dna: {
    type: 'note',
    icon: 'fa-dna',
    title: 'Manipulación Forense de ADN en la Morgue',
    tag: 'PERITAJE CIENTÍFICO // EPISODIO 6x06',
    evidence: 'Tras la explosión en la casa de Patrick Jane en Malibú, los restos carbonizados recuperados de uno de los cuerpos fueron clasificados legalmente como pertenecientes a Thomas McAllister. Jane descubrió la maniobra: McAllister colocó el cadáver de una víctima anterior en la detonación y el forense Brett Partridge (miembro Blake) adulteró los perfiles de ADN en el banco de datos del CBI.',
    janeDeduction: '«Si controlas al técnico que custodia las muestras biológicas en la escena del crimen, tienes el poder de fingir tu propia muerte y volverte un fantasma legalmente libre de toda sospecha.»',
    quote: 'Patrick Jane: «La ciencia forense es infalible, salvo cuando el perito que opera la máquina le debe favores a Red John.»',
    outcome: 'El descubrimiento del fraude genético le permitió a Patrick Jane confirmar que Red John seguía vivo y preparado para el duelo final.'
  },

  smile: {
    type: 'note',
    icon: 'fa-paintbrush',
    title: 'El Ritual de la Cara Sonriente',
    tag: 'FIRMA PSICOLÓGICA // MODUS OPERANDI',
    evidence: 'La firma distintiva e inmutable de Red John. Pintada en la pared con la mano derecha enguantada a la altura exacta de la mirada del observador, usando la sangre caliente de la víctima. El círculo se traza meticulosamente en sentido de las agujas del reloj con tres dedos enguantados, seguido de dos puntos para los ojos y una línea curvada para la sonrisa burlona.',
    janeDeduction: '«No es un simple dibujo grotesco; es un artefacto psicológico. Diseñado para que quien entre a la habitación vea la sonrisa burlesca antes de ver el cadáver en el piso. Red John exigía ser la única estrella en el escenario del crimen.»',
    quote: 'Patrick Jane: «La sonrisa siempre te mira primero a ti. Es su saludo teatral desde las sombras.»',
    outcome: 'La macabra marca que dio origen a la cruzada de Patrick Jane en 2003 y que concluyó definitivamente en el cementerio de Napa en 2013.'
  }
};

/**
 * Abre el panel forense lateral (Evidence Slide-Over Drawer) con la ficha clasificada.
 */
function openEvidenceDrawer(dossierId) {
  const dossier = EVIDENCE_DOSSIERS[dossierId];
  if (!dossier) return;

  const drawer = document.getElementById('evidenceDrawer');
  const backdrop = document.getElementById('evidenceDrawerBackdrop');
  const drawerBody = document.getElementById('drawerBody');
  const caseCode = document.getElementById('drawerCaseCode');

  if (!drawer || !backdrop || !drawerBody) return;

  if (caseCode) {
    caseCode.textContent = dossier.type === 'suspect'
      ? `EXPEDIENTE #CBI-SUSPECT-${dossierId.toUpperCase()}`
      : `EXPEDIENTE #CBI-CLUE-${dossierId.toUpperCase()}`;
  }

  let html = '';

  if (dossier.type === 'suspect') {
    html = `
      <div class="dossier-profile-card">
        <div class="dossier-avatar-wrap">
          <img src="${dossier.img}" alt="${dossier.name}" class="dossier-avatar-img">
        </div>
        <div class="dossier-profile-info">
          <h3 class="dossier-name">${dossier.name}</h3>
          <p class="dossier-role">${dossier.role}</p>
          <span class="pin-badge-status ${dossier.statusClass}">${dossier.status}</span>
        </div>
      </div>

      <div class="dossier-section">
        <h4 class="dossier-section-title"><i class="fa-solid fa-clipboard-list"></i> Dossier de Investigación</h4>
        <p class="dossier-text">${dossier.evidence}</p>
      </div>

      <div class="jane-deduction-box">
        <div class="jane-deduction-header">
          <i class="fa-solid fa-mug-hot"></i>
          <span>Deducción de Patrick Jane</span>
        </div>
        <p class="jane-deduction-quote">${dossier.janeDeduction}</p>
      </div>

      <div class="dossier-section">
        <h4 class="dossier-section-title"><i class="fa-solid fa-diagram-project"></i> Vínculos & Conspiraciones</h4>
        <div class="dossier-tags-row">
          ${dossier.conspiracies.map(c => `<span class="dossier-tag-pill"><i class="fa-solid fa-link"></i> ${c}</span>`).join('')}
        </div>
      </div>

      <div class="dossier-section">
        <h4 class="dossier-section-title"><i class="fa-solid fa-comment"></i> Frase / Testimonio Clave</h4>
        <p class="dossier-text" style="font-style: italic; color: #ffb8bd;">«${dossier.quote}»</p>
      </div>

      <div class="dossier-outcome-box">
        <strong style="color: #ff9da4; font-family: var(--font-typewriter, monospace); display: block; margin-bottom: 0.25rem;">
          <i class="fa-solid fa-flag-checkered"></i> Desenlace en la Serie:
        </strong>
        ${dossier.outcome}
      </div>
    `;
  } else {
    html = `
      <div class="dossier-profile-card" style="border-left: 4px solid var(--crimson-bright);">
        <div class="dossier-avatar-wrap" style="background: rgba(220, 20, 60, 0.15); border-color: rgba(220, 20, 60, 0.5);">
          <i class="fa-solid ${dossier.icon} dossier-avatar-icon"></i>
        </div>
        <div class="dossier-profile-info">
          <span class="shelf-note-tag" style="color: var(--crimson-bright);">${dossier.tag}</span>
          <h3 class="dossier-name" style="font-size: 1.25rem;">${dossier.title}</h3>
        </div>
      </div>

      <div class="dossier-section">
        <h4 class="dossier-section-title"><i class="fa-solid fa-magnifying-glass"></i> Evidencia & Registro Pericial</h4>
        <p class="dossier-text">${dossier.evidence}</p>
      </div>

      <div class="jane-deduction-box">
        <div class="jane-deduction-header">
          <i class="fa-solid fa-mug-hot"></i>
          <span>Apunte en el Cuaderno de Patrick Jane</span>
        </div>
        <p class="jane-deduction-quote">${dossier.janeDeduction}</p>
      </div>

      <div class="dossier-section">
        <h4 class="dossier-section-title"><i class="fa-solid fa-quote-left"></i> Testimonio Clave</h4>
        <p class="dossier-text" style="font-style: italic; color: #ffb8bd;">${dossier.quote}</p>
      </div>

      <div class="dossier-outcome-box">
        <strong style="color: #ff9da4; font-family: var(--font-typewriter, monospace); display: block; margin-bottom: 0.25rem;">
          <i class="fa-solid fa-folder-closed"></i> Relevancia en el Caso:
        </strong>
        ${dossier.outcome}
      </div>
    `;
  }

  drawerBody.innerHTML = html;
  backdrop.classList.add('active');
  drawer.classList.add('active');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el panel forense lateral.
 */
function closeEvidenceDrawer() {
  const drawer = document.getElementById('evidenceDrawer');
  const backdrop = document.getElementById('evidenceDrawerBackdrop');
  if (!drawer || !backdrop) return;

  drawer.classList.remove('active');
  backdrop.classList.remove('active');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

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

/**
 * Gestiona la traducción interactiva del poema de William Blake
 * entre el texto original en inglés y su versión traducida al español.
 */
function initPoemTranslation() {
  const btn = document.getElementById('btnTranslatePoem');
  const btnText = document.getElementById('translateBtnText');
  const contentEn = document.getElementById('poemContentEn');
  const contentEs = document.getElementById('poemContentEs');

  if (!btn || !contentEn || !contentEs) return;

  let isSpanish = false;

  btn.addEventListener('click', () => {
    isSpanish = !isSpanish;

    if (isSpanish) {
      contentEn.style.display = 'none';
      contentEs.style.display = 'block';
      contentEs.classList.remove('fade-enter');
      void contentEs.offsetWidth;
      contentEs.classList.add('fade-enter');
      if (btnText) btnText.textContent = 'Ver Original (Inglés)';
      btn.classList.add('active');
    } else {
      contentEs.style.display = 'none';
      contentEn.style.display = 'block';
      contentEn.classList.remove('fade-enter');
      void contentEn.offsetWidth;
      contentEn.classList.add('fade-enter');
      if (btnText) btnText.textContent = 'Traducir a Español';
      btn.classList.remove('active');
    }
  });
}

/**
 * Administra el panel de revelación de la identidad definitiva de Red John
 * (Thomas McAllister), alternando el velo de advertencia y la foto redjohn.jpeg.
 */
function initRedJohnSpoiler() {
  const revealBtn = document.getElementById('btnRevealRedJohn');
  const hideBtn = document.getElementById('btnHideRedJohn');
  const overlay = document.getElementById('redJohnSpoilerOverlay');
  const content = document.getElementById('redJohnRevealedContent');
  const badge = document.getElementById('mcallisterBadge');
  const card = document.getElementById('node-redjohn');

  if (!revealBtn || !overlay || !content) return;

  // Revelar la identidad del asesino con efecto de desvanecimiento suave (Fade)
  revealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.add('fade-out');
    if (card) card.classList.add('card-revealing');

    setTimeout(() => {
      overlay.style.display = 'none';
      content.style.display = 'block';
      void content.offsetWidth;
      content.classList.add('fade-in');

      if (badge) {
        badge.textContent = 'EL AUTÉNTICO RED JOHN';
        badge.classList.remove('badge-cbi');
        badge.classList.add('badge-crimson');
      }

      if (card) {
        setTimeout(() => card.classList.remove('card-revealing'), 600);
      }

      if (window.refreshEvidenceBoard) {
        setTimeout(window.refreshEvidenceBoard, 80);
        setTimeout(window.refreshEvidenceBoard, 350);
      }
    }, 380);
  });

  // Ocultar de nuevo la identidad con desvanecimiento inverso
  if (hideBtn) {
    hideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      content.classList.remove('fade-in');

      setTimeout(() => {
        content.style.display = 'none';
        overlay.style.display = 'flex';
        void overlay.offsetWidth;
        overlay.classList.remove('fade-out');

        if (badge) {
          badge.textContent = 'ALERTA DE SPOILER';
          badge.classList.remove('badge-crimson');
          badge.classList.add('badge-cbi');
        }

        if (window.refreshEvidenceBoard) {
          setTimeout(window.refreshEvidenceBoard, 80);
          setTimeout(window.refreshEvidenceBoard, 350);
        }
      }, 380);
    });
  }
}

/**
 * Motor interactivo del Tablero de Evidencias (Evidence Murder Board).
 * Dibuja y actualiza hilos de lana roja en SVG conectando las chinchetas,
 * gestiona filtros por conspiraciones, drag & drop libre y apertura del Drawer.
 */
function initEvidenceBoard() {
  const board = document.getElementById('evidenceBoard');
  const svg = document.getElementById('boardThreadsSvg');
  const centerNode = document.getElementById('node-redjohn');
  const filterButtons = document.querySelectorAll('.board-filter-btn');
  const suspectCards = document.querySelectorAll('.board-pin-card[data-suspect]:not(#node-redjohn)');
  const allCards = document.querySelectorAll('.board-pins-grid .board-pin-card');

  if (!board || !svg || !centerNode) return;

  /**
   * Conexiones conspirativas entre sospechosos (además de los hilos hacia Red John)
   */
  const conspiracyLinks = [
    // Blake Association (Tyger Tyger)
    { from: 'partridge', to: 'smith', group: 'blake' },
    { from: 'smith', to: 'bertram', group: 'blake' },
    { from: 'bertram', to: 'mcallister', group: 'blake' },
    // Visualize Sect
    { from: 'stiles', to: 'haffner', group: 'visualize' },
    // Malibu Explosion (reunión en la casa de Jane)
    { from: 'haffner', to: 'stiles', group: 'malibu' },
    { from: 'stiles', to: 'smith', group: 'malibu' },
    { from: 'bertram', to: 'mcallister', group: 'malibu' }
  ];

  let currentFilter = 'all';
  let cachedPaths = [];
  let currentZoom = 1.0;
  const MIN_ZOOM = 0.70;
  const MAX_ZOOM = 1.45;
  const ZOOM_STEP = 0.15;

  /**
   * Obtiene las coordenadas centrales de una chincheta respecto al lienzo SVG del tablero,
   * normalizadas matemáticamente por el factor de zoom activo.
   */
  function getPinCoords(element) {
    const pin = element.querySelector('.push-pin') || element;
    const pinRect = pin.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    return {
      x: (pinRect.left - boardRect.left) / currentZoom + (board.scrollLeft || 0) + (pinRect.width / 2) / currentZoom,
      y: (pinRect.top - boardRect.top) / currentZoom + (board.scrollTop || 0) + (pinRect.height / 2) / currentZoom
    };
  }

  /**
   * Genera un trazado curvo Bézier cuadrático que simula la caída natural por gravedad del hilo.
   */
  function createYarnPath(x1, y1, x2, y2, sag = 16) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + Math.abs(sag);
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  /**
   * Dibuja todos los hilos en la capa SVG de manera optimizada y adaptada al zoom.
   */
  function drawThreads() {
    svg.innerHTML = '';
    const boardRect = board.getBoundingClientRect();
    if (boardRect.width === 0 || boardRect.height === 0) return;

    const fullWidth = Math.max(board.scrollWidth, board.offsetWidth);
    const fullHeight = Math.max(board.scrollHeight, board.offsetHeight);

    svg.style.width = fullWidth + 'px';
    svg.style.height = fullHeight + 'px';
    svg.setAttribute('viewBox', `0 0 ${fullWidth} ${fullHeight}`);

    const centerCoords = getPinCoords(centerNode);

    // 1. Hilos desde el centro (Red John / McAllister) a cada sospechoso
    suspectCards.forEach(card => {
      const suspectId = card.getAttribute('data-suspect');
      const cardCoords = getPinCoords(card);
      const conspiracies = card.getAttribute('data-conspiracies') || '';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', createYarnPath(centerCoords.x, centerCoords.y, cardCoords.x, cardCoords.y, 16));
      path.setAttribute('data-thread-type', 'center');
      path.setAttribute('data-target-suspect', suspectId);
      path.setAttribute('data-conspiracies', conspiracies);
      path.classList.add('thread-path');

      if (currentFilter !== 'all') {
        const matches = conspiracies.split(',').map(s => s.trim()).includes(currentFilter);
        if (!matches) {
          path.classList.add('thread-dimmed');
        }
      }

      svg.appendChild(path);
    });

    // 2. Hilos de interconexión conspirativa entre sospechosos
    conspiracyLinks.forEach(link => {
      const cardFrom = document.querySelector(`[data-suspect="${link.from}"]`);
      const cardTo = document.querySelector(`[data-suspect="${link.to}"]`);

      if (!cardFrom || !cardTo) return;

      const p1 = getPinCoords(cardFrom);
      const p2 = getPinCoords(cardTo);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', createYarnPath(p1.x, p1.y, p2.x, p2.y, 12));
      path.setAttribute('data-thread-type', 'conspiracy');
      path.setAttribute('data-link-from', link.from);
      path.setAttribute('data-link-to', link.to);
      path.setAttribute('data-group', link.group);
      path.classList.add('thread-path');

      if (currentFilter !== 'all' && currentFilter !== link.group) {
        path.classList.add('thread-dimmed');
      }

      svg.appendChild(path);
    });

    cachedPaths = Array.from(svg.querySelectorAll('path'));
  }

  /**
   * Aplica el filtro seleccionado (all, blake, visualize, malibu) a las tarjetas e hilos.
   */
  function applyFilter(filter) {
    currentFilter = filter;

    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });

    const allFilterCards = document.querySelectorAll('.board-pin-card[data-suspect]');
    allFilterCards.forEach(card => {
      const conspiracies = (card.getAttribute('data-conspiracies') || '').split(',').map(s => s.trim());
      if (filter === 'all') {
        card.classList.remove('board-item-dimmed', 'board-item-highlighted');
      } else if (conspiracies.includes(filter)) {
        card.classList.remove('board-item-dimmed');
        card.classList.add('board-item-highlighted');
      } else {
        card.classList.add('board-item-dimmed');
        card.classList.remove('board-item-highlighted');
      }
    });

    drawThreads();
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  /**
   * INTERACCIÓN HOVER FLUIDA EN SOSPECHOSOS
   */
  suspectCards.forEach(card => {
    const suspectId = card.getAttribute('data-suspect');

    card.addEventListener('mouseenter', () => {
      for (let i = 0; i < cachedPaths.length; i++) {
        const p = cachedPaths[i];
        const isCenterTarget = p.getAttribute('data-target-suspect') === suspectId;
        const isConspiracyTarget = p.getAttribute('data-link-from') === suspectId || p.getAttribute('data-link-to') === suspectId;

        if (isCenterTarget || isConspiracyTarget) {
          p.classList.add('thread-highlighted');
          p.classList.remove('thread-dimmed');
        } else {
          p.classList.add('thread-dimmed');
          p.classList.remove('thread-highlighted');
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      for (let i = 0; i < cachedPaths.length; i++) {
        const p = cachedPaths[i];
        p.classList.remove('thread-highlighted');
        if (currentFilter === 'all') {
          p.classList.remove('thread-dimmed');
        } else {
          const conspiracies = (p.getAttribute('data-conspiracies') || '').split(',').map(s => s.trim());
          const group = p.getAttribute('data-group');
          if (conspiracies.includes(currentFilter) || group === currentFilter) {
            p.classList.remove('thread-dimmed');
          } else {
            p.classList.add('thread-dimmed');
          }
        }
      }
    });
  });

  // Hover en el nodo central de Red John
  centerNode.addEventListener('mouseenter', () => {
    for (let i = 0; i < cachedPaths.length; i++) {
      const p = cachedPaths[i];
      if (p.getAttribute('data-thread-type') === 'center' || p.getAttribute('data-link-to') === 'mcallister') {
        p.classList.add('thread-highlighted');
        p.classList.remove('thread-dimmed');
      } else {
        p.classList.add('thread-dimmed');
        p.classList.remove('thread-highlighted');
      }
    }
  });

  centerNode.addEventListener('mouseleave', () => {
    for (let i = 0; i < cachedPaths.length; i++) {
      const p = cachedPaths[i];
      p.classList.remove('thread-highlighted');
      if (currentFilter === 'all') {
        p.classList.remove('thread-dimmed');
      } else {
        const conspiracies = (p.getAttribute('data-conspiracies') || '').split(',').map(s => s.trim());
        const group = p.getAttribute('data-group');
        if (conspiracies.includes(currentFilter) || group === currentFilter) {
          p.classList.remove('thread-dimmed');
        } else {
          p.classList.add('thread-dimmed');
        }
      }
    }
  });

  /**
   * INTERACTIVIDAD DRAG & DROP PARA LOS 7 SOSPECHOSOS:
   * Permite arrastrar libremente las tarjetas por el corcho.
   * Los hilos de lana roja siguen las chinchetas en tiempo real a 60fps.
   */
  const initialRotations = {
    'pin-partridge': -1.5,
    'pin-kirkland': 1.2,
    'pin-haffner': -1.4,
    'pin-stiles': 1.8,
    'node-redjohn': 0,
    'pin-smith': -1.2,
    'pin-bertram': 1.0
  };

  let activePointerCard = null;
  let isCardDragging = false;
  let dragRafId = null;

  allCards.forEach(card => {
    const baseRot = initialRotations[card.id] !== undefined ? initialRotations[card.id] : 0;
    card._baseRotation = baseRot;
    card._dragX = 0;
    card._dragY = 0;

    let startX = 0;
    let startY = 0;
    let initX = 0;
    let initY = 0;
    let pointerActive = false;

    card.addEventListener('pointerdown', (e) => {
      // En vista móvil (pantallas <= 768px), deshabilitar arrastre para permitir el scroll vertical natural
      if (window.innerWidth <= 768) {
        return;
      }

      if (e.target.closest('#btnRevealRedJohn') || e.target.closest('#btnHideRedJohn') || e.target.closest('a')) {
        return;
      }
      if (e.button !== 0) return;

      pointerActive = true;
      isCardDragging = false;
      activePointerCard = card;

      startX = e.clientX;
      startY = e.clientY;
      initX = card._dragX || 0;
      initY = card._dragY || 0;

      card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
      if (!pointerActive || activePointerCard !== card) return;

      const dx = (e.clientX - startX) / currentZoom;
      const dy = (e.clientY - startY) / currentZoom;

      if (!isCardDragging && Math.hypot(dx, dy) > 5) {
        isCardDragging = true;
        card.classList.add('is-dragging');
      }

      if (isCardDragging) {
        const nextX = initX + dx;
        const nextY = initY + dy;

        card._dragX = nextX;
        card._dragY = nextY;

        card.style.transform = `translate(${nextX}px, ${nextY}px) rotate(${baseRot}deg) scale(1.04)`;

        if (!dragRafId) {
          dragRafId = requestAnimationFrame(() => {
            drawThreads();
            dragRafId = null;
          });
        }
      }
    });

    const finishDrag = (e) => {
      if (!pointerActive) return;
      pointerActive = false;

      try {
        card.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (isCardDragging) {
        card.classList.remove('is-dragging');
        card.classList.add('is-pinned-custom');
        card.style.transform = `translate(${card._dragX}px, ${card._dragY}px) rotate(${baseRot}deg)`;
        drawThreads();
      }

      setTimeout(() => {
        isCardDragging = false;
        activePointerCard = null;
      }, 50);
    };

    card.addEventListener('pointerup', finishDrag);
    card.addEventListener('pointercancel', finishDrag);

    // Clic en la tarjeta: Abre el Evidence Drawer lateral (sin deformar el tablero)
    card.addEventListener('click', (e) => {
      if (isCardDragging) return;
      if (e.target.closest('#btnRevealRedJohn') || e.target.closest('#btnHideRedJohn') || e.target.closest('a')) return;

      const suspectId = card.getAttribute('data-suspect');
      if (suspectId) {
        openEvidenceDrawer(suspectId);
      }
    });
  });

  /**
   * INTERACCIÓN DE APUNTES SUPERIORES (JANE'S NOTEBOOK SHELF)
   */
  const shelfNotes = document.querySelectorAll('.shelf-note-item[data-dossier]');
  shelfNotes.forEach(note => {
    note.addEventListener('click', () => {
      const dossierId = note.getAttribute('data-dossier');
      if (dossierId) openEvidenceDrawer(dossierId);
    });

    note.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dossierId = note.getAttribute('data-dossier');
        if (dossierId) openEvidenceDrawer(dossierId);
      }
    });
  });

  /**
   * CONTROLADORES DE CIERRE DEL EVIDENCE DRAWER
   */
  const closeDrawerBtn = document.getElementById('closeEvidenceDrawerBtn');
  const closeDrawerFooterBtn = document.getElementById('drawerCloseFooterBtn');
  const drawerBackdrop = document.getElementById('evidenceDrawerBackdrop');

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeEvidenceDrawer);
  if (closeDrawerFooterBtn) closeDrawerFooterBtn.addEventListener('click', closeEvidenceDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeEvidenceDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('evidenceDrawer');
      if (drawer && drawer.classList.contains('active')) {
        closeEvidenceDrawer();
      }
    }
  });

  // Botón para restablecer las posiciones originales de los sospechosos en el corcho
  const resetBtn = document.getElementById('resetBoardPositionsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      allCards.forEach(card => {
        card.classList.add('is-resetting');
        card.classList.remove('is-pinned-custom', 'is-dragging');
        card._dragX = 0;
        card._dragY = 0;
        card.style.transform = '';
      });

      const startTime = performance.now();
      const animDuration = 480;

      function updateResetThreads(now) {
        drawThreads();
        if (now - startTime < animDuration) {
          requestAnimationFrame(updateResetThreads);
        } else {
          allCards.forEach(c => c.classList.remove('is-resetting'));
          drawThreads();
        }
      }

      requestAnimationFrame(updateResetThreads);
    });
  }

  /**
   * CONTROLES DE ZOOM DEL TABLERO (+, -, 100%)
   * Permite ampliar o reducir la escala visual del corcho policial.
   */
  function initBoardZoom() {
    const zoomInBtn = document.getElementById('btnZoomIn');
    const zoomOutBtn = document.getElementById('btnZoomOut');
    const zoomResetBtn = document.getElementById('btnZoomReset');
    const zoomBadge = document.getElementById('boardZoomLevel');
    const wrapper = document.getElementById('evidenceBoardZoomWrapper');
    const scaler = document.getElementById('evidenceBoardScaler');

    if (!zoomInBtn || !zoomOutBtn || !zoomBadge) return;

    function updateZoomUI() {
      zoomBadge.textContent = `${Math.round(currentZoom * 100)}%`;
      zoomInBtn.disabled = currentZoom >= MAX_ZOOM - 0.01;
      zoomOutBtn.disabled = currentZoom <= MIN_ZOOM + 0.01;
    }

    function applyZoom(newZoom) {
      currentZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newZoom * 100) / 100));

      if (Math.abs(currentZoom - 1.0) < 0.02) {
        currentZoom = 1.0;
      }

      if (currentZoom === 1.0) {
        board.style.transform = '';
        board.style.transformOrigin = '';
        if (scaler) {
          scaler.style.width = '';
          scaler.style.height = '';
          scaler.style.margin = '';
        }
      } else {
        board.style.transform = `scale(${currentZoom})`;
        board.style.transformOrigin = 'top left';

        if (scaler && wrapper) {
          const origW = board.offsetWidth;
          const origH = board.offsetHeight;
          const scaledW = Math.round(origW * currentZoom);
          const scaledH = Math.round(origH * currentZoom);

          scaler.style.width = `${scaledW}px`;
          scaler.style.height = `${scaledH}px`;

          if (scaledW < wrapper.clientWidth) {
            scaler.style.margin = '0 auto';
          } else {
            scaler.style.margin = '0';
          }
        }
      }

      updateZoomUI();
      drawThreads();
      setTimeout(drawThreads, 120);
      setTimeout(drawThreads, 260);
    }

    zoomInBtn.addEventListener('click', () => applyZoom(currentZoom + ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => applyZoom(currentZoom - ZOOM_STEP));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => applyZoom(1.0));
    zoomBadge.addEventListener('click', () => applyZoom(1.0));

    window.adjustBoardZoomLayout = () => {
      if (currentZoom !== 1.0 && scaler && wrapper) {
        const scaledW = Math.round(board.offsetWidth * currentZoom);
        if (scaledW < wrapper.clientWidth) {
          scaler.style.margin = '0 auto';
        } else {
          scaler.style.margin = '0';
        }
      }
    };

    updateZoomUI();
  }

  initBoardZoom();

  // Trazado inicial y redibujado reactivo con debounce en resize
  window.refreshEvidenceBoard = drawThreads;
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        allCards.forEach(c => {
          c.style.transform = '';
          c._dragX = 0;
          c._dragY = 0;
          c.classList.remove('is-dragging', 'is-pinned-custom');
        });
      }
      if (window.adjustBoardZoomLayout) window.adjustBoardZoomLayout();
      drawThreads();
    }, 120);
  });

  // Dibujar tras permitir la estabilización del layout inicial
  setTimeout(drawThreads, 150);
}

/**
 * Gestiona la detección y realce visual de la barra de filtros fija (sticky)
 * cuando el usuario scrollea por debajo de su posición inicial.
 */
function initStickyFilters() {
  const filtersBar = document.getElementById('boardFiltersBar');
  if (!filtersBar) return;

  let ticking = false;
  const checkSticky = () => {
    const rect = filtersBar.getBoundingClientRect();
    // 68px es la altura de la cabecera sticky .site-header
    if (rect.top <= 72) {
      filtersBar.classList.add('is-stuck');
    } else {
      filtersBar.classList.remove('is-stuck');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(checkSticky);
      ticking = true;
    }
  }, { passive: true });

  checkSticky();
}

