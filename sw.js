if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(function(registration) {
            console.log('Service worker registered:', registration);
        })
        .catch(function(error) {
            console.log('Service worker registration failed:', error);
        });
}

function updateOnlineStatus(event) {
    if (navigator.onLine) {
        document.getElementById('status').textContent = 'En ligne';
    } else {
        document.getElementById('status').textContent = 'Hors-ligne';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

const urlsToCache = ['/', "style.css", "icon512.png"];

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open("pwa-assets");
        cache.addAll(urlsToCache);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
            // Try to fetch the resource from the network.
            const fetchResponse = await fetch(event.request);

            // Save the resource in the cache.
            cache.put(event.request, fetchResponse.clone());

            // And return it.
            return fetchResponse;
        } catch (e) {
            // Fetching didn't work get the resource from the cache.
            const cachedResponse = await cache.match(event.request);

            // And return it.
            return cachedResponse;
        }
    })());
});