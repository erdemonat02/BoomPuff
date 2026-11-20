// BOOMPUFF v10 — online oda sunucusu (Node.js + WebSocket)
// • Oda oluşturma / 6 haneli davet kodu / herkese açık oda listesi / 2–8 kişi / hazır durumu / ayrılma
// • Maç sırasında oyun durumu "oda sahibi otoritesi" ile akar: oda sahibinin istemcisi fiziği çalıştırır,
//   diğer oyuncuların girdileri sunucu üzerinden ona iletilir; durum anlık görüntüleri ve patlama/arazi olayları herkese yayılır.
//   Sunucu: koltuk/sıra sahipliğini doğrular (bir oyuncu yalnızca kendi koltuğu adına girdi gönderebilir), sonuç bildirimini
//   yalnızca oda sahibinden kabul eder ve kazananın odada olduğunu kontrol eder.
// • Kopma: oturum jetonu ile 60 sn içinde aynı koltuğa yeniden bağlanma; oda sahibi koparsa 45 sn beklenir, dönmezse oda kapanır.
// • Aynı süreç oyunun statik dosyalarını da sunar (STATIC_DIR) → tek bir web servisi olarak yayınlanabilir.
// Gizli anahtar/API anahtarı GEREKMEZ. Ortam değişkenleri: PORT, STATIC_DIR, ALLOWED_ORIGINS (virgülle; boşsa hepsi)
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { WebSocketServer } = require('ws');
const PORT = +process.env.PORT || 8787;
const ROOT = path.resolve(__dirname, process.env.STATIC_DIR || '../www');
const ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const VERSION = 1, MAX_MSG = 96 * 1024, RECONNECT_MS = 60000, HOST_WAIT_MS = 45000, LOBBY_GRACE_MS = 20000;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8' };

// ---------- statik dosyalar + sağlık kontrolü ----------
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/health') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ ok: true, rooms: rooms.size, v: VERSION })); }
  let p = decodeURIComponent(u.pathname); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(ROOT, path.normalize(p).replace(/^([/\\])+/, ''));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, b) => { if (e) { res.writeHead(404); return res.end('404'); } res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-cache' }); res.end(b); });
});

// ---------- odalar ----------
const rooms = new Map();      // code → room
const sessions = new Map();   // token → player
const ALPH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newCode = () => { for (;;) { let c = ''; for (let i = 0; i < 6; i++) c += ALPH[crypto.randomInt(ALPH.length)]; if (!rooms.has(c)) return c; } };
const clean = (s, n) => String(s || '').replace(/[<>&"'`\u0000-\u001f]/g, '').trim().slice(0, n);
const SPECIES = ['rabbit', 'monkey', 'bear', 'bee', 'tiger', 'fox'], MAPS = ['jungle', 'volcano', 'city', 'ice', 'desert', 'harbor', 'random'];
const send = (ws, o) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); };
const pub = r => ({ code: r.code, host: r.host, cap: r.cap, map: r.map, turn: r.turn, pub: r.pub, state: r.state,
  players: r.players.map(p => ({ id: p.id, name: p.name, sp: p.sp, cos: p.cos, ready: p.ready, seat: p.seat, online: !!p.ws })) });
const bcast = (r, o, except) => { for (const p of r.players) if (p.ws && p !== except) send(p.ws, o); };
const roomInfo = r => bcast(r, { t: 'room', room: pub(r) });
const hostOf = r => r.players.find(p => p.id === r.host);

function leaveRoom(p, why) {
  const r = p.room && rooms.get(p.room); p.room = null; if (!r) return;
  r.players = r.players.filter(q => q !== p); p.ready = false;
  if (!r.players.length) { clearTimeout(r.hostTimer); rooms.delete(r.code); return; }
  if (r.host === p.id) {
    if (r.state === 'lobby') { r.host = r.players[0].id; roomInfo(r); }
    else { bcast(r, { t: 'closed', why: 'host-left' }); for (const q of r.players) q.room = null; clearTimeout(r.hostTimer); rooms.delete(r.code); return; }
  } else if (r.state === 'playing') { bcast(r, { t: 'presence', seat: p.seat, online: false, left: true }); }
  roomInfo(r);
}

function onMessage(ws, p, m) {
  const r = p.room && rooms.get(p.room);
  switch (m.t) {
    case 'profile': p.name = clean(m.name, 14) || 'Oyuncu'; p.sp = SPECIES.includes(m.sp) ? m.sp : 'monkey'; p.cos = {}; if (m.cos && typeof m.cos === 'object') for (const k of ['hat', 'helmet', 'glasses', 'neck', 'outfit', 'pattern', 'fx']) if (typeof m.cos[k] === 'string') p.cos[k] = clean(m.cos[k], 16); if (r) roomInfo(r); break;
    case 'list': send(ws, { t: 'rooms', rooms: [...rooms.values()].filter(x => x.pub).slice(0, 40).map(x => ({ code: x.code, host: (hostOf(x) || {}).name, n: x.players.length, cap: x.cap, state: x.state, map: x.map })) }); break;
    case 'create': {
      if (r) leaveRoom(p);
      const room = { code: newCode(), host: p.id, cap: Math.max(2, Math.min(8, m.cap | 0 || 4)), map: MAPS.includes(m.map) ? m.map : 'random', turn: [20, 30, 45].includes(m.turn) ? m.turn : 30, pub: !!m.pub, state: 'lobby', players: [], seed: 0, created: Date.now() };
      rooms.set(room.code, room); p.room = room.code; p.ready = false; room.players.push(p); send(ws, { t: 'joined', code: room.code }); roomInfo(room); break; }
    case 'join': {
      const room = rooms.get(clean(m.code, 6).toUpperCase());
      if (!room) return send(ws, { t: 'err', code: 'nf', msg: 'Bu kodla bir oda bulunamadı.' });
      if (room.state !== 'lobby') return send(ws, { t: 'err', code: 'started', msg: 'Bu odada maç başladı; şu an katılamazsın.' });
      if (room.players.length >= room.cap) return send(ws, { t: 'err', code: 'full', msg: `Oda dolu (${room.players.length}/${room.cap}).` });
      if (r && r !== room) leaveRoom(p);
      if (!room.players.includes(p)) room.players.push(p); p.room = room.code; p.ready = false; send(ws, { t: 'joined', code: room.code }); roomInfo(room); break; }
    case 'leave': leaveRoom(p); send(ws, { t: 'left' }); break;
    case 'ready': if (r && r.state === 'lobby') { p.ready = !!m.v; roomInfo(r); } break;
    case 'settings': if (r && r.host === p.id && r.state === 'lobby') { if (MAPS.includes(m.map)) r.map = m.map; if ([20, 30, 45].includes(m.turn)) r.turn = m.turn; if (m.cap) r.cap = Math.max(r.players.length, 2, Math.min(8, m.cap | 0)); if ('pub' in m) r.pub = !!m.pub; roomInfo(r); } break;
    case 'start': {
      if (!r || r.host !== p.id || r.state !== 'lobby') return;
      if (r.players.length < 2) return send(ws, { t: 'err', code: 'few', msg: 'En az 2 oyuncu gerekli.' });
      if (r.players.some(q => q.id !== r.host && !q.ready)) return send(ws, { t: 'err', code: 'ready', msg: 'Herkes hazır değil.' });
      r.state = 'playing'; r.seed = crypto.randomInt(1e9); r.players.forEach((q, i) => q.seat = i);
      r.startMsg = { t: 'start', seed: r.seed, map: r.map === 'random' ? MAPS[crypto.randomInt(6)] : r.map, turn: r.turn, hostSeat: hostOf(r).seat, seats: r.players.map(q => ({ seat: q.seat, id: q.id, name: q.name, sp: q.sp, cos: q.cos })) };
      bcast(r, r.startMsg); roomInfo(r); break; }
    // ---- maç trafiği ----
    case 'in': { // oyuncu → oda sahibi (koltuk sunucu tarafından damgalanır; başkası adına girdi gönderilemez)
      if (!r || r.state !== 'playing') return; const h = hostOf(r); if (h && h.ws && h !== p) send(h.ws, { t: 'in', seat: p.seat, d: m.d }); break; }
    case 'snap': case 'ev': // oda sahibi → herkes
      if (!r || r.host !== p.id) return; bcast(r, { t: m.t, d: m.d }, p); break;
    case 'sync': // oda sahibi → tek oyuncu (yeniden bağlanan)
      if (!r || r.host !== p.id) return; { const q = r.players.find(x => x.seat === m.seat); if (q) send(q.ws, { t: 'sync', d: m.d }); } break;
    case 'result': {
      if (!r || r.host !== p.id || r.state !== 'playing') return;
      const w = m.winner; if (w !== null && !r.players.some(q => q.seat === w)) return send(ws, { t: 'err', code: 'bad', msg: 'Geçersiz sonuç' });
      r.state = 'ended'; r.result = { winner: w, at: Date.now() }; bcast(r, { t: 'final', winner: w, names: r.players.map(q => [q.seat, q.name]) }); roomInfo(r);
      setTimeout(() => { if (rooms.get(r.code) === r) { r.state = 'lobby'; for (const q of r.players) q.ready = false; roomInfo(r); } }, 4000); break; }
    case 'ping': send(ws, { t: 'pong', at: m.at }); break;
  }
}

const wss = new WebSocketServer({ server, maxPayload: MAX_MSG, verifyClient: info => !ORIGINS.length || ORIGINS.includes(info.origin) });
wss.on('connection', ws => {
  let p = null; ws.alive = true; ws.on('pong', () => ws.alive = true);
  ws.on('message', buf => {
    let m; try { m = JSON.parse(buf); } catch (e) { return; }
    if (!p) { // ilk mesaj: hello {token?}
      if (m.t !== 'hello') return ws.close();
      const old = m.token && sessions.get(m.token);
      if (old && Date.now() - old.lastSeen < RECONNECT_MS + 5000) { p = old; if (p.ws && p.ws !== ws) try { p.ws.close(); } catch (e) {} }
      else { p = { id: crypto.randomUUID().slice(0, 8), token: crypto.randomBytes(18).toString('base64url'), name: 'Oyuncu', sp: 'monkey', cos: {}, ready: false, seat: -1, room: null, ws: null, lastSeen: Date.now() }; sessions.set(p.token, p); }
      p.ws = ws; p.lastSeen = Date.now(); clearTimeout(p.dropTimer);
      send(ws, { t: 'welcome', id: p.id, token: p.token, v: VERSION });
      const r = p.room && rooms.get(p.room);
      if (r) { roomInfo(r); if (r.state === 'playing') {
        send(ws, r.startMsg); bcast(r, { t: 'presence', seat: p.seat, online: true }, p);
        if (r.host === p.id) { clearTimeout(r.hostTimer); r.hostTimer = null; bcast(r, { t: 'host-back' }, p); }
        else { const h = hostOf(r); if (h) send(h.ws, { t: 'resync', seat: p.seat }); } } }
      return;
    }
    p.lastSeen = Date.now(); try { onMessage(ws, p, m); } catch (e) { console.error('mesaj hatası', m && m.t, e.message); }
  });
  ws.on('close', () => {
    if (!p || p.ws !== ws) return; p.ws = null; p.lastSeen = Date.now();
    const r = p.room && rooms.get(p.room); if (!r) return;
    if (r.state === 'lobby') { p.dropTimer = setTimeout(() => { if (!p.ws) leaveRoom(p); }, LOBBY_GRACE_MS); roomInfo(r); return; }
    bcast(r, { t: 'presence', seat: p.seat, online: false });
    if (r.host === p.id) { bcast(r, { t: 'host-lost', wait: HOST_WAIT_MS }); r.hostTimer = setTimeout(() => { if (rooms.get(r.code) === r && !p.ws) { bcast(r, { t: 'closed', why: 'host-timeout' }); for (const q of r.players) q.room = null; rooms.delete(r.code); } }, HOST_WAIT_MS); }
    p.dropTimer = setTimeout(() => { if (!p.ws && rooms.get(r.code) === r && r.host !== p.id) leaveRoom(p); }, RECONNECT_MS);
  });
});
// bağlantı nabzı + bayat oturum temizliği
setInterval(() => { for (const ws of wss.clients) { if (!ws.alive) { ws.terminate(); continue; } ws.alive = false; try { ws.ping(); } catch (e) {} }
  const now = Date.now(); for (const [t, p] of sessions) if (!p.ws && !p.room && now - p.lastSeen > 10 * 60000) sessions.delete(t);
  for (const [c, r] of rooms) if (!r.players.some(p => p.ws) && now - r.created > 30 * 60000) rooms.delete(c); }, 15000);
server.listen(PORT, () => console.log(`BOOMPUFF sunucusu: http://localhost:${PORT}  (statik: ${ROOT})`));
