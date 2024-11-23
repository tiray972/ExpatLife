import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

// Simuler une API pour obtenir un article
async function fetchArticle(slug) {
  const articles = {
    "installer-aux-emirats": {
      title: "Comment s'installer aux Émirats en toute sérénité",
      content: "<p>Voici tout ce que vous devez savoir pour réussir votre expatriation...</p>",
      featuredImage: "/images/blog1.jpg",
      author: "Expatlife Team",
      publishedDate: "2024-11-01",
    },
    "trouver-logement-rapide": {
      title: "Les meilleures astuces pour trouver un logement rapide",
      content: "<p>Voici nos conseils pour trouver un logement adapté à vos besoins...</p>",
      featuredImage: "/images/blog2.jpg",
      author: "Expatlife Team",
      publishedDate: "2024-10-25",
    },
  };

  return articles[slug] || null;
}

// Génération des métadonnées pour SEO
export async function generateMetadata({ params }) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé - Expatlife",
      description: "L'article que vous cherchez n'existe pas ou a été supprimé.",
    };
  }

  return {
    title: `${article.title} - Blog Expatlife`,
    description: article.content.replace(/<[^>]+>/g, "").substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.replace(/<[^>]+>/g, "").substring(0, 160),
      images: [
        {
          url: article.featuredImage,
          alt: article.title,
        },
      ],
      type: "article",
    },
  };
}

// Composant principal de la page
export default async function ArticlePage({ params }) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    notFound(); // Affiche une page 404 par défaut de Next.js si l'article n'existe pas
  }

  return (
    <div>
      <header className="bg-teal-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <p className="text-sm mt-2">
          Par {article.author} - {new Date(article.publishedDate).toLocaleDateString("fr-FR")}
        </p>
      </header>

      <main className="px-6 md:px-20 py-10">
        <div className="mb-10">
          <Image
            src={article.featuredImage}
            alt={article.title}
            width={1200}
            height={675}
            className="w-full rounded-lg shadow-md"
            priority
          />
        </div>
        <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      </main>
    </div>
  );
}
