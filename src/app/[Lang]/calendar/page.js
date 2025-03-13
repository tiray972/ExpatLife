import Footer from "@/components/Footer";
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
                Test 
                
               

            </div>
            <Footer lang={ Lang }/>
        </>
    );
};