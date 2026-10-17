/* Guarda o aplicativo no aparelho para abrir mesmo sem internet.
   Os dados ficam no cache próprio do Firestore; aqui só vão as telas e bibliotecas. */
const VERSAO = 'fazenda-v1';
const BASE = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const LIBS = ['www.gstatic.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    /* telas: tenta a versão mais nova na internet; sem conexão, usa a guardada */
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSAO).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  if (LIBS.includes(url.hostname)) {
    /* bibliotecas e fontes: usa a guardada e atualiza por trás */
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(VERSAO).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
