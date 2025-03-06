
import Link from 'next/link';
import Header from "@/components/header";
import Footer from '@/components/Footer';
import PushNotificationManager from '@/components/Notif/PushNotificationManager';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { locales } from '@/lib/i18n/config';
import MultiStepForm from '@/components/contact/formVisaSociete';

export async function generateStaticParams() {
  return locales.map((Lang) => ({
    Lang,
  }))
}

export default async function  acompagnementpage({params}) {
  
  const { Lang } = await params;
  // console.log(Lang);
  
  const dictionary = await getDictionary(Lang)
  

  
  

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
            {/* formulaire  */}
            <MultiStepForm dictionary={dictionary} />
          </div>
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
            <Link href="/location">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">
                {dictionary.home.hero_find_home}
              </button>
            </Link>
          </div>
        </section>

       
        <Footer lang={Lang} />
      </div>

    </>
   
  );
}