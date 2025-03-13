"use client";

import { useEffect } from "react";

const CalendlyPopup = ({ url }) => {
  useEffect(() => {
    // Charger le script Calendly dynamiquement après le rendu du composant
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyage : supprimer le script lorsque le composant est démonté
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    }
  };

  return (
    <button
      onClick={openCalendly}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      Schedule time with me
    </button>
  );
};

export default CalendlyPopup;
