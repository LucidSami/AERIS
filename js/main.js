import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initInteractiveRoom } from './interactive-room.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initAnimations();
  initNavigation();
  initInteractiveRoom();
  
  // Setup Presentation Mode toggle
  const presentationToggle = document.getElementById('presentation-toggle');
  if (presentationToggle) {
    presentationToggle.addEventListener('click', () => {
      document.body.classList.toggle('presentation-mode');
      const isPresMode = document.body.classList.contains('presentation-mode');
      presentationToggle.setAttribute('aria-expanded', isPresMode);
      
      // If we go to presentation mode, hide standard nav links
      const navLinks = document.querySelector('.nav-links');
      if (isPresMode) {
        navLinks.style.opacity = '0';
        setTimeout(() => navLinks.style.display = 'none', 300);
      } else {
        navLinks.style.display = 'flex';
        setTimeout(() => navLinks.style.opacity = '1', 10);
      }
    });
  }
});
