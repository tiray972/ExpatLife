import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

export default function SubscribeButton({ setIsSubscribed, setError }) {
  async function subscribeToPush() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
        });
        console.log("Inscription réussie :", subscription);
        setIsSubscribed(true);
      } catch (err) {
        console.error("Erreur lors de l'inscription :", err);
        setError("Impossible de s'inscrire aux notifications.");
      }
    } else {
      setError("Les notifications push ne sont pas prises en charge par ce navigateur.");
    }
  }

  return <button onClick={subscribeToPush}>S'inscrire aux notifications</button>;
}
