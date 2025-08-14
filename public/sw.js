const CACHE_NAME = '2048-game-v1';
const urlsToCache = [
	'/',
	'/manifest.json',
	'/favicon.ico',
	'/images/2.gif',
	'/images/4.gif',
	'/images/8.gif',
	'/images/16.gif',
	'/images/32.gif',
	'/images/64.gif',
	'/images/128.gif',
	'/images/256.gif',
	'/images/512.gif',
	'/images/1024.gif',
	'/images/2048.gif',
];

// Install event
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
			.catch(error => {
				console.log('Cache addAll failed:', error);
			})
	);
});

// Fetch event
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			// Return cached version or fetch from network
			return response || fetch(event.request);
		})
	);
});

// Activate event
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheName !== CACHE_NAME) {
						console.log('Deleting old cache:', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
