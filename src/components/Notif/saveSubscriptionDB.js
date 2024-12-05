import { doc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/firebase";

export async function saveSubscription(subscription, role, deviceType) {
  const user = auth.currentUser;

  try {
    // Déterminez l'utilisateur actuel
    const userId = user ? user.uid : null;

    // Ajoutez l'abonnement à la collection `subscriptions`
    const subRef = await addDoc(collection(db, "subscriptions"), {
      userId, // Associe l'utilisateur si connecté
      role, // Rôle de l'utilisateur (admin, agent, owner, ou client)
      deviceType, // Type d'appareil (mobile ou desktop)
      subscription, // Données de l'abonnement
      createdAt: new Date().toISOString(), // Date de création
    });

    console.log("Abonnement enregistré :", subRef.id);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'abonnement :", error);
  }
}
