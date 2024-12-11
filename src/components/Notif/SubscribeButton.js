"use client";

import { useEffect, useState } from "react";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import { saveSubscription } from "./saveSubscriptionDB";

export default function SubscribeButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscriptionStatus(); // Vérifie si une souscription existe déjà
    } else if (isSafari() && "Notification" in window) {
      setIsSupported(true); // Support basique pour Safari
    } else {
      setIsSupported(false);
    }
  }, []);

  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  async function checkSubscriptionStatus() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription); // Met à jour l'état si une souscription existe
    } catch (err) {
      console.error("Erreur lors de la vérification de l'abonnement :", err);
    }
  }

  function subscribeToPush() {
    console.log("Début de la souscription...");

    if (!isSupported) {
      setError("Les notifications push ne sont pas supportées par votre navigateur.");
      return;
    }

    if (Notification.permission === "default") {
      console.log("Demande de permission...");
      Notification.requestPermission().then((permission) => {
        console.log("Permission obtenue:", permission);

        if (permission !== "granted") {
          setError("Vous avez refusé les notifications.");
          return;
        }

        processSubscription(); // Passe à la souscription après avoir obtenu la permission
      });
    } else if (Notification.permission === "denied") {
      setError("Vous avez bloqué les notifications pour ce site.");
      return;
    } else {
      processSubscription(); // Directement traiter la souscription si déjà autorisée
    }
  }

  function processSubscription() {
    console.log("Traitement de la souscription...");

    if (isSafari() && "safari" in window && safari.pushNotification) {
      console.log("Traitement pour Safari...");
      const permissionData = safari.pushNotification.permission("web.com.expatlife-uae.app");

      if (permissionData.permission === "default") {
        safari.pushNotification.requestPermission(
          "https://expatlife-uae.com", // Votre domaine
          "web.com.expatlife-uae.app", // Votre ID de site
          { title: "Notifications Push" }, // Informations supplémentaires
          (permissionData) => {
            console.log("permissionData:", permissionData);

            if (permissionData.permission === "granted") {
              console.log("Permission accordée pour Safari.");
              saveSubscription(
                { deviceToken: permissionData.deviceToken },
                "role", // À remplacer par votre logique pour obtenir le rôle
                "deviceType", // Détection du type d'appareil
                true // Indique un appareil Apple
              );
              setIsSubscribed(true);
            } else {
              setError("Les notifications sont désactivées dans Safari.");
            }
          }
        );
      } else if (permissionData.permission === "granted") {
        console.log("Souscription existante pour Safari.");
        setIsSubscribed(true);
      } else {
        setError("Les notifications sont désactivées dans Safari.");
      }

      return;
    }

    console.log("Traitement pour les navigateurs non-Safari...");
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.pushManager.getSubscription();
      })
      .then((existingSubscription) => {
        if (existingSubscription) {
          console.log("Une souscription existe déjà :", existingSubscription);
          setIsSubscribed(true);
          return null;
        }

        return navigator.serviceWorker.ready.then((registration) => {
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
          });
        });
      })
      .then((sub) => {
        if (!sub) return;

        console.log("Souscription effectuée :", sub);

        const subscriptionData = serializePushSubscription(sub);
        saveSubscription(
          subscriptionData,
          "role", // À remplacer par votre logique pour obtenir le rôle
          "deviceType", // Détection du type d'appareil
          false // Pas un appareil Apple
        );
        setIsSubscribed(true);
      })
      .catch((err) => {
        console.error("Erreur lors de la souscription :", err);
        setError("Erreur lors de la souscription.");
      });
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
