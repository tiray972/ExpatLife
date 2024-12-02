import localFont from "next/font/local";
import "./globals.css";
import { TriggerRefreshProvider } from "@/providers/TriggerRefreshprovider";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const francois = localFont({
  src: "./fonts/FrancoisOne-Regular.ttf",
  variable: "--font-francois-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Expatlife",
  description: "Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Ajoutez des balises spécifiques pour PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="description" content="Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives." />
      </Head>
      <body suppressHydrationWarning
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
