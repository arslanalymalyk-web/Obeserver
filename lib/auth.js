const crypto = require('crypto');
const COOKIE = 'obs_session', TTL = 7 * 864e5;
const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET must be set (32+ chars)');
  return s;
};
const sign = p => crypto.createHmac('sha256', secret()).update(p).digest('base64url');
const eq = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

const scrypt = (pw, salt) => new Promise((ok, no) => crypto.scrypt(pw, salt, 64, (e, k) => e ? no(e) : ok(k)));
async function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  return salt.toString('hex') + ':' + (await scrypt(pw, salt)).toString('hex');
}
async function checkPassword(pw, stored) {
  const [salt, key] = String(stored).split(':');
  if (!salt || !key) return false;
  return eq((await scrypt(pw, Buffer.from(salt, 'hex'))).toString('hex'), key);
}
function makeCookie(user, secure) {
  const p = Buffer.from(JSON.stringify({ uid: user.id, tid: user.tenant_id, role: user.role, exp: Date.now() + TTL })).toString('base64url');
  return `${COOKIE}=${p}.${sign(p)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${TTL / 1000}${secure ? '; Secure' : ''}`;
}
const clearCookie = () => `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
function readSession(req) {
  const m = (req.headers.cookie || '').split(/;\s*/).find(c => c.startsWith(COOKIE + '='));
  if (!m) return null;
  const [p, sig] = m.slice(COOKIE.length + 1).split('.');
  if (!p || !sig || !eq(sig, sign(p))) return null;
  try {
    const s = JSON.parse(Buffer.from(p, 'base64url').toString());
    return s.exp > Date.now() ? s : null;
  } catch { return null; }
}
module.exports = { hashPassword, checkPassword, makeCookie, clearCookie, readSession };
