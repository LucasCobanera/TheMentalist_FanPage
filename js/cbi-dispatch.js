/**
 * CBI DISPATCH & MEJORES MOMENTOS - THE MENTALIST FANPAGE
 * Formulario Oficial con Sello CBI y Módulo de Momentos de la Comunidad
 */

(function () {
  'use strict';

  // Claves de Almacenamiento Local
  const STORAGE_KEYS = {
    MOMENTS: 'the_mentalist_moments_v1',
    LIKES: 'the_mentalist_moments_likes_v1',
    SUBMISSIONS: 'the_mentalist_cbi_submissions'
  };

  // Imagen por temporada por defecto
  const SEASON_IMAGES = {
    1: 'img/sillon&tea.jpg',
    2: 'img/linterna-smiley-web.jpg',
    3: 'img/Seasons/S3.jpg',
    4: 'img/citroenDS.jpg',
    5: 'img/sospechosos.jpg',
    6: 'img/Seasons/S6.jpg',
    7: 'img/jane&lisbon.jpeg'
  };

  // Momentos icónicos precargados (T1 a T7)
  const DEFAULT_MOMENTS = [
    {
      id: 'moment-s1-pilot',
      season: 1,
      episode: '1x01 - Pilot',
      title: 'El té en Palm Springs y la farsa de las cenizas',
      description: 'Patrick Jane prepara tranquilamente una taza de té en la cocina de los deudos y luego finge tener las cenizas de la víctima para quebrar la coartada del culpable en cuestión de minutos.',
      author: 'Teresa Lisbon Fan',
      image: 'img/sillon&tea.jpg',
      votes: 48
    },
    {
      id: 'moment-s2-tyger',
      season: 2,
      episode: '2x23 - Red Sky in the Morning',
      title: 'El recitado de «Tyger, Tyger» cara a cara',
      description: 'Red John salva a Patrick de unos imitadores en un cine abandonado. Al amparo de las sombras, le susurra al oído los primeros versos de William Blake antes de esfumarse para siempre.',
      author: 'CBI_SpecialAgent',
      image: 'img/linterna-smiley-web.jpg',
      votes: 94
    },
    {
      id: 'moment-s3-strawberries',
      season: 3,
      episode: '3x23 - Strawberries and Cream',
      title: 'El duelo helado en el patio de comidas',
      description: 'Jane encara a Timothy Carter en una cafetería. Tras exigirle detalles íntimos sobre el olor del champú de su hija y confirmar su frialdad, Jane dispara y se sienta en paz a beber su té.',
      author: 'SimonBaker_Fan',
      image: 'img/Seasons/S3.jpg',
      votes: 120
    },
    {
      id: 'moment-s4-crimson',
      season: 4,
      episode: '4x24 - The Crimson Hat',
      title: 'El falso colapso en Las Vegas y la trampa a Lorelei',
      description: 'Jane finge durante meses un quiebre emocional absoluto en Nevada para ganarse la devoción de Lorelei Martins y tenderle una encerrona de alta inteligencia a Red John.',
      author: 'Wayne_Rigsby',
      image: 'img/citroenDS.jpg',
      votes: 71
    },
    {
      id: 'moment-s5-rules',
      season: 5,
      episode: '5x22 - Red John\'s Rules',
      title: 'La lista de los 7 sospechosos y el video póstumo',
      description: 'Jane reduce la cacería de su vida a 7 sospechosos precisos, sólo para quedar estupefacto al reproducir el disco de Lorelei: Red John había adivinado su lista completa semanas antes.',
      author: 'Mentalist_Forensics',
      image: 'img/sospechosos.jpg',
      votes: 105
    },
    {
      id: 'moment-s6-redjohn',
      season: 6,
      episode: '6x08 - Red John',
      title: 'El clímax en el cementerio y el fin del asesino',
      description: 'Tras despistar al Sheriff McAllister usando una paloma oculta en la capilla de Sacramento, Patrick lo persigue a través del parque y cumple su juramento con sus propias manos.',
      author: 'Cho_IceCold',
      image: 'img/Seasons/S6.jpg',
      votes: 156
    },
    {
      id: 'moment-s7-wedding',
      season: 7,
      episode: '7x13 - White Orchids',
      title: 'La boda en la cabaña y el nuevo comienzo',
      description: 'Patrick y Teresa celebran su amor junto al lago rodeados de sus viejos camaradas del CBI y el FBI, sellando 7 temporadas con una revelación que devuelve la luz a la vida de Jane.',
      author: 'JisbonForever',
      image: 'img/jane&lisbon.jpeg',
      votes: 139
    }
  ];

  /* --------------------------------------------------------------------------
     GESTIÓN DE DATOS EN LOCALSTORAGE (MOMENTOS CURADOS Y VOTOS)
     -------------------------------------------------------------------------- */
  function getStoredMoments() {
    // Los momentos publicados son estrictamente los momentos curados y evaluados por el equipo
    const userLikes = getUserLikes();
    return DEFAULT_MOMENTS.map(moment => {
      const extraVote = userLikes[moment.id] ? 1 : 0;
      return {
        ...moment,
        votes: moment.votes + extraVote
      };
    });
  }

  function getUserLikes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKES);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveUserLikes(likes) {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
    } catch (e) {
      console.warn('Error guardando likes', e);
    }
  }

  function saveSubmission(submission) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
      existing.unshift(submission);
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(existing));
    } catch (e) {
      console.warn('Error guardando submission', e);
    }
  }

  /* --------------------------------------------------------------------------
     INYECCIÓN DE ELEMENTOS GLOBALES (BOTÓN FLOTANTE Y MODAL CBI)
     -------------------------------------------------------------------------- */
  function injectFloatingElements() {
    // Evitar inyectar doble
    if (document.getElementById('cbiDispatchBtn')) return;

    // 1. Botón Flotante CBI
    const btn = document.createElement('button');
    btn.id = 'cbiDispatchBtn';
    btn.className = 'cbi-dispatch-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Abrir Despacho Oficial del CBI');
    btn.innerHTML = `
      <div class="dispatch-badge-icon">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <div class="dispatch-btn-text">
        <span class="dispatch-tag">CBI Dispatch</span>
        <span class="dispatch-label">Contacto & Momentos</span>
      </div>
    `;
    document.body.appendChild(btn);

    // 2. Modal Overlay y Estructura
    const overlay = document.createElement('div');
    overlay.id = 'cbiModalOverlay';
    overlay.className = 'cbi-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="cbi-modal" role="dialog" aria-labelledby="cbiModalTitle">
        <!-- Cabecera Oficial CBI -->
        <div class="cbi-modal-header">
          <div class="cbi-header-left">
            <div class="cbi-header-seal">
              <i class="fa-solid fa-shield-halved" style="color: var(--green-bright);"></i>
            </div>
            <div class="cbi-header-titles">
              <span class="cbi-agency-sub">California Bureau of Investigation</span>
              <h3 class="cbi-modal-title" id="cbiModalTitle">Despacho Oficial CBI</h3>
            </div>
          </div>
          <button type="button" class="cbi-modal-close" id="cbiModalClose" aria-label="Cerrar modal">&times;</button>
        </div>

        <!-- Eslogan con cita de Patrick Jane -->
        <div class="cbi-slogan-box">
          <p class="cbi-slogan-text">
            <i class="fa-solid fa-quote-left" style="opacity: 0.5; margin-right: 0.35rem;"></i>
            «La verdad siempre se esconde en los detalles». Envíanos tu momento o capítulo favorito para mostrarlo en la página, o déjanos tu recomendación para mejorar el sitio.
          </p>
        </div>

        <!-- Selector de Tipo de Envío -->
        <div class="cbi-type-switch">
          <button type="button" class="cbi-switch-btn active" id="btnTypeMoment" data-type="moment">
            <i class="fa-solid fa-clapperboard"></i> Mejor Momento de Capítulo
          </button>
          <button type="button" class="cbi-switch-btn" id="btnTypeFeedback" data-type="feedback">
            <i class="fa-regular fa-lightbulb"></i> Recomendación para la Web
          </button>
        </div>

        <!-- Formulario CBI -->
        <div class="cbi-form-body">
          <form class="cbi-form" id="cbiDispatchForm" novalidate>
            <!-- Fila: Autor y Contacto -->
            <div class="cbi-field-row">
              <div class="cbi-field-group" style="flex: 1;">
                <label class="cbi-field-label" for="cbiAuthorName">
                  Tu Nombre o Alias <span class="required">*</span>
                </label>
                <input type="text" id="cbiAuthorName" class="cbi-input" placeholder="Ej: Patrick Jane, Teresa Lisbon..." required maxlength="40">
              </div>
              <div class="cbi-field-group" style="flex: 1;">
                <label class="cbi-field-label" for="cbiAuthorEmail">
                  Email de contacto (opcional)
                </label>
                <input type="email" id="cbiAuthorEmail" class="cbi-input" placeholder="agente@cbi.gov" maxlength="60">
              </div>
            </div>

            <!-- Campos específicos para "Mejor Momento" -->
            <div id="cbiMomentFields">
              <div class="cbi-field-row">
                <div class="cbi-field-group" style="flex: 1;">
                  <label class="cbi-field-label" for="cbiSeasonSelect">
                    Temporada <span class="required">*</span>
                  </label>
                  <select id="cbiSeasonSelect" class="cbi-input cbi-select">
                    <option value="1">Temporada 1</option>
                    <option value="2">Temporada 2</option>
                    <option value="3">Temporada 3</option>
                    <option value="4">Temporada 4</option>
                    <option value="5">Temporada 5</option>
                    <option value="6">Temporada 6</option>
                    <option value="7">Temporada 7</option>
                  </select>
                </div>
                <div class="cbi-field-group" style="flex: 1.4;">
                  <label class="cbi-field-label" for="cbiEpisodeRef">
                    Capítulo / Número <span class="required">*</span>
                  </label>
                  <input type="text" id="cbiEpisodeRef" class="cbi-input" placeholder="Ej: 3x23 Strawberries & Cream" maxlength="70">
                </div>
              </div>

              <div class="cbi-field-group" style="margin-top: 0.85rem;">
                <label class="cbi-field-label" for="cbiMomentTitle">
                  Título de la Escena <span class="required">*</span>
                </label>
                <input type="text" id="cbiMomentTitle" class="cbi-input" placeholder="Ej: El truco de la taza de té en Palm Springs" maxlength="100">
              </div>
            </div>

            <!-- Campos específicos para "Recomendación Web" -->
            <div id="cbiFeedbackFields" style="display: none;">
              <div class="cbi-field-group">
                <label class="cbi-field-label" for="cbiFeedbackCategory">
                  Área a mejorar del sitio <span class="required">*</span>
                </label>
                <select id="cbiFeedbackCategory" class="cbi-input cbi-select">
                  <option value="diseño">Diseño, Estilos y Tipografía</option>
                  <option value="contenido">Guía de Temporadas y Capítulos</option>
                  <option value="personajes">Biografías y Citas de Personajes</option>
                  <option value="juego">Juego del Palacio de la Memoria</option>
                  <option value="redjohn">Expedientes y Pistas de Red John</option>
                  <option value="otro">Otra sugerencia o idea</option>
                </select>
              </div>
            </div>

            <!-- Campo de Texto Principal -->
            <div class="cbi-field-group">
              <label class="cbi-field-label" id="cbiDescLabel" for="cbiDescription">
                ¿Por qué este momento es inolvidable? <span class="required">*</span>
              </label>
              <textarea id="cbiDescription" class="cbi-input cbi-textarea" rows="3" placeholder="Describe la escena, los diálogos o tu propuesta con detalle..." required maxlength="400"></textarea>
              <div class="cbi-char-counter"><span id="cbiCharCount">0</span>/400 caracteres</div>
            </div>

            <!-- Alerta de Respuesta -->
            <div class="cbi-alert" id="cbiAlert"></div>

            <!-- Botón de Sello Oficial -->
            <button type="submit" class="cbi-submit-btn" id="cbiSubmitBtn">
              <i class="fa-solid fa-stamp"></i> Sellar y Enviar Expediente
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    setupModalEvents();
  }

  /* --------------------------------------------------------------------------
     CONTROL DEL MODAL Y EVENTOS DEL FORMULARIO
     -------------------------------------------------------------------------- */
  let currentFormType = 'moment'; // 'moment' | 'feedback'

  function openModal(preselectedType = 'moment', preselectedSeason = null) {
    const overlay = document.getElementById('cbiModalOverlay');
    if (!overlay) return;

    // Ajustar tipo seleccionado si se especificó
    if (preselectedType) {
      setFormType(preselectedType);
    }
    if (preselectedSeason && document.getElementById('cbiSeasonSelect')) {
      document.getElementById('cbiSeasonSelect').value = preselectedSeason;
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cbi-modal-open');

    // Focus en primer campo
    const authorInput = document.getElementById('cbiAuthorName');
    if (authorInput) {
      setTimeout(() => authorInput.focus(), 150);
    }
  }

  function closeModal() {
    const overlay = document.getElementById('cbiModalOverlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cbi-modal-open');
    hideAlert();
  }

  function setFormType(type) {
    currentFormType = type;
    const btnMoment = document.getElementById('btnTypeMoment');
    const btnFeedback = document.getElementById('btnTypeFeedback');
    const momentFields = document.getElementById('cbiMomentFields');
    const feedbackFields = document.getElementById('cbiFeedbackFields');
    const descLabel = document.getElementById('cbiDescLabel');
    const descInput = document.getElementById('cbiDescription');

    if (type === 'moment') {
      btnMoment?.classList.add('active');
      btnFeedback?.classList.remove('active');
      if (momentFields) momentFields.style.display = 'block';
      if (feedbackFields) feedbackFields.style.display = 'none';
      if (descLabel) {
        descLabel.innerHTML = '¿Por qué este momento es inolvidable? <span class="required">*</span>';
      }
      if (descInput) {
        descInput.placeholder = 'Describe la escena, los diálogos o la jugada maestra de Patrick Jane...';
      }
    } else {
      btnMoment?.classList.remove('active');
      btnFeedback?.classList.add('active');
      if (momentFields) momentFields.style.display = 'none';
      if (feedbackFields) feedbackFields.style.display = 'block';
      if (descLabel) {
        descLabel.innerHTML = 'Detalla tu recomendación o sugerencia <span class="required">*</span>';
      }
      if (descInput) {
        descInput.placeholder = 'Cuéntanos qué te gustaría ver en la página, correcciones o nuevas funcionalidades...';
      }
    }
    hideAlert();
  }

  function showAlert(message, isSuccess = true) {
    const alertBox = document.getElementById('cbiAlert');
    if (!alertBox) return;

    alertBox.className = 'cbi-alert show ' + (isSuccess ? 'alert-success' : 'alert-error');
    alertBox.innerHTML = `
      <i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
      <span>${message}</span>
    `;
  }

  function hideAlert() {
    const alertBox = document.getElementById('cbiAlert');
    if (alertBox) {
      alertBox.className = 'cbi-alert';
      alertBox.innerHTML = '';
    }
  }

  function setupModalEvents() {
    const btnOpen = document.getElementById('cbiDispatchBtn');
    const btnClose = document.getElementById('cbiModalClose');
    const overlay = document.getElementById('cbiModalOverlay');
    const modalBox = overlay?.querySelector('.cbi-modal');
    const btnMoment = document.getElementById('btnTypeMoment');
    const btnFeedback = document.getElementById('btnTypeFeedback');
    const form = document.getElementById('cbiDispatchForm');
    const descInput = document.getElementById('cbiDescription');
    const charCounter = document.getElementById('cbiCharCount');

    btnOpen?.addEventListener('click', () => openModal());
    btnClose?.addEventListener('click', closeModal);

    // Cerrar al cliquear fuera de la ventana modal
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay?.classList.contains('active')) {
        closeModal();
      }
    });

    // Switch de pestañas
    btnMoment?.addEventListener('click', () => setFormType('moment'));
    btnFeedback?.addEventListener('click', () => setFormType('feedback'));

    // Contador de caracteres
    descInput?.addEventListener('input', () => {
      if (charCounter) {
        charCounter.textContent = descInput.value.length;
      }
    });

    // Envío del Formulario
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const author = document.getElementById('cbiAuthorName')?.value.trim();
      const email = document.getElementById('cbiAuthorEmail')?.value.trim();
      const description = descInput?.value.trim();

      if (!author) {
        showAlert('Por favor ingresa tu nombre o alias para registrar el expediente.', false);
        document.getElementById('cbiAuthorName')?.focus();
        return;
      }

      if (!description) {
        showAlert('Por favor ingresa una descripción para tu envío.', false);
        descInput?.focus();
        return;
      }

      const submitBtn = document.getElementById('cbiSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitiendo al CBI...';
      }

      const season = parseInt(document.getElementById('cbiSeasonSelect')?.value, 10) || 1;
      const episode = document.getElementById('cbiEpisodeRef')?.value.trim() || `T${season} - Capítulo Favorito`;
      const title = document.getElementById('cbiMomentTitle')?.value.trim() || `Momento destacado de T${season}`;
      const category = document.getElementById('cbiFeedbackCategory')?.value || 'general';

      const payload = {
        tipo: currentFormType,
        nombre: author,
        email: email,
        descripcion: description,
        temporada: currentFormType === 'moment' ? season : null,
        capitulo: currentFormType === 'moment' ? episode : null,
        titulo_momento: currentFormType === 'moment' ? title : null,
        categoria: currentFormType === 'feedback' ? category : null,
        fecha: new Date().toISOString()
      };

      // Guardar en submissions de auditoría local
      saveSubmission({
        ...payload,
        timestamp: new Date().toISOString()
      });

      // Transmisión asíncrona hacia enviar_expediente.php
      try {
        await fetch('enviar_expediente.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        // Modo offline / estático: el envío se respaldó en localStorage
        console.info('Despacho registrado en cliente (sin servidor PHP activo en entorno estático):', err);
      }

      if (currentFormType === 'moment') {
        showAlert('¡EXPEDIENTE ENVIADO AL CBI! Tu propuesta ha sido remitida por correo para evaluación. Una vez revisada por el equipo, será incorporada a la galería oficial.', true);
      } else {
        showAlert('¡RECOMENDACIÓN ENVIADA AL CBI! Tu sugerencia ha sido remitida por correo al equipo para evaluar mejoras en el sitio.', true);
      }

      // Animación de botón de sello
      if (submitBtn) {
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Expediente Remitido';
      }

      setTimeout(() => {
        form.reset();
        if (charCounter) charCounter.textContent = '0';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
          submitBtn.innerHTML = '<i class="fa-solid fa-stamp"></i> Sellar y Enviar Expediente';
        }
        setTimeout(closeModal, 2200);
      }, 1800);
    });
  }

  /* --------------------------------------------------------------------------
     MÓDULO DE SECCIÓN: CARRUSEL DE EXPEDIENTES (En temporadas.html)
     -------------------------------------------------------------------------- */
  let activeSeasonFilter = 'all';
  let currentSlideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w > 1100) return 3;
    if (w > 768) return 2;
    return 1;
  }

  function getFilteredMoments() {
    const allMoments = getStoredMoments();
    return activeSeasonFilter === 'all'
      ? allMoments
      : allMoments.filter(m => m.season === parseInt(activeSeasonFilter, 10));
  }

  function renderMomentsTrack() {
    const track = document.getElementById('fanMomentsTrack') || document.getElementById('fanMomentsGrid');
    if (!track) return;

    const filtered = getFilteredMoments();
    const userLikes = getUserLikes();

    if (filtered.length === 0) {
      track.innerHTML = `
        <div style="flex: 1; text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-folder-closed" style="font-size: 2.8rem; margin-bottom: 1rem; color: var(--green-bright); opacity: 0.5;"></i>
          <p style="font-size: 1.15rem; color: var(--cream-pure);">No hay expedientes archivados para la Temporada ${activeSeasonFilter}.</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Envía tu propuesta con el botón flotante del CBI para ser evaluada.</p>
        </div>
      `;
      createCarouselDots(0);
      updateCarousel(false);
      return;
    }

    track.innerHTML = filtered.map(moment => {
      const isVoted = !!userLikes[moment.id];
      return `
        <article class="dossier-moment-card" data-id="${moment.id}">
          <!-- Pestaña Superior de Carpeta de Archivo (Folder Tab) -->
          <div class="dossier-folder-tab">
            <div class="tab-label">
              <i class="fa-solid fa-folder-closed"></i>
              <span>EXPEDIENTE // T${moment.season}</span>
            </div>
            <div class="dossier-stamp-classified">CONFIDENCIAL</div>
          </div>

          <!-- Cuerpo de la Carpeta Manila Oscura -->
          <div class="dossier-folder-body">
            <!-- Clip Metálico de Carpeta -->
            <div class="dossier-metal-clip" title="Clip Oficial CBI"></div>

            <!-- Fotografía de Evidencia -->
            <div class="dossier-evidence-wrap">
              <div class="evidence-tape"></div>
              <img src="${moment.image}" alt="${moment.title}" class="dossier-evidence-img" loading="lazy">
              <div class="evidence-tag">
                <i class="fa-solid fa-camera"></i> EVIDENCIA #0${moment.season} // CBI
              </div>
            </div>

            <!-- Hoja de Datos del Expediente -->
            <div class="dossier-data-sheet">
              <div class="dossier-case-meta">
                <span class="meta-case-num">CASO REF: <strong>${moment.episode}</strong></span>
                <span class="meta-archive-date"><i class="fa-solid fa-shield-halved"></i> ARCHIVO CBI</span>
              </div>

              <h3 class="dossier-moment-title">${moment.title}</h3>

              <div class="dossier-report-box">
                <p class="dossier-report-text">"${moment.description}"</p>
              </div>

              <!-- Pie del Expediente: Investigador y Sello de Aprobación -->
              <div class="dossier-footer-seal">
                <div class="dossier-agent-credit">
                  <span class="agent-label">PROPUESTO POR:</span>
                  <span class="agent-name">${escapeHTML(moment.author)}</span>
                </div>

                <button type="button" class="dossier-vote-stamp ${isVoted ? 'voted' : ''}" data-moment-id="${moment.id}" aria-label="Aprobar y votar este expediente">
                  <i class="fa-solid fa-heart vote-heart"></i>
                  <span class="vote-text">VOTOS</span>
                  <span class="vote-count">${moment.votes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Asignar listeners de votación
    track.querySelectorAll('.dossier-vote-stamp').forEach(voteBtn => {
      voteBtn.addEventListener('click', function () {
        const momentId = this.getAttribute('data-moment-id');
        toggleVote(momentId, this);
      });
    });

    createCarouselDots(filtered.length);
    updateCarousel(false);
  }

  function getMaxSlideIndex(totalItems) {
    const perView = getCardsPerView();
    return Math.max(0, totalItems - perView);
  }

  function updateCarousel(animate = true) {
    const track = document.getElementById('fanMomentsTrack') || document.getElementById('fanMomentsGrid');
    if (!track) return;

    const filtered = getFilteredMoments();
    const maxSlide = getMaxSlideIndex(filtered.length);

    currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, maxSlide));

    const firstCard = track.children[0];
    if (firstCard && filtered.length > 0 && !firstCard.classList.contains('empty-dossier')) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 28; // 1.75rem
      const offset = currentSlideIndex * (cardWidth + gap);
      track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      track.style.transform = `translateX(-${offset}px)`;
    } else {
      track.style.transform = 'translateX(0px)';
    }

    // Actualizar estado de las flechas
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    if (prevBtn) prevBtn.disabled = (currentSlideIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentSlideIndex >= maxSlide || filtered.length === 0);

    // Actualizar puntos de paginación
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });

    // Actualizar contador
    const currentCounter = document.getElementById('carouselCurrentIndex');
    const totalCounter = document.getElementById('carouselTotalCount');
    if (currentCounter) currentCounter.textContent = filtered.length > 0 ? (currentSlideIndex + 1) : 0;
    if (totalCounter) totalCounter.textContent = filtered.length;
  }

  function createCarouselDots(totalItems) {
    const dotsBar = document.getElementById('carouselDotsBar');
    if (!dotsBar) return;

    dotsBar.innerHTML = '';
    const maxSlide = getMaxSlideIndex(totalItems);
    const totalDots = maxSlide + 1;

    if (totalItems <= 1 || totalDots <= 1) return;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === currentSlideIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Ir a página ${i + 1} de expedientes`);
      dot.addEventListener('click', () => {
        currentSlideIndex = i;
        updateCarousel(true);
      });
      dotsBar.appendChild(dot);
    }
  }

  function toggleVote(momentId, buttonEl) {
    const userLikes = getUserLikes();
    const baseMoment = DEFAULT_MOMENTS.find(m => m.id === momentId);
    if (!baseMoment) return;

    if (userLikes[momentId]) {
      // Quitar voto
      delete userLikes[momentId];
      buttonEl.classList.remove('voted');
    } else {
      // Agregar voto
      userLikes[momentId] = true;
      buttonEl.classList.add('voted');
    }

    saveUserLikes(userLikes);

    const newVoteCount = baseMoment.votes + (userLikes[momentId] ? 1 : 0);
    const countEl = buttonEl.querySelector('.vote-count');
    if (countEl) {
      countEl.textContent = newVoteCount;
    }
  }

  function setupMomentsSection() {
    const track = document.getElementById('fanMomentsTrack') || document.getElementById('fanMomentsGrid');
    if (!track) return;

    // Filtros por temporada
    const filterPills = document.querySelectorAll('.moment-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        filterPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        activeSeasonFilter = this.getAttribute('data-season') || 'all';
        currentSlideIndex = 0;
        renderMomentsTrack();
      });
    });

    // Botones de flecha anterior y siguiente
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');

    prevBtn?.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCarousel(true);
      }
    });

    nextBtn?.addEventListener('click', () => {
      const maxSlide = getMaxSlideIndex(getFilteredMoments().length);
      if (currentSlideIndex < maxSlide) {
        currentSlideIndex++;
        updateCarousel(true);
      }
    });

    // Soporte táctil / swipe en móviles
    const viewport = document.getElementById('carouselViewport');
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        const maxSlide = getMaxSlideIndex(getFilteredMoments().length);
        if (deltaX < -45 && currentSlideIndex < maxSlide) {
          currentSlideIndex++;
          updateCarousel(true);
        } else if (deltaX > 45 && currentSlideIndex > 0) {
          currentSlideIndex--;
          updateCarousel(true);
        }
      }, { passive: true });
    }

    // Ajuste responsive en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        createCarouselDots(getFilteredMoments().length);
        updateCarousel(false);
      }, 100);
    });

    // Botón directo "Proponer mi momento favorito"
    const directBtn = document.getElementById('btnOpenMomentsDispatch');
    if (directBtn) {
      directBtn.addEventListener('click', () => {
        openModal('moment', activeSeasonFilter !== 'all' ? activeSeasonFilter : '1');
      });
    }

    renderMomentsTrack();
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Inicialización cuando el DOM esté listo
  function init() {
    injectFloatingElements();
    setupMomentsSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer API global opcional
  window.CbiDispatch = {
    open: openModal,
    close: closeModal,
    refreshMoments: renderMomentsTrack
  };

})();
