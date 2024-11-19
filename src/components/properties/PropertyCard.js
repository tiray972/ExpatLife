"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Home, MapPin, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden">
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
            {property.price} AED
            <span className="text-sm text-gray-500">/mois</span>
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
            <span>{property.size}m²</span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <Badge variant={property.duration === "short" ? "default" : "secondary"}>
            {property.duration === "short" ? "Court séjour" : "Long séjour"}
          </Badge>
          <Badge variant={property.furnished ? "default" : "secondary"}>
            {property.furnished ? "Meublé" : "Non meublé"}
          </Badge>
        </div>
        <Link href={`/location/${property.id}`}>
        <Button className="w-full">Voir les détails</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
