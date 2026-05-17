/* ============================================
   BuildSpace — script.js
   DecodeLabs Full Stack Project 1 · Batch 2026
   Features:
     - Mobile hamburger menu toggle
     - Smooth active nav link highlight on scroll
     - Scroll-triggered fade-in for cards & sections
   ============================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. HAMBURGER MENU TOGGLE
  ────────────────────────────────────────── */
  const menuBtn  = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    // Toggle open/close
    menuBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.classList.toggle('is-open', isOpen);
    });

    // Close when a menu link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.classList.remove('is-open');
      });
    });

    // Close when viewport hits tablet width
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.classList.remove('is-open');
      }
    });
  }

  /* ──────────────────────────────────────────
     2. ACTIVE NAV LINK ON SCROLL
     Highlights the nav link for the section
     currently in view.
  ────────────────────────────────────────── */
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    let currentId = '';

    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      // Consider section "active" when it's within top 40% of viewport
      if (top <= window.innerHeight * 0.4) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  // Inject active style dynamically (keeps CSS file clean)
  const activeStyle = document.createElement('style');
  activeStyle.textContent = '.nav-links a.active { color: var(--mocha); }';
  document.head.appendChild(activeStyle);

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink(); // Run once on load

  /* ──────────────────────────────────────────
     3. SCROLL-TRIGGERED FADE-IN
     Cards and section headers animate in
     as they enter the viewport.
  ────────────────────────────────────────── */
  const fadeTargets = document.querySelectorAll(
    '.feature-card, article.card, .stat-item, .section-header, .content-text, .browser-mock'
  );

  // Set initial hidden state via JS (progressive enhancement)
  fadeTargets.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  function revealOnScroll() {
    fadeTargets.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 60;

      if (inView) {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  // Delay initial check so CSS transitions are ready
  setTimeout(revealOnScroll, 100);

  /* ──────────────────────────────────────────
     4. STAGGERED CARD ANIMATION
     Cards inside a grid reveal one after
     another for a polished cascade effect.
  ────────────────────────────────────────── */
  const grids = document.querySelectorAll('.features-grid, .articles-grid');

  grids.forEach(function (grid) {
    const cards = grid.querySelectorAll('.feature-card, article.card');
    cards.forEach(function (card, index) {
      card.style.transitionDelay = (index * 80) + 'ms';
    });
  });

  /* ──────────────────────────────────────────
     5. STAT COUNTER ANIMATION
     Numbers count up when the stats section
     scrolls into view.
  ────────────────────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      statsAnimated = true;

      statNumbers.forEach(function (el) {
        const target = el.textContent.trim();
        // Only animate purely numeric values
        if (/^\d+$/.test(target)) {
          const end      = parseInt(target, 10);
          const duration = 1000; // ms
          const steps    = 40;
          const increment = end / steps;
          let current    = 0;
          let step       = 0;

          const timer = setInterval(function () {
            step++;
            current = Math.min(Math.round(increment * step), end);
            el.textContent = current;
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
        // Non-numeric values (e.g. "AA") stay as-is
      });
    }
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats(); // Check on load in case already visible

})();
