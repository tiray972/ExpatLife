"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addPropertyForAgent } from "@/lib/firebase/properties";
import { useTriggerRefresh } from "@/providers/TriggerRefreshprovider";
import ImageUploader from "@/components/images/ImageUploader";
import AddressAutocomplete from "@/components/google/AddressAutocomplete";

export default function AddPropertyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "apartment",
    isverified:false,
    price: "",
    bedrooms: "",
    size: "",
    location: "",
    image: "",
    images: [],
    duration: "",
    furnished: false,
    needEmirateID: false,
    coordinates: { lat: "", lng: "" },
  });

  const { triggerRefresh } = useTriggerRefresh();

  // Update form data
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle images upload
  const handleImagesUpload = (urls) => {
    setFormData((prevState) => ({
      ...prevState,
      images: urls,
      image: urls[0], // Set the first image as the primary
    }));
  };

  // Handle address selection
  const handleAddressSelected = ({ address, coordinates }) => {
    setFormData((prevState) => ({
      ...prevState,
      location: address,
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    }));
  };

  // Submit the form
  const handleSubmit = async () => {
    try {
      await addPropertyForAgent({
        ...formData,
        price: parseFloat(formData.price),
        size: parseFloat(formData.size),
        coordinates: {
          lat: parseFloat(formData.coordinates.lat),
          lng: parseFloat(formData.coordinates.lng),
        },
      });

      triggerRefresh();
      setIsOpen(false); // Close the dialog
      resetForm(); // Reset form data
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      type: "apartment",
      price: "",
      bedrooms: "",
      size: "",
      location: "",
      image: "",
      images: [],
      duration: "",
      furnished: false,
      needEmirateID: false,
      coordinates: { lat: "", lng: "" },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-primary py-3 px-4 max-w-md rounded-lg text-white hover:bg-blue-600">
          Ajouter une propriété
        </DialogTrigger>
        <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6 bg-white shadow-xl">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle propriété</DialogTitle>
          </DialogHeader>

          <form className="space-y-4">
            {/* titre  */}
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre de la propriété"
              />
            </div>
            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez les caractéristiques de la propriété"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={4} // Ajustez le nombre de lignes visibles selon vos besoins
              />
            </div>
            
            {/* type  */}
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>{formData.type}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Appartement</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartmentHotel">Hôtel Appartement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div>
              <Label htmlFor="duration">Durée</Label>
              <ToggleGroup
                type="single"
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
                className="mt-2 flex gap-2"
              >
                {["weekly", "monthly", "yearly"].map((option) => (
                  <ToggleGroupItem
                    key={option}
                    value={option}
                    className={`px-4 py-2 rounded-md ${
                      formData.duration === option ? "bg-teal-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {option}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div> */}
            {/* durée */}
            <div>
              <Label htmlFor="duration">Durée</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>{formData.duration || "Sélectionnez une durée"}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Chambres */}
            <div>
              <Label htmlFor="bedrooms">Nombre de chambres</Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Nombre de chambres"
              />
            </div>

            {/* Taille */}
            <div>
              <Label htmlFor="size">Taille (SQFT)</Label>
              <Input
                id="size"
                name="size"
                type="number"
                value={formData.size}
                onChange={handleChange}
                placeholder="Taille de la propriété en m²"
              />
            </div>

            {/* price */}
            <div>
              <Label htmlFor="price">Prix (AED)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix de la propriété"
              />
            </div>

            <div>
              <Label htmlFor="location">Localisation</Label>
              <AddressAutocomplete onAddressSelected={handleAddressSelected} />
            </div>

            <div>
              <Label htmlFor="image">Images</Label>
              <ImageUploader onImagesUpload={handleImagesUpload} />
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center space-x-4">
              <div>
                <Label htmlFor="furnished">Meublé</Label>
                <Input
                  id="furnished"
                  name="furnished"
                  type="checkbox"
                  checked={formData.furnished}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="needEmirateID">Nécessite Emirates ID</Label>
                <Input
                  id="needEmirateID"
                  name="needEmirateID"
                  type="checkbox"
                  checked={formData.needEmirateID}
                  onChange={handleChange}
                />
              </div>
            </div>
            
             {/* Coordonnées */}
            <div className="flex space-x-4">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  name="coordinates.lat"
                  value={formData.coordinates.lat}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      coordinates: { ...prevState.coordinates, lat: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  name="coordinates.lng"
                  value={formData.coordinates.lng}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      coordinates: { ...prevState.coordinates, lng: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </form>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-blue-500 text-white" onClick={handleSubmit}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
