"use client";

import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { useState } from "react";
import { useProperties } from "@/hooks/useProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, List } from "lucide-react";
import Header from "@/components/header";
import { metadata as pageMetadata } from "./locationMetadata";
import Head from "next/head";

console.log(pageMetadata) 


export default function LocationsPage() {
  const [filters, setFilters] = useState({
    emirateID: true, // Initialisé à true
    type: "all",
    priceRange: [0, 1000000],
    bedrooms: "all",
    duration: "all",
    furnished: "all",
  });

  const { properties, isLoading } = useProperties();
  

  return (
    <>
      {/* Métadonnées dynamiques */}
      <Head>
        <title>Properties for Rent - Expatlife</title>
        <meta
          name="description"
          content="Retrouvez les propriétés disponibles directement sur Expatlife et bien plus."
        />
        <meta
          name="keywords"
          content="logement Émirats, logement à louer, conseils expatriés, expatlife, immobilier Émirats"
        />
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Properties for Rent</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <PropertyFilters filters={filters} setFilters={setFilters} />
            <div className="lg:col-span-3">
              <Tabs defaultValue="list" className="mb-6">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4" />
                    Map
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <PropertyList filters={filters} />
                  )}
                </TabsContent>
                <TabsContent value="map">
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <PropertyMap properties={properties} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
