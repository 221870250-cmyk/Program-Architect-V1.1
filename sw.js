const CACHE_NAME = 'program-architect-v10';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.png',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap'
];

// Install: Cache core files and SKIP WAITING IMMEDIATELY
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Critical for Edge/Chrome updates
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate: Clean up old caches and CLAIM CLIENTS IMMEDIATELY
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Take control of unregulated clients
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch: Serve from cache if offline, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategy: Network First for HTML and Manifest to avoid stale versions
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('manifest.json') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Strategy: Stale-While-Revalidate for other assets
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
             const responseToCache = networkResponse.clone();
             caches.open(CACHE_NAME).then((cache) => {
               if (event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
               }
             });
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
  );
});