"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function PropertyFilters({ filters, setFilters }) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
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

        <div>
          <Label>Budget mensuel (AED)</Label>
          <div className="pt-4">
            <Slider
              value={filters.priceRange}
              min={0}
              max={50000}
              step={1000}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{filters.priceRange[0]} AED</span>
              <span>{filters.priceRange[1]} AED</span>
            </div>
          </div>
        </div>

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

        <div>
          <Label>Durée</Label>
          <Select
            value={filters.duration}
            onValueChange={(value) => setFilters({ ...filters, duration: value })}
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
