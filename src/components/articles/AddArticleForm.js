import { useState } from "react";
import { redirect } from "next/navigation";  // Utilisation de redirect pour le routage

export default function AddArticleForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString());

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      slug,
      content,
      featuredImage,
      author,
      publishedDate,
    };

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        // Utilisation de redirect pour la navigation après succès
        redirect("/blog");
      } else {
        const result = await response.json();
        console.error("Erreur :", result.error);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="bg-gray-100 w-full p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Ajouter un nouvel article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields... */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            Titre de l'article
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-gray-700 font-semibold">
            Slug de l'article
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 font-semibold">
            Contenu
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows="6"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="featuredImage" className="block text-gray-700 font-semibold">
            URL de l'image principale
          </label>
          <input
            type="text"
            id="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 font-semibold">
            Auteur
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="publishedDate" className="block text-gray-700 font-semibold">
            Date de publication
          </label>
          <input
            type="datetime-local"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600"
        >
          Publier l'article
        </button>
      </form>
    </div>
  );
}
