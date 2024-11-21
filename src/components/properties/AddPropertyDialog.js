"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { addPropertyForAgent } from "@/lib/firebase/properties";

export default function AddPropertyDialog() {
    const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "apartment",
    price: "",
    bedrooms: "",
    size: "",
    location: "",
    image: "",
    duration: "short",
    furnished: false,
    needEmirateID: false,
    coordinates: { lat: "", lng: "" },
  });

  // Fonction pour mettre à jour les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Fonction de soumission
  const handleSubmit = () => {
    addPropertyForAgent({
      ...formData,
      price: parseFloat(formData.price),
      size: parseFloat(formData.size),
      coordinates: {
        lat: parseFloat(formData.coordinates.lat),
        lng: parseFloat(formData.coordinates.lng),
      },
    });
    setFormData({
      title: "",
      type: "apartment",
      price: "",
      bedrooms: "",
      size: "",
      location: "",
      image: "",
      duration: "short",
      furnished: false,
      needEmirateID: false,
      coordinates: { lat: "", lng: "" },
    });
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center" >
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="flex justify-center items-center" >
      <DialogTrigger className="bg-primary py-3 px-4 max-w-md rounded-lg text-white hover:bg-blue-600" >
        
          Ajouter une propriété
        
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-full max-h-[80vh]  overflow-y-auto rounded-lg p-6 bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle propriété</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          {/* Champ Titre */}
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

          {/* Champ Type */}
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
                <SelectItem value="office">Bureau</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prix */}
          <div>
            <Label htmlFor="price">Prix (en AED)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Prix de la propriété"
            />
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
            <Label htmlFor="size">Taille (en m²)</Label>
            <Input
              id="size"
              name="size"
              type="number"
              value={formData.size}
              onChange={handleChange}
              placeholder="Taille de la propriété en m²"
            />
          </div>

          {/* Localisation */}
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex : Dubai Marina"
            />
          </div>

          {/* Lien de l'image */}
          <div>
            <Label htmlFor="image">Lien de l'image</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="URL de l'image"
            />
          </div>

          {/* Durée */}
          <div>
            <Label htmlFor="duration">Durée</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => setFormData({ ...formData, duration: value })}
            >
              <SelectTrigger>{formData.duration}</SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Court terme</SelectItem>
                <SelectItem value="long">Long terme</SelectItem>
              </SelectContent>
            </Select>
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
                  setFormData({
                    ...formData,
                    coordinates: { ...formData.coordinates, lat: e.target.value },
                  })
                }
                placeholder="Latitude"
              />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                name="coordinates.lng"
                value={formData.coordinates.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coordinates: { ...formData.coordinates, lng: e.target.value },
                  })
                }
                placeholder="Longitude"
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
