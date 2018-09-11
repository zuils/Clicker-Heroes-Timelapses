var CACHE_NAME = 'timelapses-cache-v3';
var urlsToCache = [
    '.',
    'css/dark-theme-v002.css',
    'css/light-theme-v002.css',
    'css/main-v003.css',
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
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
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
                /*cacheNames.map(function(cacheName) {
                    if (cacheName.slice(0,16) == "timelapses-cache") {
                        if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
                    }
                })*/
            )
        })
    );
});
