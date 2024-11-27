import { useState } from "react";
import axios from "axios";

const GeoLocator = ({ onCoordinatesChange }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const fetchCoordinates = async () => {
    setError(null);

    if (!address) {
      setError("Veuillez saisir une adresse.");
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: apiKey,
          },
        }
      );

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        if (onCoordinatesChange) {
          onCoordinatesChange(location); // Met à jour les coordonnées
        }
      } else {
        setError("Impossible de trouver les coordonnées pour cette adresse.");
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la recherche.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Recherche de coordonnées géographiques</h2>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Entrez une adresse"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={fetchCoordinates}
        style={{
          padding: "10px 15px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Obtenir les coordonnées
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default GeoLocator;
