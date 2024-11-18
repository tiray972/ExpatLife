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
            <h1 className="text-4xl font-bold text-orange-500">Expat</h1>
            <h1 className="text-4xl font-bold text-teal-500">Life</h1>
            <span className="text-4xl font-bold text-white">.com</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Trouvez votre logement aux ÉMIRATS, grâce à un accompagnement personnalisé pour une arrivée sereine et réussie.
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="/housing">
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
            src="/images/housing-problem.jpg"
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
          <div className="bg-white p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
            <div className="text-teal-500 text-4xl mb-4">
              <Users />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">VOTRE ACCOMPAGNEMENT</h3>
            <p className="text-gray-700 text-start">
              Nous vous mettons à disposition la création de votre visa personnel, celui de votre famille et également votre société ainsi que toutes démarches administratives pour votre installation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
            <div className="text-teal-500 text-4xl mb-4">
              <Briefcase />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">VOTRE INSTALLATION</h3>
            <p className="text-gray-700 text-start">
              Avec ou sans visa, trouvez votre 1er logement, petite ou longue durée et installez-vous en toute sérénité grâce à nos partenaires et propriétaires triés sur le volet.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 border rounded-lg shadow-md flex flex-col items-start justify-between h-full">
            <div className="text-teal-500 text-4xl mb-4">
              <Handshake />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">VOTRE CONFIANCE</h3>
            <p className="text-gray-700 text-start">
              Notre expérience de plusieurs années en relation publique vous permettra d'être soutenu dans n'importe quelle démarche qu'elle soit administrative ou autre ici aux Émirats.
            </p>
          </div>
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
              src="/images/team.jpg"
              alt="Notre équipe"
              width={500}
              height={350}
              className="rounded-lg shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link href="/about">
                <button className="bg-red-500 text-white rounded-full p-4 shadow-md">
                  ▶
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}