"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Redirection utilisateur
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth"; // Ajout de la fonction signUpWithEmail
import { db } from "@/lib/firebase/firebase"; // Firestore config
import { doc, setDoc, getDoc } from "firebase/firestore";
import Header from "@/components/header";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmation du mot de passe
  const [role, setRole] = useState("client"); // Valeur par défaut pour le rôle
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Fonction pour sauvegarder l'utilisateur dans Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Référence du document utilisateur dans Firestore
      const userSnap = await getDoc(userDocRef);  // Vérifie si l'utilisateur existe déjà dans Firestore

      if (!userSnap.exists()) {
        // Si l'utilisateur n'existe pas encore dans Firestore, on le crée
        let newUser = {};
        if (role === "agent") {
          newUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Utilisateur", // Prend le nom de l'utilisateur ou un nom par défaut
            role: role, // Rôle sélectionné
            properties: [],
            createdAt: new Date(), // Date de création
          };
        } else {
          newUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Utilisateur", // Prend le nom de l'utilisateur ou un nom par défaut
            role: role, // Rôle sélectionné
            createdAt: new Date(), // Date de création
          };
        }

        await setDoc(userDocRef, newUser); // Ajoute le document à Firestore
        console.log("Utilisateur ajouté à Firestore :", newUser);
      } else {
        console.log("Utilisateur déjà existant dans Firestore :", userSnap.data());
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Firestore :", error);
    }
  };

  // Fonction de gestion de l'inscription via email et mot de passe
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Vérification des champs vides
    if (!email || !password || !confirmPassword || !role) {
      setError("Veuillez remplir tous les champs et sélectionner un rôle.");
      setIsLoading(false);
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password); // Inscription via email et mot de passe
      console.log("Inscription réussie :", user);

      // Sauvegarder l'utilisateur dans Firestore
      await saveUserToFirestore(user);

      // Redirection vers le tableau de bord basé sur le rôle
      router.push(role === "agent" ? "/dashboard/agent" : "/dashboard/client");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Cet e-mail est déjà utilisé.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de gestion de l'inscription via Google
  const handleGoogleSignUp = async () => {
    setError("");
    setIsLoading(true);

    // Vérification du rôle avant de continuer avec Google
    if (!role) {
      setError("Veuillez sélectionner un rôle avant de vous inscrire avec Google.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signInWithGoogle(); // Connexion via Google
      console.log("Inscription Google réussie :", user);

      // Sauvegarder l'utilisateur dans Firestore
      await saveUserToFirestore(user);

      // Redirection vers le tableau de bord basé sur le rôle
      router.push(role === "agent" ? "/dashboard/agent" : "/dashboard/client");
    } catch (error) {
      console.error("Erreur lors de l'inscription Google :", error);
      setError("Une erreur s'est produite lors de l'inscription avec Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Header />
      <div
        className="min-h-[90vh] flex items-center bg-contain bg-center justify-center bg-gray-100"
        style={{ backgroundImage: 'url("/images/background-signup.png")' }}
      >
        <div>
          <form
            onSubmit={handleSignUp}
            className="space-y-4 flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-96"
          >
            <CircleUserRound className="text-center text-teal-400" size={90} />
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
              placeholder="Confirmer le mot de passe"
              className="border p-2 w-full rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Sélecteur de rôle */}
            <div className="w-full">
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
                Rôle :
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="">choisir votre role</option>
                <option value="proprio">Propriétaire</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Inscription..." : "S'inscrire avec Google"}
              </button>
            </div>
          </form> 
          <div className="flex justify-between mt-4">
            <Link href={"/auth/login"} className="text-sm text-teal-600">
              Déjà inscrit ? Connectez-vous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
