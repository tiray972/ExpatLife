"use client";

export default function AgentSupport() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assistance pour les Agents</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>
          Vous avez des questions ou besoin d'aide ? Nous sommes là pour vous aider.
          Voici comment vous pouvez nous contacter :
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>
            <strong>Email :</strong>{" "}
            <a href="mailto:contact@expatlife-uae.com" className="text-blue-600 underline">
              contact@expatlife-uae.com
            </a>
          </li>
        </ul>
        <p className="mt-4">
          Nous sommes disponibles du dimanche au jeudi, de 9h00 à 18h00 (heure locale).
        </p>
      </div>
    </div>
  );
}
