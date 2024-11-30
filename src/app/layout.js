import localFont from "next/font/local";
import "./globals.css";
import { TriggerRefreshProvider } from "@/providers/TriggerRefreshprovider";

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
  title: "Home - Expatlife",
  description: "Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${francois.variable} ${geistMono.variable} antialiased`}
      >
        <TriggerRefreshProvider>
        {children}
        </TriggerRefreshProvider>
      </body>
    </html>
  );
}
