import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, User } from "lucide-react";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/supabase";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: `${post.title} — Blog del puerto`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) notFound();

  const fecha = new Date(post.created_at).toLocaleDateString("es-MX", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      <main className="min-h-screen">
        {/* Header */}
        <div className="bg-mar-700 pt-12 pb-10">
          <div className="wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-mar-200 hover:text-white text-sm mb-5 font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Blog del puerto
            </Link>
            {post.category && (
              <span className="pill bg-mar-600 text-mar-100 mb-4 inline-flex">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
            )}
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-mar-300 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.read_time}
                </span>
              )}
              <span>{fecha}</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="wrap mt-8">
            <div className="rounded-2xl overflow-hidden max-h-96">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="wrap py-10">
          <div
            className="prose prose-mar max-w-2xl mx-auto text-mar-800 leading-relaxed
              prose-headings:font-display prose-headings:text-mar-900
              prose-a:text-mar-600 prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="max-w-2xl mx-auto mt-10">
              <h3 className="font-display font-bold text-mar-900 text-lg mb-4">
                Galería
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {post.images.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={url}
                      alt={`Imagen ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-xl border-2 border-arena-200 hover:border-mar-400 transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="max-w-2xl mx-auto mt-12 pt-6 border-t border-arena-200">
            <Link href="/blog" className="btn-mar text-sm">
              <ArrowLeft className="w-4 h-4" /> Más artículos
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
