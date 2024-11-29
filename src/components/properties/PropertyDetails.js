"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Home, MapPin, Square } from "lucide-react";
import { PropertyMap } from "@/components/properties/PropertyMap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageGallery from "@/components/images/ImageGalerie";

export default function PropertyDetails({ property }) {
  const currentUrl = `https://expatlife-uae.com${usePathname()}`;
  const whatsappUrl = `https://wa.me/971568127898?text=Hello,+I+am+interested+in+the+property+available+at+the+following+address:+${encodeURIComponent(
    currentUrl
  )}.+Could+you+please+provide+me+with+more+details?`;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/location">
          <Button variant="outline" className="mb-6">
            ← Retour aux locations
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image principale */}
          <div className="relative h-[400px] border-b border-gray-200">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Galerie d'images */}
          {/* {property.images && property.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {property.images.map((image, index) => (
                <div key={index} className="relative h-[200px]">
                  <Image
                    src={image}
                    alt={`${property.title} - image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )} */}
          <ImageGallery images={property.images} title={property.title} />
          <div className="p-8">
            {/* Titre et informations principales */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-xl text-gray-600 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {property.location}
                </p>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {property.price} AED
                <span className="text-base text-gray-500">/mois</span>
              </div>
            </div>

            {/* Détails de la propriété */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Home className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold">{property.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Chambres</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Square className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Surface</p>
                  <p className="font-semibold">{property.size} m²</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-3 mb-8">
              <Badge variant={property.duration === "short" ? "default" : "secondary"}>
                {property.duration === "short" ? "Court séjour" : "Long séjour"}
              </Badge>
              <Badge variant={property.furnished ? "default" : "secondary"}>
                {property.furnished ? "Meublé" : "Non meublé"}
              </Badge>
            </div>

             {/* Lien WhatsApp */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full bg-green-500 text-white hover:bg-green-600 mt-6"
              >
                Contacter via WhatsApp
              </Button>
            </a>   
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Localisation */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Localisation</h2>
              <div >
                <PropertyMap properties={[property]} />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </main>
  );
}
