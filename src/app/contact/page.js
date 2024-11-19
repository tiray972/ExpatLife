import Header from "@/components/header";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="relative items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url("/images/background.png")' }}
    >
        <Header />
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
                <form className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
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
                    href="https://instagram.com/votrecompte" // Remplacez par votre lien Instagram
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 text-3xl hover:scale-110 transition-transform"
                    >
                    <Instagram className="h-8 w-8" />
                    </a>
                    <a
                    href="https://facebook.com/votrepage" // Remplacez par votre lien Facebook
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-3xl hover:scale-110 transition-transform"
                    >
                    <Facebook className="h-8 w-8" />
                    </a>
                </div>
                </div>
            </div>
        </div>
    </div>
        
  );
}
