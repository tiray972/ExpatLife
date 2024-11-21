"use client";

import { useEffect, useState } from "react";
import { fetchAgentProperties } from "@/lib/firebase/properties";

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);  // Initialisez properties comme un tableau vide
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const agentProperties = await fetchAgentProperties();
        setProperties(agentProperties || []);  // Assurez-vous que properties est un tableau
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés :", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Tableau de Bord Agent</h1>
      {isLoading ? (
        <p>Chargement des propriétés...</p>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-md rounded p-4">
              <h2 className="font-bold text-lg">{property.title}</h2>
              <p>{property.description}</p>
              <p className="text-sm text-gray-500">Ajouté le : {new Date(property.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune propriété trouvée.</p>
      )}
    </div>
  );
}
