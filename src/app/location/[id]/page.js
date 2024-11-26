"use client";

import PropertyDetails from "@/components/properties/PropertyDetails";
import { useProperties } from "@/hooks/useProperties";
import { useEffect, useState } from "react";

export default function PropertyPage({ params }) {
  const { properties, isLoading } = useProperties();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const foundProperty = properties.find((p) => p.id === params.id);
      setProperty(foundProperty);
    }
  }, [properties, isLoading, params.id]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!property) {
    return <p>Propriété introuvable</p>; // Page d'erreur personnalisée
  }

  return <PropertyDetails property={property} />;
}
