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
