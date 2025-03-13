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
                
            <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
            <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
            <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/jojolala972/30min'});return false;">Schedule time with me</a>
            </link>
                        

            </div>
            <Footer lang={ Lang }/>
        </>
    );
};