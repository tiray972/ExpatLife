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
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound(); // Redirige vers une page 404 par défaut si l'article n'existe pas
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
