// Live voice demo: browser speech recognition -> /api/calls/:id/say (Claude) -> speech synthesis.
// Also replaces the mock Call Log with saved calls. Loaded after voice.js (uses its globals: lang, T, t, showView, closeModal).
(function () {
  const L = {
    en: { title: 'Talk to the AI agent', lead: 'Lead name', language: 'Call language', start: 'Start call', end: 'End call', idle: 'Idle', live: 'On call',
      hands: 'Hands-free: listen again after the agent speaks', send: 'Send', ph: 'Type instead of speaking…', listening: 'Listening…', thinking: 'Agent is thinking…',
      speaking: 'Agent is speaking…', you: '👤 You', agent: '🤖 AI Agent', nomic: 'This browser has no speech recognition. Type your messages instead.',
      denied: 'Microphone access was blocked. Allow it in the browser, or type instead.', novoice: 'No voice installed for this language: showing text only.',
      ended: 'Call ended and saved.', logTitle: 'Saved calls', cols: ['Time', 'Lead', 'Lang', 'Turns', 'Duration', 'Outcome', ''], view: 'Transcript', none: 'No calls yet. Start one from Live Voice Demo.', calls: n => n + ' calls', unknown: 'Unknown lead' },
    ar: { title: 'تحدّث مع الوكيل الذكي', lead: 'اسم العميل', language: 'لغة المكالمة', start: 'ابدأ المكالمة', end: 'أنهِ المكالمة', idle: 'خامل', live: 'في مكالمة',
      hands: 'بدون لمس: استمع مجددًا بعد أن يتحدث الوكيل', send: 'إرسال', ph: 'اكتب بدلًا من التحدث…', listening: 'أستمع…', thinking: 'الوكيل يفكر…',
      speaking: 'الوكيل يتحدث…', you: '👤 أنت', agent: '🤖 الوكيل الذكي', nomic: 'هذا المتصفح لا يدعم التعرف على الكلام. اكتب رسائلك.',
      denied: 'تم حظر الميكروفون. اسمح به من المتصفح أو اكتب بدلًا من ذلك.', novoice: 'لا يوجد صوت مثبت لهذه اللغة: سيتم عرض النص فقط.',
      ended: 'انتهت المكالمة وتم حفظها.', logTitle: 'المكالمات المحفوظة', cols: ['الوقت', 'العميل', 'اللغة', 'الردود', 'المدة', 'النتيجة', ''], view: 'النص', none: 'لا توجد مكالمات بعد. ابدأ واحدة من العرض الصوتي المباشر.', calls: n => n + ' مكالمة', unknown: 'عميل غير معروف' },
  };
  const $ = id => document.getElementById(id), tr = () => L[lang] || L.en;
  T.en['page-title-demo'] = 'Live Voice Demo'; T.ar['page-title-demo'] = 'العرض الصوتي المباشر';
  pageTitles.demo = 'page-title-demo';
  T.en['ni-demo'] = 'Live Voice Demo'; T.ar['ni-demo'] = 'العرض الصوتي المباشر';

  let call = null, rec = null, listening = false, busy = false, speaking = false;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasAr = s => /[؀-ۿ]/.test(s);

  function relabel() {
    const x = tr();
    $('demo-title').textContent = x.title; $('demo-l-lead').textContent = x.lead; $('demo-l-lang').textContent = x.language;
    $('demo-start-t').textContent = x.start; $('demo-end-t').textContent = x.end; $('demo-hands-t').textContent = x.hands;
    $('demo-send').textContent = x.send; $('demo-text').placeholder = x.ph; $('demo-state').textContent = call ? x.live : x.idle;
    // Default the call language to the page language while no call is running.
    if (!call) $('demo-lang').value = lang;
  }
  const _applyLang = applyLang;
  applyLang = function (l) { _applyLang(l); relabel(); if ($('view-calllog').classList.contains('active')) renderCallLog(); };

  const status = s => { $('demo-status').textContent = s || ''; };
  function bubble(area, role, text) {
    const x = tr(), d = document.createElement('div');
    d.className = 'transcript-bubble ' + (role === 'user' ? 'client' : 'agent');
    const r = document.createElement('div'); r.className = 'tb-role'; r.textContent = role === 'user' ? x.you : x.agent;
    const b = document.createElement('div'); b.dir = 'auto'; b.textContent = text;
    d.append(r, b); area.appendChild(d); area.scrollTop = area.scrollHeight;
  }
  function setControls() {
    $('demo-start').disabled = !!call; $('demo-end').disabled = !call; $('demo-lead').disabled = !!call; $('demo-lang').disabled = !!call;
    $('demo-text').disabled = !call; $('demo-send').disabled = !call || busy;
    $('demo-mic').disabled = !call || !SR; $('demo-mic').setAttribute('aria-pressed', String(listening));
    $('demo-mic').style.background = listening ? 'var(--hot-bg)' : '';
    $('demo-state').textContent = call ? tr().live : tr().idle;
  }

  // ── speech out ──
  let voices = [];
  const loadVoices = () => { voices = speechSynthesis.getVoices(); };
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function voiceFor(code) {
    const pre = code.slice(0, 2);
    return voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(code.toLowerCase())) || voices.find(v => v.lang.toLowerCase().startsWith(pre));
  }
  function speak(text) {
    return new Promise(done => {
      if (!('speechSynthesis' in window)) return done();
      const code = hasAr(text) ? 'ar-AE' : 'en-US', v = voiceFor(code);
      if (!v) { if (hasAr(text)) status(tr().novoice); return done(); }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang;
      speaking = true; status(tr().speaking);
      u.onend = u.onerror = () => { speaking = false; done(); };
      speechSynthesis.speak(u);
    });
  }

  // ── speech in ──
  function listen() {
    if (!SR || !call || listening || busy || speaking) return;
    rec = new SR(); rec.lang = $('demo-lang').value === 'ar' ? 'ar-AE' : 'en-US'; rec.interimResults = true; rec.continuous = false;
    let finalText = '';
    rec.onstart = () => { listening = true; status(tr().listening); setControls(); };
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) (e.results[i].isFinal ? (finalText += e.results[i][0].transcript) : (interim += e.results[i][0].transcript));
      $('demo-text').value = finalText || interim;
    };
    rec.onerror = e => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { $('demo-hands').checked = false; status(tr().denied); }
    };
    rec.onend = () => {
      listening = false; setControls();
      const text = finalText.trim();
      if (text && call) { $('demo-text').value = ''; say(text); }
      else if (call && $('demo-hands').checked && !busy) setTimeout(listen, 400);
      else if (!busy) status('');
    };
    try { rec.start(); } catch { listening = false; }
  }
  window.demoMicToggle = () => {
    if (!SR) return status(tr().nomic);
    if (listening) { $('demo-hands').checked = false; rec.abort(); } else listen();
  };

  // ── conversation ──
  async function say(text) {
    if (!call || busy) return;
    busy = true; setControls();
    if (text) bubble($('demo-log'), 'user', text);
    status(tr().thinking);
    try {
      const { reply } = await api('POST', `/api/calls/${call.id}/say`, { text });
      bubble($('demo-log'), 'assistant', reply);
      busy = false; setControls();
      await speak(reply);
    } catch (e) { busy = false; status(e.message); setControls(); return; }
    if (call && $('demo-hands').checked) listen(); else status('');
  }
  window.demoSendTyped = () => {
    const t = $('demo-text').value.trim(); if (!t) return;
    if (listening) rec.abort();
    $('demo-text').value = ''; say(t);
  };
  window.demoStart = async () => {
    $('demo-start').disabled = true; $('demo-log').textContent = ''; status('');
    try {
      call = await api('POST', '/api/calls', { lead_name: $('demo-lead').value, lang: $('demo-lang').value });
      setControls();
      if (!SR) status(tr().nomic);
      await say('');
    } catch (e) { call = null; status(e.message); setControls(); }
  };
  window.demoEnd = async () => {
    if (!call) return;
    const id = call.id; call = null;
    if (listening && rec) rec.abort(); if ('speechSynthesis' in window) speechSynthesis.cancel();
    speaking = false; busy = false; setControls();
    try { await api('POST', `/api/calls/${id}/end`, { outcome: 'Demo' }); status(tr().ended); } catch (e) { status(e.message); }
  };
  api('GET', '/api/leads').then(ls => { $('demo-leads').replaceChildren(...ls.map(l => Object.assign(document.createElement('option'), { value: l.name }))); }).catch(() => {});

  // ── saved calls replace the mock call log ──
  const fmtDur = (a, b) => { if (!b) return '—'; const s = Math.max(0, Math.round((new Date(b) - new Date(a)) / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  renderCallLog = async function () {
    const x = tr(), thead = document.querySelector('#view-calllog thead'), body = $('call-log-table');
    thead.replaceChildren(Object.assign(document.createElement('tr'), { innerHTML: x.cols.map(c => `<th>${esc(c)}</th>`).join('') }));
    $('cl-title').textContent = x.logTitle;
    let rows = [];
    try { rows = await api('GET', '/api/calls'); } catch (e) { body.textContent = e.message; return; }
    $('cl-count').textContent = x.calls(rows.length);
    if (!rows.length) { body.innerHTML = `<tr><td colspan="7" style="padding:18px;color:var(--text3)">${esc(x.none)}</td></tr>`; return; }
    body.innerHTML = rows.map(r => `<tr>
      <td style="font-family:var(--font-m);font-size:11px;color:var(--text3)">${esc(new Date(r.started_at).toLocaleString())}</td>
      <td><span style="font-size:12.5px;font-weight:500;color:var(--text)">${esc(r.lead_name || x.unknown)}</span></td>
      <td><span style="font-size:10px;background:var(--bg4);padding:1px 6px;border-radius:3px;font-family:var(--font-m)">${r.lang === 'ar' ? 'AR' : 'EN'}</span></td>
      <td>${esc(r.turns)}</td><td style="font-family:var(--font-m);font-size:12px">${esc(fmtDur(r.started_at, r.ended_at))}</td>
      <td>${esc(r.outcome || '—')}</td>
      <td><button class="btn btn-sm" onclick="showCall(${Number(r.id)})">${esc(x.view)}</button></td></tr>`).join('');
  };
  window.showCall = async id => {
    try {
      const c = await api('GET', '/api/calls/' + id), body = $('cd-body');
      $('cd-title').textContent = c.lead_name + ' · ' + new Date(c.started_at).toLocaleString();
      body.textContent = ''; c.turns.forEach(t => bubble(body, t.role, t.text));
      $('call-detail-modal').classList.add('open');
    } catch (e) { alert(e.message); }
  };
  const me = window.__me || {};
  const n = document.querySelector('.ag-name'), r = document.querySelector('.ag-role');
  if (n) n.textContent = me.email || ''; if (r) r.textContent = [me.role, me.agency].filter(Boolean).join(' · ');
  relabel(); setControls();
})();
