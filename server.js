// Serves the mockups and proxies /api/claude so the API key stays server-side.
// Run: ANTHROPIC_API_KEY=sk-... node server.js   (Node 18+, no dependencies)
const http = require('http'), fs = require('fs'), path = require('path');
const KEY = process.env.ANTHROPIC_API_KEY, PORT = process.env.PORT || 3000;
if (!KEY) { console.error('Set ANTHROPIC_API_KEY'); process.exit(1); }

http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/claude') {
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
  // shortcut: serves only top-level .html files, no auth or rate limit; add both before exposing publicly.
  const name = req.url === '/' ? 'observer-re-platform-v10.html' : path.basename(req.url.split('?')[0]);
  if (!name.endsWith('.html') || !fs.existsSync(path.join(__dirname, name))) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(fs.readFileSync(path.join(__dirname, name)));
}).listen(PORT, () => console.log('http://localhost:' + PORT));
