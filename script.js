/* ==============================
   PORTFOLIO — Main JavaScript
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingAnimation();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initThemeToggle();
});

const hero = document.querySelector(".hero");
if (hero) {
  const glow = document.createElement("div");
  glow.classList.add("hero-glow");
  hero.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

const name = document.querySelector(".hero-name");

if (name) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    name.style.transform = `translate(${x}px, ${y}px)`;
  });
}


/* ==============================
   NAVBAR — Fixed at bottom
   ============================== */
// Real page: listen on window scroll


function initNavbar() {
  // Navbar is fixed at the bottom via CSS, no scroll behavior needed
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

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

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();
    const statusEl = document.getElementById('form-status');

    // Reset status
    statusEl.className = 'form-status';
    statusEl.style.display = 'none';

    // Simulate successful submission
    showStatus(statusEl, "Message sent! I'll get back to you soon.", 'success');
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

/* ==============================
   THEME TOGGLE
   ============================== */

// Execute immediately to prevent FOUC (Flash of Unstyled Content)
(function prioritizeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!toggleBtn || !themeIcon) return;

  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    themeIcon.classList.replace('ph-sun', 'ph-moon');
  }

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
      theme = 'light';
      themeIcon.classList.replace('ph-sun', 'ph-moon');
    } else {
      theme = 'dark';
      themeIcon.classList.replace('ph-moon', 'ph-sun');
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
}


