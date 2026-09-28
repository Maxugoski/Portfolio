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

  // Helper to determine color tier based on metric percentage
  function getScoreTier(val) {
    if (val >= 90) {
      return {
        color: '#10b981', // High Standard / Emerald
        bgSubtle: 'rgba(16, 185, 129, 0.16)',
        label: 'Tier-1 Compliant (EU AI Act High Standard)',
        icon: 'bi-shield-check',
        glow: '0 0 20px rgba(16, 185, 129, 0.4)'
      };
    } else if (val >= 75) {
      return {
        color: '#38bdf8', // Strong / Cyan Blue
        bgSubtle: 'rgba(56, 189, 248, 0.16)',
        label: 'Strong Compliance (Minor Action Required)',
        icon: 'bi-shield-shaded',
        glow: '0 0 20px rgba(56, 189, 248, 0.4)'
      };
    } else if (val >= 60) {
      return {
        color: '#f59e0b', // Moderate / Amber
        bgSubtle: 'rgba(245, 158, 11, 0.16)',
        label: 'Moderate Risk (Remediation Needed)',
        icon: 'bi-exclamation-triangle',
        glow: '0 0 20px rgba(245, 158, 11, 0.4)'
      };
    } else {
      return {
        color: '#ef4444', // Critical / Red
        bgSubtle: 'rgba(239, 68, 68, 0.18)',
        label: 'Critical Risk (Not Production Ready)',
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