"use client";

import { useEffect, useState } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from "@/app/actions";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    } else {
      console.warn("Push notifications are not supported in this browser.");
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      console.log("Service worker registered:", registration);

      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }

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

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });
      setSubscription(sub);

      const serializedSub = serializePushSubscription(sub);
      await subscribeUser(serializedSub);
      console.log("Subscribed successfully:", serializedSub);
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  }

  async function unsubscribeFromPush() {
    if (subscription) {
      try {
        await subscription.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
        console.log("Unsubscribed successfully.");
      } catch (error) {
        console.error("Unsubscription failed:", error);
      }
    }
  }

  async function sendTestNotification() {
    if (subscription) {
      try {
        const serializedSub = serializePushSubscription(subscription);
        await sendNotification(serializedSub, message);
        console.log("Test notification sent.");
        setMessage("");
      } catch (error) {
        console.error("Error sending test notification:", error);
      }
    } else {
      console.warn("No subscription found.");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}
