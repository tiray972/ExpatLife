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
      if (isSafari() && window.safari && safari.pushNotification) {
        const permissionData = safari.pushNotification.permission("web.com.expatlife-uae.app");
        setIsSubscribed(permissionData.permission === "granted");
      } else {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      }
    } catch (err) {
      console.error("Erreur lors de la vérification de l'abonnement :", err);
    }
  }

  function handleSubscribe() {
    if (isSafari() && "safari" in window) {
      handleSafariSubscription();
    } else {
      handleBrowserSubscription();
    }
  }

  function handleSafariSubscription() {
    const permissionData = safari.pushNotification.permission("web.com.expatlife-uae.app");

    if (permissionData.permission === "default") {
      safari.pushNotification.requestPermission(
        "https://expatlife-uae.com", // Votre domaine
        "web.com.expatlife-uae.app", // Votre ID de site
        { title: "Notifications Push" }, // Informations supplémentaires
        (newPermissionData) => {
          if (newPermissionData.permission === "granted") {
            saveSubscription(
              { deviceToken: newPermissionData.deviceToken },
              "role", // À remplacer par votre logique
              "deviceType", // Détection du type d'appareil
              true // Appareil Apple
            );
            setIsSubscribed(true);
          } else {
            setError("Les notifications sont désactivées dans Safari.");
          }
        }
      );
    } else if (permissionData.permission === "granted") {
      setIsSubscribed(true);
    } else {
      setError("Les notifications sont désactivées dans Safari.");
    }
  }

  function handleBrowserSubscription() {
    Notification.requestPermission()
      .then((permission) => {
        if (permission !== "granted") {
          setError("Vous avez refusé les notifications.");
          return;
        }

        navigator.serviceWorker.ready
          .then((registration) => registration.pushManager.getSubscription())
          .then((existingSubscription) => {
            if (existingSubscription) {
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

            const subscriptionData = serializePushSubscription(sub);
            saveSubscription(
              subscriptionData,
              "role", // À remplacer par votre logique
              "deviceType", // Détection du type d'appareil
              false // Pas un appareil Apple
            );
            setIsSubscribed(true);
          })
          .catch((err) => {
            console.error("Erreur lors de la souscription :", err);
            setError("Erreur lors de la souscription.");
          });
      })
      .catch((err) => {
        console.error("Erreur lors de la demande de permission :", err);
        setError("Erreur lors de la demande de permission.");
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
        isSubscribed ? (
          <button disabled>Déjà inscrit</button>
        ) : (
          <button onClick={handleSubscribe}>S'inscrire aux notifications</button>
        )
      ) : (
        <p>Les notifications push ne sont pas supportées par votre navigateur.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
