import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Fonction pour récupérer les articles depuis Firebase (exemple)
import { getAllArticles } from "@/lib/firebase/articles";
import Header from "@/components/header";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Blog - Expatlife",
  description: "Retrouvez nos articles sur l'expatriation, la vie aux Émirats, et bien plus.",
  keywords:"blog expatriation, logement Émirats, conseils expatlife",
};

export default async function Blog() {
  const articles = await getAllArticles();


  return (
    <>
   
    <div className="bg-gray-100">
      
      <Header/>
      <header className="py-10 bg-teal-500 text-white text-center">
        <h1 className="text-4xl font-bold">Nos Articles de Blog</h1>
        <p className="mt-2">Découvrez nos conseils et astuces pour une expatriation réussie.</p>
      </header>

      <section className="px-6 md:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <p className="text-sm text-gray-500">
                Par {article.author} - {new Date(article.publishedDate).toLocaleDateString("fr-FR")}
              </p>
              <Link href={`/blog/${article.slug}`} className="text-teal-500 font-semibold mt-4 block hover:underline">
                Lire l'article
              </Link>
            </div>
          </article>
        ))}
      </section>
      <Footer/>
    </div>
    </>
    
  );
}
