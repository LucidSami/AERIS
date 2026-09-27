/* ==========================================================================
   SMART CLEAN-AIR — Peak Animation Engine
   Scroll-driven reveals, parallax, particles, counters, smooth transitions
   ========================================================================== */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    showAllImmediately();
    return;
  }
  
  // Listen for runtime changes (user toggles reduced motion while on page)
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) showAllImmediately();
  });

  // 1. Scroll progress bar
  initScrollProgress();

  // 2. Cinematic hero entrance
  initHeroSequence();

  // 3. Hero parallax on scroll
  initHeroParallax();

  // 4. Hero airflow particles
  initAirflowParticles();

  // 5. Scroll-reveal system (IntersectionObserver)
  initScrollReveals();

  // 6. Smooth scroll anchors
  initSmoothScroll();

  // 7. Magnetic card tilt on hover
  initCardTilt();
}


/* ---------- Show everything for reduced motion ---------- */
function showAllImmediately() {
  document.querySelectorAll(
    '[class*="reveal-"], .traditional-purifier, .system-approach, .table-container, .equation-diagram > *'
  ).forEach(el => {
    el.classList.add('is-visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.clipPath = 'none';
  });
  document.getElementById('hero')?.classList.add('hero-loaded');
}


/* ---------- 1. Scroll Progress Bar ---------- */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}


/* ---------- 2. Cinematic Hero Entrance ---------- */
function initHeroSequence() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  
  // Slight delay so the user sees the page before animation starts
  requestAnimationFrame(() => {
    setTimeout(() => {
      hero.classList.add('hero-loaded');
    }, 100);
  });
}


/* ---------- 3. Hero Parallax ---------- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only apply parallax while hero is in view
        if (scrollY < window.innerHeight * 1.5) {
          hero.setAttribute('data-scroll', '');
          hero.style.setProperty('--scroll-y', scrollY);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}


/* ---------- 4. Airflow Particles ---------- */
function initAirflowParticles() {
  const container = document.getElementById('hero-airflow');
  if (!container) return;

  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'airflow-particle';
    
    // Randomize properties
    const startX = Math.random() * 100;
    const startY = 30 + Math.random() * 50;
    const driftX = 100 + Math.random() * 250;
    const driftY = -(20 + Math.random() * 60);
    const size = 2 + Math.random() * 4;
    const duration = 5 + Math.random() * 8;
    const delay = Math.random() * duration;
    const hue = Math.random() > 0.5 ? '207' : '157'; // blue or green tint
    
    p.style.cssText = `
      left: ${startX}%;
      top: ${startY}%;
      --drift-x: ${driftX}px;
      --drift-y: ${driftY}px;
      --particle-size: ${size}px;
      --particle-duration: ${duration}s;
      --particle-delay: -${delay}s;
      --particle-color: hsla(${hue}, 60%, 65%, 0.3);
    `;
    
    container.appendChild(p);
  }
}


/* ---------- 5. Scroll Reveal Engine ---------- */
function initScrollReveals() {
  // Two-tier observer: early trigger for subtle elements, later trigger for dramatic ones
  const gentleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.01
  });

  const dramaticObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.01
  });

  // Gentle reveals (most elements)
  document.querySelectorAll(
    '.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-fade, .reveal-stagger'
  ).forEach(el => gentleObserver.observe(el));

  // Dramatic reveals (clip-path, scale, rotate)
  document.querySelectorAll(
    '.reveal-scale, .reveal-clip-up, .reveal-clip-left, .reveal-rotate'
  ).forEach(el => dramaticObserver.observe(el));

  // Special: table containers, equation diagrams, section dividers
  document.querySelectorAll(
    '.table-container, .section-divider, .equation-diagram'
  ).forEach(el => gentleObserver.observe(el));

  // Cards within grids — stagger per-card
  document.querySelectorAll('.grid-2 > .card, .grid-3 > .card, .grid-4 > .card').forEach((card, i) => {
    if (!card.classList.contains('reveal-up') && !card.classList.contains('reveal-scale')) {
      card.classList.add('reveal-up');
      card.style.transitionDelay = `${i * 0.08}s`;
    }
    gentleObserver.observe(card);
  });
}


/* ---------- 6. Smooth Scroll Anchors ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 56;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}


/* ---------- 8. Magnetic Card Tilt ---------- */
function initCardTilt() {
  // Only on desktop — pointless on touch
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
