"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Redirection utilisateur
import { signUpWithEmail } from "@/lib/firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmation du mot de passe
  const [error, setError] = useState(""); // Gestion des erreurs
  const [isLoading, setIsLoading] = useState(false); // Gestion de l'état de chargement
  const router = useRouter(); // Utilisé pour la redirection

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser les erreurs
    setIsLoading(true);

    // Validation simple
    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password);
      console.log("Inscription réussie :", user);
      router.push("/dashboard"); // Redirection vers le tableau de bord
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);

      // Gérer les erreurs spécifiques
      if (error.code === "auth/email-already-in-use") {
        setError("Cet e-mail est déjà utilisé. Veuillez en choisir un autre.");
      } else if (error.code === "auth/invalid-email") {
        setError("Veuillez entrer une adresse e-mail valide.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignUp} className="space-y-4 bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center">Inscription</h1>
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
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          className="border p-2 w-full rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
