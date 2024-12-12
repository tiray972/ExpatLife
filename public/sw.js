// BrowserPetsWorker.js

// Handle messages sent to the service worker
function handleMessageEvent(event) {
  console.log("Message event received:", event.data);
  // Add your custom message handling logic here
}
self.addEventListener('message', (event) => {
  handleMessageEvent(event);
});

// Prime caches during the install event
function primeCaches() {
  console.log("Priming caches...");
  // Add logic to cache essential assets here
}
self.addEventListener('install', (event) => {
  event.waitUntil(primeCaches());
});

// Serve resources from cache during fetch events
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Handle push events and display notifications
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

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);

  // Close the notification
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

// Handle "SKIP_WAITING" message to update service worker immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log("Skipping waiting phase...");
    self.skipWaiting();
  }
});
