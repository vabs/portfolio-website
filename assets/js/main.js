// Theme toggle and page enhancements
(function () {
  const root = document.documentElement;
  const key = 'theme';
  const toggle = document.getElementById('themeToggle');
  const lavaToggle = document.getElementById('lavaToggle');
  function persist(next) {
    try { localStorage.setItem(key, next); } catch (e) {}
    try { document.cookie = `theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`; } catch (e) {}
  }
  function setTheme(next) {
    root.classList.toggle('theme-dark', next === 'dark');
    persist(next);
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.classList.contains('theme-dark') ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Lava background toggle
  function persistLava(state) {
    try { localStorage.setItem('lava', state); } catch (e) {}
    try { document.cookie = `lava=${state}; Path=/; Max-Age=31536000; SameSite=Lax`; } catch (e) {}
  }
  function updateLavaButton() {
    if (!lavaToggle) return;
    const on = !root.classList.contains('no-lava');
    lavaToggle.setAttribute('aria-pressed', String(on));
    lavaToggle.title = on ? 'Turn background off' : 'Turn background on';
  }
  function setLava(on) {
    root.classList.toggle('no-lava', !on);
    persistLava(on ? 'on' : 'off');
    updateLavaButton();
  }
  if (lavaToggle) {
    updateLavaButton();
    lavaToggle.addEventListener('click', () => {
      const on = root.classList.contains('no-lava') ? true : false;
      setLava(on);
    });
  }

  // Reveal animation via IntersectionObserver
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('reveal-visible'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }) : null;
  if (io) document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form handling
  const form = document.querySelector('form[data-contact]');
  if (form) {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      const note = document.getElementById('contact-note');
      if (note) {
        note.textContent = 'Thanks! Your message has been sent successfully.';
        note.classList.add('ok');
      }
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
      // Form will submit normally to Formspree
    });
  }
})();
