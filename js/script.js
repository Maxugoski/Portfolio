/**
 * PORTFOLIO CLIENT SCRIPTS
 * Ugochukwu Maduagufor-Ogoke | Software Engineer & AI Technologist
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('navbar-top');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (navbar) navbar.classList.add('navbar-scrolled');
      if (backToTopBtn) backToTopBtn.style.display = 'flex';
    } else {
      if (navbar) navbar.classList.remove('navbar-scrolled');
      if (backToTopBtn) backToTopBtn.style.display = 'none';
    }
  });

  // 2. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Project Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterVal === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else if (card.classList.contains(filterVal)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Architecture Pipeline Tabs (RAG vs Business Automation)
  const archTabs = document.querySelectorAll('.arch-tab-btn');
  const ragPipeline = document.getElementById('pipeline-rag');
  const autoPipeline = document.getElementById('pipeline-automation');

  archTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      archTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-arch-target');
      if (target === 'rag') {
        if (ragPipeline) ragPipeline.style.display = 'block';
        if (autoPipeline) autoPipeline.style.display = 'none';
      } else {
        if (ragPipeline) ragPipeline.style.display = 'none';
        if (autoPipeline) autoPipeline.style.display = 'block';
      }
    });
  });

  // 5. Interactive Responsible AI Evaluation Calculator (Dynamic Color Differentiation)
  const fairnessSlider = document.getElementById('slider-fairness');
  const privacySlider = document.getElementById('slider-privacy');
  const transparencySlider = document.getElementById('slider-transparency');
  const oversightSlider = document.getElementById('slider-oversight');
  const robustnessSlider = document.getElementById('slider-robustness');

  const fairnessVal = document.getElementById('val-fairness');
  const privacyVal = document.getElementById('val-privacy');
  const transparencyVal = document.getElementById('val-transparency');
  const oversightVal = document.getElementById('val-oversight');
  const robustnessVal = document.getElementById('val-robustness');

  const overallScoreElem = document.getElementById('overall-trust-score');
  const scoreVerdictElem = document.getElementById('score-verdict');
  const summaryCardElem = document.querySelector('.scorecard-summary-card');

  // 4b. Language Controller State (Default to localStorage or auto-detect German)
  let currentLang = localStorage.getItem('portfolio_lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');

  // Helper to determine color tier based on metric percentage
  function getScoreTier(val) {
    const isDe = currentLang === 'de';
    if (val >= 90) {
      return {
        color: '#10b981', // High Standard / Emerald
        bgSubtle: 'rgba(16, 185, 129, 0.16)',
        label: isDe ? 'Indikativer Vertrauensindex (EU AI Act Hoher Standard)' : 'Indicative Trust Index (EU AI Act High Standard)',
        icon: 'bi-shield-check',
        glow: '0 0 20px rgba(16, 185, 129, 0.4)'
      };
    } else if (val >= 75) {
      return {
        color: '#38bdf8', // Strong / Cyan Blue
        bgSubtle: 'rgba(56, 189, 248, 0.16)',
        label: isDe ? 'Starke Konformität (Geringer Handlungsbedarf)' : 'Strong Compliance (Minor Action Required)',
        icon: 'bi-shield-shaded',
        glow: '0 0 20px rgba(56, 189, 248, 0.4)'
      };
    } else if (val >= 60) {
      return {
        color: '#f59e0b', // Moderate / Amber
        bgSubtle: 'rgba(245, 158, 11, 0.16)',
        label: isDe ? 'Mittleres Risiko (Überarbeitung erforderlich)' : 'Moderate Risk (Remediation Needed)',
        icon: 'bi-exclamation-triangle',
        glow: '0 0 20px rgba(245, 158, 11, 0.4)'
      };
    } else {
      return {
        color: '#ef4444', // Critical / Red
        bgSubtle: 'rgba(239, 68, 68, 0.18)',
        label: isDe ? 'Kritisches Risiko (Nicht produktionsreif)' : 'Critical Risk (Not Production Ready)',
        icon: 'bi-shield-x',
        glow: '0 0 20px rgba(239, 68, 68, 0.4)'
      };
    }
  }

  function styleSlider(slider, valElem) {
    if (!slider) return 0;
    const val = parseInt(slider.value) || 0;
    const min = parseInt(slider.min) || 0;
    const max = parseInt(slider.max) || 100;
    const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));

    if (valElem) {
      valElem.textContent = `${val}%`;
      valElem.style.color = '#38bdf8';
      valElem.style.borderColor = 'rgba(56, 189, 248, 0.55)';
      valElem.style.backgroundColor = 'rgba(56, 189, 248, 0.14)';
      valElem.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.3)';
    }

    // Dynamic capsule bar fill: Solid Blue on the left, Clean White on the right
    const fillElem = slider.parentElement ? slider.parentElement.querySelector('.compliance-bar-fill') : null;
    if (fillElem) {
      fillElem.style.width = `${pct}%`;
    }

    return val;
  }

  function updateTrustScore() {
    if (!fairnessSlider) return;

    const f = styleSlider(fairnessSlider, fairnessVal);
    const p = styleSlider(privacySlider, privacyVal);
    const t = styleSlider(transparencySlider, transparencyVal);
    const o = styleSlider(oversightSlider, oversightVal);
    const r = styleSlider(robustnessSlider, robustnessVal);

    const average = Math.round((f + p + t + o + r) / 5);
    const overallTier = getScoreTier(average);

    if (overallScoreElem) {
      overallScoreElem.textContent = `${average}%`;
      overallScoreElem.style.color = overallTier.color;
      overallScoreElem.style.textShadow = overallTier.glow;
    }

    if (summaryCardElem) {
      summaryCardElem.style.borderColor = `${overallTier.color}55`;
      summaryCardElem.style.boxShadow = `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${overallTier.color}20`;
    }

    if (scoreVerdictElem) {
      scoreVerdictElem.innerHTML = `
        <span class="badge border px-3 py-2 font-mono" style="color: ${overallTier.color}; border-color: ${overallTier.color} !important; background: ${overallTier.bgSubtle}; font-size: 0.85rem; box-shadow: 0 0 14px ${overallTier.color}25;">
          <i class="bi ${overallTier.icon} me-1"></i> ${overallTier.label}
        </span>
      `;
    }
  }

  const sliderPairs = [
    fairnessSlider,
    privacySlider,
    transparencySlider,
    oversightSlider,
    robustnessSlider
  ];

  sliderPairs.forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateTrustScore);
      slider.addEventListener('change', updateTrustScore);
    }
  });

  // Initial calculation & color paint
  updateTrustScore();

  // 6. Contact Form Submission Feedback
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'there';
      
      if (contactSuccess) {
        contactSuccess.style.display = 'block';
        contactSuccess.innerHTML = `
          <div class="alert alert-success d-flex align-items-center" role="alert">
            <i class="bi bi-check-circle-fill me-2 fs-4"></i>
            <div>
              <strong>Thank you, ${name}!</strong> Your message has been prepared. You can also reach out directly via <a href="mailto:ugochukwuogoke@gmail.com" class="text-decoration-underline text-success fw-bold">ugochukwuogoke@gmail.com</a> or WhatsApp.
            </div>
          </div>
        `;
      }
      contactForm.reset();
    });
  }

  // 7. Auto close mobile navbar when a link is clicked
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.getElementById('navbarNav');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // 7b. Language Switcher & Bilingual Translation System (EN / DE)
  const translations = {
    en: {
      navHome: '// home',
      navExpertise: '// expertise',
      navWork: '// work',
      navArch: '// architecture',
      navExp: '// experience',
      navBook: '// book',
      navContact: '// contact',
      navResume: '// resume.pdf',
      navTalk: "[ let's talk ]",

      heroStatus: '// 00. hello world • Relocating to Germany in 2026 • Open to Opportunities',
      heroSubCaps: 'SOFTWARE ENGINEER, IT SUPPORT, AI AUTOMATION DEVELOPER',
      heroCodeLine: '// Philosophy Background • Full-Stack Web • AI & Automation • IT Specialist • Responsible Tech',
      heroExploreBtn: '<i class="bi bi-code-slash"></i> <span>[ Explore My Work ↓ ]</span>',
      heroArchBtn: '<i class="bi bi-diagram-3"></i> <span>[ View Architecture ]</span>',
      heroCvBtn: '<i class="bi bi-download"></i> <span>[ Download CV ]</span>',
      featuredLabel: 'AS FEATURED IN & IMPACT',

      expertiseTitle: 'My Expertise',
      exp1Head: 'Software',
      exp1Sub: 'Development',
      exp1Body: 'Experienced in both functional and OOP: Python, JavaScript, TypeScript, React, Node.js, Express, and relational & NoSQL database architectures.',
      exp2Head: 'AI & Automation',
      exp2Sub: 'AI Workflows & Productivity Systems',
      exp2Body: 'I build practical AI powered workflows that reduce repetitive work, improve productivity, and connect AI tools with everyday business processes. I use platforms such as n8n, Claude Code, Gemini, and other AI tools to automate tasks, process information, assist with content creation, and streamline digital workflows.',
      exp3Head: 'IT Specialist',
      exp3Sub: 'Infrastructure & SLA Systems',
      exp3Body: 'Hands-on IT Specialist: organizational infrastructure management, network administration, troubleshooting with a 95% SLA resolution rate, security standards, and AI system auditability.',

      workTitle: 'My Work',
      workDesc: 'Deployed scalable web applications, healthcare clinics, maritime portals, and AI-powered systems using React, Node.js, and WordPress. Delivered custom digital platforms with clean code, fast performance, and measurable business impact.',
      featuredIndicatorLabel: 'Featured Project',
      featuredIndicatorTitle: 'Altramax Learn App',
      featuredViewBtn: 'Download App (.apk)',
      filterLabel: 'Filter by',
      filterAll: 'All <sup>07</sup>',
      filterWeb: 'Web Development <sup>06</sup>',
      filterWp: 'WordPress &amp; CMS <sup>04</sup>',
      filterAi: 'AI &amp; Full-Stack <sup>03</sup>',

      archDevTag: '// 03. architecture',
      archTitle: 'Visual System Architecture & Interactive Lab',
      archSubtitle: 'How I architect practical AI automation systems, document workflows, and productivity pipelines from ingestion to delivery.',
      archTabDoc: '// [ ai document & productivity pipeline ]',
      archTabAuto: '// [ ai business automation flow ]',

      scoreTitle: 'Responsible AI Evaluation Tool',
      scoreSubtitle: 'Evaluate an AI system under European AI Act and ethical governance principles. Adjust the 5 metric sliders to dynamically calculate the Trust Index:',
      scoreLabelFairness: 'Fairness & Non-Discrimination',
      scoreLabelPrivacy: 'Privacy & Data Governance (GDPR)',
      scoreLabelTransparency: 'Transparency & Explainability',
      scoreLabelOversight: 'Human Oversight & Agency',
      scoreLabelRobustness: 'Technical Robustness & Safety',
      scoreCompIndex: '// COMPOSITE TRUST INDEX',
      scorecardSummaryDesc: 'Evaluated in alignment with the Responsible AI Framework in <em>Ethics in Code</em>: ensures system transparency, minimal bias, robust user controls, and regulatory auditability.',
      scoreDisclaimer: '<i class="bi bi-info-circle me-1" style="color: #38bdf8;"></i> <strong>Note:</strong> The Trust Index is an experimental assessment framework for educational and engineering purposes. It is not a legal compliance certification or substitute for formal AI risk assessment.',

      expDevTag: '// 04. experience',
      expTitle: "Where I've Worked & Delivered",
      expSubtitle: 'Demonstrated engineering ownership, real-world IT problem solving, and measurable outcomes.',

      bookDevTag: '// 05. author & published work',
      bookTitle: 'Bridging Philosophy, Software & AI Governance',

      contactDevTag: '// 07. contact',
      contactTitle: "Have a project in mind or an engineering opportunity in Germany? Let's talk.",
      contactSubtitle: 'Open to Werkstudent, Junior Software Engineering, AI Automation and IT Support opportunities in Germany. Relocating to Germany in 2026.',
      contactDirectEmail: '// DIRECT EMAIL',
      contactLocationLabel: '// LOCATION & MOBILITY',
      contactLocationVal: 'Currently in Enugu, Nigeria • Relocating to Germany in 2026',
      contactConnectLabel: '// CONNECT ACROSS THE WEB',
      contactNameLabel: '// your name',
      contactEmailLabel: '// your email',
      contactSubjectLabel: '// opportunity / subject',
      contactMessageLabel: '// message',
      contactSendBtn: '<i class="bi bi-send-fill"></i> [ Send Direct Message ]',
      contactNamePh: 'e.g. Lukas Schmidt',
      contactEmailPh: 'lukas@company.de',
      contactSubjectPh: 'Werkstudent / Junior Software Engineer / AI Role',
      contactMessagePh: "Hi Ugochukwu, I'd like to connect regarding an opportunity..."
    },
    de: {
      navHome: '// startseite',
      navExpertise: '// fachgebiete',
      navWork: '// projekte',
      navArch: '// architektur',
      navExp: '// erfahrung',
      navBook: '// buch',
      navContact: '// kontakt',
      navResume: '// lebenslauf.pdf',
      navTalk: '[ kontaktieren ]',

      heroStatus: '// 00. hallo welt • Umzug nach Deutschland 2026 • Offen für Einstiegschancen',
      heroSubCaps: 'SOFTWARE-ENTWICKLER, IT-SUPPORT, KI- & AUTOMATISIERUNGS-ENTWICKLER.',
      heroCodeLine: '// Philosophie-Hintergrund • Full-Stack Web • KI & Automatisierung • IT-Spezialist • Verantwortungsbewusste Technologie',
      heroExploreBtn: '<i class="bi bi-code-slash"></i> <span>[ Meine Projekte ↓ ]</span>',
      heroArchBtn: '<i class="bi bi-diagram-3"></i> <span>[ Systemarchitektur ]</span>',
      heroCvBtn: '<i class="bi bi-download"></i> <span>[ Lebenslauf (CV) ]</span>',
      featuredLabel: 'BEKANNT AUS & PRAXISPROJEKTE',

      expertiseTitle: 'Meine Fachgebiete',
      exp1Head: 'Software',
      exp1Sub: 'Entwicklung',
      exp1Body: 'Erfahren in funktionaler und objektorientierter Programmierung: Python, JavaScript, TypeScript, React, Node.js, Express sowie relationale und NoSQL-Datenbankarchitekturen.',
      exp2Head: 'KI & Automation',
      exp2Sub: 'KI-Workflows & Produktivitätssysteme',
      exp2Body: 'Ich entwickle praxisnahe, KI-gestützte Workflows, die repetitive Aufgaben reduzieren, Produktivität steigern und KI-Tools nahtlos in Geschäftsprozesse einbinden. Ich nutze Plattformen wie n8n, Claude Code, Gemini und generative Medien zur Workflow-Optimierung.',
      exp3Head: 'IT-Spezialist',
      exp3Sub: 'Infrastruktur & SLA-Systeme',
      exp3Body: 'Praxiserfahrener IT-Spezialist: Verwaltung digitaler Infrastrukturen, Netzwerkadministration, Fehlerbehebung mit 95% SLA-Lösungsrate, IT-Sicherheitsstandards und Auditierung von KI-Systemen.',

      workTitle: 'Meine Projekte',
      workDesc: 'Skalierbare Webanwendungen, Fachkliniken, maritime Portale und KI-gestützte Systeme mit React, Node.js und WordPress entwickelt. Maßgeschneiderte digitale Plattformen mit messbarem Mehrwert.',
      featuredIndicatorLabel: 'Ausgewähltes Projekt',
      featuredIndicatorTitle: 'Altramax Learn App',
      featuredViewBtn: 'App herunterladen (.apk)',
      filterLabel: 'Filtern nach',
      filterAll: 'Alle <sup>07</sup>',
      filterWeb: 'Webentwicklung <sup>06</sup>',
      filterWp: 'WordPress &amp; CMS <sup>04</sup>',
      filterAi: 'KI &amp; Full-Stack <sup>03</sup>',

      archDevTag: '// 03. architektur',
      archTitle: 'Visuelle Systemarchitektur & Interaktives Labor',
      archSubtitle: 'Wie ich praxistaugliche KI-Automatisierung, Dokumenten-Workflows und Produktivitätspipelines von der Erfassung bis zur Bereitstellung architekturriere.',
      archTabDoc: '// [ ki dokumenten- & produktivitätspipeline ]',
      archTabAuto: '// [ ki geschäftsautomatisierung (n8n) ]',

      scoreTitle: 'Bewertungstool für verantwortungsbewusste KI',
      scoreSubtitle: 'Bewerten Sie ein KI-System nach dem EU AI Act und ethischen Leitlinien. Passen Sie die 5 Regler an, um den Trust Index dynamisch zu berechnen:',
      scoreLabelFairness: 'Fairness & Nichtdiskriminierung',
      scoreLabelPrivacy: 'Datenschutz & Datenverwaltung (DSGVO)',
      scoreLabelTransparency: 'Transparenz & Erklärbarkeit',
      scoreLabelOversight: 'Menschliche Aufsicht & Handlungsfähigkeit',
      scoreLabelRobustness: 'Technische Robustheit & Sicherheit',
      scoreCompIndex: '// GESAMTER VERTRAUENSINDEX',
      scorecardSummaryDesc: 'Bewertet nach dem Responsible AI Framework aus <em>Ethics in Code</em>: garantiert Systemtransparenz, minimale Verzerrung, robuste Nutzerkontrollen und regulatorische Auditierbarkeit.',
      scoreDisclaimer: '<i class="bi bi-info-circle me-1" style="color: #38bdf8;"></i> <strong>Hinweis:</strong> Der Trust Index ist ein experimentelles Bewertungsinstrument zu Bildungs- und Entwicklungszwecken. Er stellt keine rechtliche Zertifizierung und keinen Ersatz für formelle KI-Risikoanalysen dar.',

      expDevTag: '// 04. berufserfahrung',
      expTitle: 'Berufserfahrung & Praxisprojekte',
      expSubtitle: 'Nachgewiesene technische Verantwortung, praktische IT-Problemlösung und messbare Resultate.',

      bookDevTag: '// 05. autor & publikation',
      bookTitle: 'Verbindung von Philosophie, Software & KI-Governance',

      contactDevTag: '// 07. kontakt',
      contactTitle: 'Haben Sie ein Projekt oder eine Einstiegsmöglichkeit in Deutschland? Lassen Sie uns sprechen.',
      contactSubtitle: 'Offen für Werkstudentenstellen, Junior-Softwareentwicklung, KI-Automatisierung und IT-Support in Deutschland. Umzug nach Deutschland im Jahr 2026.',
      contactDirectEmail: '// DIREKTE E-MAIL',
      contactLocationLabel: '// STANDORT & MOBILITÄT',
      contactLocationVal: 'Derzeit in Enugu, Nigeria • Umzug nach Deutschland im Jahr 2026',
      contactConnectLabel: '// VERNETZEN IM WEB',
      contactNameLabel: '// ihr name',
      contactEmailLabel: '// ihre e-mail',
      contactSubjectLabel: '// betreff / einstiegschance',
      contactMessageLabel: '// ihre nachricht',
      contactSendBtn: '<i class="bi bi-send-fill"></i> [ Direktnachricht senden ]',
      contactNamePh: 'z.B. Lukas Schmidt',
      contactEmailPh: 'lukas@unternehmen.de',
      contactSubjectPh: 'Werkstudent / Junior Software Engineer / KI-Rolle',
      contactMessagePh: 'Hallo Ugochukwu, ich würde gerne bezüglich einer Einstiegsmöglichkeit in Kontakt treten...'
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    // Update active class on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const t = translations[lang] || translations.en;

    // Navbar
    const navLinkTexts = document.querySelectorAll('#navbarNav .nav-link-text');
    if (navLinkTexts[0]) navLinkTexts[0].textContent = t.navHome;
    if (navLinkTexts[1]) navLinkTexts[1].textContent = t.navExpertise;
    if (navLinkTexts[2]) navLinkTexts[2].textContent = t.navWork;
    if (navLinkTexts[3]) navLinkTexts[3].textContent = t.navArch;
    if (navLinkTexts[4]) navLinkTexts[4].textContent = t.navExp;
    if (navLinkTexts[5]) navLinkTexts[5].textContent = t.navBook;
    if (navLinkTexts[6]) navLinkTexts[6].textContent = t.navContact;

    const navTalk = document.querySelector('.nav-contact-btn span');
    if (navTalk) navTalk.textContent = t.navTalk;

    const navResume = document.querySelector('.nav-resume-btn');
    if (navResume) navResume.innerHTML = `<i class="bi bi-file-earmark-code"></i> ${t.navResume}`;

    // Hero
    const heroStatus = document.querySelector('.hero-status-tag span:last-child');
    if (heroStatus) heroStatus.textContent = t.heroStatus;

    const heroSubCaps = document.querySelector('.hero-sub-caps');
    if (heroSubCaps) heroSubCaps.textContent = t.heroSubCaps;

    const heroCodeLine = document.querySelector('.hero-code-line code');
    if (heroCodeLine) heroCodeLine.textContent = t.heroCodeLine;

    const heroButtons = document.querySelectorAll('.hero-buttons-row a');
    if (heroButtons[0]) heroButtons[0].innerHTML = t.heroExploreBtn;
    if (heroButtons[1]) heroButtons[1].innerHTML = t.heroArchBtn;
    if (heroButtons[2]) heroButtons[2].innerHTML = t.heroCvBtn;

    const featuredLabel = document.querySelector('.featured-in-label');
    if (featuredLabel) featuredLabel.textContent = t.featuredLabel;

    // Expertise
    const expTitle = document.querySelector('.expertise-section-title');
    if (expTitle) expTitle.textContent = t.expertiseTitle;

    const expCols = document.querySelectorAll('.expertise-col');
    if (expCols[0]) {
      const h = expCols[0].querySelector('.brush-highlight');
      const s = expCols[0].querySelector('.sub-name');
      const b = expCols[0].querySelector('.code-inner-body');
      if (h) h.textContent = t.exp1Head;
      if (s) s.textContent = t.exp1Sub;
      if (b) b.textContent = t.exp1Body;
    }
    if (expCols[1]) {
      const h = expCols[1].querySelector('.brush-highlight');
      const s = expCols[1].querySelector('.sub-name');
      const b = expCols[1].querySelector('.code-inner-body');
      if (h) h.textContent = t.exp2Head;
      if (s) s.textContent = t.exp2Sub;
      if (b) b.textContent = t.exp2Body;
    }
    if (expCols[2]) {
      const h = expCols[2].querySelector('.brush-highlight');
      const s = expCols[2].querySelector('.sub-name');
      const b = expCols[2].querySelector('.code-inner-body');
      if (h) h.textContent = t.exp3Head;
      if (s) s.textContent = t.exp3Sub;
      if (b) b.innerHTML = t.exp3Body;
    }

    // Work Section
    const workTitle = document.querySelector('.tamal-work-title');
    if (workTitle) workTitle.textContent = t.workTitle;
    const workDesc = document.querySelector('.tamal-work-desc');
    if (workDesc) workDesc.textContent = t.workDesc;

    const featIndicatorLabel = document.querySelector('.featured-indicator-label');
    if (featIndicatorLabel) featIndicatorLabel.textContent = t.featuredIndicatorLabel;
    const featIndicatorTitle = document.querySelector('.featured-indicator-title');
    if (featIndicatorTitle) featIndicatorTitle.textContent = t.featuredIndicatorTitle;
    const featViewBtn = document.querySelector('.btn-tamal-purple');
    if (featViewBtn) featViewBtn.textContent = t.featuredViewBtn;

    // Filter bar
    const filterLabel = document.querySelector('.filter-label');
    if (filterLabel) filterLabel.textContent = t.filterLabel;
    const filterItems = document.querySelectorAll('.tamal-filter-item');
    if (filterItems[0]) filterItems[0].innerHTML = t.filterAll;
    if (filterItems[1]) filterItems[1].innerHTML = t.filterWeb;
    if (filterItems[2]) filterItems[2].innerHTML = t.filterWp;
    if (filterItems[3]) filterItems[3].innerHTML = t.filterAi;

    // Architecture
    const archDev = document.querySelector('.architecture-section .dev-comment-tag');
    if (archDev) archDev.textContent = t.archDevTag;
    const archTitle = document.querySelector('.architecture-section .section-title');
    if (archTitle) archTitle.textContent = t.archTitle;
    const archSub = document.querySelector('.architecture-section .section-subtitle');
    if (archSub) archSub.textContent = t.archSubtitle;

    const archTabBtns = document.querySelectorAll('.arch-tab-button');
    if (archTabBtns[0]) archTabBtns[0].textContent = t.archTabDoc;
    if (archTabBtns[1]) archTabBtns[1].textContent = t.archTabAuto;

    // Scorecard
    const scoreTitle = document.querySelector('#scorecard-demo h3');
    if (scoreTitle) scoreTitle.textContent = t.scoreTitle;
    const scoreSub = document.querySelector('#scorecard-demo p.small');
    if (scoreSub) scoreSub.textContent = t.scoreSubtitle;

    const scoreLabels = document.querySelectorAll('.score-slider-label-row span:first-child');
    if (scoreLabels[0]) scoreLabels[0].textContent = t.scoreLabelFairness;
    if (scoreLabels[1]) scoreLabels[1].textContent = t.scoreLabelPrivacy;
    if (scoreLabels[2]) scoreLabels[2].textContent = t.scoreLabelTransparency;
    if (scoreLabels[3]) scoreLabels[3].textContent = t.scoreLabelOversight;
    if (scoreLabels[4]) scoreLabels[4].textContent = t.scoreLabelRobustness;

    const scoreCompTag = document.querySelector('.scorecard-summary-card span.text-uppercase');
    if (scoreCompTag) scoreCompTag.textContent = t.scoreCompIndex;

    const scorecardSummaryDesc = document.querySelector('.scorecard-summary-card p.small');
    if (scorecardSummaryDesc) scorecardSummaryDesc.innerHTML = t.scorecardSummaryDesc;

    const scoreDisclaimer = document.querySelector('.scorecard-summary-card .border-top p');
    if (scoreDisclaimer) scoreDisclaimer.innerHTML = t.scoreDisclaimer;

    // Experience Section
    const expSectionDev = document.querySelector('.experience-section .dev-comment-tag');
    if (expSectionDev) expSectionDev.textContent = t.expDevTag;
    const expSectionTitle = document.querySelector('.experience-section .section-title');
    if (expSectionTitle) expSectionTitle.textContent = t.expTitle;
    const expSectionSub = document.querySelector('.experience-section .section-subtitle');
    if (expSectionSub) expSectionSub.textContent = t.expSubtitle;

    // Contact Section
    const contactSectionDev = document.querySelector('.contact-section .dev-comment-tag');
    if (contactSectionDev) contactSectionDev.textContent = t.contactDevTag;
    const contactSectionTitle = document.querySelector('.contact-section .section-title');
    if (contactSectionTitle) contactSectionTitle.textContent = t.contactTitle;
    const contactSectionSub = document.querySelector('.contact-section .section-subtitle');
    if (contactSectionSub) contactSectionSub.textContent = t.contactSubtitle;

    const contactMetaHeadings = document.querySelectorAll('.contact-dev-box .font-mono.small');
    if (contactMetaHeadings[0]) contactMetaHeadings[0].textContent = t.contactDirectEmail;
    if (contactMetaHeadings[1]) contactMetaHeadings[1].textContent = t.contactLocationLabel;
    if (contactMetaHeadings[2]) contactMetaHeadings[2].textContent = t.contactConnectLabel;

    const contactLoc = document.querySelector('.contact-dev-box p.text-white');
    if (contactLoc) contactLoc.textContent = t.contactLocationVal;

    const formLabels = document.querySelectorAll('#contactForm .form-label');
    if (formLabels[0]) formLabels[0].textContent = t.contactNameLabel;
    if (formLabels[1]) formLabels[1].textContent = t.contactEmailLabel;
    if (formLabels[2]) formLabels[2].textContent = t.contactSubjectLabel;
    if (formLabels[3]) formLabels[3].textContent = t.contactMessageLabel;

    const inputName = document.getElementById('contactName');
    if (inputName) inputName.placeholder = t.contactNamePh;
    const inputEmail = document.getElementById('contactEmail');
    if (inputEmail) inputEmail.placeholder = t.contactEmailPh;
    const inputSubject = document.getElementById('contactSubject');
    if (inputSubject) inputSubject.placeholder = t.contactSubjectPh;
    const inputMsg = document.getElementById('contactMessage');
    if (inputMsg) inputMsg.placeholder = t.contactMessagePh;

    const contactBtn = document.querySelector('#contactForm button[type="submit"]');
    if (contactBtn) contactBtn.innerHTML = t.contactSendBtn;

    // Update Trust Score dynamically so verdict badge updates to current language
    if (typeof updateTrustScore === 'function') {
      updateTrustScore();
    }

    // Google Translate sync if available
    triggerGoogleTranslate(lang);
  }

  function triggerGoogleTranslate(lang) {
    try {
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      }
    } catch (e) {}
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetLang = this.getAttribute('data-lang');
      applyLanguage(targetLang);
    });
  });

  // Apply saved or auto-detected language
  applyLanguage(currentLang);

  // 8. Dark Theme Default (Tamal Sen Aesthetic)
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('portfolio-theme', 'dark');

  // ==========================================================================
  // 9. Tamal Sen 3D Floating Cubes & Glowing Orb Scene (Three.js)
  // ==========================================================================
  initHero3D();
});

/**
 * Three.js 3D Background with Floating Isometric Cubes & Illuminated Glowing Orb
 * Replicating the signature 3D aesthetic of tamalsen.dev
 */
function initHero3D() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const heroSection = document.querySelector('.hero-tamal-section');
  if (!heroSection) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    42,
    heroSection.clientWidth / heroSection.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.2, 15.5);

  // Renderer with antialiasing and alpha for seamless radial vignette blending
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Master group for floating animation and mouse parallax
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  // Soft ambient light
  const ambientLight = new THREE.AmbientLight(0x131c2b, 1.3);
  scene.add(ambientLight);

  // Cool directional rim light (cyan/blue) from lower-left for sharp edge definition
  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.95);
  rimLight.position.set(-9, -5, 7);
  scene.add(rimLight);

  // Subtle overhead fill light
  const topLight = new THREE.DirectionalLight(0xffffff, 0.3);
  topLight.position.set(0, 12, 6);
  scene.add(topLight);

  // Glowing peach/gold Point Light situated exactly at the glowing sphere
  const orbPointLight = new THREE.PointLight(0xff9944, 7.5, 42, 1.3);
  orbPointLight.position.set(2.2, 3.1, -0.6);
  sceneGroup.add(orbPointLight);

  // Materials with physical response
  const darkCubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x222d3e,
    roughness: 0.28,
    metalness: 0.12,
    flatShading: true
  });

  const deepDarkMaterial = new THREE.MeshStandardMaterial({
    color: 0x161e2b,
    roughness: 0.42,
    metalness: 0.1,
    flatShading: true
  });

  const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0x18212e,
    roughness: 0.38,
    metalness: 0.22
  });

  // 1. Main Cube 1 (Center-Left)
  const geomCube1 = new THREE.BoxGeometry(3.7, 3.7, 3.7);
  const cube1 = new THREE.Mesh(geomCube1, darkCubeMaterial);
  cube1.position.set(-1.8, 1.4, 0.3);
  cube1.rotation.set(0.48, -0.68, 0.25);
  sceneGroup.add(cube1);

  // 2. Main Cube 2 (Center-Right, directly beneath glowing orb catching its light)
  const geomCube2 = new THREE.BoxGeometry(3.5, 3.5, 3.5);
  const cube2 = new THREE.Mesh(geomCube2, darkCubeMaterial);
  cube2.position.set(1.0, 0.5, -0.8);
  cube2.rotation.set(-0.34, 0.60, -0.26);
  sceneGroup.add(cube2);

  // 3. Cube 3 (Bottom-Right, lower depth)
  const geomCube3 = new THREE.BoxGeometry(3.3, 3.3, 3.3);
  const cube3 = new THREE.Mesh(geomCube3, deepDarkMaterial);
  cube3.position.set(0.9, -2.5, -1.3);
  cube3.rotation.set(0.60, -0.38, 0.40);
  sceneGroup.add(cube3);

  // 4. Cylinder (Behind Cube 1 & 2)
  const geomCyl = new THREE.CylinderGeometry(1.05, 1.05, 3.4, 32);
  const cylinder = new THREE.Mesh(geomCyl, cylinderMaterial);
  cylinder.position.set(-0.5, -1.7, -2.2);
  cylinder.rotation.set(0.28, 0.18, 0.12);
  sceneGroup.add(cylinder);

  // 5. Glowing Orb (The luminous peach/orange sphere)
  const geomOrb = new THREE.SphereGeometry(0.76, 32, 32);
  const orbMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb877,
    emissive: 0xff6a14,
    emissiveIntensity: 1.8,
    roughness: 0.08,
    metalness: 0.05
  });
  const glowingOrb = new THREE.Mesh(geomOrb, orbMaterial);
  glowingOrb.position.set(2.2, 3.1, -0.6);
  sceneGroup.add(glowingOrb);

  // 6. Halo Glow Aura Sprite for the luminous orb
  function createGlowTexture() {
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const ctx = glowCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 210, 150, 1.0)');
    grad.addColorStop(0.2, 'rgba(255, 145, 65, 0.9)');
    grad.addColorStop(0.5, 'rgba(255, 95, 25, 0.4)');
    grad.addColorStop(0.8, 'rgba(255, 60, 0, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(glowCanvas);
  }

  const haloMaterial = new THREE.SpriteMaterial({
    map: createGlowTexture(),
    color: 0xffb877,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending
  });
  const haloSprite = new THREE.Sprite(haloMaterial);
  haloSprite.scale.set(5.2, 5.2, 1.0);
  haloSprite.position.copy(glowingOrb.position);
  sceneGroup.add(haloSprite);

  // 7. Dark Matte Sphere behind the glowing orb (as seen in screenshot)
  const geomDarkSphere = new THREE.SphereGeometry(0.58, 32, 32);
  const darkSphereMat = new THREE.MeshStandardMaterial({
    color: 0x0f1520,
    roughness: 0.75,
    metalness: 0.1
  });
  const darkSphere = new THREE.Mesh(geomDarkSphere, darkSphereMat);
  darkSphere.position.set(2.8, 2.7, -1.9);
  sceneGroup.add(darkSphere);

  // Adjust geometry scale on smaller screens
  function handleScreenScaling() {
    const width = window.innerWidth;
    if (width < 576) {
      sceneGroup.scale.set(0.68, 0.68, 0.68);
      camera.position.z = 19;
    } else if (width < 992) {
      sceneGroup.scale.set(0.85, 0.85, 0.85);
      camera.position.z = 17;
    } else {
      sceneGroup.scale.set(1.0, 1.0, 1.0);
      camera.position.z = 16;
    }
  }
  handleScreenScaling();

  // Mouse Parallax tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    mouseX = (e.clientX - halfWidth) / halfWidth;
    mouseY = (e.clientY - halfHeight) / halfHeight;

    targetRotationY = mouseX * 0.22;
    targetRotationX = mouseY * 0.18;
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    if (!heroSection) return;
    const width = heroSection.clientWidth;
    const height = heroSection.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    handleScreenScaling();
  });

  // Base coordinate anchors for float oscillation
  const basePosCube1 = { ...cube1.position };
  const basePosCube2 = { ...cube2.position };
  const basePosCube3 = { ...cube3.position };
  const basePosOrb = { ...glowingOrb.position };

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Subtle natural floating & rotations
    cube1.rotation.y += 0.0022;
    cube1.rotation.x += 0.0012;
    cube1.position.y = basePosCube1.y + Math.sin(elapsedTime * 0.75) * 0.14;
    cube1.position.x = basePosCube1.x + Math.cos(elapsedTime * 0.5) * 0.08;

    cube2.rotation.y -= 0.0020;
    cube2.rotation.z += 0.0014;
    cube2.position.y = basePosCube2.y + Math.cos(elapsedTime * 0.85 + 0.8) * 0.12;

    cube3.rotation.x += 0.0018;
    cube3.rotation.y += 0.0018;
    cube3.position.y = basePosCube3.y + Math.sin(elapsedTime * 0.65 + 1.5) * 0.15;

    // Glowing orb gentle breathing float & light intensity pulse
    const orbYOffset = Math.sin(elapsedTime * 1.1) * 0.12;
    glowingOrb.position.y = basePosOrb.y + orbYOffset;
    haloSprite.position.y = glowingOrb.position.y;
    orbPointLight.position.y = glowingOrb.position.y;

    const pulse = 1.0 + Math.sin(elapsedTime * 1.8) * 0.12;
    orbPointLight.intensity = 5.2 * pulse;
    orbMaterial.emissiveIntensity = 1.4 * pulse;

    // Smooth lerp mouse parallax on the master group
    sceneGroup.rotation.y += (targetRotationY - sceneGroup.rotation.y) * 0.045;
    sceneGroup.rotation.x += (targetRotationX - sceneGroup.rotation.x) * 0.045;

    renderer.render(scene, camera);
  }

  animate();
}