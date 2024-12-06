"use client";

import { useEffect, useState } from "react";
import { subscribeUser } from "@/app/actions";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import { getUserRole } from "@/lib/firebase/getUserRole";
import CheckSubscription from "./CheckSubscription";
import { saveSubscription } from "./saveSubscriptionDB";

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscriptionStatus();
    } else {
      console.warn("Push notifications are not supported in this browser.");
      setIsSupported(false);
    }
  }, []);

  async function checkSubscriptionStatus() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription);

    if (!subscription) {
      requestNotificationPermission();
    }
  }

  async function requestNotificationPermission() {
    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          subscribeToPush();
        } else {
          console.warn("Notifications refusées");
        }
      } catch (error) {
        console.error("Erreur lors de la demande de permission:", error);
      }
    } else if (Notification.permission === "granted") {
      subscribeToPush();
    } else {
      console.warn(
        "Vous avez bloqué les notifications pour ce site. Activez-les dans vos paramètres de navigateur."
      );
    }
  }

  async function subscribeToPush() {
    if (isSubscribed) return;

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
      saveSubscription(serializedSub, role, deviceType);
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed:", error);
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

  if (!isSupported) {
    return (
      <div>
      </div>
    );
  }

  return <CheckSubscription setIsSubscribed={setIsSubscribed} />;
}
