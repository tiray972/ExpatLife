"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const locales = ["fr", "en", "es"];
const localeNames = {
  fr: "Français",
  en: "English",
  es: "Español",
};
const defaultLocales = ['fr', 'en','es'];
export default function Header({ lang = "fr" ,locales = defaultLocales,}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log(lang)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            console.error("Utilisateur non trouvé dans Firestore");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push(`/${lang}`);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="bg-white text-black shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href={`/${lang}`}>
            <Image
              src="/images/logo.png"
              alt="logo ExpatLife"
              height={200}
              width={150}
              className="rounded-lg object-cover hover:scale-110"
            />
          </Link>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link href={`/${lang}`} className="hover:text-teal-200">Home</Link>
          <Link href={`/${lang}/blog`} className="hover:text-teal-200">About</Link>
          <Link href={`/${lang}/location`} className="hover:text-teal-200">Properties for rent</Link>
          {isLoggedIn && <Link href={`/${lang}/dashboard`} className="hover:text-teal-200">Dashboard</Link>}
          <Link href={`/${lang}/contact`} className="hover:text-teal-200">Contact</Link>
        </nav>

        {/* Actions (Langues + Connexion) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Sélecteur de langue */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((locale) => (
                <DropdownMenuItem key={locale} asChild>
                  <Link
                    href={pathname?.replace(`/${lang}`, `/${locale}`) || `/${locale}`}
                    className={`w-full ${locale === lang ? "font-bold" : ""}`}
                  >
                    {localeNames[locale]}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Connexion/Déconnexion */}
          {isLoggedIn ? (
            <>
              <span className="text-sm">Hello, {user?.name || "Utilisateur"}!</span>
              <button
                onClick={handleLogout}
                className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push(`/${lang}/auth/signup`)}
              className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-start space-y-4 px-4 py-6">
            <li><Link href={`/${lang}`} className="hover:text-teal-200">Home</Link></li>
            <li><Link href={`/${lang}/blog`} className="hover:text-teal-200">About</Link></li>
            <li><Link href={`/${lang}/location`} className="hover:text-teal-200">Properties for rent</Link></li>
            {isLoggedIn && <li><Link href={`/${lang}/dashboard`} className="hover:text-teal-200">Dashboard</Link></li>}
            <li><Link href={`/${lang}/contact`} className="hover:text-teal-200">Contact</Link></li>

            {/* Langues dans le menu mobile */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full text-left">
                    🌍 {localeNames[lang]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {locales.map((locale) => (
                    <DropdownMenuItem key={locale} asChild>
                      <Link href={pathname.replace(`/${lang}`, `/${locale}`)} className={locale === lang ? "font-bold" : ""}>
                        {localeNames[locale]}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            {/* Connexion/Déconnexion mobile */}
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="bg-teal-500 text-white px-4 py-2 rounded-md w-full text-left hover:bg-teal-600">Log out</button>
              ) : (
                <button onClick={() => router.push(`/${lang}/auth/signup`)} className="bg-teal-500 text-white px-4 py-2 rounded-md w-full text-left hover:bg-teal-600">Sign Up</button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
