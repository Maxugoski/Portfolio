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

  // 5. Interactive Responsible AI Evaluation Calculator
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

  function updateTrustScore() {
    if (!fairnessSlider) return;

    const f = parseInt(fairnessSlider.value) || 0;
    const p = parseInt(privacySlider.value) || 0;
    const t = parseInt(transparencySlider.value) || 0;
    const o = parseInt(oversightSlider.value) || 0;
    const r = parseInt(robustnessSlider.value) || 0;

    if (fairnessVal) fairnessVal.textContent = `${f}%`;
    if (privacyVal) privacyVal.textContent = `${p}%`;
    if (transparencyVal) transparencyVal.textContent = `${t}%`;
    if (oversightVal) oversightVal.textContent = `${o}%`;
    if (robustnessVal) robustnessVal.textContent = `${r}%`;

    const average = Math.round((f + p + t + o + r) / 5);

    if (overallScoreElem) {
      overallScoreElem.textContent = `${average}%`;
    }

    if (scoreVerdictElem) {
      if (average >= 90) {
        scoreVerdictElem.innerHTML = `<span class="badge bg-success-subtle text-success border border-success px-3 py-2"><i class="bi bi-shield-check me-1"></i> Tier-1 Compliant (EU AI Act High Standard)</span>`;
      } else if (average >= 75) {
        scoreVerdictElem.innerHTML = `<span class="badge bg-warning-subtle text-warning border border-warning px-3 py-2"><i class="bi bi-exclamation-triangle me-1"></i> Moderate Risk (Remediation Needed)</span>`;
      } else {
        scoreVerdictElem.innerHTML = `<span class="badge bg-danger-subtle text-danger border border-danger px-3 py-2"><i class="bi bi-shield-x me-1"></i> High Risk (Not Production Ready)</span>`;
      }
    }
  }

  const sliders = [fairnessSlider, privacySlider, transparencySlider, oversightSlider, robustnessSlider];
  sliders.forEach(slider => {
    if (slider) {
      slider.addEventListener('input', updateTrustScore);
    }
  });

  // Initial calculation
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
});