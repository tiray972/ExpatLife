import localFont from "next/font/local";
import "../globals.css";
import { locales } from '@/lib/i18n/config'
import { TriggerRefreshProvider } from "@/providers/TriggerRefreshprovider";
import { Analytics } from "@vercel/analytics/react";
import { getDictionary } from '@/lib/i18n/get-dictionary'

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const francois = localFont({
  src: "../fonts/FrancoisOne-Regular.ttf",
  variable: "--font-francois-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Expatlife",
  description: "Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives.",
};
export async function generateStaticParams() {
  return locales.map((lang) => ({
    lang,
  }))
}
export default async function RootLayout({ children,params }) {
  const { lang } = await params;
  // const dictionary = await getDictionary(lang);
  return (
    <html lang={lang}>
      <head>
        {/* PWA-related meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta
          name="description"
          content="Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives."
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Expatlife" />
        <meta
          property="og:description"
          content="Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://www.expatlife-uae.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Expatlife" />
        <meta
          name="twitter:description"
          content="Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives."
        />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="twitter:site" content="@expatlife" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${francois.variable} ${geistMono.variable} antialiased`}
      >
        <TriggerRefreshProvider>
          {children}
          <Analytics />
        </TriggerRefreshProvider>
      </body>
    </html>
  );
}
