"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase"; // Assurez-vous que le chemin est correct

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`); // Chemin de stockage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Écouter l'état de l'upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress); // Mise à jour de la progression
      },
      (error) => {
        console.error("Erreur lors de l'upload :", error);
      },
      () => {
        // Récupérer l'URL de l'image après l'upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          alert("Upload réussi !");
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Télécharger</button>
      <div>
        {progress > 0 && <p>Progression : {progress}%</p>}
        {imageUrl && (
          <div>
            <p>Image téléchargée :</p>
            <img src={imageUrl} alt="Uploaded" className="max-w-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
