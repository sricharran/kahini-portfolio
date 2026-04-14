/* ============================================================
   KAHINI — v2
   assets/js/script.js
   ============================================================ */

/* ── Custom Cursor ──────────────────────────────────────────── */
(function () {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let follX  = 0, follY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  (function animateFollower() {
    follX += (mouseX - follX) * 0.1;
    follY += (mouseY - follY) * 0.1;
    follower.style.left = follX + 'px';
    follower.style.top  = follY + 'px';
    requestAnimationFrame(animateFollower);
  })();
})();


/* ── Nav scroll state ────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ── Mobile menu ─────────────────────────────────────────────── */
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('[data-close]').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


/* ── Scroll Reveal ───────────────────────────────────────────── */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ── Smooth anchor scroll ────────────────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── Contact Form ────────────────────────────────────────────── */
(function () {
  const form      = document.getElementById('contactForm');
  const sendBtn   = document.getElementById('sendBtn');
  const btnText   = document.getElementById('btnText');
  const successEl = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showMsg('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('Please enter a valid email address.', 'error');
      return;
    }

    // ── Wire to Formspree: replace setTimeout with a real fetch ──
    // fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message })
    // }).then(r => r.ok ? onSuccess() : showMsg('Something went wrong.', 'error'));

    sendBtn.disabled = true;
    btnText.textContent = 'Sending…';

    setTimeout(() => {
      sendBtn.disabled    = false;
      btnText.textContent = 'Send Message';
      form.reset();
      showMsg("Thank you, " + name + ". I'll be in touch soon.", 'success');
    }, 1400);
  });

  function showMsg(msg, type) {
    successEl.textContent = msg;
    successEl.style.color = type === 'success'
      ? 'var(--sage)'
      : 'var(--terracotta-light)';
    setTimeout(() => { successEl.textContent = ''; }, 7000);
  }
})();


/* ── Subtle parallax on hero photo (desktop only) ────────────── */
(function () {
  if (window.matchMedia('(max-width: 900px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const photo = document.querySelector('.hero__photo');
  if (!photo) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    photo.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
})();
