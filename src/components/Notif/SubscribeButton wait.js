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

  // Vérifier la compatibilité seulement côté client
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  // Fonction pour gérer l'abonnement aux notifications push
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
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      const serializedSub = serializePushSubscription(sub);
      await subscribeUser(serializedSub);
      const role = await getUserRole();
      const deviceType = /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop";
      await saveSubscription(serializedSub, role, deviceType);

      setIsSubscribed(true);
    } catch (err) {
      setError("Erreur lors de la souscription.");
    }
  }

  // Sérialisation de la souscription push
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