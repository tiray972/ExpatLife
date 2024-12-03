"use client"
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/header";
import Footer from '@/components/Footer';
import PushNotificationManager from '@/components/Notif/PushNotificationManager';
import InstallPrompt from '@/components/Notif/InstallPrompt';
import { useEffect, useState } from 'react';




export default function Test() {
    const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Vérifier si l'utilisateur est inscrit aux notifications push
    async function checkSubscription() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        } catch (err) {
          console.error("Error checking subscription:", err);
        }
      }
    }

    checkSubscription();
  }, []);

  async function sendNotification() {
    if (!isSubscribed) {
      setError("Vous n'êtes pas inscrit aux notifications push.");
      return;
    }

    try {
      // Envoyer une requête POST au serveur pour envoyer une notification
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      setMessage("");
      setError("");
      alert("Notification envoyée !");
    } catch (err) {
      console.error("Error sending notification:", err);
      setError("Une erreur s'est produite lors de l'envoi de la notification.");
    }
  }

  const faqData = [
    {
      question: "Quels services propose Expatlife ?",
      answer:
        "Expatlife accompagne les expatriés dans leur installation aux Émirats Arabes Unis, notamment dans la recherche de logements, la création de visas, et le conseil en démarches administratives.",
    },
    {
      question: "Puis-je trouver un logement sans visa ?",
      answer:
        "Oui, Expatlife offre des solutions pour trouver des logements, que vous disposiez d'un visa ou non.",
    },
    {
      question: "Quels types de logements sont disponibles ?",
      answer:
        "Expatlife propose une gamme de logements adaptés à différents besoins, pour des durées courtes ou longues, avec des options pour tout budget.",
    },
    {
      question: "Aidez-vous à obtenir un visa ou une Emirates ID ?",
      answer:
        "Oui, nos partenaires spécialisés peuvent vous aider à créer votre visa et obtenir votre Emirates ID, même si votre entreprise ne prend pas en charge ce processus.",
    },
    {
      question: "Puis-je bénéficier d'une assistance pour créer ma société ?",
      answer:
        "Absolument, Expatlife propose un accompagnement pour les démarches de création d'entreprise, de la réflexion initiale à l'enregistrement officiel.",
    },
    {
      question: "Que comprend l’accompagnement après l’installation ?",
      answer:
        "Nous aidons pour des démarches courantes comme l'achat d'un véhicule, le choix d'une école, ou la souscription à une assurance, grâce à notre expertise et nos partenaires fiables.",
    },
    {
      question: "Y a-t-il un service client pour répondre à mes questions ?",
      answer:
        "Oui, notre équipe est disponible pour répondre à vos questions et vous accompagner dans toutes vos démarches aux Émirats.",
    },
    {
      question: "Est-ce que je peux bénéficier de vos services si je ne parle pas anglais ou arabe ?",
      answer:
        "Oui, nous offrons un accompagnement multilingue pour faciliter votre transition aux Émirats.",
    },
    {
      question: "Quels sont les coûts associés à vos services ?",
      answer:
        "Les coûts varient selon les services demandés. Contactez notre équipe pour un devis personnalisé.",
    },
  ];
  const reviews = [
    {
      authorName: "Alya Benkasi",
      profilePhoto: "/images/default-avatar.png", // Mettre des avatars corrects
      text: "Expatlife m'a aidé à trouver un logement parfait en un temps record. Je recommande à 100% !",
      rating: 5,
      relativeTime: "il y a 2 jours",
    },
    {
      authorName: "Nicolas Belford",
      profilePhoto: "/images/default-avatar.png",
      text: "Un service sur mesure et une équipe très professionnelle. Merci Expatlife pour cet accompagnement !",
      rating: 5,
      relativeTime: "il y a 1 semaine",
    },
    {
      authorName: "Sarah El Ousni",
      profilePhoto: "/images/default-avatar.png",
      text: "Grâce à Expatlife, mon installation aux Émirats a été rapide et sans stress. Un service exceptionnel !",
      rating: 5,
      relativeTime: "il y a 3 jours",
    },
  ];
  
  

  return (
    <> 
      <PushNotificationManager />
      <InstallPrompt />
      
      <div className="bg-gray-100 scroll-smooth">
        
        <Header />
        {/* Hero Section */}
        <section
    className="relative min-h-12 py-8 flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url("/images/200.png")' }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6">
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/images/logo.png"
          alt="logo ExpatLife sur banner"
          width={200}
          height={150}
          className="w-48 sm:w-64 md:w-72"
        />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
        Trouvez votre logement aux ÉMIRATS, grâce à un accompagnement personnalisé pour une arrivée sereine et réussie.
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/location">
          <button className="bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition">
            TROUVER UN LOGEMENT
          </button>
        </Link>
        <Link href="#CONTACT">
          <button className="bg-teal-500 text-black font-medium py-3 px-6 rounded-lg hover:bg-teal-600 transition">
            NOUS CONTACTER
          </button>
        </Link>
      </div>
    </div>
  </section>


        
        

        <Footer/>
      </div>

    </>
   
  );
}