"use client";

import { useEffect, useState } from "react";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import { subscribeUser } from "@/app/actions";
import { getUserRole } from "@/lib/firebase/getUserRole";
import { saveSubscription } from "./saveSubscriptionDB";

export default function SubscribeButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Vérifiez si les notifications push sont supportées
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    ) {
      setIsSupported(true);
      checkSubscriptionStatus(); // Vérifie si une souscription existe déjà
    } else {
      setIsSupported(false);
    }
  }, []);

  // Vérifiez si une souscription existe déjà côté navigateur
  async function checkSubscriptionStatus() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription); // Met à jour l'état si une souscription existe
    } catch (err) {
      console.error("Erreur lors de la vérification de l'abonnement :", err);
    }
  }

  async function subscribeToPush() {
    if (!isSupported) {
      setError("Les notifications push ne sont pas supportées par votre navigateur.");
      return;
    }

    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setError("Vous avez refusé les notifications.");
          return;
        }
      } catch (err) {
        setError("Erreur lors de la demande de permission.");
        return;
      }
    } else if (Notification.permission === "denied") {
      setError("Vous avez bloqué les notifications pour ce site.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Vérifiez si une souscription existe déjà
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        setIsSubscribed(true); // Mise à jour de l'état
        console.log("Une souscription existe déjà :", existingSubscription);
        return; // N'ajoutez pas une nouvelle souscription en base
      }

      // Créez une nouvelle souscription
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      // Sérialisez la souscription et enregistrez-la en base
      const serializedSub = serializePushSubscription(sub);
      const role = await getUserRole();
      const deviceType = /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop";

      await saveSubscription(serializedSub, role, deviceType);
      setIsSubscribed(true);
    } catch (err) {
      setError("Erreur lors de la souscription.");
    }
  }

  function serializePushSubscription(subscription) {
    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode.apply(
            null,
            new Uint8Array(subscription.getKey("p256dh"))
          )
        ),
        auth: btoa(
          String.fromCharCode.apply(
            null,
            new Uint8Array(subscription.getKey("auth"))
          )
        ),
      },
    };
  }

  return (
    <div>
      {isSupported ? (
        <button onClick={subscribeToPush} disabled={isSubscribed}>
          {isSubscribed ? "Déjà inscrit" : "S'inscrire aux notifications"}
        </button>
      ) : (
        <p>Les notifications push ne sont pas supportées par votre navigateur.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
