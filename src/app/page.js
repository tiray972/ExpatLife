import Image from 'next/image';
import Link from 'next/link';
import {Users, Briefcase, Handshake } from 'lucide-react';
import Header from "@/components/header";
import Footer from '@/components/Footer';
import FAQ from '@/components/faq';
import GoogleReviews from '@/components/google/googlereviews';

import Head from 'next/head';



export default function Home() {

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
      authorName: "Jean Dupont",
      profilePhoto: "/images/default-avatar.png", // Mettre des avatars corrects
      text: "Expatlife m'a aidé à trouver un logement parfait en un temps record. Je recommande à 100% !",
      rating: 5,
      relativeTime: "il y a 2 jours",
    },
    {
      authorName: "Marie Curie",
      profilePhoto: "/images/default-avatar.png",
      text: "Un service sur mesure et une équipe très professionnelle. Merci Expatlife pour cet accompagnement !",
      rating: 5,
      relativeTime: "il y a 1 semaine",
    },
    {
      authorName: "Paul Martin",
      profilePhoto: "/images/default-avatar.png",
      text: "Grâce à Expatlife, mon installation aux Émirats a été rapide et sans stress. Un service exceptionnel !",
      rating: 5,
      relativeTime: "il y a 3 jours",
    },
    {
      authorName: "Claire Dubois",
      profilePhoto: "/images/default-avatar.png",
      text: "L'équipe d'Expatlife est incroyablement réactive et à l'écoute. Je n'aurais pas pu rêver mieux pour ma transition.",
      rating: 5,
      relativeTime: "il y a 5 jours",
    },
    {
      authorName: "Sophie Leclerc",
      profilePhoto: "/images/default-avatar.png",
      text: "Un accompagnement parfait du début à la fin. Expatlife a rendu mon expatriation simple et agréable !",
      rating: 5,
      relativeTime: "il y a 1 semaine",
    },
  ];
  
  

  return (
    <div className="bg-gray-100 scroll-smooth">
      <Head>
        <title>Expatlife - Votre installation aux Émirats</title>
        <meta name="description" content="Expatlife vous accompagne dans votre installation aux Émirats : logement, visa, et démarches administratives." />
        <meta name="keywords" content="Expatlife, logement Émirats, visa, installation, expatrié" />
      </Head>
       <Header />
      {/* Hero Section */}
      <section
        className="relative min-h-12 py-8 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/200.png")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <div className="flex items-center justify-center mb-6">
            <Image
            src="/images/logo.png"
            alt="logo ExpatLife sur banner"
            width={300}
            height={250}
            className=""
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Trouvez votre logement aux ÉMIRATS, grâce à un accompagnement personnalisé pour une arrivée sereine et réussie.
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/location">
              <button className="bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition">
                TROUVER UN LOGEMENT
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-teal-500 text-black font-medium py-3 px-6 rounded-lg hover:bg-teal-600 transition">
                NOUS CONTACTER
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 2xl:px-96 space-x-8 py-10 bg-white">
        <div className="max-w-lg">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Chaque nouvel arrivant sur le territoire des Émirats rencontre le même problème,
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-teal-500 mb-6">
            TROUVER UN LOGEMENT RAPIDE !
          </h3>
          <p className="text-lg text-gray-700">
            Sans visa ou en attente de celui-ci, il est difficile de se loger car le plus régulièrement, la location est annuelle et la seule solution est de se tourner vers des hôtels ou logements de vacances.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <Image
            src="/images/203.png"
            alt="Trouver un logement"
            width={500}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Priorities Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-center text-3xl font-bold mb-10">NOTRE PRIORITÉ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20  space-x-8">
          {/* Card 1 */}
          <a href="#ACCOMPAGNEMENT"  >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Users />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE ACCOMPAGNEMENT</h3>
              <p className="text-gray-700 text-start">
                Nous vous mettons à disposition la création de votre visa personnel, celui de votre famille et également votre société ainsi que toutes démarches administratives pour votre installation.
              </p>
            </div>
          </a>
          {/* Card 2 */}
          <a href="#INSTALLATION"  >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Briefcase />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE INSTALLATION</h3>
              <p className="text-gray-700 text-start">
                Avec ou sans visa, trouvez votre 1er logement, petite ou longue durée et installez-vous en toute sérénité grâce à nos partenaires et propriétaires triés sur le volet.
              </p>
            </div>
          </a>
          {/* Card 3 */}
          <a href="#CONFIANCE"  >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Handshake />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE CONFIANCE</h3>
              <p className="text-gray-700 text-start">
                Notre expérience de plusieurs années en relation publique vous permettra d'être soutenu dans n'importe quelle démarche qu'elle soit administrative ou autre ici aux Émirats.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* section google */}
      <GoogleReviews reviews={reviews}/>
      {/* About Us Section */}
      <section className="bg-teal-100 rounded-lg shadow-lg py-8 px-6 md:px-20 2xl:px-96 space-x-8 flex flex-col md:flex-row">
          <div className="md:w-1/2 ">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">
              EXPATLIFE.COM
            </h2>
            <h3 className="text-xl font-bold text-teal-600 mb-8">QUI SOMMES NOUS ?</h3>
            <p className="text-gray-800 mb-8">
              L'accompagnement des expatriés aux UAE est aujourd'hui une priorité pour nous. Après plusieurs années de maîtrise dans la relation publique et la communication, expatlife.com a été fondé pour apporter une solution aux nouveaux expatriés afin de leur garantir une installation sereine et complète.
            </p>
            <Link href="/contact">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition">
                NOUS CONTACTER
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/204.png"
              alt="Notre équipe"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
            
          </div>
    
      </section>
      {/* Section INSTALLATION */}
      <section id='INSTALLATION' className="bg-white rounded-lg shadow-lg py-8 px-6 md:px-20 2xl:px-96 space-x-8 flex flex-col md:flex-row">
        <div className="md:w-1/2">
        <Image
              src="/images/205.png"
              alt="Notre équipe"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
        </div>
        <div className="md:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">VOTRE INSTALLATION</h2>
          <p className="text-teal-500 font-semibold mb-4">
            NOTRE PRIORITÉ : OFFRIR UNE EXPERTISE COMPLÈTE AU-DELÀ DE LA SIMPLE
            RECHERCHE DE LOGEMENT, EN VOUS ACCOMPAGNANT DANS CHAQUE ÉTAPE DE
            VOTRE INSTALLATION AUX ÉMIRATS.
          </p>
          <p className="text-gray-700 mb-4">
            Grâce à Expatlife.com, nous vous proposons une sélection rigoureuse
            de logements aux Émirats, soigneusement triés par nos équipes pour
            garantir une qualité optimale dès votre arrivée. Que vous
            recherchiez une solution pour un court ou un long séjour, avec ou
            sans visa, et pour tout budget, chaque logement sera adapté à vos
            besoins, que vous soyez seul ou accompagné de votre famille.
          </p>
          <Link href="/location">
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
            TROUVER UN LOGEMENT
          </button>
          </Link>
        </div>
      </section>
      {/* Section ACCOMPAGNEMENT */}
      <section id='ACCOMPAGNEMENT' className="bg-gray-100 rounded-lg shadow-lg p-8 px-6 md:px-20 2xl:px-96 space-x-8  flex flex-col md:flex-row">
        <div className="md:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">VOTRE ACCOMPAGNEMENT</h2>
          <p className="text-teal-500 font-semibold mb-4">
          NOTRE PRIORITÉ : RENDRE VOTRE INSTALLATION AUX ÉMIRATS PLUS ACCESSIBLES 
          GRÂCE À UN ACCOMPAGNEMENT PERSONNALISÉ ET UN RÉSEAU DE PARTENAIRES DÉDIÉS.
          </p>
          <p className="text-gray-700 mb-4">
          Nos partenaires se chargeront intégralement de la création de vos visas, si votre entreprise actuelle ne 
          prend pas cette démarche en charge. 
          La question du visa est une étape clé pour s’installer aux Émirats Arabes Unis, c’est pourquoi nous veillons
           à ce que le processus soit simple, rapide et conforme aux réglementations en vigueur. 
          Si vous êtes en pleine réflexion sur le lancement de votre propre entreprise ou prêt à concrétiser ce projet,
           nous serons à vos côtés pour vous guider, que ce soit pour la constitution juridique, les démarches administratives,
            ou l’obtention des licences nécessaires.
          </p>
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
          PLUS D’INFORMATIONS
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="images/206.png"
            alt="Panneau de conseils"
            className="rounded-lg"
          />
        </div>
        
      </section>
      {/* Section confiance */}
      <section id='CONFIANCE' className="bg-white rounded-lg shadow-lg p-8 px-6 md:px-20 2xl:px-96 space-x-8 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="images/207.png"
            alt="Panneau de conseils"
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 ">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">VOTRE CONFIANCE</h2>
          <p className="text-teal-500 font-semibold mb-4">
            NOTRE PRIORITÉ : SIMPLIFIER VOS DÉMARCHES IMPRÉVUES GRÂCE À NOTRE
            EXPERTISE LOCALE ET UN RÉSEAU DE PARTENAIRES FIABLES.
          </p>
          <p className="text-gray-700 mb-4">
            Après votre installation, il est fréquent de se retrouver face à
            des démarches ou des questions imprévues concernant la vie
            quotidienne, comme l'achat d'une voiture, le choix d'une école ou
            la souscription à une assurance. Expatlife.com vous accompagne sur
            toutes vos demandes, qu'elles concernent votre vie actuelle ou vos
            projets futurs aux Émirats Arabes Unis. Grâce à notre solide
            expérience sur le territoire et à un réseau de partenaires fiables,
            nous vous apportons des solutions adaptées et un soutien constant.
          </p>
          <Link href="/contact">
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
            NOUS CONTACTER
          </button>
          </Link>
        </div>
        
        
      </section>

      {/* section FAQ */}
      <FAQ faqData={faqData}/>
      <Footer/>
    </div>
  );
}