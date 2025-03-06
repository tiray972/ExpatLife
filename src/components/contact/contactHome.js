"use client";

import { useState } from "react";

export default function ContactSection({ dictionary }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // Message de statut

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(dictionary.contact.sending); // "Envoi en cours..." (ou autre langue)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus(dictionary.contact.success); // "Message envoyé avec succès !"
        setFormData({ name: "", surname: "", message: "" }); // Reset form
      } else {
        setStatus(dictionary.contact.error); // "Échec de l'envoi du message."
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus(dictionary.contact.error);
    }
  };

  return (
    <section id="CONTACT" className="bg-teal-100 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-500 mb-4">
          {dictionary.contact.title}
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          {dictionary.contact.subtitle}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom */}
            <input
              type="text"
              name="name"
              placeholder={dictionary.contact.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            {/* Prénom */}
            <input
              type="text"
              name="surname"
              placeholder={dictionary.contact.surname}
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              className="w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          {/* Message */}
          <textarea
            name="message"
            placeholder={dictionary.contact.message}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows="5"
            className="w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          ></textarea>
          {/* Bouton */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 text-white bg-teal-500 hover:bg-teal-600 rounded-lg font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            {dictionary.contact.button}
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </section>
  );
}
