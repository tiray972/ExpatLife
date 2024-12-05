"use client";

import { useEffect, useState } from "react";
import { subscribeUser } from "@/app/actions";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import { getUserRole } from "@/lib/firebase/getUserRole";
import CheckSubscription from "./CheckSubscription"; // Le composant de vérification
import { saveSubscription } from "./saveSubscriptionDB";

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // Gérer l'état de souscription

  useEffect(() => {
    // Vérifier si le navigateur supporte les notifications push
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscriptionStatus(); // Vérifier l'état de la souscription dès que le composant est monté
    } else {
      console.warn("Push notifications are not supported in this browser.");
    }
  }, []);

  // Fonction pour vérifier l'état de la souscription
  async function checkSubscriptionStatus() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription); // Si la souscription existe, mettre à jour l'état
    if (!subscription) {
      requestNotificationPermission(); // Si l'utilisateur n'est pas abonné, demander la permission
    }
  }

  // Fonction pour demander la permission de notifications
  async function requestNotificationPermission() {
    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notifications autorisées");
          subscribeToPush(); // S'abonner si la permission est accordée
        } else {
          console.warn("Notifications refusées");
        }
      } catch (error) {
        console.error("Erreur lors de la demande de permission:", error);
      }
    } else if (Notification.permission === "granted") {
      console.log("Notifications déjà autorisées");
      subscribeToPush(); // S'abonner si la permission est déjà accordée
    } else {
      console.warn("Notifications bloquées");
    }
  }

  // Fonction pour s'abonner aux notifications push
  async function subscribeToPush() {
    // Si l'utilisateur est déjà abonné, ne pas faire de nouveau abonnement
    if (isSubscribed) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });

      const serializedSub = serializePushSubscription(sub);
      await subscribeUser(serializedSub);
      const role = await getUserRole();
      const deviceType = /Mobi/.test(navigator.userAgent) ? "mobile" : "desktop";
      saveSubscription(serializedSub, role, deviceType);
      console.log("Subscribed successfully:", serializedSub);
      setIsSubscribed(true); // Mettre à jour l'état une fois l'abonnement effectué
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  }

  // Fonction pour sérialiser la souscription push
  function serializePushSubscription(subscription) {
    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("p256dh")))
        ),
        auth: btoa(
          String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("auth")))
        ),
      },
    };
  }

  if (!isSupported) {
    console.warn("Push notifications are not supported in this browser.");
  }

  return (
    <>
      <CheckSubscription setIsSubscribed={setIsSubscribed} /> {/* Vérification de la souscription */}
    </>
  );
}
