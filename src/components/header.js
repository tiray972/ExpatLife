"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Pour redirection
import { auth } from "@/lib/firebase/firebase"; // Firebase Auth instance
import { signOut } from "firebase/auth"; // Déconnexion Firebase

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stocke les infos de l'utilisateur
  const router = useRouter();

  // Vérifie l'état de connexion
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirection vers l'accueil après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="bg-white text-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo ExpatLife"
            height={50}
            width={100}
            className="rounded-lg hover:scale-110 "
          />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="hover:text-teal-200">Accueil</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-teal-200">À propos</div>
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard">
              <div className="hover:text-teal-200">Tableau de bord</div>
            </Link>
          )}
          <Link href="/contact">
            <div className="hover:text-teal-200">Contact</div>
          </Link>
        </nav>

        {/* Bouton connexion/déconnexion */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Bonjour, {user?.displayName || "Utilisateur"}!</span>
            <button
              onClick={handleLogout}
              className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/login")} // Redirection vers la page de connexion
            className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
          >
            Connexion
          </button>
        )}
      </div>
    </header>
  );
}
