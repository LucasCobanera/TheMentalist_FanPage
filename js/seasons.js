/**
 * THE MENTALIST - Guía Interactiva de Temporadas & Control de Spoilers
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
  renderSeasons('all');
  updateSeasonHeader('all');
  initSeasonPills();
  initSpoilerToggle();
});

function updateSeasonHeader(selectedSeason) {
  const headerBg = document.getElementById('seasonHeaderBg');
  const headerBadge = document.getElementById('seasonHeaderBadge');
  const headerTitle = document.getElementById('seasonHeaderTitle');
  const headerDesc = document.getElementById('seasonHeaderDesc');

  if (!headerTitle) return;

  if (selectedSeason === 'all') {
    if (headerBadge) headerBadge.textContent = '151 EPISODIOS | CBS (2008 - 2015)';
    headerTitle.innerHTML = 'Cronología de <span style="color: var(--green-bright);">Temporadas</span>';
    if (headerDesc) {
      headerDesc.textContent = 'Sigue la trayectoria completa de Patrick Jane: desde su llegada al CBI, pasando por la confrontación directa contra Red John, hasta su desenlace en el FBI de Austin, Texas.';
    }
    if (headerBg) {
      headerBg.style.opacity = '0.35';
      setTimeout(() => {
        headerBg.style.backgroundImage = "url('img/Seasons/temporadas.jpg')";
        headerBg.style.opacity = '1';
      }, 150);
    }
  } else {
    const s = SEASONS_DATA.find(item => item.season.toString() === selectedSeason.toString());
    if (!s) return;

    if (headerBadge) headerBadge.textContent = `TEMPORADA ${s.season} | ${s.year} • ${s.episodesCount} EPISODIOS`;
    headerTitle.innerHTML = `Temporada ${s.season}: <span style="color: var(--green-bright);">${s.arc}</span>`;
    if (headerDesc) {
      headerDesc.textContent = s.synopsis;
    }
    if (headerBg) {
      headerBg.style.opacity = '0.35';
      setTimeout(() => {
        headerBg.style.backgroundImage = `url('img/Seasons/S${s.season}.jpg')`;
        headerBg.style.opacity = '1';
      }, 150);
    }
  }
}

function renderSeasons(selectedSeason) {
  const container = document.getElementById('seasonsContainer');
  if (!container) return;

  const list = selectedSeason === 'all'
    ? SEASONS_DATA
    : SEASONS_DATA.filter(s => s.season.toString() === selectedSeason.toString());

  container.innerHTML = list.map(s => `
    <section class="season-block season-block-${s.season}" id="season-${s.season}">
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

      <p class="season-synopsis">${s.synopsis}</p>

      <h4 style="font-size: 1.1rem; color: var(--amber-light); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em;">
        Episodios Clave & Momentos Cumbre:
      </h4>

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
  `).join('');
}

function initSeasonPills() {
  const pills = document.querySelectorAll('.season-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-season');
      renderSeasons(val);
      updateSeasonHeader(val);
    });
  });
}

function initSpoilerToggle() {
  const checkbox = document.getElementById('spoilerToggle');
  const container = document.getElementById('seasonsContainer');
  if (!checkbox || !container) return;

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      container.classList.add('spoilers-revealed');
    } else {
      container.classList.remove('spoilers-revealed');
    }
  });
}
