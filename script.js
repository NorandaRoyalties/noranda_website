/* ═══════════════════════════════════════════════════
   NORANDA ROYALTIES — Main JavaScript
   Bilingual Toggle (EN/FR) + Scroll Animations + Nav
═══════════════════════════════════════════════════ */

// ── Language Toggle ──────────────────────────────

let currentLang = localStorage.getItem('noranda-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  // Update all translatable text elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.innerHTML = text;
  });

  // Update all input/textarea placeholders
  document.querySelectorAll('[data-en-ph]').forEach(el => {
    const ph = el.getAttribute('data-' + lang + '-ph');
    if (ph !== null) el.placeholder = ph;
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-en').forEach(el => {
    el.classList.toggle('lang-active', lang === 'en');
  });
  document.querySelectorAll('.lang-fr').forEach(el => {
    el.classList.toggle('lang-active', lang === 'fr');
  });

  // Update document title
  const titleEl = document.querySelector('[data-title-en]');
  if (titleEl) {
    document.title = titleEl.getAttribute('data-title-' + lang);
  }

  localStorage.setItem('noranda-lang', lang);
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'fr' : 'en');
}

// ── Mobile Menu ──────────────────────────────────

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu) return;

  const isOpen = menu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
  const spans = document.querySelectorAll('.hamburger span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ── Scroll Animations ────────────────────────────

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Navbar Scroll Shadow ─────────────────────────

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.borderBottomColor = 'rgba(168,99,24,0.15)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ── Active Nav Link ──────────────────────────────

function setActiveNavLink() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Copy Email ───────────────────────────────────

function copyEmail() {
  const email = 'info@norandaroyalties.com';
  const btn = document.querySelector('.contact-copy-btn');
  const label = btn ? btn.querySelector('.copy-label') : null;
  if (!btn || !label) return;

  navigator.clipboard.writeText(email).then(() => {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    btn.classList.add('copied');
    label.textContent = lang === 'fr' ? 'Copié ✓' : 'Copied ✓';
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = lang === 'fr' ? 'Copier' : 'Copy';
    }, 2200);
  }).catch(() => {
    // Fallback for browsers without clipboard API
    window.location.href = 'mailto:info@norandaroyalties.com';
  });
}

// ── Contact Form ─────────────────────────────────

function handleContact(e) {
  e.preventDefault();
  const form    = e.target;
  const name    = form.querySelector('[name="name"]').value.trim();
  const email   = form.querySelector('[name="email"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  const subject = encodeURIComponent(
    company
      ? 'Inquiry from ' + name + ' — ' + company
      : 'Inquiry from ' + name
  );
  const body = encodeURIComponent(
    'Name: '    + name    + '\n' +
    'Email: '   + email   + '\n' +
    'Company: ' + (company || 'N/A') + '\n\n' +
    message
  );

  window.location.href =
    'mailto:info@norandaroyalties.com?subject=' + subject + '&body=' + body;
}

// ── Stat Counter Animation ───────────────────────

function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number[data-count], .track-stat-number[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// ── Init ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initScrollAnimations();
  initNavbarScroll();
  setActiveNavLink();
  initStatCounters();
});
