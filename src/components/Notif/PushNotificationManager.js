"use client"
import { useEffect, useState } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions';
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [message, setMessage] = useState('');
   
    useEffect(() => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true);
        registerServiceWorker();
      }
    }, []);
   
    async function registerServiceWorker() {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    }
    function serializePushSubscription(subscription) {
      return {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
          auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
        },
      };
    }
    async function subscribeToPush() {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });
      setSubscription(sub);
    
      // Sérialisez avant d'envoyer à la fonction serveur
      const serializedSub = serializePushSubscription(sub);
      await subscribeUser(serializedSub);
    }
   
    async function unsubscribeFromPush() {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    }
   
    async function sendTestNotification() {
      if (subscription) {
        const serializedSub = serializePushSubscription(subscription);
        await sendNotification(serializedSub, message);
        setMessage('');
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