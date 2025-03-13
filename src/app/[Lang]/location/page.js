"use client";

import { useState } from "react";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertySorting } from "@/components/properties/PropertySorting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, List } from "lucide-react";
import Header from "@/components/header";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function LocationsPage() {
  const [filters, setFilters] = useState({
    emirateID: true,
    type: "all",
    priceRange: [0, 1000000],
    bedrooms: "all",
    duration: "all",
    furnished: "all",
    sortBy: "price-asc",
  });

  const params = useParams();
  const Lang = params.Lang;

  return (
    <>
      <Head>
        <title>Properties for Rent - Expatlife</title>
        <meta name="description" content="Retrouvez les propriétés disponibles directement sur Expatlife et bien plus." />
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        <Header lang={Lang} />
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
                  <PropertySorting filters={filters} setFilters={setFilters} />
                  <PropertyList filters={filters} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
