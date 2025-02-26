"use client"
import Footer from "@/components/Footer";
import Header from "@/components/header";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default  function Contact() {
  // const { Lang } = await params;
    const params = useParams();  // Récupère params correctement
    const Lang = params.Lang;  // Maintenant lang est disponible
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
    <div className="relative items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url("/images/200.png")' }}
    >
        <Header lang={Lang} />  
        <div className="min-h-screen flex items-center justify-center py-10 px-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Contactez-Nous
                </h1>
                <p className="text-gray-600 text-center mb-8">
                N'hésitez pas à nous envoyer un email ou à nous contacter via les réseaux sociaux.
                </p>

                {/* Formulaire de contact */}
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Votre nom complet"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <div className="flex-1">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Adresse email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.surname}
                        onChange={(e) =>
                            setFormData({ ...formData, surname: e.target.value })
                        }
                        required
                        placeholder="Votre email"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                    }
                    rows="5"
                    required
                    placeholder="Votre message ici..."
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Envoyer
                </button>
                </form>
                {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
                {/* Liens vers les réseaux sociaux */}
                <div className="mt-8 border-t pt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Ou contactez-nous sur :</h2>
                <div className="flex justify-center space-x-6">
                    <a
                    href="https://wa.me/971568127898" // Remplacez par votre lien WhatsApp
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 text-3xl hover:scale-110 transition-transform"
                    >
                    <MessageCircle className="h-8 w-8" />
                    </a>
                    <a
                    href="https://instagram.com/expatlife.com_/" // Remplacez par votre lien Instagram
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 text-3xl hover:scale-110 transition-transform"
                    >
                    <Instagram className="h-8 w-8" />
                    </a>
                    {/* <a
                    href="https://facebook.com/votrepage" // Remplacez par votre lien Facebook
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-3xl hover:scale-110 transition-transform"
                    >
                    <Facebook className="h-8 w-8" />
                    </a> */}
                </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
        
  );
}
