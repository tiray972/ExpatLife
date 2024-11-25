import { addArticle } from "@/lib/firebase/articles";

export async function POST(req) {
  const body = await req.json();

  const articleData = {
    slug: body.slug,
    title: body.title,
    content: body.content,
    featuredImage: body.featuredImage,
    author: body.author,
    publishedDate: body.publishedDate || new Date().toISOString(),
  };

  const result = await addArticle(articleData);

  if (result.success) {
    return new Response(JSON.stringify({ message: result.message }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: result.message }), { status: 400 });
  }
}
