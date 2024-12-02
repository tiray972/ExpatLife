module.exports = {
    register: true, // Enregistre automatiquement le Service Worker
    skipWaiting: true, // Met à jour le Service Worker sans attendre
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/example\.com\/.*$/, // Cache les ressources spécifiques
        handler: 'CacheFirst',
        options: {
          cacheName: 'example-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache pendant 30 jours
          },
        },
      },
    ],
  };
  