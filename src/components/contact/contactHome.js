"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // For status messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", surname: "", message: "" }); // Reset form
      } else {
        setStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <section id="CONTACT" className="bg-teal-100 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-500 mb-4">
          Prêt à Commencer Votre Nouvelle Vie aux Émirats ?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Contactez-nous dès aujourd'hui pour un accompagnement personnalisé
          dans votre projet.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom */}
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            {/* Prénom */}
            <input
              type="text"
              name="surname"
              placeholder="Prénom"
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
            placeholder="Message"
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
            Nous Contacter
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </section>
  );
}
