import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/firebase/articles";

// Générer les métadonnées pour SEO
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé - Expatlife",
      description: "L'article que vous cherchez n'existe pas ou a été supprimé.",
    };
  }

  const description = article.content.replace(/<[^>]+>/g, "").substring(0, 160);

  return {
    title: `${article.title} - Blog Expatlife`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
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
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound(); // Redirige vers une page 404 par défaut si l'article n'existe pas
  }

  return (
    <div className="bg-gray-50">
      {/* En-tête de l'article */}
      <header className="relative bg-teal-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight animate-fadeIn">
            {article.title}
          </h1>
          <p className="text-lg italic">
            Par <span className="font-semibold">{article.author}</span> •{" "}
            {new Date(article.publishedDate).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* Image d'en-tête */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src={article.featuredImage}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-6 md:px-20 py-16 bg-white shadow-lg rounded-lg -mt-12 relative z-10">
        {/* Image principale */}
        <div className="mb-10 flex justify-center">
          <Image
            src={article.featuredImage}
            alt={article.title}
            width={1200}
            height={675}
            className="rounded-lg shadow-md"
            priority
          />
        </div>

        {/* Contenu de l'article */}
        <article
          className="prose lg:prose-lg prose-indigo max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-100 py-10 mt-10 text-center text-gray-600">
        <p className="text-sm">
          © {new Date().getFullYear()} Expatlife • Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
