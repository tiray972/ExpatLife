self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: { primaryKey: '2' },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  