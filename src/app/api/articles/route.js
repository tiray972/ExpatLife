import { addArticle } from "@/lib/firebase/articles";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validation des champs requis
    if (!body.title || !body.slug || !body.content || !body.featuredImage || !body.author) {
      return new Response(
        JSON.stringify({ error: "Tous les champs requis doivent être remplis." }),
        { status: 400 }
      );
    }

    // Sanitation simple du contenu
    const sanitizedContent = body.content.replace(/<script[^>]*?>.*?<\/script>/g, "");

    const articleData = {
      slug: body.slug.trim(),
      title: body.title.trim(),
      content: sanitizedContent,
      featuredImage: body.featuredImage,
      author: body.author.trim(),
      publishedDate: body.publishedDate || new Date().toISOString(),
    };

    // Enregistrement dans la base de données
    const result = await addArticle(articleData);

    if (result.success) {
      return new Response(
        JSON.stringify({ message: "Article ajouté avec succès !" }),
        { status: 201 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: result.message || "Erreur lors de l'ajout de l'article." }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur API:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur inattendue est survenue." }),
      { status: 500 }
    );
  }
}
