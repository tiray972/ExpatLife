// app/components/CalendlyWidget.tsx
'use client';

import { useEffect } from 'react';

const CalendlyWidget = () => {
  useEffect(() => {
    // Ajoute le script Calendly seulement après le rendu du composant
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Nettoyage : enlever le script quand le composant est démonté
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/jojolala972/30min"
      style={{ minWidth: '320px', height: '700px' }}
    ></div>
  );
};

export default CalendlyWidget;
