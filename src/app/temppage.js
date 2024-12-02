'use client';

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from './actions';

function PushNotificationManager() {
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');

  async function subscribe() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });
    setSubscription(sub);
    await subscribeUser(sub);
  }

  async function unsubscribe() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <div>
          <button onClick={unsubscribe}>Unsubscribe</button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => sendNotification(message)}>Send</button>
        </div>
      ) : (
        <button onClick={subscribe}>Subscribe</button>
      )}
    </div>
  );
}
function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
  
    useEffect(() => {
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    }, []);
  
    return (
      isIOS && (
        <div>
          <p>
            Pour installer, utilisez le bouton partage et choisissez "Ajouter à l'écran d'accueil".
          </p>
        </div>
      )
    );
  }
  