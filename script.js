// Bodysculpt — small enhancements, no dependencies.
(() => {
  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.querySelector('.nav__menu');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    const close = () => { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  // Sticky booking bar: always visible on phones, except when the form itself is on screen
  const sticky = document.getElementById('sticky-cta');
  const consult = document.getElementById('consultation');
  if (sticky && consult && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      sticky.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0.15 }).observe(consult);
  }

  // Consultation form
  const form = document.getElementById('consult-form');
  if (!form) return;
  const status = form.querySelector('.form__status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach(input => {
      const field = input.closest('.field');
      const ok = input.checkValidity();
      field && field.classList.toggle('is-invalid', !ok);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      status.textContent = 'Please add your name and a valid email so Naima can reach you.';
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.focus = data.getAll('focus').join(', ');
    const endpoint = form.dataset.endpoint;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = 'Sending…';

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Request failed');
      }
      form.classList.add('is-sent');
      const first = (payload.name || '').trim().split(' ')[0];
      status.textContent = `Thank you${first ? ', ' + first : ''}. Your request is in — Naima will be in touch within one business day.`;
    } catch (err) {
      btn.disabled = false;
      status.textContent = 'Something went wrong sending your request. Please try again, or reach out on Instagram @bodysculpt.';
    }
  });
})();
