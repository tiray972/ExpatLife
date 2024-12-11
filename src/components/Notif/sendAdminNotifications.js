  "use client";

  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from "@/lib/firebase/firebase";

  /**
   * Envoie des notifications aux abonnés ayant le rôle "admin".
   *
   * @param {string} title - Le titre de la notification.
   * @param {string} body - Le contenu de la notification.
   * @param {object} [additionalData] - Données supplémentaires à inclure dans la notification.
   * @returns {Promise<void>} - Une promesse qui se résout une fois l'opération terminée.
   */
  export async function sendAdminNotifications(title, body, additionalData = {}) {
    try {
      console.log("Récupération des abonnements admin...");

      // Récupérer les abonnements admin depuis Firestore
      const subscriptionsRef = collection(db, "subscriptions");
      const q = query(subscriptionsRef, where("role", "==", "admin")); // Filtrer les admins
      const querySnapshot = await getDocs(q);

      const adminSubscriptions = [];
      querySnapshot.forEach((doc) => {
        adminSubscriptions.push({ id: doc.id, ...doc.data() });
      });

      if (adminSubscriptions.length === 0) {
        console.warn("Aucun abonnement admin trouvé.");
        return;
      }

      console.log(`Trouvé ${adminSubscriptions.length} abonnements admin.`);

      // Filtrage des abonnements pour Apple et autres plateformes
      const appleSubscriptions = adminSubscriptions.filter((sub) => sub.isApple);
      const otherSubscriptions = adminSubscriptions.filter((sub) => !sub.isApple);

      // Envoi aux appareils Apple
      if (appleSubscriptions.length > 0) {
        const applePayload = {
          deviceTokens: appleSubscriptions.map((sub) => sub.subscription.deviceToken), // Adaptez selon votre structure
          notification: {
            title,
            body,
            ...additionalData,
          },
        };

        const appleResponse = await fetch("/api/notif/send-apple-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applePayload),
        });

        const appleResult = await appleResponse.json();
        if (!appleResponse.ok) throw new Error(appleResult.error || "Erreur lors de l'envoi des notifications Apple.");

        console.log("Notifications Apple envoyées :", appleResult);
      }

      // Envoi aux autres plateformes
      if (otherSubscriptions.length > 0) {
        const otherPayload = {
          subscriptions: otherSubscriptions.map((sub) => sub.subscription),
          notification: {
            title,
            body,
            ...additionalData,
          },
        };

        const otherResponse = await fetch("/api/notif/send-android-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otherPayload),
        });

        const otherResult = await otherResponse.json();
        if (!otherResponse.ok) throw new Error(otherResult.error || "Erreur lors de l'envoi des notifications Android.");

        console.log("Notifications Android envoyées :", otherResult);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des notifications admin :", error);
      throw error; // Relancer l'erreur pour gestion en amont
    }
  }
