// Serves public/ and and proxies /api/claude so the API key stays server-side.
// Run: ANTHROPIC_API_KEY=sk-... BASIC_AUTH=user:password node server.js   (Node 18+, no dependencies)
const http = require('http'), fs = require('fs'), path = require('path');
const KEY = process.env.ANTHROPIC_API_KEY, PORT = process.env.PORT || 3000;
const AUTH = 'Basic ' + Buffer.from(process.env.BASIC_AUTH || '').toString('base64');
if (!KEY || !/^.+:.+$/.test(process.env.BASIC_AUTH || '')) { console.error('Set ANTHROPIC_API_KEY and BASIC_AUTH=user:password'); process.exit(1); }
// shortcut: per-process, per-IP counter, resets on restart; use a shared store if you run several instances.
const hits = new Map(), LIMIT = 20;
setInterval(() => hits.clear(), 60e3).unref();
const crypto = require('crypto');
const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

const ROOT = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const SEC = {
  'x-content-type-options': 'nosniff', 'x-frame-options': 'DENY', 'referrer-policy': 'same-origin',
};
const LEGACY = { 'observer-re-platform-v10.html': 'platform.html', 'observer-voice-agent.html': 'voice.html' };
const MAX_MSGS = 40, MAX_CHARS = 20000;
const validMsgs = m => Array.isArray(m) && m.length > 0 && m.length <= MAX_MSGS &&
  m.every(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string' && x.content.length <= MAX_CHARS);

http.createServer(async (req, res) => {
  for (const k in SEC) res.setHeader(k, SEC[k]);
  const url = req.url.split('?')[0];
  if (url === '/health') return res.writeHead(200, { 'content-type': 'application/json' }).end('{"ok":true}');
  if (!same(req.headers.authorization || '', AUTH)) return res.writeHead(401, { 'www-authenticate': 'Basic realm="Observer"' }).end();
  if (req.method === 'POST' && url === '/api/claude') {
    // Same-origin only: a cross-site page must not be able to spend the API key.
    const origin = req.headers.origin;
    if (origin && new URL(origin).host !== req.headers.host) return res.writeHead(403).end('{"error":"forbidden origin"}');
    if (!/^application\/json/.test(req.headers['content-type'] || '')) return res.writeHead(415).end('{"error":"json only"}');
    const ip = req.socket.remoteAddress, n = (hits.get(ip) || 0) + 1;
    hits.set(ip, n);
    if (n > LIMIT) return res.writeHead(429).end('{"error":"rate limited"}');
    let body = '';
    for await (const c of req) { body += c; if (body.length > 1e6) return res.writeHead(413).end(); }
    try {
      const { system, messages } = JSON.parse(body);
      if (!validMsgs(messages) || (system !== undefined && (typeof system !== 'string' || system.length > MAX_CHARS))) throw 0;
      // Model and max_tokens are fixed here so a browser caller cannot raise cost.
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 1000, system, messages }),
      });
      res.writeHead(r.status, { 'content-type': 'application/json' }).end(await r.text());
    } catch { res.writeHead(400).end('{"error":"bad request"}'); }
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405).end();
  // Static files from public/ only; '/' and the old file names map to the new pages.
  let rel = url === '/' ? 'platform.html' : url.replace(/^\//, '');
  rel = LEGACY[rel] || rel;
  let file;
  try { file = path.join(ROOT, decodeURIComponent(rel)); } catch { return res.writeHead(400).end(); }
  if (!file.startsWith(ROOT + path.sep) || !TYPES[path.extname(file)] || !fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] }).end(fs.readFileSync(file));
}).listen(PORT, () => console.log('http://localhost:' + PORT));
