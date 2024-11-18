"use client"
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn); // Simule connexion/déconnexion
  };

  return (
    <header className="bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="hover:text-teal-200">Accueil</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-teal-200">À propos</div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-teal-200">Contact</div>
          </Link>
        </nav> 

        {/* Bouton connexion/déconnexion */}
        <button
          onClick={handleAuthClick}
          className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
        >
          {isLoggedIn ? "Déconnexion" : "Connexion"}
        </button>
      </div>
    </header>
  );
}
