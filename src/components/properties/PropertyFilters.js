"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PropertyFilters({filters, setFilters}) {
  
  const isEmirateIDProvided = filters.emirateID;
  
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Section Emirate ID */}
        <div>
          <Label htmlFor="emirate-id-toggle" className="flex items-center justify-between">
            Emirate ID
            <Switch
              id="emirate-id-toggle"
              checked={filters.emirateID} // Valeur initiale
              onCheckedChange={(checked) => setFilters({ ...filters, emirateID: checked })}
            />
          </Label>
        </div>

        {/* Autres sections (inchangées) */}
        {/* Section Type de bien */}
        <div>
          <Label>Type de bien</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="Hotel Apartment">Hotel Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Durée */}
        <div>
          <Label>Period</Label>
          <Select
            value={filters.duration}
            onValueChange={(value) => setFilters({ ...filters, duration: value })}
            disabled={!isEmirateIDProvided} // Désactivé si Emirate ID est OFF
          >
            <SelectTrigger>
              <SelectValue placeholder="Durée de location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="weekly">weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Budget mensuel */}
        {isEmirateIDProvided && (
          <div>
            <Label>Rent (AED)</Label>
            <div className="pt-4">
              <Slider
                value={filters.priceRange}
                min={0}
                max={5000000}
                step={1000}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{filters.priceRange[0]} AED</span>
                <span>{filters.priceRange[1]} AED</span>
              </div>
            </div>
          </div>
        )}

        {/* Section Chambres */}
        <div>
          <Label>Beds</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1 Beds</SelectItem>
              <SelectItem value="2">2 Beds</SelectItem>
              <SelectItem value="3">3 Beds</SelectItem>
              <SelectItem value="4+">4+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        

        {/* Section Meublé */}
        <div>
          <Label>Furnished</Label>
          <Select
            value={filters.furnished}
            onValueChange={(value) => setFilters({ ...filters, furnished: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="furnished" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="yes">furnished</SelectItem>
              <SelectItem value="no">unfurnished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
