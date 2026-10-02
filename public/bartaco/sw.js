/* ============================================================
   bartaco Recipe Book — service worker
   Precaches the app shell + all drink images for offline use.
   Bump CACHE_VERSION whenever assets change to refresh clients.
   ============================================================ */

const CACHE_VERSION = 'bt-recipes-v3';

const APP_SHELL = [
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './data/recipes.json',
  './img/icon.svg',
  // drink images
  './img/mojito.png',
  './img/oaxacan-sunshine.png',
  './img/old-thymer.png',
  './img/summer-caipirinha.png',
  './img/classic-caipirinha.png',
  './img/paloma-fresca.png',
  './img/bartaco-spicy-margarita.png',
  './img/bartaco-green-margarita.png',
  './img/libelula_reposado_margarita.png',
  './img/bartaco-old-fashioned.png',
  './img/cazuela.png',
  './img/pineapple-pisco-punch.png',
  './img/watermelon-mint-marg.png',
  './img/watermelon-limonada.png',
  './img/cucumber-cooler.png',
  './img/yuzu-arnie-palmer.png',
  './img/zero-proof-marg.png',
  './img/tilden-lacewing.png'
];

// Install: precache the shell. Use individual adds so one 404 doesn't abort all.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async (cache) => {
      await Promise.all(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[sw] skip caching', url, err);
          })
        )
      );
      self.skipWaiting();
    })
  );
});

// Activate: drop old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
//   - recipes.json: network-first (so edits show up), fall back to cache offline.
//   - everything else (GET): cache-first, fall back to network and cache it.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isRecipes = url.pathname.endsWith('/data/recipes.json') ||
                    url.pathname.endsWith('recipes.json');

  if (isRecipes) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
