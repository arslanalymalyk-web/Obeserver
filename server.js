// Serves the mockups and proxies /api/claude so the API key stays server-side.
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

http.createServer(async (req, res) => {
  if (!same(req.headers.authorization || '', AUTH)) return res.writeHead(401, { 'www-authenticate': 'Basic realm="Observer"' }).end();
  if (req.method === 'POST' && req.url === '/api/claude') {
    const ip = req.socket.remoteAddress, n = (hits.get(ip) || 0) + 1;
    hits.set(ip, n);
    if (n > LIMIT) return res.writeHead(429).end('{"error":"rate limited"}');
    let body = '';
    for await (const c of req) { body += c; if (body.length > 1e6) return res.writeHead(413).end(); }
    try {
      const { system, messages } = JSON.parse(body);
      if (!Array.isArray(messages)) throw 0;
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
  // Only top-level .html files are served.
  const name = req.url === '/' ? 'observer-re-platform-v10.html' : path.basename(req.url.split('?')[0]);
  if (!name.endsWith('.html') || !fs.existsSync(path.join(__dirname, name))) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(fs.readFileSync(path.join(__dirname, name)));
}).listen(PORT, () => console.log('http://localhost:' + PORT));
