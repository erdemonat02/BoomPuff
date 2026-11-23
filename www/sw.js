// BOOMPUFF v9 — çevrimdışı önbellek (yalnızca tarayıcı/PWA sürümünde kullanılır; Capacitor uygulamasında dosyalar zaten yereldir)
const CACHE = 'boompuff-v11.8.0';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './net-config.js', './i18n.js', './chat-filter.js', './fonts/fonts.css'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Aynı kaynak: önce önbellek, arkada güncelle. Yazı tipi (Google Fonts) yalnızca ağdan; başarısızsa sistem yazı tipi kullanılır.
  if (url.origin === location.origin && !url.pathname.startsWith('/api/')) { // v11: mağaza/ödeme API'si önbelleğe alınmaz
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
