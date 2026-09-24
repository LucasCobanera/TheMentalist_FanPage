/**
 * ============================================================================
 * THE MENTALIST - GUÍA INTERACTIVA DE TEMPORADAS & CONTROL DE SPOILERS
 * ============================================================================
 * Módulo de visualización narrativa y explorador de episodios.
 * 
 * ARQUITECTURA:
 * 1. SEASONS_DATA: Registro central con sinopsis oficiales, arcos narrativos,
 *    año de emisión, recuento de capítulos y resoluciones clave con spoilers.
 * 2. Header Reactivo: updateSeasonHeader adapta la portada del héroe dinámicamente
 *    según la temporada seleccionada.
 * 3. Renderizado y Filtros: renderSeasons e initSeasonPills permiten navegar
 *    entre temporadas individuales o la vista panorámica completa.
 * 4. Control Global de Spoilers: toggleSpoilers sincroniza interruptores de UI
 *    y revela/oculta las resoluciones clave de los episodios.
 * 5. Modal de Expediente Oficial: openSeasonSynopsisModal despliega la sinopsis
 *    completa desclasificada de cada temporada con bloqueo de scroll y soporte ESC.
 * ============================================================================
 */

const SEASONS_DATA = [
  {
    season: 1,
    year: '2008 - 2009',
    episodesCount: 23,
    arc: 'La llegada del Consultor & Los Primeros Pasos tras Red John',
    synopsis: 'Tras el asesinato despiadado de su esposa Angela y su pequeña hija Charlotte a manos del elusivo asesino en serie Red John —un brutal castigo por haberse jactado de fingidos poderes psíquicos en la televisión nacional—, Patrick Jane renuncia para siempre a su farsa de adivino mediático. Buscando redención y guiado por una inquebrantable sed de venganza, se integra formalmente como asesor civil especial de la Unidad de Crímenes Mayores del CBI en Sacramento, bajo la rigurosa pero comprensiva supervisión de la agente especial Teresa Lisbon. Valiéndose de una prodigiosa capacidad de observación, lectura en frío, hipnosis informal y prestidigitación, Jane desconcierta tanto a los criminales como a sus leales compañeros (Kimball Cho, Wayne Rigsby y Grace Van Pelt). Aunque resuelve homicidios en apariencia imposibles mediante trampas teatrales, su verdadero y único motor vital es encontrar cualquier cabo suelto que lo lleve a mirar a los ojos al monstruo que destruyó su existencia.',
    episodes: [
      {
        num: '1x01',
        title: 'Pilot (Piloto)',
        plot: 'Jane y el equipo investigan el asesinato de la esposa y el médico de un golfista profesional en Palm Springs.',
        spoiler: 'Jane descubre al verdadero asesino manipulando a la suegra con un engaño magistral frente al propio equipo.'
      },
      {
        num: '1x11',
        title: 'Red John\'s Friends',
        plot: 'Un convicto que afirma tener información directa sobre Red John convence a Jane de ayudarlo a demostrar su inocencia.',
        spoiler: 'El informante es envenenado con cianuro en prisión minutos antes de revelar el nombre a Jane.'
      },
      {
        num: '1x23',
        title: 'Red John\'s Footsteps',
        plot: 'El equipo encuentra el cuerpo de una joven cerca de la escena de un crimen atribuido a Red John.',
        spoiler: 'Red John interviene directamente secuestrando a la amiga de Jane; Jane mata a la cómplice del asesino en un tiroteo.'
      }
    ]
  },
  {
    season: 2,
    year: '2009 - 2010',
    episodesCount: 23,
    arc: 'La Amenaza de Bosco & El Rescate en las Sombras',
    synopsis: 'La obsesión por Red John sacude las estructuras del poder policial cuando la jefatura del CBI decide transferir oficialmente el caso a la brigada del agente especial Sam Bosco, quien siente un profundo desprecio por las excentricidades y métodos no reglamentarios de Jane. Lejos de rendirse, Patrick instala micrófonos ilegales en el despacho de Bosco para no perder el rastro, desatando una fricción profesional que termina en tragedia absoluta: infiltrados de Red John asaltan el cuartel general y masacran a sangre fría al equipo de Bosco para recordarle a Jane quién tiene el control. En paralelo, la brigada cruza caminos con Visualize, la poderosa y enigmática secta dirigida por el carismático manipulador Brett Stiles. La temporada alcanza un clímax memorable cuando Patrick es secuestrado por unos jóvenes imitadores de Red John; es el propio Red John en persona quien aparece en las sombras, rescata a Jane asesinándolos y le susurra al oído los escalofriantes primeros versos de "The Tyger" de William Blake.',
    episodes: [
      {
        num: '2x08',
        title: 'His Red Right Hand',
        plot: 'El equipo de Sam Bosco es emboscado y masacrado dentro del propio cuartel general del CBI.',
        spoiler: 'Una secretaria infiltrada por Red John ejecuta a los agentes para devolverle el caso a Jane.'
      },
      {
        num: '2x23',
        title: 'Red Sky in the Morning',
        plot: 'Un imitador de Red John comete asesinatos atroces, atrayendo tanto a Jane como al verdadero Red John.',
        spoiler: 'Red John salva a Patrick de ser asesinado por unos estudiantes imitadores y le susurra el poema "Tyger, Tyger" al oído.'
      }
    ]
  },
  {
    season: 3,
    year: '2010 - 2011',
    episodesCount: 24,
    arc: 'La Conspiración Interna & El Clímax del Centro Comercial',
    synopsis: 'Una sofocante atmósfera de sospecha corroe al CBI cuando Jane y Lisbon comprueban que Red John dispone de una red de topos de altísimo nivel incrustados en las fuerzas del orden. El asesinato bajo custodia federal del homicida Todd Johnson conduce a una trampa que incrimina injustamente a la estricta directora Madeleine Hightower, forzando a Jane a organizar su fuga clandestina en el maletero de su vehículo y mantenerla oculta. Con el tiempo en su contra y la investigación en el filo de la navaja, Jane concibe un sofisticado gambito matemático con falsos datos de ubicación para descubrir cuál de los cuatro altos mandos (incluyendo al director Bertram y al prometido de Van Pelt, Craig O\'Laughlin) es el espía traidor. El memorable desenlace en un bullicioso centro comercial de Sacramento concluye con una de las escenas más icónicas de la televisión: Patrick Jane acorrala a un hombre (Timothy Carter) que afirma ser Red John y le dispara tres veces a quemarropa, sentándose en calma a esperar su arresto mientras bebe su taza de té.',
    episodes: [
      {
        num: '3x16',
        title: 'Red Queen',
        plot: 'Madeleine Hightower es inculpada del homicidio de Todd Johnson para encubrir la identidad del topo.',
        spoiler: 'Jane organiza una brillante fuga falsa de Hightower en el maletero de su coche para mantenerla a salvo.'
      },
      {
        num: '3x23 / 3x24',
        title: 'Strawberries and Cream',
        plot: 'Jane tiende una trampa matemática para desenmascarar al infiltrado de Red John entre cuatro altos sospechosos.',
        spoiler: 'Craig O\'Laughlin (prometido de Van Pelt) es el traidor. En el centro comercial, Jane dispara a sangre fría a Timothy Carter tras afirmar ser Red John.'
      }
    ]
  },
  {
    season: 4,
    year: '2011 - 2012',
    episodesCount: 24,
    arc: 'El Juicio de Jane & La Falsa Caída',
    synopsis: 'Recluido en prisión preventiva y acusado de homicidio en primer grado, Patrick Jane prescinde de abogados defensores y asume su propia representación judicial, utilizando su arrolladora elocuencia psicológica para manipular al jurado popular y lograr un veredicto de legítima defensa. Sin embargo, la aparente victoria se desmorona en amargura al descubrirse que Carter era tan solo un sádico secuestrador actuando como señuelo descartable: el auténtico Red John continúa libre y triunfante. Bajo la supervisión del joven y ambicioso nuevo jefe del CBI, Luther Wainwright, Jane se interna en un descenso a los infiernos fingido: simula un colapso mental absoluto, se desvincula públicamente de Lisbon y pasa seis meses jugando compulsivamente en casinos de Las Vegas. Todo forma parte de una arriesgada celada para convencer a Red John de su total desmoronamiento moral, logrando la captura viva de su enigmática amante y secuaz, Lorelei Martins.',
    episodes: [
      {
        num: '4x01',
        title: 'Scarlet Ribbons',
        plot: 'Jane en prisión defiende su propio caso ante un jurado popular sin abogado.',
        spoiler: 'Jane manipula psicológicamente al jurado y sale absuelto por legítima defensa.'
      },
      {
        num: '4x24',
        title: 'The Crimson Hat',
        plot: 'Tras seis meses de depresión fingida en Las Vegas, Jane atrae a Red John ofreciéndole la cabeza de Teresa Lisbon.',
        spoiler: 'Todo es una trampa orquestada por Jane y Lisbon; Lorelei Martins es capturada con vida.'
      }
    ]
  },
  {
    season: 5,
    year: '2012 - 2013',
    episodesCount: 22,
    arc: 'Los Siete Sospechosos & La Predicción de Lorelei',
    synopsis: 'Un desliz verbal de Lorelei Martins cambia radicalmente las reglas del juego: "Es sorprendente que ustedes dos no se hicieran amigos de inmediato tras estrecharse la mano". Esta certeza confirma que Patrick ya ha conocido en persona y cara a cara a su mayor enemigo. Decidido a no fallar, Jane se atrinchera en el ático de la sede del CBI y despliega su portentoso palacio de la memoria, repasando metódicamente a los 2.164 individuos con los que interactuó desde la muerte de Angela y Charlotte hasta destilar una lista irreductible de siete sospechosos. La tensión aumenta frente a las intromisiones de Seguridad Nacional encarnadas por Bob Kirkland y las maquinaciones de Visualize. La temporada culmina con un desafío de inteligencia sin igual: justo cuando Jane comparte con Lisbon los nombres de los siete hombres, recibe un disco póstumo donde Red John, anticipándose con meses de antelación, recita exactamente esos mismos siete nombres, retando a Jane a atraparlo mientras jura volver a derramar sangre.',
    episodes: [
      {
        num: '5x08',
        title: 'Red Sails in the Sunset',
        plot: 'Jane ayuda a Lorelei Martins a escapar de prisión federal para descubrir quién mató a su hermana.',
        spoiler: 'Lorelei confiesa que Red John y Patrick se conocen en persona y son más parecidos de lo que él cree.'
      },
      {
        num: '5x22',
        title: 'Red John\'s Rules',
        plot: 'Jane reúne a Lisbon para revelarle su lista secreta definitiva de siete sospechosos.',
        spoiler: 'Red John envía un vídeo grabado con meses de antelación donde nombra exactamente a los mismos siete sospechosos.'
      }
    ]
  },
  {
    season: 6,
    year: '2013 - 2014',
    episodesCount: 22,
    arc: 'La Caída Definitiva de Red John & El Renacer en el FBI',
    synopsis: 'La temporada más trascendental y definitoria de la serie. La investigación sobre los siete sospechosos destapa la existencia de la temible Asociación Blake: un sindicato clandestino institucionalizado de policías corruptos, fiscales y agentes del orden identificados por el verso "Tyger, Tyger" y un tatuaje de tres puntos en el hombro. Jane convoca a los supervivientes a su antigua mansión de Malibú armado con una escopeta, desencadenando una colosal detonación que conmociona a California. Tras una persecución implacable, Jane se encuentra en la capilla del cementerio con el verdadero cerebro: el sheriff Thomas McAllister. Tras una persecución a pie por un parque residencial, Patrick cumple su destino y estrangula a McAllister con sus propias manos. Dos años más tarde, tras un apacible retiro en una isla de Centroamérica, Jane regresa a Estados Unidos reclutado por el agente Dennis Abbott para servir en el FBI en Austin, Texas, sellando la temporada impidiendo el vuelo de Lisbon a Washington para declararle su amor eterno.',
    episodes: [
      {
        num: '6x06',
        title: 'Fire and Brimstone',
        plot: 'Jane convoca a los cinco sospechosos sobrevivientes a su casa en Malibú armado con una escopeta.',
        spoiler: 'Descubre que los miembros de la red policial corrupta llevan un tatuaje de tres puntos en el hombro izquierdo.'
      },
      {
        num: '6x08',
        title: 'Red John (El Desenlace)',
        plot: 'Jane acude a la cita final en la capilla del cementerio con el auténtico Red John.',
        spoiler: 'El sheriff Thomas McAllister es Red John. Jane lo estrangula con sus propias manos en un parque tras una persecución implacable.'
      },
      {
        num: '6x22',
        title: 'Blue Bird',
        plot: 'Jane debe impedir que Lisbon se traslade a Washington con el agente Marcus Pike.',
        spoiler: 'Jane detiene un avión comercial y confiesa su amor verdadero por Teresa Lisbon.'
      }
    ]
  },
  {
    season: 7,
    year: '2014 - 2015',
    episodesCount: 13,
    arc: 'El Capítulo Final: Paz, Justicia & Nuevo Comienzo',
    synopsis: 'Habiendo dejado atrás la oscura losa del dolor y la venganza, Patrick Jane y Teresa Lisbon comienzan una relación sentimental clandestina mientras resuelven crímenes de alta complejidad para la delegación del FBI en Texas, acompañados por el incorruptible Kimball Cho y el veterano Dennis Abbott. El desafío para ambos radica en aprender a trabajar codo a codo en situaciones de riesgo mortal sin que el miedo a perderse mutuamente nuble su juicio profesional. El equipo deberá desmantelar mafias internacionales de tráfico, proteger testigos en fuga y neutralizar la amenaza de Joe Keller ("Lazarus"), un peligroso asesino en serie que secuestra a Jane creyendo en sus antiguos poderes místicos. Concluyendo un viaje de 151 episodios, Jane adquiere una idílica cabaña junto a un lago donde celebra su emotiva boda campestre con Lisbon rodeado de sus seres queridos, recibiendo la luminosa noticia de que van a ser padres.',
    episodes: [
      {
        num: '7x01',
        title: 'Nothing But Blue Skies',
        plot: 'Jane y Lisbon comienzan a trabajar juntos como pareja sin que sus colegas lo sepan.',
        spoiler: 'Superan los fantasmas del pasado y consolidan su confianza mutua.'
      },
      {
        num: '7x12 / 7x13',
        title: 'Brown Shag Carpet & White Orchids',
        plot: 'Jane se ofrece como cebo fingiendo nuevamente ser psíquico en los medios para atrapar al asesino en serie Lazarus.',
        spoiler: 'Lazarus es abatido; Jane y Lisbon celebran su boda campestre ante todos sus amigos y revelan que esperan un hijo.'
      }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderSeasons('all', true);
  updateSeasonHeader('all', true);
  initSeasonPills();
  initStickySeasonControls();
  initNarrativeTimeline();
  initSpoilerToggle();
  initSeasonSynopsisModal();
  handleSeasonDeepLinks();
  window.addEventListener('popstate', handleSeasonDeepLinks);
});

/**
/** @type {number} Token secuencial para evitar condiciones de carrera en el hero header */
let currentHeaderTransitionId = 0;
/** @type {number|null} Referencia al temporizador del crossfade para cancelaciones */
let headerFadeTimeout = null;

/**
 * Actualiza el encabezado visual dinámico mediante un cross-fade real de doble capa,
 * garantizando cero parpadeos, sin pantallas intermedias ni desplazamientos indeseados.
 * @param {string|number} selectedSeason Número de temporada ('1'..'7') o 'all'
 * @param {boolean} [immediate=false] Si es true, omite la animación (usado en carga inicial)
 */
function updateSeasonHeader(selectedSeason, immediate = false) {
  const headerImg = document.getElementById('seasonHeaderImg');
  let headerImgFade = document.getElementById('seasonHeaderImgFade');
  const headerBadge = document.getElementById('seasonHeaderBadge');
  const headerTitle = document.getElementById('seasonHeaderTitle');
  const headerTitles = document.getElementById('seasonHeaderTitles');
  const headerDesc = document.getElementById('seasonHeaderDesc');

  if (headerDesc) headerDesc.remove();
  if (!headerTitle || !headerImg) return;

  // Fallback si no existe la capa de fundido en el HTML
  if (!headerImgFade && headerImg.parentElement) {
    headerImgFade = document.createElement('img');
    headerImgFade.id = 'seasonHeaderImgFade';
    headerImgFade.className = 'season-header-img-fade';
    headerImgFade.setAttribute('aria-hidden', 'true');
    headerImg.parentElement.appendChild(headerImgFade);
  }

  let targetSrc = '';
  let targetBadge = '';
  let targetTitle = '';

  if (selectedSeason === 'all') {
    targetSrc = 'img/Seasons/temporadas.jpg';
    targetBadge = '151 EPISODIOS';
    targetTitle = 'Temporadas';
  } else {
    const s = SEASONS_DATA.find(item => item.season.toString() === selectedSeason.toString());
    if (!s) return;

    targetSrc = `img/Seasons/S${s.season}.jpg`;
    targetBadge = `${s.episodesCount} EPISODIOS`;
    targetTitle = `T${s.season}: "${s.arc}"`;
  }

  // Evitar re-ejecución si ya está mostrando la misma temporada
  if (headerImg.getAttribute('data-current-season') === selectedSeason.toString()) {
    return;
  }

  const transitionId = ++currentHeaderTransitionId;
  if (headerFadeTimeout) {
    clearTimeout(headerFadeTimeout);
    headerFadeTimeout = null;
  }

  // Si es la carga inicial o forzado sin animación
  if (immediate) {
    headerImg.src = targetSrc;
    headerImg.setAttribute('data-current-season', selectedSeason.toString());
    if (headerBadge) headerBadge.textContent = targetBadge;
    headerTitle.textContent = targetTitle;
    if (headerImgFade) {
      headerImgFade.classList.remove('is-active');
      headerImgFade.src = '';
    }
    return;
  }

  // 1. Transición suave del bloque de títulos (los botones de temporadas nunca se mueven ni parpadean)
  if (headerTitles) {
    headerTitles.classList.add('is-fading');
    setTimeout(() => {
      if (transitionId !== currentHeaderTransitionId) return;
      if (headerBadge) headerBadge.textContent = targetBadge;
      headerTitle.textContent = targetTitle;
      headerTitles.classList.remove('is-fading');
    }, 110);
  } else {
    if (headerBadge) headerBadge.textContent = targetBadge;
    headerTitle.textContent = targetTitle;
  }

  // 2. Transición suave de foto (Crossfade real de doble capa sin saltos)
  headerImg.setAttribute('data-current-season', selectedSeason.toString());

  if (!headerImgFade) {
    headerImg.src = targetSrc;
    return;
  }

  const activateCrossfade = () => {
    if (transitionId !== currentHeaderTransitionId) return;

    // Activar fundido en la capa superior
    headerImgFade.classList.add('is-active');

    // Al finalizar la animación del crossfade (380ms), transferir a la capa base
    headerFadeTimeout = setTimeout(() => {
      if (transitionId !== currentHeaderTransitionId) return;
      headerImg.src = targetSrc;
      headerImgFade.style.transition = 'none';
      headerImgFade.classList.remove('is-active');
      void headerImgFade.offsetHeight; // forzar reflujo
      headerImgFade.style.transition = '';
    }, 380);
  };

  headerImgFade.onload = () => {
    activateCrossfade();
  };

  headerImgFade.onerror = () => {
    if (transitionId !== currentHeaderTransitionId) return;
    headerImg.src = targetSrc;
    headerImgFade.classList.remove('is-active');
  };

  headerImgFade.src = targetSrc;

  // Si la imagen ya estaba en caché y lista en el navegador
  if (headerImgFade.complete && headerImgFade.naturalWidth > 0) {
    activateCrossfade();
  }
}

/** @type {boolean} Estado global de visibilidad de spoilers */
let isSpoilersRevealed = false;

/**
 * Conmuta o establece la visibilidad de los spoilers en todas las tarjetas de episodios
 * y sincroniza el estado de los interruptores de la interfaz.
 * @param {boolean} [forceState] Si se proporciona, fuerza un estado booleano específico
 */
function toggleSpoilers(forceState) {
  const container = document.getElementById('seasonsContainer');
  if (!container) return;

  isSpoilersRevealed = typeof forceState === 'boolean' ? forceState : !isSpoilersRevealed;

  if (isSpoilersRevealed) {
    container.classList.add('spoilers-revealed');
  } else {
    container.classList.remove('spoilers-revealed');
  }

  const buttons = document.querySelectorAll('.btn-spoiler-toggle');
  buttons.forEach(btn => {
    btn.classList.toggle('active', isSpoilersRevealed);
    btn.setAttribute('aria-pressed', isSpoilersRevealed.toString());
    const label = btn.querySelector('.spoiler-btn-label');
    if (label) {
      label.textContent = isSpoilersRevealed ? 'Ocultar spoilers' : 'Mostrar spoilers';
    }
  });

  const headerCheckbox = document.getElementById('spoilerToggle');
  if (headerCheckbox && headerCheckbox.checked !== isSpoilersRevealed) {
    headerCheckbox.checked = isSpoilersRevealed;
  }
}

/** @type {number} Token secuencial para evitar condiciones de carrera en el renderizado */
let currentRenderTransitionId = 0;
/** @type {number|null} Referencia al temporizador de renderizado para cancelaciones */
let renderSwitchTimeout = null;

/**
 * Renderiza dinámicamente los bloques de temporadas, sinopsis condensadas con botón
 * de expansión y la cuadrícula de episodios clave, con transición suave de cambio.
 * @param {string|number} selectedSeason Temporada a filtrar ('all' o '1'..'7')
 * @param {boolean} [immediate=false] Si es true, renderiza sin retraso de transición
 */
function renderSeasons(selectedSeason, immediate = false) {
  const container = document.getElementById('seasonsContainer');
  if (!container) return;

  const renderId = ++currentRenderTransitionId;
  if (renderSwitchTimeout) {
    clearTimeout(renderSwitchTimeout);
    renderSwitchTimeout = null;
  }

  const list = selectedSeason === 'all'
    ? SEASONS_DATA
    : SEASONS_DATA.filter(s => s.season.toString() === selectedSeason.toString());

  const applySeasonHTML = () => {
    if (renderId !== currentRenderTransitionId) return;

    if (isSpoilersRevealed) {
      container.classList.add('spoilers-revealed');
    } else {
      container.classList.remove('spoilers-revealed');
    }

    container.innerHTML = list.map((s, idx) => {
      const isLong = s.synopsis && s.synopsis.length > 140;
      const excerpt = isLong ? s.synopsis.substring(0, 137).trim() + '...' : s.synopsis;
      const delay = Math.min(idx * 0.04, 0.2);

      return `
      <section class="season-block season-block-${s.season}" id="season-${s.season}" style="animation-delay: ${delay}s;">
        <div class="season-header-row">
          <div class="season-info">
            <span class="badge badge-gold">TEMPORADA ${s.season}</span>
            <h3 style="margin-top: 0.5rem;">${s.arc}</h3>
            <div class="season-meta-tags">
              <span class="badge badge-cbi">📅 ${s.year}</span>
              <span class="badge badge-cbi">🎬 ${s.episodesCount} Episodios</span>
            </div>
          </div>
        </div>

        <div class="season-synopsis-box">
          <p class="season-synopsis">${excerpt}</p>
          ${isLong ? `
            <button type="button" class="btn-read-more-season" data-season="${s.season}" aria-label="Leer sinopsis completa de la Temporada ${s.season}">
              <i class="fa-solid fa-book-open" style="font-size: 0.75rem;"></i>
              <span>Leer sinopsis completa</span>
              <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
            </button>
          ` : ''}
        </div>

        <div class="episodes-header-bar">
          <h4 class="episodes-section-title">
            Episodios Clave & Momentos Cumbre:
          </h4>
          <button type="button" class="btn-spoiler-toggle ${isSpoilersRevealed ? 'active' : ''}" aria-pressed="${isSpoilersRevealed}" title="Mostrar u ocultar resoluciones y spoilers">
            <span class="toggle-switch-ui">
              <span class="slider-ui"></span>
            </span>
            <span class="spoiler-btn-label">${isSpoilersRevealed ? 'Ocultar spoilers' : 'Mostrar spoilers'}</span>
          </button>
        </div>

        <div class="episodes-grid">
          ${s.episodes.map(ep => `
            <div class="episode-card">
              <div class="episode-num">${ep.num}</div>
              <h5 class="episode-title">${ep.title}</h5>
              <p class="episode-plot">${ep.plot}</p>
              <div style="margin-top: 0.75rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.5rem;">
                <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--crimson-bright); font-weight: 700; letter-spacing: 0.05em;">Resolución Clave:</span>
                <p class="episode-plot spoiler-content" style="margin-top: 0.25rem;">${ep.spoiler}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    }).join('');

    attachSynopsisModalListeners();

    requestAnimationFrame(() => {
      container.classList.remove('is-switching');
    });
  };

  if (immediate || !container.classList.contains('has-rendered')) {
    container.classList.add('has-rendered');
    applySeasonHTML();
  } else {
    container.classList.add('is-switching');
    renderSwitchTimeout = setTimeout(applySeasonHTML, 100);
  }
}

/**
 * Despliega el modal con la sinopsis desclasificada completa de la temporada.
 * Bloquea el desplazamiento del body para una lectura inmersiva.
 * @param {string|number} seasonNum Número de temporada a abrir
 */
function openSeasonSynopsisModal(seasonNum) {
  const modal = document.getElementById('seasonSynopsisModal');
  const body = document.getElementById('seasonSynopsisModalBody');
  if (!modal || !body) return;

  const s = SEASONS_DATA.find(item => item.season.toString() === seasonNum.toString());
  if (!s) return;

  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.25rem;">
      <span class="badge badge-gold" style="font-size: 0.78rem; letter-spacing: 0.1em;">EXPEDIENTE OFICIAL CBI</span>
      <h3 style="font-family: var(--font-display, serif); font-size: 1.45rem; color: var(--cream-pure); margin-top: 0.6rem; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1.25;">
        Temporada ${s.season}: "${s.arc}"
      </h3>
      <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 0.65rem; flex-wrap: wrap;">
        <span class="badge badge-cbi">📅 ${s.year}</span>
        <span class="badge badge-cbi">🎬 ${s.episodesCount} Episodios</span>
      </div>
    </div>

    <div style="background: rgba(10, 12, 16, 0.6); border: 1px solid rgba(212, 180, 131, 0.25); border-left: 3px solid #d4b483; border-radius: 6px; padding: 1.25rem 1.4rem; margin-bottom: 1.5rem; line-height: 1.8; color: #dcd8d0; font-size: 0.94rem; text-align: left;">
      ${s.synopsis}
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button type="button" class="btn btn-outline" id="closeSeasonSynopsisInnerBtn" style="padding: 0.5rem 1.35rem; font-size: 0.85rem; border-color: rgba(212, 180, 131, 0.4); color: #ecdcc2;">
        Cerrar Expediente
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const innerClose = document.getElementById('closeSeasonSynopsisInnerBtn');
  if (innerClose) {
    innerClose.addEventListener('click', closeSeasonSynopsisModal);
  }
}

/**
 * Cierra el modal del expediente de sinopsis y restablece el scroll del body.
 */
function closeSeasonSynopsisModal() {
  const modal = document.getElementById('seasonSynopsisModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Enlaza el evento click a todos los botones "Leer sinopsis completa".
 */
function attachSynopsisModalListeners() {
  const buttons = document.querySelectorAll('.btn-read-more-season');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const season = btn.getAttribute('data-season');
      openSeasonSynopsisModal(season);
    });
  });
}

/**
 * Inicializa los controladores de cierre del modal de sinopsis
 * (botón de cierre, clic en el fondo translúcido y tecla ESC).
 */
function initSeasonSynopsisModal() {
  const modal = document.getElementById('seasonSynopsisModal');
  const closeBtn = document.getElementById('closeSeasonSynopsisBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSeasonSynopsisModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSeasonSynopsisModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeSeasonSynopsisModal();
    }
  });
}

/**
 * Inicializa las pestañas tipo píldora para filtrar temporadas de forma reactiva.
 */
function initSeasonPills() {
  const pills = document.querySelectorAll('.season-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-season');
      renderSeasons(val);
      updateSeasonHeader(val);

      // Sincronizar estado activo en la cronología narrativa
      const timelineNodes = document.querySelectorAll('.timeline-milestone-node');
      timelineNodes.forEach(node => {
        const nodeSeason = node.getAttribute('data-season');
        if (val === 'all') {
          node.classList.toggle('active', nodeSeason === '1');
        } else {
          node.classList.toggle('active', nodeSeason === val);
        }
      });
    });
  });
}

/**
 * Detecta cuando la barra de controles de temporadas queda fijada en el viewport
 * y aplica la clase .is-stuck para intensificar el desenfoque y efecto glassmorphism.
 */
function initStickySeasonControls() {
  const bar = document.getElementById('seasonsStickyBar');
  if (!bar) return;

  let ticking = false;
  const checkSticky = () => {
    const rect = bar.getBoundingClientRect();
    // 68px a 72px corresponde a la altura de .site-header
    if (rect.top <= 74) {
      bar.classList.add('is-stuck');
    } else {
      bar.classList.remove('is-stuck');
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

/**
 * Inicializa los controladores interactivos de la cronología narrativa "El Camino de la Venganza".
 * Al pulsar en un hito, activa la temporada correspondiente, actualiza el encabezado
 * y realiza un desplazamiento suave hacia el contenido del expediente.
 */
function initNarrativeTimeline() {
  const timelineNodes = document.querySelectorAll('.timeline-milestone-node');
  if (timelineNodes.length === 0) return;

  timelineNodes.forEach(node => {
    const handleMilestoneSelect = () => {
      const seasonNum = node.getAttribute('data-season');
      if (!seasonNum) return;

      // Actualizar nodos de la cronología
      timelineNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Sincronizar con las píldoras de temporadas
      const targetPill = document.querySelector(`.season-pill[data-season="${seasonNum}"]`);
      if (targetPill) {
        targetPill.click();
      } else {
        renderSeasons(seasonNum);
        updateSeasonHeader(seasonNum);
      }

      // Scroll suave hacia el contenedor de temporadas
      const container = document.getElementById('seasonsContainer');
      if (container) {
        const offset = container.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    };

    node.addEventListener('click', handleMilestoneSelect);
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMilestoneSelect();
      }
    });
  });
}

/**
 * Inicializa la delegación de eventos para los botones e interruptores de spoilers.
 */
function initSpoilerToggle() {
  const container = document.getElementById('seasonsContainer');
  if (container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-spoiler-toggle');
      if (btn) {
        e.preventDefault();
        toggleSpoilers();
      }
    });
  }

  const checkbox = document.getElementById('spoilerToggle');
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      toggleSpoilers(checkbox.checked);
    });
  }
}

/**
 * Procesa parámetros de la URL para deep-linking de temporadas:
 * - ?season=1..7 o ?season=all o hash #season-3:
 *   Activa la píldora correspondiente, actualiza el banner y hace scroll suave a la temporada.
 */
function handleSeasonDeepLinks() {
  const urlParams = new URLSearchParams(window.location.search);
  let seasonParam = urlParams.get('season');

  if (!seasonParam && window.location.hash) {
    const match = window.location.hash.match(/season-(\d+|all)/i);
    if (match) seasonParam = match[1];
  }

  if (seasonParam) {
    const pill = document.querySelector(`.season-pill[data-season="${seasonParam}"]`);
    if (pill) {
      pill.click();
    } else if (seasonParam === 'all') {
      const allPill = document.querySelector('.season-pill[data-season="all"]');
      if (allPill) allPill.click();
    }

    if (seasonParam !== 'all') {
      setTimeout(() => {
        const block = document.getElementById(`season-${seasonParam}`);
        if (block) {
          block.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }
}

// Delegación de clics directos para enlaces de temporadas cuando ya se está en temporadas.html
document.addEventListener('click', (e) => {
  const seasonLink = e.target.closest('a[href*="season="]');
  if (seasonLink && (window.location.pathname.endsWith('temporadas.html') || window.location.pathname.endsWith('temporadas'))) {
    try {
      const url = new URL(seasonLink.href, window.location.href);
      const season = url.searchParams.get('season');
      if (season) {
        e.preventDefault();
        history.pushState(null, '', `temporadas.html?season=${season}`);
        handleSeasonDeepLinks();
      }
    } catch (err) {}
  }
});


