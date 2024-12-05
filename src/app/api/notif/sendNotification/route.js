import webPush from "web-push";
import { NextResponse } from "next/server";

// Clés VAPID (stockez ces valeurs dans vos variables d'environnement)
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

// Configurer web-push
webPush.setVapidDetails(
  "mailto:contact@expatlife-uae.com", // Remplacez par votre email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(req) {
  try {
    // Récupérer le message et les abonnements du corps de la requête
    const { message, subscriptions,title } = await req.json();
    console.log(title)
    // Vérifier si le message est présent
    if (!message || !subscriptions || !title || subscriptions.length === 0) {
      return NextResponse.json({ error: "Le message et les abonnements sont requis." }, { status: 400 });
    }

    // Envoyer des notifications à tous les abonnés
    const notificationPromises = subscriptions.map((subscription) =>
      webPush
        .sendNotification(subscription, JSON.stringify({ title: title, body: message }))
        .catch((err) => {
          console.error("Erreur lors de l'envoi de la notification :", err);
        })
    );

    await Promise.all(notificationPromises);
    return NextResponse.json({ message: "Notifications envoyées avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi des notifications." }, { status: 500 });
  }
}
