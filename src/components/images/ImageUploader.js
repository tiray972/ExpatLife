"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase"; // Assurez-vous que le chemin est correct
import { getAuth } from "firebase/auth";

export default function ImageUploader({ onImagesUpload }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  // Fonction pour gérer la sélection de plusieurs fichiers
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    selectedFiles.forEach((file) => {
      uploadImage(file);  // Démarrer l'upload immédiatement après la sélection
    });
  };
  const auth = getAuth();
  const currentUser = auth.currentUser;
  // Fonction pour gérer l'upload des images
  const uploadImage = (file) => {
    const userId = currentUser.uid;
    const storageRef = ref(storage, `images/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Mise à jour de la progression de l'upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      },
      (error) => {
        console.error("Erreur lors de l'upload :", error);
      },
      () => {
        // Une fois l'upload terminé, obtenir l'URL de l'image
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (downloadURL) { // Vérifiez que l'URL n'est pas null ou vide
            setImageUrls((prevUrls) => {
              const newImageUrls = [...prevUrls, downloadURL];
              onImagesUpload(newImageUrls); // Passer les URLs au parent
              console.log("Image URLs:", imageUrls);
              return newImageUrls;
            });
          } else {
            console.error("URL d'image vide ou invalide !");
          }
        });
      }
    );
  };

  // Fonction pour supprimer une image
  const handleDelete = (url) => {
    const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(updatedUrls);
    onImagesUpload(updatedUrls);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="file-upload"
          className="inline-block px-4 py-2 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600"
        >
          select files
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      {/* Affichage de la progression de l'upload */}
      <div>
        {files.length > 0 && (
          <div>
            <h3>Progression des uploads :</h3>
            {files.map((file) => (
              <p key={file.name}>
                {file.name} : {progress[file.name]}%
              </p>
            ))}
          </div>
        )}

        {/* Vignettes des images téléchargées */}
        <div className="image-thumbnails">
          {imageUrls.map((url, index) => (
            url ? ( // Vérifiez que l'URL est définie et non vide
              <div key={index} className="image-thumbnail">
                <img
                  src={url}
                  alt={`uploaded-thumbnail-${index}`}
                  className="w-20 h-20 object-cover"
                />
                <button
                  onClick={() => handleDelete(url)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </div>
            ) : null
          ))}
        </div>


      </div>
    </div>
  );
}
