import Image from 'next/image';
import Link from 'next/link';
import {Users, Briefcase, Handshake } from 'lucide-react';
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="bg-gray-100">
       <Header />
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/background.png")' }}
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
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 bg-white">
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
            src="/images/background.png"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          {/* Card 1 */}
          <Link  href="/contact"  >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Users />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE ACCOMPAGNEMENT</h3>
              <p className="text-gray-700 text-start">
                Nous vous mettons à disposition la création de votre visa personnel, celui de votre famille et également votre société ainsi que toutes démarches administratives pour votre installation.
              </p>
            </div>
          </Link>
          {/* Card 2 */}
          <Link href="/location" >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Briefcase />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE INSTALLATION</h3>
              <p className="text-gray-700 text-start">
                Avec ou sans visa, trouvez votre 1er logement, petite ou longue durée et installez-vous en toute sérénité grâce à nos partenaires et propriétaires triés sur le volet.
              </p>
            </div>
          </Link>
          {/* Card 3 */}
          <Link href="/contact" >
            <div className="bg-white hover:scale-105 p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
              <div className="text-teal-500 text-4xl mb-4">
                <Handshake />
              </div>
              <h3 className="font-bold text-xl mb-4 text-center">VOTRE CONFIANCE</h3>
              <p className="text-gray-700 text-start">
                Notre expérience de plusieurs années en relation publique vous permettra d'être soutenu dans n'importe quelle démarche qu'elle soit administrative ou autre ici aux Émirats.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-teal-100 px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 text-center md:text-left md:mr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              EXPATLIFE.COM
            </h2>
            <h3 className="text-xl font-bold text-teal-600 mb-8">Qui Sommes Nous ?</h3>
            <p className="text-gray-800 mb-8">
              L'accompagnement des expatriés aux UAE est aujourd'hui une priorité pour nous. Après plusieurs années de maîtrise dans la relation publique et la communication, expatlife.com a été fondé pour apporter une solution aux nouveaux expatriés afin de leur garantir une installation sereine et complète.
            </p>
            <Link href="/about">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition">
                NOUS CONTACTER
              </button>
            </Link>
          </div>
          <div className="flex-1 relative mt-8 md:mt-0">
            <Image
              src="/images/background.png"
              alt="Notre équipe"
              width={500}
              height={350}
              className="rounded-lg shadow-md"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <Link href="/about">
                <button className="bg-red-500 text-white rounded-full p-4 shadow-md">
                  ▶
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      {/* Section INSTALLATION */}
      <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="images/logo.png"
            alt="Famille entrant dans un logement"
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">VOTRE INSTALLATION</h2>
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
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
            TROUVER UN LOGEMENT
          </button>
        </div>
      </section>
      {/* Section ACCOMPAGNEMENT */}
      <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">VOTRE ACCOMPAGNEMENT</h2>
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
            src="images/logo.png"
            alt="Panneau de conseils"
            className="rounded-lg"
          />
        </div>
        
      </section>
      {/* Section confiance */}
      <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="images/logo.png"
            alt="Panneau de conseils"
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">VOTRE CONFIANCE</h2>
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
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
            NOUS CONTACTER
          </button>
        </div>
        
        
      </section>
    </div>
  );
}