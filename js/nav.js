(function () {
  'use strict';

  var nav      = document.querySelector('.nav');
  var hamburger = document.querySelector('.nav__hamburger');
  var overlay  = document.querySelector('.nav__overlay');
  if (!nav) return;

  // Sticky nav scroll-state
  var SCROLL_THRESHOLD = 80;
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (hamburger && overlay) {
    function openOverlay() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
      // Move focus into the overlay for keyboard users
      var firstLink = overlay.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }
    function closeOverlay() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
    hamburger.addEventListener('click', function () {
      if (overlay.classList.contains('is-open')) closeOverlay();
      else openOverlay();
    });
    // Close on link tap inside the overlay
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeOverlay);
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
    });
  }
})();
