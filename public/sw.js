self.addEventListener('push', (event) => {
    let data;
    try {
      data = event.data ? event.data.json() : {};
    } catch (e) {
      console.error('Error parsing push event data:', e);
      return; // Stop processing this event if data is invalid
    }

    const options = {
      body: data.body,
      icon: data.icon || '/icons/icon-512x512.png',
      badge: '/icons/icon-512x512.png',
      vibrate: [100, 50, 100],
      data: { primaryKey: '2' },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  
