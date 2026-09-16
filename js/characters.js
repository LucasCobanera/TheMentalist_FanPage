/**
 * THE MENTALIST - Dossier de Personajes & Lógica de Filtros
 * Fotografías oficiales estandarizadas y renderizadas en alta definición (600x850).
 */

const CHARACTERS_DATA = [
  {
    id: 'patrick-jane',
    name: 'Patrick Jane',
    actor: 'Simon Baker',
    role: 'Consultor Independiente del CBI / FBI',
    category: 'cbi',
    badge: 'CONSULTOR #411-C',
    stamp: 'CASO RED JOHN',
    stampClass: 'red',
    imageSlotId: 'slot-jane',
    imageSrc: 'img/characters/patrick_jane.jpg',
    imageAlt: 'Fotografía oficial de Patrick Jane',
    description: 'Ex-falso psíquico con asombrosas dotes de observación, deducción y sugestión psicológica. Se unió al CBI para rastrear y vengarse de Red John tras el asesinato de su esposa e hija.',
    skills: ['Lectura en frío', 'Hipnosis', 'Microexpresiones', 'Manipulación psicológica', 'Memoria eidética'],
    fullBio: 'Patrick Jane se crió en el mundo del circo y carnaval ambulante junto a su padre estafador, desarrollando desde niño una prodigiosa habilidad para engañar y leer a las personas. Tras enriquecerse fingiendo ser vidente televisivo, provocó a Red John en directo, lo que desató la masacre de su familia. Su único motor vital fue la venganza, mientras resolvía cientos de casos para el CBI gracias a su genialidad caótica.',
    quote: 'Un psíquico es alguien que vende mentiras a personas tristes. Yo era muy bueno en eso.',
    stats: { observacion: '99%', audacia: '95%', disciplina: '15%', teConsumido: '100%' }
  },
  {
    id: 'teresa-lisbon',
    name: 'Teresa Lisbon',
    actor: 'Robin Tunney',
    role: 'Agente Especial a Cargo del CBI / Agente Especial FBI',
    category: 'cbi',
    badge: 'SENIOR AGENT CBI',
    stamp: 'AUTORIZADO',
    stampClass: '',
    imageSlotId: 'slot-lisbon',
    imageSrc: 'img/characters/teresa_lisbon.jpg',
    imageAlt: 'Fotografía oficial de Teresa Lisbon',
    description: 'Líder del equipo de homicidios del CBI. Estricta seguidora del reglamento, honorable y ferozmente protectora de su equipo y del impredecible Patrick Jane.',
    skills: ['Liderazgo táctico', 'Interrogatorio judicial', 'Tiro de precisión', 'Paciencia infinita con Jane'],
    fullBio: 'Con una infancia dura marcada por la pérdida de su madre y cuidar de sus tres hermanos menores, Lisbon forjó un carácter inquebrantable y una lealtad absoluta hacia la justicia. Aunque Patrick Jane constantemente desafía la ley y sus órdenes, ella es la única persona en el mundo capaz de anclarlo a la realidad y salvarlo de su propia autodestrucción.',
    quote: 'Si vuelves a entrar en una escena del crimen sin permiso, te arrestaré yo misma, Jane.',
    stats: { liderazgo: '95%', etica: '98%', punteria: '92%', paciencia: '88%' }
  },
  {
    id: 'kimball-cho',
    name: 'Kimball Cho',
    actor: 'Tim Kang',
    role: 'Agente Especial CBI / Supervisor FBI',
    category: 'cbi',
    badge: 'AGENTE SENIOR',
    stamp: 'SIN SONRISAS',
    stampClass: '',
    imageSlotId: 'slot-cho',
    imageSrc: 'img/characters/kimball_cho.jpg',
    imageAlt: 'Fotografía oficial de Kimball Cho',
    description: 'El miembro más imperturbable y profesional de la unidad. Ex-miembro de la pandilla Playboys de Avon y ex-militar de las fuerzas armadas estadounidenses.',
    skills: ['Detección de mentiras', 'Combate cuerpo a cuerpo', 'Sarcasmo seco', 'Inexpresividad absoluta'],
    fullBio: 'Apodado cariñosamente "Hombre de Hielo" por sus compañeros, Cho posee un código moral de hierro y una habilidad inigualable para desmantelar las coartadas de criminales con solo tres palabras bien elegidas. Es el ejecutor táctico más confiable del equipo y un devoto de los libros.',
    quote: 'No existe tal cosa como las brujas. Solo personas que no toman su medicación.',
    stats: { inexpresividad: '100%', lealtad: '96%', efectividad: '94%', intimidacion: '90%' }
  },
  {
    id: 'wayne-rigsby',
    name: 'Wayne Rigsby',
    actor: 'Owain Yeoman',
    role: 'Agente de Campo CBI / Investigador Privado',
    category: 'cbi',
    badge: 'ESPECIALISTA BALÍSTICA',
    stamp: 'CBI FIELD',
    stampClass: '',
    imageSlotId: 'slot-rigsby',
    imageSrc: 'img/characters/wayne_rigsby.jpg',
    imageAlt: 'Fotografía oficial de Wayne Rigsby',
    description: 'Especialista en balística, investigación de incendios provocados y fuerza de choque del equipo. Apasionado por la comida y eternamente enamorado de Grace Van Pelt.',
    skills: ['Peritaje de incendios', 'Balística forense', 'Brecha táctica', 'Apetito insaciable'],
    fullBio: 'Hijo de un violento miembro de una banda de moteros, Rigsby eligió el camino de la ley para no repetir los errores de su padre. Aunque Jane suele usarlo como cebo o distracción en sus elaborados trucos, su valentía y nobleza son pilares fundamentales para el grupo.',
    quote: '¿Alguien va a comerse esa rosquilla?',
    stats: { fuerza: '92%', valentia: '90%', apetito: '99%', sutileza: '45%' }
  },
  {
    id: 'grace-van-pelt',
    name: 'Grace Van Pelt',
    actor: 'Amanda Righetti',
    role: 'Agente Novata CBI / Especialista en Inteligencia Digital',
    category: 'cbi',
    badge: 'ANALISTA CBI',
    stamp: 'CONFIDENCIAL',
    stampClass: '',
    imageSlotId: 'slot-vanpelt',
    imageSrc: 'img/characters/grace_van_pelt.jpg',
    imageAlt: 'Fotografía oficial de Grace Van Pelt',
    description: 'La integrante más joven del equipo inicial. Experta en ciberinteligencia, bases de datos y criminología, con una mente abierta a lo espiritual y paranormal.',
    skills: ['Análisis informático', 'Perfilación criminal', 'Hacking ético', 'Empatía con víctimas'],
    fullBio: 'Grace creció en una pequeña comunidad agrícola de Iowa. Al incorporarse al CBI, chocó inicialmente con el escepticismo radical de Jane debido a sus creencias sobre el más allá. Con el tiempo, superó traumáticas traiciones personales y se convirtió en una de las mejores especialistas digitales de California.',
    quote: 'Solo porque la ciencia no pueda explicar algo todavía no significa que no sea real.',
    stats: { ciberforense: '96%', intuicion: '88%', empatia: '92%', punteria: '85%' }
  },
  {
    id: 'madeleine-hightower',
    name: 'Madeleine Hightower',
    actor: 'Aunjanue Ellis',
    role: 'Directora Especial del CBI',
    category: 'cbi',
    badge: 'SUPERINTENDENTE CBI',
    stamp: 'EJECUTIVO',
    stampClass: '',
    imageSlotId: 'slot-hightower',
    imageSrc: 'img/characters/madeleine_hightower.jpg',
    imageAlt: 'Fotografía oficial de Madeleine Hightower',
    description: 'Directora formidable del CBI que sucedió a Virgil Minelli. Firme, inteligente y una de las pocas superiores capaces de mantener a raya tanto a Jane como a los políticos.',
    skills: ['Mando ejecutivo', 'Perspicacia política', 'Supervivencia táctica', 'Instinto protector'],
    fullBio: 'Hightower demostró ser una aliada leal cuando Red John intentó tenderle una trampa incriminatoria por homicidio. Con la ayuda de Jane, fingió su fuga hasta poder limpiar su nombre y proteger a sus hijos.',
    quote: 'No me importa cómo resuelvan los casos, me importa que no me hagan comparecer en televisión pidiendo disculpas.',
    stats: { firmeza: '95%', inteligencia: '91%', liderazgo: '93%', valentia: '90%' }
  },
  {
    id: 'dennis-abbott',
    name: 'Dennis Abbott',
    actor: 'Rockmond Dunbar',
    role: 'Agente Especial Supervisor FBI (Austin, Texas)',
    category: 'fbi',
    badge: 'FBI SUPERVISOR',
    stamp: 'FEDERAL AGENT',
    stampClass: '',
    imageSlotId: 'slot-abbott',
    imageSrc: 'img/characters/dennis_abbott.jpg',
    imageAlt: 'Fotografía oficial de Dennis Abbott',
    description: 'Veterano de la guerra y supervisor de campo del FBI. Inicialmente persiguió a Jane tras el colapso del CBI, para luego convertirse en su protector y gran aliado institucional.',
    skills: ['Estrategia federal', 'Negociación de rehenes', 'Protección de testigos', 'Diplomacia burocrática'],
    fullBio: 'Un hombre de principios intachables que supo reconocer el valor insustituible de Patrick Jane y Teresa Lisbon en la oficina del FBI en Austin, arriesgando su propia carrera contra chantajes del pasado para respaldarlos en momentos críticos.',
    quote: 'Jane, eres el mayor dolor de cabeza de mi carrera, pero también el activo más brillante.',
    stats: { autoridad: '94%', temple: '92%', experienciaMilitar: '95%', astucia: '89%' }
  },
  {
    id: 'red-john',
    name: 'Red John',
    actor: 'Enigma / Sociedad Secreta',
    role: 'Asesino Serial & Líder de la Asociación Blake',
    category: 'nemesis',
    badge: 'ENEMIGO PÚBLICO #1',
    stamp: 'TYGER TYGER',
    stampClass: 'red',
    imageSlotId: 'slot-redjohn',
    imageSrc: 'img/characters/red_john.jpg',
    imageAlt: 'Representación oficial de Red John',
    description: 'Prolífico asesino en serie y manipulador psicológico supremo. Dejó docenas de víctimas marcadas con su icónica carita sonriente dibujada con la sangre de las mismas.',
    skills: ['Manipulación mental', 'Red criminal encubierta', 'Evasión forense', 'Sadismo teatral'],
    fullBio: 'Durante más de una década, Red John construyó un culto de seguidores ciegamente leales y orquestó la "Asociación Blake", una sociedad secreta infiltrada en jueces, agentes de policía y altos cargos del estado de California, asegurándose impunidad absoluta hasta su duelo final contra Patrick Jane.',
    quote: 'Tyger, Tyger, burning bright, in the forests of the night...',
    stats: { crueldad: '100%', sigilo: '99%', redDeContactos: '98%', ego: '99%' }
  },
  {
    id: 'thomas-mcallister',
    name: 'Thomas McAllister',
    actor: 'Xander Berkeley',
    role: 'Sheriff del Condado de Napa / Identidad Real de Red John',
    category: 'nemesis',
    badge: 'RED JOHN REVELADO',
    stamp: 'EJECUTADO',
    stampClass: 'red',
    imageSlotId: 'slot-mcallister',
    imageSrc: 'img/characters/thomas_mcallister.jpg',
    imageAlt: 'Fotografía oficial de Thomas McAllister',
    description: 'Aparentemente un afable sheriff rural del condado vinícola de Napa. Conoció a Jane en el segundo episodio de la serie y resultó ser el verdadero rostro tras la carita sonriente.',
    skills: ['Disfraz psicológico', 'Control de la Asociación Blake', 'Puntería de caza', 'Manipulación implacable'],
    fullBio: 'McAllister ocultó su verdadera naturaleza monstruosa tras la fachada de un campechano sheriff de pueblo. Orquestó atentados, fingió su propia muerte por explosión y finalmente fue perseguido y estrangulado por Patrick Jane en un parque de Sacramento.',
    quote: '¿Quieres saber si soy Red John, Patrick? Gané el juego hace mucho tiempo.',
    stats: { sadismo: '100%', sigilo: '99%', audacia: '96%', controlMental: '98%' }
  },
  {
    id: 'brett-stiles',
    name: 'Brett Stiles',
    actor: 'Malcolm McDowell',
    role: 'Líder Supremo de la Iglesia de Visualize',
    category: 'nemesis',
    badge: 'LÍDER DE CULTO',
    stamp: 'INTERÉS POLICIAL',
    stampClass: '',
    imageSlotId: 'slot-stiles',
    imageSrc: 'img/characters/brett_stiles.jpg',
    imageAlt: 'Fotografía oficial de Brett Stiles',
    description: 'Enigmático, elocuente y multimillonario patriarca de la controvertida organización espiritual Visualize. Rival intelectual de Jane con oscuros nexos con el pasado de Red John.',
    skills: ['Lavado de cerebro', 'Retórica persuasiva', 'Red de influencias', 'Lectura psicológica'],
    fullBio: 'Stiles mantenía un juego de ajedrez mental perpetuo con Patrick Jane. Aunque sospechoso de ser Red John, Stiles consideraba al asesino como un competidor menor y a Jane como su único igual intelectual.',
    quote: 'Patrick, ambos sabemos que la verdad es un concepto muy maleable en manos de un artista.',
    stats: { elocuencia: '99%', riqueza: '98%', misterio: '94%', vanidad: '97%' }
  },
  {
    id: 'gale-bertram',
    name: 'Gale Bertram',
    actor: 'Michael Gaston',
    role: 'Director del CBI / Miembro Clave Asociación Blake',
    category: 'cbi',
    badge: 'DIRECTOR CBI',
    stamp: 'TRAIDOR BLAKE',
    stampClass: 'red',
    imageSlotId: 'slot-bertram',
    imageSrc: 'img/characters/gale_bertram.jpg',
    imageAlt: 'Fotografía oficial de Gale Bertram',
    description: 'Político astuto y director general del CBI. Mantenía una relación de conveniencia con Jane mientras dirigía en secreto los hilos institucionales de la Asociación Blake.',
    skills: ['Maniobras políticas', 'Encubrimiento legal', 'Retórica pública', 'Red criminal'],
    fullBio: 'Bertram citaba con frecuencia a William Blake y utilizó su cargo en el CBI para proteger las operaciones encubiertas de la red criminal. Tras ser señalado públicamente como sospechoso, fue traicionado y asesinado por orden directa de Thomas McAllister.',
    quote: 'La policía de California no es un circo, señor Jane. Aunque usted se esfuerce en parecer el payaso principal.',
    stats: { politica: '96%', cinismo: '95%', lealtadCBI: '10%', astucia: '88%' }
  },
  {
    id: 'craig-olaughlin',
    name: 'Craig O\'Laughlin',
    actor: 'Eric Winter',
    role: 'Agente Especial del FBI / Infiltrado de Red John',
    category: 'fbi',
    badge: 'AGENTE FBI',
    stamp: 'INFILTRADO',
    stampClass: 'red',
    imageSlotId: 'slot-olaughlin',
    imageSrc: 'img/characters/craig_olaughlin.jpg',
    imageAlt: 'Fotografía oficial de Craig O\'Laughlin',
    description: 'Condecorado agente federal que inició un romance con Grace Van Pelt hasta comprometerse con ella, resultando ser el topo homicida leal a Red John.',
    skills: ['Infiltración encubierta', 'Tácticas de asalto militar', 'Seducción y engaño', 'Tiro táctico'],
    fullBio: 'O\'Laughlin engañó a todo el CBI ganándose la confianza y el corazón de Grace Van Pelt. En el clímax de la tercera temporada, intentó asesinar a Madeleine Hightower y Teresa Lisbon en una cabaña aislada, siendo abatido a tiros por Van Pelt y Lisbon.',
    quote: 'Grace, de verdad me gustabas... pero los amigos de Red John cumplen sus órdenes hasta el final.',
    stats: { frialdad: '98%', punteria: '92%', traicion: '100%', infiltracion: '95%' }
  }
];

/**
 * THE MENTALIST - ARCHIVADOR & EXPEDIENTES CBI (personajes.html)
 * Base de datos de personajes principales y antagonistas, renderizado dinámico
 * de tarjetas tipo dossier dentro de un archivador metálico de oficina de 4 cajones,
 * control de desplazamiento suave del carrusel y modal de expediente abierto en 2 hojas.
 */

/**
 * Representación en SVG del clip metálico tradicional de oficina.
 * Se reutiliza de manera compartida en las fotos de evidencia polaroid.
 */
const PAPERCLIP_SVG = `
<div class="dossier-paperclip" aria-hidden="true">
  <svg width="24" height="56" viewBox="0 0 24 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14V42C7 46.5 10.5 50 15 50C19.5 50 22 46.5 22 42V9C22 4 17.5 1.5 12 1.5C6.5 1.5 2 4.5 2 11V45C2 51.5 7.5 55 14 55C19 55 22 52 22 47" 
      stroke="#d2d8e0" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M7 14V42C7 46.5 10.5 50 15 50C19.5 50 22 46.5 22 42V9C22 4 17.5 1.5 12 1.5C6.5 1.5 2 4.5 2 11V45C2 51.5 7.5 55 14 55C19 55 22 52 22 47" 
      stroke="rgba(50, 55, 65, 0.45)" stroke-width="1.2" stroke-linecap="round"/>
  </svg>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  renderCharacters('all');
  initFilterTabs();
  initCharacterModal();
  initCarouselControls();
});

/**
 * Renderiza los expedientes en el carrusel del archivador metálico:
 * 1. Filtra los personajes según la categoría seleccionada ('all', 'cbi', 'nemesis').
 * 2. Actualiza la placa de latón con el contador total de expedientes archivados.
 * 3. Inyecta el marcado de las dossier cards con pestaña, marco polaroid con clip y sellos oficiales.
 * 4. Asigna los listeners de apertura de expediente completo para cada tarjeta.
 * 5. Restablece el scroll del viewport y actualiza el estado de las flechas.
 * 
 * @param {string} filterCategory - Categoría a filtrar ('all' | 'cbi' | 'nemesis')
 */
function renderCharacters(filterCategory) {
  const grid = document.getElementById('charactersGrid');
  if (!grid) return;

  const filtered = filterCategory === 'all'
    ? CHARACTERS_DATA
    : CHARACTERS_DATA.filter(c => c.category === filterCategory);

  // Actualizar contador del archivador
  const counterText = document.getElementById('lockerCounterText');
  if (counterText) {
    const plural = filtered.length === 1 ? 'EXPEDIENTE ARCHIVADO' : 'EXPEDIENTES ARCHIVADOS';
    counterText.textContent = `${filtered.length} ${plural}`;
  }

  grid.innerHTML = filtered.map((c, index) => {
    const hasImage = c.imageSrc && c.imageSrc.trim() !== '';
    return `
    <article class="dossier-card ${c.category === 'nemesis' ? 'nemesis-card' : ''}" data-id="${c.id}" style="z-index: ${index + 1};">
      <div class="dossier-folder-tab">
        <span class="folder-tab-badge">ARCHIVO CBI // DIV. HOMICIDIOS</span>
        <span class="folder-tab-id">#${c.id.toUpperCase().replace('-', '_')}</span>
      </div>

      <div class="dossier-photo-container">
        <div class="dossier-photo-frame">
          ${PAPERCLIP_SVG}
          ${hasImage
            ? `<img src="${c.imageSrc}" alt="${c.imageAlt}" loading="lazy">`
            : `<div class="image-slot" id="${c.imageSlotId}">
                <p>📁 ${c.name}</p>
              </div>`
          }
          <div class="photo-evidence-tag">EVIDENCIA FOTOGRÁFICA // CBI-EVD</div>
        </div>
        <div class="dossier-stamp ${c.stampClass}">${c.stamp}</div>
      </div>

      <div class="dossier-body">
        <div class="dossier-header">
          <div class="dossier-category-seal ${c.category === 'nemesis' ? 'seal-crimson' : 'seal-cbi'}">
            <span>${c.badge}</span>
          </div>
          <h3 class="dossier-name">${c.name}</h3>
          <span class="dossier-role">${c.role}</span>
          <p class="dossier-actor">Actor: <strong>${c.actor}</strong></p>
        </div>

        <p class="dossier-desc">${c.description}</p>

        <div class="dossier-footer">
          <button type="button" class="btn-dossier-open view-dossier-btn" data-id="${c.id}">
            <i class="fa-solid fa-folder-open"></i>
            <span>Ver Expediente Completo</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </article>
  `}).join('');

  // Vincular eventos para abrir el modal
  grid.querySelectorAll('.view-dossier-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openCharacterModal(id);
    });
  });

  // Reiniciar scroll del carrusel al renderizar y actualizar botones
  const viewport = document.getElementById('lockerCarouselViewport');
  if (viewport) {
    viewport.scrollTo({ left: 0, behavior: 'smooth' });
    setTimeout(updateCarouselNavState, 80);
  }
}

let navUpdateRafId = null;

/**
 * Inicializa los controles de navegación interactiva del carrusel del archivador:
 * - Calcula dinámicamente la distancia de scroll (paso proporcional al ancho visible).
 * - Asigna listeners a los botones anterior y siguiente con scroll suave nativo.
 * - Monitorea el evento 'scroll' optimizado mediante requestAnimationFrame para evitar layout thrashing.
 * - Recalcula límites en eventos de redimensionamiento de ventana (resize).
 */
function initCarouselControls() {
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const viewport = document.getElementById('lockerCarouselViewport');

  if (!viewport || !prevBtn || !nextBtn) return;

  // Distancia de deslizamiento basada en ancho visible (aproximadamente 2-3 expedientes)
  const getScrollStep = () => {
    return Math.max(290, Math.floor(viewport.clientWidth * 0.72));
  };

  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });

  // Optimización con requestAnimationFrame para evitar layout thrashing durante el scroll
  viewport.addEventListener('scroll', () => {
    if (!navUpdateRafId) {
      navUpdateRafId = requestAnimationFrame(() => {
        updateCarouselNavState();
        navUpdateRafId = null;
      });
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateCarouselNavState();
  }, { passive: true });

  updateCarouselNavState();
}

/**
 * Evalúa la posición actual del scroll del archivador y deshabilita visual y funcionalmente
 * las flechas cuando se alcanza el límite izquierdo o derecho.
 */
function updateCarouselNavState() {
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const viewport = document.getElementById('lockerCarouselViewport');

  if (!viewport || !prevBtn || !nextBtn) return;

  const scrollLeft = viewport.scrollLeft;
  const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

  // Deshabilitar botón izquierdo si está al inicio
  if (scrollLeft <= 5) {
    prevBtn.disabled = true;
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove('disabled');
  }

  // Deshabilitar botón derecho si no hay más elementos o llegó al final
  if (maxScrollLeft <= 5 || scrollLeft >= maxScrollLeft - 8) {
    nextBtn.disabled = true;
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
  }
}

/**
 * Inicializa las pestañas de filtrado (Todos, Equipo CBI, Nemesis / Red John):
 * Alterna la clase 'active' y vuelve a renderizar los expedientes según la categoría.
 */
function initFilterTabs() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderCharacters(category);
    });
  });
}

/**
 * Inicializa los eventos de cierre del modal de expediente:
 * - Cierre por botón X.
 * - Cierre al pulsar fuera del contenido (en el overlay oscuro).
 * - Cierre por teclado mediante la tecla 'Escape'.
 */
function initCharacterModal() {
  const modalOverlay = document.getElementById('characterModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

/**
 * Abre el modal del expediente en formato de carpeta abierta de dos hojas:
 * - Hoja izquierda: Fotografía polaroid con clip metálico, identidad, declaración registrada y métricas numéricas.
 * - Hoja derecha: Análisis psicológico exhaustivo, lista de habilidades con viñetas, memorándum de evaluación y sello oficial.
 * - Bloquea el scroll del body mientras el modal permanezca abierto.
 * 
 * @param {string} characterId - Identificador único del personaje (ej: 'patrick-jane')
 */
function openCharacterModal(characterId) {
  const char = CHARACTERS_DATA.find(c => c.id === characterId);
  const modalOverlay = document.getElementById('characterModal');
  const modalBody = document.getElementById('modalDetailsBody');
  if (!char || !modalOverlay || !modalBody) return;

  const hasImage = char.imageSrc && char.imageSrc.trim() !== '';

  modalBody.innerHTML = `
    <div class="dossier-open-folder ${char.category === 'nemesis' ? 'nemesis-folder' : ''}">
      <!-- Pestaña superior del folder abierto -->
      <div class="folder-spread-tab">
        <span>DEPARTAMENTO DE JUSTICIA DE CALIFORNIA // ARCHIVO POLICIAL CONFIDENCIAL</span>
        <span class="folder-ref-num">EXPEDIENTE Nº ${char.badge}</span>
      </div>

      <!-- Lomo / Pliegue central del expediente -->
      <div class="dossier-open-spine" aria-hidden="true"></div>

      <!-- HOJA IZQUIERDA: Foto grande, identificación y datos clave -->
      <div class="dossier-leaf dossier-leaf-left">
        <div class="leaf-header">
          <div class="leaf-agency-seal">
            <span class="agency-title">CALIFORNIA BUREAU OF INVESTIGATION</span>
            <span class="agency-sub">DIVISIÓN DE HOMICIDIOS // SACRAMENTO HQ</span>
          </div>
          <div class="leaf-stamp ${char.stampClass}">${char.stamp}</div>
        </div>

        <div class="dossier-modal-identity-row">
          <div class="dossier-modal-photo-frame">
            ${PAPERCLIP_SVG}
            ${hasImage ? `
              <img src="${char.imageSrc}" alt="${char.name}" class="dossier-modal-photo">
            ` : ''}
            <div class="photo-polaroid-caption">FICHA CBI // ${char.name.toUpperCase()}</div>
          </div>

          <div class="dossier-agent-id-box">
            <span class="badge ${char.category === 'nemesis' ? 'badge-crimson' : 'badge-green'}">${char.badge}</span>
            <h2 class="modal-agent-name">${char.name}</h2>
            <p class="modal-agent-role">${char.role}</p>
            <p class="modal-agent-actor">Interpretado por: <strong>${char.actor}</strong></p>
          </div>
        </div>

        <div class="modal-agent-quote-box">
          <div class="quote-typewriter-mark">DECLARACIÓN REGISTRADA:</div>
          <p>"${char.quote}"</p>
        </div>

        <div class="modal-agent-stats-section">
          <h4 class="dossier-section-subtitle">Métricas de Evaluación de Campo:</h4>
          <div class="modal-agent-stats-grid">
            ${Object.entries(char.stats).map(([statName, val]) => `
              <div class="modal-stat-box">
                <span class="stat-name">${statName}</span>
                <strong class="stat-val">${val}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- HOJA DERECHA: Informe psicológico, habilidades y notas -->
      <div class="dossier-leaf dossier-leaf-right">
        <div class="leaf-watermark-stamp ${char.category === 'nemesis' ? 'stamp-watermark-crimson' : 'stamp-watermark-cbi'}">
          CONFIDENCIAL
        </div>

        <div class="leaf-header right-leaf-header">
          <div class="leaf-doc-title">SECCIÓN II: ANÁLISIS PSICOLÓGICO Y ANTECEDENTES</div>
          <div class="leaf-doc-date">REGISTRO ARCHIVADO</div>
        </div>

        <div class="dossier-bio-container">
          <h4 class="dossier-section-subtitle">Perfil Psicológico e Historial de Campo:</h4>
          <p class="modal-agent-bio">${char.fullBio}</p>
        </div>

        <div class="dossier-skills-container">
          <h4 class="dossier-section-subtitle">Especialidades y Habilidades Deductivas:</h4>
          <div class="modal-agent-skills-list">
            ${char.skills.map(s => `
              <div class="dossier-skill-item">
                <span class="skill-bullet">✓</span>
                <span class="skill-name">${s}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="dossier-summary-memo">
          <div class="memo-title">MEMORÁNDUM DE EVALUACIÓN:</div>
          <p class="memo-text">${char.description}</p>
        </div>

        <div class="dossier-leaf-footer">
          <div class="footer-sign-col">
            <div class="sign-line"></div>
            <span>Firma del Agente a Cargo / CBI</span>
          </div>
          <div class="footer-seal-col">
            <div class="official-cbi-stamp">APROBADO CBI</div>
            <span>SACRAMENTO DIVISION</span>
          </div>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
