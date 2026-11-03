/* English is the source text: t('English text') returns the Arabic when one exists, otherwise the English itself.
   Arabic covers interface text only; sample record names, assistant answers and exception sentences are English (stated in the UI). */
(function (root) {
  const AR = {};
  let lang = 'en';
  root.DemoI18n = {
    register: dict => Object.assign(AR, dict),
    t: s => (lang === 'ar' && AR[s]) || s,
    get lang() { return lang; },
    set: l => { lang = l; document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; },
  };
})(window);
