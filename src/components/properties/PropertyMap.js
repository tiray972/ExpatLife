"use client";

import Map, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/card';
import Image from 'next/image';
import 'mapbox-gl/dist/mapbox-gl.css';

export function PropertyMap({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYWx2aW45NzIiLCJhIjoiY20zazNrNXhxMDhxNTJqcXo2a2VvcnU2ZyJ9.s-hb4AYn4TWT4fzLGh_mQg"
        initialViewState={{
          longitude: 55.2708,
          latitude: 25.2048,
          zoom: 11
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.coordinates.lng}
            latitude={property.coordinates.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedProperty(property);
            }}
          >
            <MapPin className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
          </Marker>
        ))}

        {selectedProperty && (
          <Popup
            longitude={selectedProperty.coordinates.lng}
            latitude={selectedProperty.coordinates.lat}
            anchor="bottom"
            onClose={() => setSelectedProperty(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <Card className="w-64 p-2">
              <div className="relative h-32 mb-2">
                <Image
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="font-semibold text-sm">{selectedProperty.title}</h3>
              <p className="text-sm text-gray-600">{selectedProperty.price} AED/mois</p>
            </Card>
          </Popup>
        )}
      </Map>
    </div>
  );
}
