const staticCacheName = 'restaurant-v1';

// Install service worker and cache URLs
self.addEventListener('install', event => {
  const urlsToCache = [
    '/',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'js/dbhelper.js',
    'js/main.js',
    'js/register-sw.js',
    'js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
  ];
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker
// and delete old cache where applicable
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith('restaurant-') &&
              cacheName != staticCacheName
            );
          })
          .map(cacheName => {
            return cache.delete(cacheName);
          })
      );
    })
  );
});

// fetch urls from cache (when available)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
