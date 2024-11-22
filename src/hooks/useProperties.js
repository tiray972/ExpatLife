"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase"; // Importez votre configuration Firebase

export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties")); // Collection "properties" dans Firestore
        const fetchedProperties = querySnapshot.docs.map(doc => ({
          id: doc.id, // Récupérer l'ID du document
          ...doc.data(), // Récupérer les données du document
        }));

        setProperties(fetchedProperties); // Définir les propriétés
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés :", error);
      } finally {
        setIsLoading(false); // Arrêter le chargement
      }
    };

    loadProperties();
  }, []); // Charger les données au premier rendu

  return { properties, isLoading };
}
