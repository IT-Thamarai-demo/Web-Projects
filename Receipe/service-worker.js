const CACHE_NAME = 'recipe-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icons/192x192.png',
  '/icons/512x512.png'
];

// Install service worker and cache assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch assets from cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Serve cached file or fallback to network
      return response || fetch(event.request).then(function(networkResponse) {
        // Optionally cache new requests that weren't cached before
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(function() {
      // Fallback for when both cache and network fail
      return caches.match('/index.html');
    })
  );
});
