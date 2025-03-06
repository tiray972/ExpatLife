import Link from "next/link";
import Image from "next/image";

// Fonction pour récupérer les articles depuis Firebase
import { getAllArticles } from "@/lib/firebase/articles";

export default async function LatestArticles({lang}) {
  const articles = await getAllArticles();

  // Trier les articles par date (plus récent en premier) et récupérer les 3 derniers
  const latestArticles = articles
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    .slice(0, 3);

  // Nettoyage du contenu en supprimant les balises HTML
  const cleanSummary = (text) => {
    return text.replace(/<[^>]+>/g, '').substring(0, 100) + '...';  // Supprime les balises HTML et coupe à 100 caractères
  };

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Derniers Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Image de l'article */}
            <Image
              src={article.featuredImage}
              alt={article.title}
              width={800}
              height={500}
              className="w-full h-48 object-cover"
            />
            {/* Contenu de l'article */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {article.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {cleanSummary(article.summary || article.content)}  {/* Nettoyage du texte */}
              </p>
              <Link
                href={`/${lang}/blog/${article.slug}`}
                className="text-teal-500 font-medium hover:underline"
              >
                Lire la suite
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
