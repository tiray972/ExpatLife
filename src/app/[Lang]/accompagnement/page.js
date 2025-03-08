
import Link from 'next/link';
import Header from "@/components/header";
import Footer from '@/components/Footer';
import PushNotificationManager from '@/components/Notif/PushNotificationManager';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { locales } from '@/lib/i18n/config';
import MultiStepForm from '@/components/contact/formVisaSociete';
import { Briefcase, Handshake, Users } from 'lucide-react';
import Image from 'next/image';
import Timeline from '@/components/animation/timeline';
import FAQ from '@/components/faq';
import ContactSection from '@/components/contact/contactHome';

export async function generateStaticParams() {
  return locales.map((Lang) => ({
    Lang,
  }))
}

export default async function  acompagnementpage({params}) {
  
  const { Lang } = await params;
  // console.log(Lang);
  
  const dictionary = await getDictionary(Lang)
  const faqData = dictionary.home.faq;
  

  
  

  return (
    <> 
      <PushNotificationManager />
      
      <div className="bg-gray-100 scroll-smooth">
        
        <Header lang={Lang}  />
      
        {/* Section formulaire  */}
        <section
          id="INSTALLATION"
          className="bg-white rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
            <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {dictionary.support.titre_herro}
            </h2>
            <p className="text-teal-500 uppercase font-semibold mb-4">
              {dictionary.support.subtitle_herro}
            </p>
            <p className="text-gray-700 mb-4">
              {dictionary.support.p_herro}
            </p>
            <Link href="https://wa.me/971568127898">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 uppercase rounded hover:bg-teal-600">
                {dictionary.support.creatSas}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            {/* formulaire  */}
            <MultiStepForm dictionary={dictionary} />
          </div>
          
        </section>
        {/* why choose Section */}
        <section className="bg-gray-100 py-16">
            <h2 className="text-center text-2xl sm:text-3xl uppercase font-bold mb-10">{dictionary.support.why_choose}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-20">
            {/* Card 1 */}
            <a href="#timeline">
                <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
                <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
                    <Users />
                </div>
                <h3 className="font-bold text-lg sm:text-xl uppercase mb-4 text-center">{dictionary.support.why_choose1}</h3>
                <p className="text-gray-700 text-justify sm:text-start">
                {dictionary.support.why_choose1_p}
                </p>
                </div>
            </a>
            {/* Card 2 */}
            <a href="#timeline">
                <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
                <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
                    <Briefcase />
                </div>
                <h3 className="font-bold text-lg sm:text-xl uppercase mb-4 text-center">{dictionary.support.why_choose2}</h3>
                <p className="text-gray-700 text-justify sm:text-start">
                {dictionary.support.why_choose2_p}
                </p>
                </div>
            </a>
            {/* Card 3 */}
            <a href="#timeline">
                <div className="bg-white hover:scale-105 transition-transform p-6 border rounded-lg shadow-md flex flex-col items-start h-full">
                <div className="text-teal-500 text-3xl sm:text-4xl mb-4 flex justify-start w-full">
                    <Handshake />
                </div>
                <h3 className="font-bold text-lg sm:text-xl uppercase mb-4 text-center">{dictionary.support.why_choose3}</h3>
                <p className="text-gray-700 text-justify sm:text-start">
                {dictionary.support.why_choose3_p}
                </p>
                </div>
            </a>
            </div>
        </section>

        {/* Section service  */}
        <section
          id=""
          className="bg-white rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
            <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900 mb-4">
            {dictionary.support.service}
            </h2>
            <p className="text-teal-500 uppercase font-semibold mb-4">
              {dictionary.support.servi_subtittle}
            </p>
            <p className="text-gray-700 mb-4">
              {dictionary.support.servi_p}
            </p>
            <Link href="mailto:contact@expatlife-uae.com">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
                {dictionary.home.more_info}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            {/* formulaire  */}
            <Image 
            src={"/images/cleEnmain.png"}
            alt='image represantant la cle en main'
            width={800}
            height={350}
            className="rounded-lg shadow-md"
            />
          </div>
          
        </section>
        {/* timeline  */}
        <Timeline/>

        {/* Section communication et visibilité */}
        <section
          id="ACCOMPAGNEMENT"
          className="bg-gray-100 rounded-lg shadow-lg py-8 px-4 sm:px-6 md:px-20 2xl:px-96 flex flex-col-reverse md:flex-row md:space-x-8 space-y-8 md:space-y-0"
        >
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-900 mb-4">
            {dictionary.support.your_com}
            </h2>
            <p className="text-teal-500 font-semibold uppercase mb-4">
            {dictionary.support.your_com_p1}
            </p>
            <p className="text-gray-700 mb-4">
            {dictionary.support.your_com_p2}
            </p>
            {/* <p className="text-teal-500 mb-4">{dictionary.home.be_patient}</p> */}
            <Link href={"ugm-communication.com"}>
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
                {dictionary.home.more_info}
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/rs.png"
              alt="Panneau de conseils"
              width={800}
              height={350}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>
        {/* section FAQ */}
        <FAQ faqData={faqData}/>
        <ContactSection dictionary={dictionary}/>
        <Footer lang={Lang} />
      </div>

    </>
   
  );
}