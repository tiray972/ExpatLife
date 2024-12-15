"use client";

import React, { useEffect, useState } from "react";
import { deleteProperty, fetchAllProperties, verifyProperty } from "@/lib/firebase/properties";


export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les propriétés à l'initialisation
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      const data = await fetchAllProperties();
      setProperties(data);
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Gestion des actions (valider/supprimer)
  const handleValidate = async (propertyId) => {
    try {
      await verifyProperty(propertyId);
      alert("Propriété validée avec succès.");
      setProperties((prev) => prev.filter((p) => p.id !== propertyId)); // Retirer la propriété validée
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId);
      alert("Propriété supprimée avec succès.");
      setProperties((prev) => prev.filter((p) => p.id !== propertyId)); // Retirer la propriété supprimée
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  if (loading) return <p>Loading ...</p>; // Affiche un spinner pendant le chargement

  return (
    <div className="p-6 bg-gray-100">
    <h1 className="text-2xl font-bold mb-6">Gérer les propriétés</h1>
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Titre</th>
          <th className="py-3 px-6 text-left">Description</th>
          <th className="py-3 px-6 text-center">Date d'ajout</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {properties.map((property) => (
          <tr
            key={property.id}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <span className="font-medium">{property.title}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-left">
              <span>{property.description}</span>
            </td>
            <td className="py-3 px-6 text-center">
              {new Date(property.createdAt?.seconds * 1000).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 text-center">
              {!property.isverified && (
                 <button
                onClick={() => handleValidate(property.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 mr-2"
              >
                Valider
              </button>
              )}
              
              <button
                onClick={() => handleDelete(property.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}