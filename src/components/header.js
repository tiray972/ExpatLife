"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { db } from "@/lib/firebase/firebase"; // Firestore config
import { doc, getDoc } from "firebase/firestore"; // Firestore API

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stocke les infos de l'utilisateur
  const router = useRouter();

  // Vérifie l'état de connexion
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);

        try {
          // Récupère les données de l'utilisateur depuis Firestore
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
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo ExpatLife"
              height={200}
              width={150}
              className="rounded-lg object-cover hover:scale-110"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="hover:text-teal-200">Accueil</div>
          </Link>
          <Link href="/blog">
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
            <span className="text-sm">Bonjour, {user?.name || "Utilisateur"}!</span>
            <button
              onClick={handleLogout}
              className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-white text-teal-600 px-4 py-2 rounded-md shadow-md hover:bg-teal-700 hover:text-white"
          >
            S'inscrire
          </button>
        )}
      </div>
    </header>
  );
}
