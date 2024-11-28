import React, { useEffect, useState } from "react";

const AddressAutocomplete = ({ onAddressSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(e.target.value);
  };

  const fetchSuggestions = (query) => {
    setLoading(true);
    setError(null);

    if (!window.google) {
      setError("Google Maps SDK non chargé.");
      setLoading(false);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: query },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
          setError("Aucune suggestion trouvée.");
        }
        setLoading(false);
      }
    );
  };

  const handleSuggestionSelect = (placeId) => {
    setLoading(true);
    setError(null);

    const placesService = new google.maps.places.PlacesService(document.createElement("div"));
    placesService.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const location = place.geometry.location;
        const formattedAddress = place.formatted_address;

        setInputValue(formattedAddress);
        setSuggestions([]);

        if (onAddressSelected) {
          onAddressSelected({
            address: formattedAddress,
            coordinates: {
              lat: location.lat(),
              lng: location.lng(),
            },
          });
        }
      } else {
        setError("Impossible de récupérer les détails pour cette adresse.");
      }
      setLoading(false);
    });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter location"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {loading && <p style={{ marginTop: "5px" }}>Chargement...</p>}
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1000,
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionSelect(suggestion.place_id)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
