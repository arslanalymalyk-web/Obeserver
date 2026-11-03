// Bundles the standalone prototypes into single self-contained HTML files (CSS and JS inlined, no network, no dependencies).
// Run: node scripts/build-single-file.js   -> dist/portfolio-prototype.html, dist/voice-simulation.html
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'public'), out = path.join(__dirname, '..', 'dist');
const read = p => fs.readFileSync(p, 'utf8');

function bundle(htmlPath, rewrite) {
  const dir = path.dirname(htmlPath);
  let html = read(htmlPath);
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">\n?/g, (_, href) => `<style>\n${read(path.resolve(dir, href))}\n</style>\n`);
  html = html.replace(/<script src="([^"]+)"><\/script>\n?/g, (_, src) => `<script>\n${read(path.resolve(dir, src)).replace(/<\/script/gi, '<\\/script')}\n</script>\n`);
  return rewrite(html);
}
fs.mkdirSync(out, { recursive: true });

// Portfolio prototype: cross-links point at the sibling single files.
const portfolio = bundle(path.join(root, 'demo', 'index.html'), h => h.replace(/href="voice\.html"/g, 'href="voice-simulation.html"').replace(/'voice\.html'/g, "'voice-simulation.html'").replace(/href="voice\.html"/g, 'href="voice-simulation.html"'));
// In the bundle the app script builds links with the string "voice.html"; point those at the sibling file too.
const portfolioFixed = portfolio.replace(/href="voice\.html"/g, 'href="voice-simulation.html"');
fs.writeFileSync(path.join(out, 'portfolio-prototype.html'), portfolioFixed);

const voice = bundle(path.join(root, 'demo', 'voice.html'), h => h
  .replace(/href="index\.html"/g, 'href="portfolio-prototype.html"')
  .replace("location.pathname.includes('/demo/')?'index.html':'demo/index.html'", "'portfolio-prototype.html'"));
fs.writeFileSync(path.join(out, 'voice-simulation.html'), voice);
for (const f of ['portfolio-prototype.html', 'voice-simulation.html']) console.log(f.padEnd(28), (fs.statSync(path.join(out, f)).size / 1024).toFixed(0) + ' KB');
