/**
 * Highlander Gold & Silver — Navigation & Header Interactions
 */

export function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .nav-link');

  // Sticky header scroll elevation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer controls
  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Smooth active link highlight on scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}
