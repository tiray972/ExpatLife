"use client";

import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { useState } from "react";
import { useProperties } from "@/hooks/useProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, List } from "lucide-react";
import Header from "@/components/header";

export default function LocationsPage() {
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: [0, 50000],
    bedrooms: "all",
    duration: "all",
    furnished: "all",
  });

  const { properties, isLoading } = useProperties();

  return (
    <main className="min-h-screen bg-gray-50 ">
      <Header/>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Nos Locations Disponibles</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <PropertyFilters filters={filters} setFilters={setFilters} />
          <div className="lg:col-span-3">
            <Tabs defaultValue="list" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Liste
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4" />
                  Carte
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <PropertyList filters={filters} />
              </TabsContent>
              <TabsContent value="map">
                <PropertyMap properties={properties} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
