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
    // Récupérer le body et les abonnements du corps de la requête
    const { notification, subscriptions } = await req.json();

    // Extraire les champs de la notification
    const { title, body, ...additionalFields } = notification;

    // Vérifier si les champs nécessaires sont présents
    if (!title || !body || !subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ error: "Le titre, le corps, et les abonnements sont requis." }, { status: 400 });
    }

    // Envoyer des notifications à tous les abonnés
    const notificationPromises = subscriptions.map((subscription) =>
      webPush
        .sendNotification(
          subscription,
          JSON.stringify({ title, body, ...additionalFields })
        )
        .catch((err) => {
          console.error("Erreur lors de l'envoi de la notification :", err);
        })
    );

    await Promise.all(notificationPromises);
    return NextResponse.json({ body: "Notifications envoyées avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications :", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi des notifications." }, { status: 500 });
  }
}
