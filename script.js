/* ==============================
   PORTFOLIO — Main JavaScript
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initTypingAnimation();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
});

/* ==============================
   NAVBAR — Scroll behavior
   ============================== */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add/remove scrolled class for background blur
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ==============================
   MOBILE NAVIGATION
   ============================== */

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ==============================
   TYPING ANIMATION — Hero tagline
   ============================== */

function initTypingAnimation() {
  const taglineEl = document.getElementById('hero-tagline-text');
  if (!taglineEl) return;

  const phrases = [
    'Engineering skills. Building discipline.',
    'Solving problems. Shipping value.',
    'Learning fast. Thinking long-term.',
    'Code. Consistency. Growth.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 60;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      taglineEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      taglineEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 60;
    }

    // Finished typing the phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // pause before deleting
    }

    // Finished deleting the phrase
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // small pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 800);
}

/* ==============================
   SCROLL REVEAL — Intersection Observer
   ============================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==============================
   SMOOTH SCROLL — Anchor links
   ============================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // Navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ==============================
   CONTACT FORM — Client-side validation
   ============================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const statusEl = document.getElementById('form-status');

    // Reset status
    statusEl.className = 'form-status';
    statusEl.style.display = 'none';

    // Basic validation
    if (!name || !email || !message) {
      showStatus(statusEl, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(statusEl, 'Please enter a valid email address.', 'error');
      return;
    }

    // Simulate successful submission
    // In production, replace with actual API call (e.g., Formspree, EmailJS)
    showStatus(statusEl, 'Message sent! I\'ll get back to you soon.', 'success');
    form.reset();

    // Auto-hide success message after 5s
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = `form-status ${type}`;
  el.style.display = 'block';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
