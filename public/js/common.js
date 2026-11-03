// Shared helpers. Loaded before each page's script.
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Accessibility: make every clickable non-button element keyboard-operable, label icon-only
// controls from their title, and mark live regions. Runs on load and on every DOM change.
(function () {
  const NATIVE = /^(BUTTON|A|INPUT|SELECT|TEXTAREA|SUMMARY)$/;
  function enhance(root) {
    root.querySelectorAll('[onclick]').forEach(el => {
      if (NATIVE.test(el.tagName) || el.dataset.a11y) return;
      el.dataset.a11y = '1';
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
      el.addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); el.click(); }
      });
    });
    root.querySelectorAll('button:not([aria-label]),[role=button]:not([aria-label])').forEach(el => {
      if (!el.textContent.trim() && el.title) el.setAttribute('aria-label', el.title);
    });
    root.querySelectorAll('.field-label').forEach(l => {
      const input = l.parentElement && l.parentElement.querySelector('input,select,textarea');
      if (input && !input.getAttribute('aria-label')) input.setAttribute('aria-label', l.textContent.trim());
    });
    root.querySelectorAll('input:not([aria-label]),textarea:not([aria-label])').forEach(i => {
      if (i.placeholder) i.setAttribute('aria-label', i.placeholder);
    });
    ['copilot-msgs', 'transcript-area', 'notif-list'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.hasAttribute('aria-live')) { el.setAttribute('aria-live', 'polite'); el.setAttribute('role', 'log'); }
    });
  }
  let queued = false;
  const run = () => { queued = false; enhance(document); };
  document.addEventListener('DOMContentLoaded', () => {
    run();
    new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(run); } })
      .observe(document.body, { childList: true, subtree: true });
  });
})();

// ── API + session bootstrap ──────────────────────────────────────────
async function api(method, path, body) {
  const r = await fetch(path, { method, headers: { 'content-type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && !path.startsWith('/api/auth/')) { location.href = '/login.html'; throw new Error('Signed out'); }
  if (!r.ok) throw Object.assign(new Error(j.error || 'Request failed (' + r.status + ')'), { status: r.status });
  return j;
}
async function signOut() { try { await api('POST', '/api/auth/logout', {}); } finally { location.href = '/login.html'; } }
// Require a session, optionally load leads into window.__leads, then run the page script.
function bootApp(src, withLeads = true) {
  api('GET', '/api/auth/me').then(me => { if (me.role === 'investor') { location.href = '/demo/index.html'; throw new Error('Signed out'); } return me; })
    .then(me => Promise.all([me, withLeads ? api('GET', '/api/leads') : []]))
    .then(([me, leads]) => {
      window.__me = me; window.__leads = leads;
      // Load scripts one after another so later ones can use the earlier ones' globals.
      [].concat(src).reduce((p, f) => p.then(() => new Promise((ok, no) => {
        const s = document.createElement('script'); s.src = f; s.onload = ok; s.onerror = () => no(new Error('failed to load ' + f)); document.body.appendChild(s);
      })), Promise.resolve()).catch(e => { document.body.textContent = e.message; });
    })
    .catch(e => {
      if (e.status === 401) { location.href = '/login.html'; return; } // not signed in (or the account was removed)
      if (e.message !== 'Signed out') document.body.textContent = 'Could not load: ' + e.message;
    });
}
