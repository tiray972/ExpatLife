"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Label } from "@/components/ui/label";

export function PropertySorting({ filters, setFilters }) {
  return (
    
      <div className="flex w-24 flex-col pb-4 space-y-2">
        {/* <Label>Sort by</Label> */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            {/* <SelectItem value="bedrooms">Number of Bedrooms</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
    
  );
}