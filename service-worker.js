(function() {
    var CACHE_SHELL = 'cache_v2';
    var CACHE_DATA = 'cache_data_v2';
    var API = 'https://newsapi.org/v2/';
    var FILES_SHELL = [
        '/',
        '/css/main.css',
        '/js/api.js',
        '/library/jquery-3.3.1.min.js',
        '/library/moment.min.js'
    ];

    self.addEventListener('install', function(event) {
        console.log('Instalando Service Worker');

        event.waitUntil(
            self.caches.open(CACHE_SHELL).then(function (cache) {
                return cache.addAll(FILES_SHELL);
            })
        )
    });

    self.addEventListener('activate', function (event){
        console.log("Actived SW");
        var cacheList = [CACHE_SHELL, CACHE_DATA];
        event.waitUntil(
            self.caches.keys().then(function (cacheNames){
                return Promise.all(cacheNames.map(function (cacheName){
                    if (cacheList.indexOf(cacheName) === -1){
                        self.caches.delete(cacheName)
                    }
                }));
            })
        )
    });

    self.addEventListener('fetch', function(event) {
        console.log('Pegando Service Worker');
        if(event.request.url.indexOf(API) === -1) {
            event.respondWith(
                caches.match(event.request).then(function(response) {
                    if(response) {
                        return response;
                    }
                    return fetch(event.request);
                })
            );
        } else {
            event.respondWith(
                self.fetch(event.request).then(function (response) {
                    return caches.open(CACHE_DATA).then(function (cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                }).catch(function() {
                    return caches.match(event.request);
                })
            );
        }        
        
    });
})();