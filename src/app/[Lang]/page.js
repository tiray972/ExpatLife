import Image from 'next/image';
import Link from 'next/link';
import {Users, Briefcase, Handshake } from 'lucide-react';
import Header from "@/components/header";
import Footer from '@/components/Footer';
import FAQ from '@/components/faq';
import GoogleReviews from '@/components/google/googlereviews';


import ContactSection from '@/components/contact/contactHome';
import PushNotificationManager from '@/components/Notif/PushNotificationManager';
import LatestArticles from '@/components/articles/LatestArticles';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { locales } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return locales.map((Lang) => ({
    Lang,
  }))
}

export default async function  Home({params}) {
  
  const { Lang } = await params;
  // console.log(Lang);
  
  const dictionary = await getDictionary(Lang)
  const faqData = dictionary.home.faq;
  const reviews = [
    {
      authorName: "illidio audel",
      profilePhoto: "/images/default-avatar.png", // Mettre des avatars corrects
      text: "Expatlife m'a aidé à trouver un logement parfait en un temps record. Je recommande à 100% !",
      rating: 5,
      relativeTime: "il y a 1 jours",
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
      
      <div className="bg-gray-100 scroll-smooth">
        
        <Header lang={Lang}  />
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
        
        {dictionary.home.hero_title}
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/location">
          <button className="bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition">
          {dictionary.home.hero_find_home}
          </button>
        </Link>
        <Link href="#CONTACT">
          <button className="bg-teal-500 text-black font-medium py-3 px-6 rounded-lg hover:bg-teal-600 transition">
          {dictionary.home.hero_contact_us}
          </button>
        </Link>
      </div>
    </div>
  </section>


        {/* Problem Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 2xl:px-96 space-y-8 md:space-y-0 md:space-x-8 py-10 bg-white">
    <div className="max-w-lg text-center md:text-left">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
      {dictionary.home.problem_title}
      </h2>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-500 mb-6">
      {dictionary.home.problem_subtitle}
        
      </h3>
      <p className="text-base sm:text-lg text-gray-700">
      {dictionary.home.problem_text}
      </p>
    </div>
    <div className="w-full md:w-auto flex justify-center">
      <Image
        src="/images/203.png"
        alt="Trouver un logement"
        width={500}
        height={350}
        className="rounded-lg shadow-lg w-full max-w-md md:max-w-none"
      />
    </div>
        </section>



        {/* Our Priorities Section */}
        <section className="bg-gray-100 py-16">
    <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10">{dictionary.home.our_priority}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-20">
      {/* Card 1 */}
      <a href="#ACCOMPAGNEMENT">
        <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
          <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
            <Users />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-4 text-center">{dictionary.home.your_support}</h3>
          <p className="text-gray-700 text-justify sm:text-start">
          {dictionary.home.your_support_p}
          </p>
        </div>
      </a>
      {/* Card 2 */}
      <a href="#INSTALLATION">
        <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
          <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
            <Briefcase />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-4 text-center">{dictionary.home.your_installation}</h3>
          <p className="text-gray-700 text-justify sm:text-start">
          {dictionary.home.your_installation_p}
          </p>
        </div>
      </a>
      {/* Card 3 */}
      <a href="#CONFIANCE">
        <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
          <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
            <Handshake />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-4 text-center">{dictionary.home.your_trust}</h3>
          <p className="text-gray-700 text-justify sm:text-start">
          {dictionary.home.your_trust_p}
          </p>
        </div>
      </a>
    </div>
        </section>


        {/* section google */}
        <GoogleReviews reviews={reviews}/>
        {/* About Us Section */}
        <section className="bg-teal-100 rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col-reverse md:flex-row md:space-x-8 space-y-8 md:space-y-0">
    {/* Texte */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        EXPATLIFE.COM
      </h2>
      <h3 className="text-lg sm:text-xl font-bold text-teal-600 mb-6">
      {dictionary.home.about_us}
      </h3>
      <p className="text-gray-800 mb-6">
      {dictionary.home.expatlife_intro}
        
      </p>
      <Link href="#CONTACT">
        <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition">
          {dictionary.home.hero_contact_us}
        </button>
      </Link>
    </div>

    {/* Image */}
    <div className="md:w-1/2 flex justify-center">
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
        <section
          id="INSTALLATION"
          className="bg-white rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
          <div className="md:w-1/2">
            <Image
              src="/images/205.png"
              alt="Notre équipe"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {dictionary.home.your_installation}
            </h2>
            <p className="text-teal-500 font-semibold mb-4">
              {dictionary.home.your_installation_p1}
            </p>
            <p className="text-gray-700 mb-4">
              {dictionary.home.your_installation_p2}
            </p>
            <Link href="/location">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
                {dictionary.home.hero_find_home}
              </button>
            </Link>
          </div>
        </section>

        {/* Section ACCOMPAGNEMENT */}
        <section
          id="ACCOMPAGNEMENT"
          className="bg-gray-100 rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col-reverse md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {dictionary.home.your_support}
            </h2>
            <p className="text-teal-500 font-semibold mb-4">
            {dictionary.home.your_support_p1}
            </p>
            <p className="text-gray-700 mb-4">
            {dictionary.home.your_support_p2}
            </p>
            <p className="text-teal-500 mb-4">{dictionary.home.be_patient}</p>
            <Link href={"mailto:contact@expatlife-uae.com"}>
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
                {dictionary.home.more_info}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/206.png"
              alt="Panneau de conseils"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Section CONFIANCE */}
        <section
          id="CONFIANCE"
          className="bg-white rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/207.png"
              alt="Panneau de conseils"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {dictionary.home.your_trust}
            </h2>
            <p className="text-teal-500 font-semibold mb-4">
              
              {dictionary.home.your_trust_p1}
            </p>
            <p className="text-gray-700 mb-4">
            {dictionary.home.your_trust_p2}
            </p>
            <Link href={`/${Lang}/contact`}>
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
              {dictionary.home.hero_contact_us}
              </button>
            </Link>
          </div>
        </section>


        {/* Blog Section */}
        <LatestArticles/>

        {/* section FAQ */}
        <FAQ faqData={faqData}/>
        {/* Section Contact */}
        <ContactSection dictionary={dictionary}/>

        <Footer lang={Lang} />
      </div>

    </>
   
  );
}