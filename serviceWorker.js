var CACHE_NAME = 'static-v1';

self.addEventListener('install', event => {
	self.skipWaiting();	
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll([
				'/',
				'index.php',
				'serviceWorker.js',
				'js/main.js',
				'manifest.json',
			]);
		})
	)
});

self.addEventListener('activate', function activator(event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys
				.filter(function (key) {
				return key.indexOf(CACHE_NAME) !== 0;
			})
				.map(function (key) {
					return caches.delete(key);
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(function (cachedResponse) {
			return cachedResponse || fetch(event.request);
		})
	);
});

self.addEventListener('push', event =>{
	event.waitUntil(
		self.registration.showNotification(
			'Sandubão Itapecerica',
			{
				body:event.data.text(),
				icon:'images/icons/icon-72x72.png',
				data:{
					id:'1',
					url:'https://sandubaoitapecerica.com.br/#restaurant-menu',
				},
				actions:[
					{title:"Arquivar", action:"arquivar"},
					{title:"Marcar como lido", action:"marcar_lido"}
				]
			}
		)
	);
});

/*
DADOS DINÂMICOS
self.addEventListener('push', event =>{
	var data = JSON.parse(event.data.text());
	event.waitUntil(
		self.registration.showNotification(
			data.title,
			{
				body:data.body,
				icon:data.icon,
				data:data,
				actions:[
					{title:"Arquivar", action:"arquivar"},
					{title:"Marcar como lido", action:"marcar_lido"}
				]
			}
		)
	);
});
*/

self.addEventListener('notificationclick', event => {
	event.notification.close();

	var id = event.notification.data.id;

	if(event.action == 'arquivar') {
		console.log("Arquivando notificação "+id);
	} else if(event.action == 'marcar_lido') {
		console.log("Marcado como lido "+id);
	} else {
		clients.openWindow(event.notification.data.url);
	}
});