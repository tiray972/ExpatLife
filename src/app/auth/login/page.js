"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Redirection utilisateur
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import {CircleUserRound } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Gestion des erreurs
  const [isLoading, setIsLoading] = useState(false); // Gestion de l'état de chargement

  const router = useRouter(); // Utilisé pour la redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser les erreurs
    setIsLoading(true);

    // Validation simple
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signInWithEmail(email, password);
      console.log("Connexion réussie :", user);
      router.push("/dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);

      // Gérer les erreurs spécifiques
      if (error.code === "auth/user-not-found") {
        setError("Aucun utilisateur trouvé avec cet e-mail.");
      } else if (error.code === "auth/wrong-password") {
        setError("Mot de passe incorrect.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Trop de tentatives. Veuillez réessayer plus tard ou réinitialiser votre mot de passe."
        );
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(""); // Réinitialiser les erreurs
    setIsLoading(true);

    try {
      const user = await signInWithGoogle();
      console.log("Connexion Google réussie :", user);
      router.push("/dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      console.error("Erreur lors de la connexion Google :", error);
      setError("Une erreur s'est produite lors de la connexion avec Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-contain bg-center justify-center bg-gray-100"
    style={{ backgroundImage: 'url("/images/background-login.png")' }}
    >
      <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-96">
      <CircleUserRound className="text-center text-teal-400" />
      
        <h1 className="text-2xl font-bold text-center">Connexion</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="E-mail"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Connexion avec Google"}
          </button>
        </div>
      </form>
    </div>
  );
}
