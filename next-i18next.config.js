const path = require("path");

const i18n = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de'], // Liste des langues prises en charge
  },
  localePath: path.resolve('./public/locales'), // Chemin des fichiers de traduction
  react: {
    useSuspense: false, // Désactiver le suspense pour éviter des erreurs liées à la suspension
    wait: true, // Attendre que la traduction soit chargée avant de rendre le composant
  },
  ns: ['common', 'home', 'about'], // Liste des namespaces (facultatif, pour mieux organiser vos traductions)
  defaultNS: 'common', // Namespace par défaut
};

module.exports = i18n;
