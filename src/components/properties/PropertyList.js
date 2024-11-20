"use client";

import { PropertyCard } from "./PropertyCard";
import { useProperties } from "@/hooks/useProperties";

export function PropertyList({ filters }) {
  const { properties, isLoading } = useProperties();

  const filteredProperties = properties.filter((property) => {
    if (filters.type !== "all" && property.type !== filters.type) return false;
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false;
    if (filters.bedrooms !== "all" && property.bedrooms !== filters.bedrooms) return false;
    if (filters.duration !== "all" && property.duration !== filters.duration) return false;
    if (filters.furnished !== "all" && property.furnished !== (filters.furnished === "yes")) return false;
    if (filters.emirateID !== property.needEmirateID) return false;
    return true;
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
