"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Home, MapPin, MessageCircleMore, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export function PropertyCard({ property }) {
  const durationLabels = {
    yearly: "Yearly",
    monthly: "Monthly",
    weekly: "weekly",
  };
  const params = useParams();  // Récupère params correctement
  const Lang = params.Lang;  // Maintenant lang est disponible
  // Normaliser `property.duration` pour toujours être un tableau
  const durations = Array.isArray(property.duration)
    ? property.duration
    : property.duration
    ? [property.duration]
    : []; // Si c'est une chaîne, on la met dans un tableau. Sinon, tableau vide.

  return (
    <Card className="overflow-hidden relative">
      {/* Voile sur toute la carte si la propriété n'est pas vérifiée */}
      {!property.isverified && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            Non vérifié
          </span>
        </div>
      )}
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {property.location}
            </p>
          </div>
          <div className="text-xl font-bold text-teal-600">
            {property.price} AED&nbsp;
            <span className="text-sm text-gray-500">{property.duration}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-gray-500" />
            <span>{property.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-gray-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gray-500" />
            <span>{property.size}<span className="w-4 h-4 text-gray-500">sqft</span></span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          {durations.map((duration) => (
            <Badge
              key={duration}
              variant="default" // Peut être changé si vous souhaitez un style spécifique par type
            >
              {durationLabels[duration] || duration} {/* Affiche le label ou la valeur brute */}
            </Badge>
          ))}
          <Badge variant={property.furnished ? "default" : "secondary"}>
            {property.furnished ? "furnished" : "unfurnished"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 space-x-2">
          <Link href={`location/${property.id}`}>
            <Button className="w-full">More info</Button>
          </Link>
          <Link href={`https://wa.me/971568127898?text=Hello,+I+am+interested+in+the+property+available+at+the+following+address:+${encodeURIComponent(
    `https://expatlife-uae.com/location/${property.id}`
  )}.+Could+you+please+provide+me+with+more+details?`}>
            <Button className="w-full"><MessageCircleMore /></Button>
          </Link>
        </div>
        
      </CardContent>
    </Card>
  );
}
