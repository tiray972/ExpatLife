"use client";

import { useState } from "react";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import { subscribeUser } from "@/app/actions";
import { getUserRole } from "@/lib/firebase/getUserRole";
import { saveSubscription } from "./saveSubscriptionDB";

export default function SubscribeButton() {
  const [isSupported, setIsSupported] = useState(
    "serviceWorker" in navigator && "PushManager" in window
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  async function subscribeToPush() {
    // Vérifie la compatibilité
    if (!isSupported) {
      setError("Les notifications push ne sont pas supportées par votre navigateur.");
      console.warn(error);
      return;
    }

    // Vérifie les permissions
    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setError("Vous avez refusé les notifications.");
          console.log("Vous avez refusé les notifications.");
          console.warn(error);
          return;
        }
      } catch (err) {
        setError("Erreur lors de la demande de permission.");
        console.log("Vous avez refusé les notifications." , err);
        console.error(err);
        return;
      }
    } else if (Notification.permission === "denied") {
        console.log("Vous avez bloqué les notifications pour ce site.");
        setError("Vous avez bloqué les notifications pour ce site.");
      console.warn(error);
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // S'abonner via PushManager
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });

      // Sérialisation et sauvegarde
      const serializedSub = serializePushSubscription(sub);
      await subscribeUser(serializedSub);
      
      const role = await getUserRole();
      console.log("role:",role)
      const deviceType = /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop";
      await saveSubscription(serializedSub, role, deviceType);

      console.log("Souscription réussie :", serializedSub);
      setIsSubscribed(true);
    } catch (err) {
      setError("Erreur lors de la souscription aux notifications.");
      console.error(err);
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
