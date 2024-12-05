"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase"; // Importez Firestore
import { useState } from "react";

/**
 * Envoie des notifications aux abonnés ayant le rôle "admin".
 *
 * @param {string} title - Le titre de la notification.
 * @param {string} body - Le contenu de la notification.
 * @param {object} [additionalData] - Données supplémentaires à inclure dans la notification.
 * @returns {Promise<void>} - Une promesse qui se résout une fois l'opération terminée.
 */
export async function sendAdminNotifications(title, message, additionalData = {}) {
    try {
      console.log("Récupération des abonnements admin...");
      
      // Récupérer les abonnements depuis Firestore
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
  
      // Préparer les abonnements pour l'API
      const subscriptions = adminSubscriptions.map((sub) => sub.subscription);
  
      // Appeler l'API pour envoyer les notifications
      const response = await fetch("/api/notif/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          subscriptions,
          additionalData,
        }),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur inconnue lors de l'envoi des notifications.");
  
      console.log("Notifications envoyées avec succès :", result.message);
    } catch (error) {
      console.error("Erreur lors de l'envoi des notifications admin :", error);
      throw error; // Relancer l'erreur pour gestion en amont
    }
  }
