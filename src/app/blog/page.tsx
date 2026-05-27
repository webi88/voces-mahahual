import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";

export const metadata = { title: "Blog del puerto — Voces de Mahahual" };

export default function BlogPage() {
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
              Aquí publicamos, de vez en cuando, escritos más largos: cartas a la comunidad,
              reflexiones, propuestas vecinales.
            </p>
          </div>
        </div>

        <section className="wrap py-16">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
