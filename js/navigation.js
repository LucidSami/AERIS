export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navMobileToggle = document.querySelector('.nav-mobile-toggle');
  
  // Sticky nav compact state on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('compact');
    } else {
      navbar.classList.remove('compact');
    }
  });

  // Mobile menu toggle
  if (navMobileToggle) {
    navMobileToggle.addEventListener('click', () => {
      const isExpanded = navMobileToggle.getAttribute('aria-expanded') === 'true';
      navMobileToggle.setAttribute('aria-expanded', !isExpanded);
      navbar.classList.toggle('nav-menu-active');
    });
  }
  
  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('nav-menu-active');
      navMobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Center of viewport
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}
