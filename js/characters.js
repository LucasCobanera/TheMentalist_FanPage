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

document.addEventListener('DOMContentLoaded', () => {
  renderCharacters('all');
  initFilterTabs();
  initCharacterModal();
});

function renderCharacters(filterCategory) {
  const grid = document.getElementById('charactersGrid');
  if (!grid) return;

  const filtered = filterCategory === 'all'
    ? CHARACTERS_DATA
    : CHARACTERS_DATA.filter(c => c.category === filterCategory);

  grid.innerHTML = filtered.map(c => {
    const hasImage = c.imageSrc && c.imageSrc.trim() !== '';
    return `
    <article class="dossier-card ${c.category === 'nemesis' ? 'nemesis-card' : ''}" data-id="${c.id}">
      <div class="dossier-photo-wrap">
        ${hasImage
        ? `<img src="${c.imageSrc}" alt="${c.imageAlt}" loading="lazy">`
        : `<div class="image-slot" id="${c.imageSlotId}" style="height: 100%; border: none;">
              <div class="placeholder-hint">
                <span class="badge-tag">Espacio para Foto</span>
                <p>📁 ${c.name}</p>
                <p style="font-size:0.7rem; opacity:0.7; margin-top:4px;">Arrastra o vincula tu imagen aquí</p>
              </div>
            </div>`
      }
        <div class="dossier-stamp ${c.stampClass}">${c.stamp}</div>
      </div>

      <div class="dossier-body">
        <div class="dossier-header">
          <span class="badge ${c.category === 'nemesis' ? 'badge-crimson' : 'badge-green'}">${c.badge}</span>
          <h3 class="dossier-name" style="margin-top: 0.6rem;">${c.name}</h3>
          <span class="dossier-role">${c.role}</span>
          <p style="font-size: 0.8rem; color: var(--cream-muted); margin-top: 2px;">Interpretado por: <strong>${c.actor}</strong></p>
        </div>

        <p class="dossier-desc">${c.description}</p>

        <div class="dossier-skills">
          ${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>

        <div class="dossier-footer">
          <button class="btn btn-sm btn-outline view-dossier-btn" data-id="${c.id}">
            <span>Ver Expediente Completo</span>
            <span>➔</span>
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
}

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

function openCharacterModal(characterId) {
  const char = CHARACTERS_DATA.find(c => c.id === characterId);
  const modalOverlay = document.getElementById('characterModal');
  const modalBody = document.getElementById('modalDetailsBody');
  if (!char || !modalOverlay || !modalBody) return;

  const hasImage = char.imageSrc && char.imageSrc.trim() !== '';

  modalBody.innerHTML = `
    <div style="padding: 2rem;">
      <div style="display:flex; gap: 1.5rem; align-items: flex-start; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
        ${hasImage ? `
          <div style="width: 110px; height: 145px; border-radius: 4px; overflow: hidden; border: 2px solid var(--green-border); flex-shrink: 0;">
            <img src="${char.imageSrc}" alt="${char.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        ` : ''}
        <div>
          <span class="badge ${char.category === 'nemesis' ? 'badge-crimson' : 'badge-green'}">${char.badge}</span>
          <h2 style="font-size: 1.85rem; margin-top: 0.5rem; color: var(--cream-pure);">${char.name}</h2>
          <p style="color: var(--green-bright); font-family: var(--font-typewriter); font-size: 0.85rem;">Actor: ${char.actor} | CBI ARCHIVE</p>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 0.35rem;">${char.role}</p>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem; background: rgba(46, 116, 80, 0.18); border-left: 3px solid var(--green-bright); padding: 1rem 1.25rem; border-radius: 0 4px 4px 0;">
        <p style="font-style: italic; color: var(--cream-pure);">"${char.quote}"</p>
      </div>

      <h4 style="color: var(--green-bright); font-size: 0.95rem; margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em;">Perfil Psicológico e Historial</h4>
      <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem; margin-bottom: 1.75rem;">${char.fullBio}</p>

      <h4 style="color: var(--green-bright); font-size: 0.95rem; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Métricas de Comportamiento</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.85rem; margin-bottom: 1.5rem;">
        ${Object.entries(char.stats).map(([statName, val]) => `
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; text-transform: capitalize; color: var(--text-muted); display: block;">${statName}</span>
            <strong style="font-size: 1.25rem; color: var(--green-bright); font-family: var(--font-display);">${val}</strong>
          </div>
        `).join('')}
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem; display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-typewriter);">
        <span>CONFIDENCIAL - ESTADO DE CALIFORNIA</span>
        <span>REGISTRO: OK-2008-CBI</span>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
