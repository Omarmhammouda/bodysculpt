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
  const done = document.getElementById('form-done');

  function showDone(firstName) {
    status.textContent = '';
    form.classList.add('is-sent');
    if (done) {
      done.querySelector('.done__name').textContent = firstName ? ', ' + firstName : '';
      done.hidden = false;
      document.getElementById('consultation').scrollIntoView({ block: 'start' });
      done.querySelector('.done__title').focus({ preventScroll: true });
    }
  }

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
    // Spam trap filled in? Quietly pretend it worked.
    if ((data.get('_honey') || '').trim()) { showDone(''); return; }

    const name = (data.get('name') || '').trim();
    const focus = data.getAll('focus').join(', ');
    // Readable email for Naima (FormSubmit renders this as a table)
    const payload = {
      'Name': name,
      'Email': (data.get('email') || '').trim(),
      'Phone': (data.get('phone') || '').trim() || '—',
      'Inquiring as': data.get('inquiring_as') || '—',
      'Best time to reach': (data.get('best_time') || '').trim() || '—',
      'Preferred setting': data.get('setting') || '—',
      'Primary focus': focus || '—',
      'Notes': (data.get('notes') || '').trim() || '—',
      'Wants confidentiality agreement': data.get('nda') ? 'Yes' : 'No',
      _subject: `New consultation request — ${name}`,
      _replyto: (data.get('email') || '').trim(),
      _template: 'table',
      _captcha: 'false'
    };
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
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) === 'false') throw new Error(json.message || 'Request failed');
      }
      showDone(name.split(' ')[0]);
    } catch (err) {
      btn.disabled = false;
      status.textContent = 'Something went wrong sending your request. Please try again, or message @bodysculpt on Instagram.';
    }
  });
})();
