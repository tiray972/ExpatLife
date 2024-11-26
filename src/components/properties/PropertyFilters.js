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
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Budget mensuel */}
        {isEmirateIDProvided && (
          <div>
            <Label>Budget mensuel (AED)</Label>
            <div className="pt-4">
              <Slider
                value={filters.priceRange}
                min={0}
                max={100000}
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
          <Label>Chambres</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Nombre de chambres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1 chambre</SelectItem>
              <SelectItem value="2">2 chambres</SelectItem>
              <SelectItem value="3">3 chambres</SelectItem>
              <SelectItem value="4+">4+ chambres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Durée */}
        <div>
          <Label>Durée</Label>
          <Select
            value={filters.duration}
            onValueChange={(value) => setFilters({ ...filters, duration: value })}
            disabled={!isEmirateIDProvided} // Désactivé si Emirate ID est OFF
          >
            <SelectTrigger>
              <SelectValue placeholder="Durée de location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="short">Court séjour</SelectItem>
              <SelectItem value="long">Long séjour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Section Meublé */}
        <div>
          <Label>Meublé</Label>
          <Select
            value={filters.furnished}
            onValueChange={(value) => setFilters({ ...filters, furnished: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Meublé" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="yes">Meublé</SelectItem>
              <SelectItem value="no">Non meublé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
