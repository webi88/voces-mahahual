import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Coffee, Clock, Tag } from "lucide-react";
import { fetchBlogPosts } from "@/lib/supabase";

export const metadata = { title: "Blog del puerto — Voces de Mahahual" };
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <main className="min-h-screen">
        <div className="bg-mar-700 pt-12 pb-10">
          <div className="wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-mar-200 hover:text-white text-sm mb-4 font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al foro
            </Link>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
              Blog del puerto
            </h1>
            <p className="text-mar-200 text-sm mt-2 max-w-xl">
              Escritos más largos: cartas a la comunidad, reflexiones y propuestas vecinales.
            </p>
          </div>
        </div>

        <section className="wrap py-12">
          {posts.length === 0 ? (
            <div className="card p-10 max-w-2xl mx-auto text-center">
              <Coffee className="w-12 h-12 text-sol-500 mx-auto mb-4" />
              <h2 className="font-display font-bold text-2xl text-mar-900">
                Todavía no hay nada aquí
              </h2>
              <p className="text-mar-700 mt-3 leading-relaxed">
                Esta sección está calientita, lista para cuando algún vecino nos quiera
                compartir algo. Por ahora, regrésate al foro — allá sí hay platica.
              </p>
              <Link href="/" className="btn-mar text-sm mt-6 inline-flex">
                Ir al foro de vecinos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card card-hover flex flex-col overflow-hidden group"
                >
                  {post.cover_image ? (
                    <div className="h-44 overflow-hidden bg-mar-100">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-mar-100 to-arena-200 flex items-center justify-center">
                      <span className="text-4xl">🌊</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {post.category && (
                      <span className="pill bg-mar-50 text-mar-600 mb-3 self-start">
                        <Tag className="w-3 h-3" /> {post.category}
                      </span>
                    )}
                    <h2 className="font-display font-bold text-mar-900 text-lg leading-snug mb-2 group-hover:text-mar-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-mar-600 text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-arena-200 text-xs text-mar-400">
                      <span>{post.author}</span>
                      {post.read_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.read_time}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
