import PropertyDetails from "@/components/properties/PropertyDetails";
import { DEMO_PROPERTIES } from "@/lib/properties";


export function generateStaticParams() {
  return DEMO_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyPage({ params }) {
  const property = DEMO_PROPERTIES.find((p) => p.id === params.id);

  if (!property) {
    return null; // Vous pouvez également afficher une page 404 ou un message d'erreur personnalisé ici
  }

  return <PropertyDetails property={property} />;
}
