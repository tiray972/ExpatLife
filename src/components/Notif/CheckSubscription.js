import { useEffect } from "react";

export default function CheckSubscription({ setIsSubscribed }) {
  useEffect(() => {
    async function checkSubscription() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        } catch (err) {
          console.error("Erreur lors de la vérification de l'abonnement :", err);
        }
      }
    }

    checkSubscription();
  }, [setIsSubscribed]);

  return null; // Ce composant est purement logique.
}
