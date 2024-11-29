"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export default function ImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {images.map((image, index) => (
        <Dialog key={index} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          {/* Trigger: Afficher l'image réduite */}
          <DialogTrigger asChild>
            <div className="relative h-[200px] cursor-pointer">
              <Image
                src={image}
                alt={`${title} - image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          </DialogTrigger>

          {/* Content: Afficher l'image en grand */}
          <DialogContent className="max-w-3xl p-0">
            {/* Accessible title */}
            <DialogTitle className="sr-only">{`Image ${index + 1} of ${title}`}</DialogTitle>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage || image}
                alt={`Full view of ${title}`}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
