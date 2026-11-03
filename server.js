// Local/Node-host server: static files from public/ plus the same /api router Vercel uses.
// Run: DATABASE_URL=postgres://... SESSION_SECRET=<32+ chars> [ANTHROPIC_API_KEY=sk-...] node server.js   (Node 18+)
const http = require('http'), fs = require('fs'), path = require('path');
const { handle } = require('./lib/router');
const PORT = process.env.PORT || 3000, ROOT = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const SEC = { 'x-content-type-options': 'nosniff', 'x-frame-options': 'DENY', 'referrer-policy': 'same-origin' };
const LEGACY = { 'observer-re-platform-v10.html': 'platform.html', 'observer-voice-agent.html': 'voice.html' };

http.createServer(async (req, res) => {
  for (const k in SEC) res.setHeader(k, SEC[k]);
  if (await handle(req, res)) return;
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405).end();
  const url = req.url.split('?')[0];
  let rel = url === '/' ? 'platform.html' : url.replace(/^\//, '');
  rel = LEGACY[rel] || rel;
  let file;
  try { file = path.join(ROOT, decodeURIComponent(rel)); } catch { return res.writeHead(400).end(); }
  if (!file.startsWith(ROOT + path.sep) || !TYPES[path.extname(file)] || !fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] }).end(fs.readFileSync(file));
}).listen(PORT, () => console.log('http://localhost:' + PORT));
