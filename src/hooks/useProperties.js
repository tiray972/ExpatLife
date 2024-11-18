"use client";

import { useState, useEffect } from "react";

// Liste des propriétés de démonstration
const DEMO_PROPERTIES = [
  {
    id: "1",
    title: "Appartement Luxueux - Marina",
    type: "apartment",
    price: 12000,
    bedrooms: "2",
    size: 120,
    location: "Dubai Marina",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
    duration: "long",
    furnished: true,
    coordinates: {
      lat: 25.0819,
      lng: 55.1367
    }
  },
  {
    id: "2",
    title: "Studio Modern - Downtown",
    type: "studio",
    price: 8000,
    bedrooms: "studio",
    size: 45,
    location: "Downtown Dubai",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=400&fit=crop",
    duration: "short",
    furnished: true,
    coordinates: {
      lat: 25.1972,
      lng: 55.2744
    }
  },
  {
    id: "3",
    title: "Villa Familiale - Palm Jumeirah",
    type: "villa",
    price: 35000,
    bedrooms: "4+",
    size: 350,
    location: "Palm Jumeirah",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=400&fit=crop",
    duration: "long",
    furnished: false,
    coordinates: {
      lat: 25.1124,
      lng: 55.1390
    }
  },
  {
    id: "4",
    title: "Appartement Vue Mer - JBR",
    type: "apartment",
    price: 15000,
    bedrooms: "3",
    size: 180,
    location: "JBR",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=400&fit=crop",
    duration: "long",
    furnished: true,
    coordinates: {
      lat: 25.0777,
      lng: 55.1333
    }
  }
];

// Hook personnalisé pour récupérer les propriétés
export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      // Simuler un chargement de données
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(DEMO_PROPERTIES);  // Définir les propriétés à partir de la liste de démonstration
      setIsLoading(false);  // Marquer le chargement comme terminé
    };

    loadProperties();
  }, []);  // Le tableau vide [] garantit que l'effet se lance une seule fois après le premier rendu

  return { properties, isLoading };
}
