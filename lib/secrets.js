// AES-256-GCM for integration credentials stored in the database. Key: DATA_KEY, or SESSION_SECRET if unset.
// Rotating the key makes stored credentials unreadable (the admin re-enters them); nothing is ever returned by the API.
const crypto = require('crypto');
const key = () => {
  const s = process.env.DATA_KEY || process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('DATA_KEY or SESSION_SECRET (32+ chars) must be set');
  return crypto.scryptSync(s, 'observer-integration-config', 32);
};
function encrypt(obj) {
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const ct = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  return [iv, c.getAuthTag(), ct].map(b => b.toString('base64url')).join('.');
}
function decrypt(str) {
  try {
    const [iv, tag, ct] = String(str).split('.').map(x => Buffer.from(x, 'base64url'));
    const d = crypto.createDecipheriv('aes-256-gcm', key(), iv); d.setAuthTag(tag);
    return JSON.parse(Buffer.concat([d.update(ct), d.final()]).toString('utf8'));
  } catch { return null; }
}
module.exports = { encrypt, decrypt };
