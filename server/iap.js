// BOOMPUFF v11 — Google Play uygulama içi satın alma doğrulaması (sunucu tarafı).
// Akış: cihaz Google Play'den satın alır → purchaseToken'ı POST /api/iap/verify ile gönderir → sunucu Google Play Developer API
// ile token'ı doğrular (purchaseState=0, ürün kimliği eşleşir) → aynı token daha önce işlendiyse REDDEDER → içerik (grant) döner.
// Cihaz içeriği yalnızca bu yanıttan sonra ekler ve satın almayı tüketir (finish). Gizli anahtar istemciye ASLA gönderilmez.
// Gerekli ortam değişkenleri (Render → Environment):
//   GOOGLE_PLAY_PACKAGE   örn. com.boompuff.game  (capacitor.config.json → appId)
//   GOOGLE_PLAY_SA_JSON   Google Cloud hizmet hesabı anahtarı (JSON metni ya da base64). Play Console'da bu hesaba "finansal veri görüntüleme" izni verilmeli.
//   IAP_LEDGER_FILE       (isteğe bağlı) işlenen token kaydı; varsayılan ./data/iap-ledger.json — KALICI disk gerekir (Render ücretsiz planda disk kalıcı değildir).
'use strict';
const crypto = require('crypto'), fs = require('fs'), path = require('path');
const { byId } = require('./catalog');
const PKG = process.env.GOOGLE_PLAY_PACKAGE || '';
let SA = null;
try { const raw = process.env.GOOGLE_PLAY_SA_JSON || ''; if (raw) SA = JSON.parse(raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8')); } catch (e) { console.error('GOOGLE_PLAY_SA_JSON okunamadı'); }
const configured = () => !!(PKG && SA && SA.client_email && SA.private_key);

// ---- işlenmiş token kaydı (aynı ödeme iki kez işlenmez) ----
const LEDGER = path.resolve(__dirname, process.env.IAP_LEDGER_FILE || 'data/iap-ledger.json');
let ledger = {};
try { ledger = JSON.parse(fs.readFileSync(LEDGER, 'utf8')) || {}; } catch (e) { ledger = {}; }
const tokKey = t => crypto.createHash('sha256').update(String(t)).digest('hex');
function record(token, info) { ledger[tokKey(token)] = info; try { fs.mkdirSync(path.dirname(LEDGER), { recursive: true }); fs.writeFileSync(LEDGER, JSON.stringify(ledger)); } catch (e) { console.error('IAP kaydı yazılamadı', e.message); } }
const pending = new Set(); // aynı anda gelen iki istek de işlenmesin

// ---- Google OAuth (hizmet hesabı JWT, RS256) ----
let tok = null;
async function accessToken() {
  if (tok && tok.exp > Date.now() + 60000) return tok.v;
  const now = Math.floor(Date.now() / 1000), b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const body = b64({ alg: 'RS256', typ: 'JWT' }) + '.' + b64({ iss: SA.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 });
  const sig = crypto.createSign('RSA-SHA256').update(body).sign(SA.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + body + '.' + sig });
  if (!r.ok) throw new Error('oauth ' + r.status);
  const j = await r.json(); tok = { v: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 }; return tok.v;
}

// POST gövdesi: { productId, purchaseToken }  →  { ok, grant, productId } | { ok:false, code, msg }
async function verify(body) {
  const product = byId(body && body.productId), token = body && typeof body.purchaseToken === 'string' ? body.purchaseToken.slice(0, 4096) : '';
  if (!product || !token) return [400, { ok: false, code: 'bad', msg: 'Geçersiz ürün ya da ödeme bilgisi.' }];
  if (!configured()) return [503, { ok: false, code: 'not_configured', msg: 'Ödeme doğrulaması henüz yapılandırılmadı.' }];
  const k = tokKey(token);
  if (ledger[k] || pending.has(k)) return [409, { ok: false, code: 'already', msg: 'Bu ödeme daha önce işlendi.' }];
  pending.add(k);
  try {
    const at = await accessToken();
    const u = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(PKG)}/purchases/products/${encodeURIComponent(product.id)}/tokens/${encodeURIComponent(token)}`;
    const r = await fetch(u, { headers: { authorization: 'Bearer ' + at } });
    if (r.status === 404 || r.status === 400) return [402, { ok: false, code: 'invalid', msg: 'Ödeme Google Play tarafından doğrulanamadı.' }];
    if (!r.ok) return [502, { ok: false, code: 'upstream', msg: 'Google Play şu an yanıt vermiyor; birazdan tekrar deneyin.' }];
    const g = await r.json();
    // purchaseState: 0 satın alındı, 1 iptal, 2 beklemede · consumptionState: 1 ise zaten tüketilmiş
    if (g.purchaseState !== 0) return [402, { ok: false, code: g.purchaseState === 2 ? 'pending' : 'cancelled', msg: g.purchaseState === 2 ? 'Ödeme beklemede.' : 'Ödeme iptal edilmiş.' }];
    if (g.consumptionState === 1) return [409, { ok: false, code: 'already', msg: 'Bu ödeme daha önce kullanılmış.' }];
    record(token, { p: product.id, at: Date.now(), order: g.orderId || null, test: g.purchaseType === 0 });
    return [200, { ok: true, productId: product.id, grant: product.grant, test: g.purchaseType === 0 }];
  } catch (e) { console.error('IAP doğrulama hatası', e.message); return [502, { ok: false, code: 'error', msg: 'Doğrulama sırasında hata oluştu.' }]; }
  finally { pending.delete(k); }
}
module.exports = { verify, configured };
