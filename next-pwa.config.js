export default {
    dest: 'public', // Destination du service worker
    register: true, // Enregistre automatiquement
    skipWaiting: true, // Met à jour immédiatement
    disable: process.env.NODE_ENV === 'development', // Désactive le SW en développement
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/example\.com\/.*$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'example-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
          },
        },
      },
    ],
  };
  