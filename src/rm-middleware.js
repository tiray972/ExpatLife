import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';


const i18n = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de'], // Liste des langues prises en charge
  },
  localePath: './public/locales', // Chemin des fichiers de traduction sans path.resolve
  react: {
    useSuspense: false, // Désactiver le suspense pour éviter des erreurs liées à la suspension
    wait: true, // Attendre que la traduction soit chargée avant de rendre le composant
  },
  ns: ['common', 'home', 'about'], // Liste des namespaces (facultatif, pour mieux organiser vos traductions)
  defaultNS: 'common', // Namespace par défaut
};

// Fonction pour détecter la langue préférée
function getPreferredLocale(req) {
  const headers = req.headers;
  const acceptLanguage = headers.get('accept-language') || '';
  const locales = i18n.locales;

  return matchLocale(
    acceptLanguage.split(',').map((lang) => lang.split(';')[0]),
    locales,
    i18n.defaultLocale
  );
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ignorer les fichiers statiques et les API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return;
  }

  // Ajouter une redirection si la langue n'est pas spécifiée
  const defaultLocale = i18n.defaultLocale;
  const detectedLocale = getPreferredLocale(req);

  if (!pathname.startsWith(`/${defaultLocale}`) && !i18n.locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Appliquer le middleware à ces routes
};
