import Footer from "@/components/Footer";
import CalendlyWidget from "@/components/contact/CalendlyWidget";
import Header from "@/components/header"
import { locales } from '@/lib/i18n/config';


export async function generateStaticParams() {
    return locales.map((Lang) => ({
      Lang,
    }))
  }
export default async function calendarPage({params}) {
  
    const { Lang } = await params;
    return(
        <>
            <Header lang={ Lang }/>
            <div className="min-h-full">
                
                <CalendlyWidget/>

            </div>
            <Footer lang={ Lang }/>
        </>
    );
};