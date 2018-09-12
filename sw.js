var CACHE_NAME = 'timelapses-cache-v11';
var urlsToCache = [
    '.',
    'css/dark-theme-v003.css',
    'css/light-theme-v004.css',
    'css/main-v004.css',
    'css/normalize.css',
    'js/checkAncients.js',
    'js/main.js',
    'js/pako.min.js',
    'js/readSave.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.has(CACHE_NAME).then(function(cacheExists) {
            if (cacheExists) {
                caches.match(event.request).then(function(response) {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                });
            } else {
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.addAll(urlsToCache).then(function() {
                        caches.match(event.request).then(function(response) {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        });
                    });
                });
            }
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (cacheName.slice(0,16) == "timelapses-cache") {
                        if (cacheName !== CACHE_NAME) return true;
                    }
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    );
});
