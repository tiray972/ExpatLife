"use client";

import { useEffect, useState } from "react";

const CalendlyPopup = ({ url }) => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    const checkCalendly = () => {
      if (typeof window !== "undefined" && window.Calendly) {
        console.log("✅ Calendly détecté !");
        setIsCalendlyLoaded(true);
      } else {
        console.warn("❌ Calendly non détecté, re-vérification dans 1 seconde...");
        setTimeout(checkCalendly, 1000);
      }
    };

    if (!document.querySelector("#calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = checkCalendly;
      document.body.appendChild(script);
    } else {
      checkCalendly();
    }
  }, []);

  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      console.log("📅 Ouverture du popup Calendly !");
      window.Calendly.initPopupWidget({ url });
    } else {
      console.error("❌ Erreur : Calendly n'est pas chargé !");
    }
  };

  return (
    <button
      onClick={openCalendly}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300 ${
        !isCalendlyLoaded ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={!isCalendlyLoaded}
    >
      {isCalendlyLoaded ? "Schedule time with me" : "Loading..."}
    </button>
  );
};

export default CalendlyPopup;
