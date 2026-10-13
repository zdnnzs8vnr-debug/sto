/* GUSTAVOEURO service worker — network-first per navigazione, cache-first per asset */
const CACHE = 'ge-v4.1';
const ASSETS = ['/', '/index.html', '/404.html', '/manifest.webmanifest', '/note10.png', '/qr-sol.png', '/qr-btc.png', '/qr-ltc.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isDoc) {
    e.respondWith(
      fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put('/index.html', cp)); return res; })
        .catch(() => caches.match('/index.html').then(r => r || caches.match('/')))
    );
    return;
  }
  if (url.origin === location.origin || /i\.ibb\.co|api\.qrserver\.com|fonts\.g|unpkg\.com|jsdelivr|tailwindcss/.test(url.host)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
        return res;
      }).catch(() => hit))
    );
  }
});
