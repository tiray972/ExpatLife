self.addEventListener('push', (event) => {
  let data;
  try {
    data = event.data ? event.data.json() : {};
    console.log('Push event received:', data); // Debugging log
  } catch (error) {
    console.error('Error parsing push data:', error);
    return; // Stop processing if data is invalid
  }

  // Define notification options
  const options = {
    body: data.body || 'Default message',
    icon: data.icon || '/icons/icon-512x512.png', // Ensure icon exists
    badge: '/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }, // Pass a URL for redirection if provided
  };

  // Show notification
  console.log('Displaying notification:', data.title, options);
  event.waitUntil(
    self.registration.showNotification(data.title || 'Default title', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);

  // Close notification
  event.notification.close();

  // Redirect to the specified URL or homepage
  const urlToOpen = event.notification.data.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
