(function () {
    'use strict'

    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        event.waitUntil(
            clients.openWindow("127.0.0.1:8887")
        )
    });

    self.addEventListener('push', function (event){
        var options = {
            body: 'Lula foi ...',
            icon: '/image/apple-touch-icon.png',
            badge: '/image/apple-touch-icon.png'
        };
        return event.waitUntil(
            self.registration.showNotification("Tem novas noticias", options)
        );
        setTimeout(function( ){
            event.notification.close();
        }, 200);
    });
})();