"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PublicarBox from "@/components/PublicarBox";
import Comentario from "@/components/Comentario";
import Sidebar, { type SortMode } from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { TEMAS } from "@/lib/temas";
import { COMENTARIOS, type Comentario as TComentario } from "@/lib/comentarios";

// Normaliza para búsqueda sin acentos / case
const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Home() {
  const [comentarios, setComentarios] = useState<TComentario[]>(COMENTARIOS);
  const [query, setQuery] = useState("");
  const [temaActivo, setTemaActivo] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("recientes");

  const publicar = ({
    autor,
    tema,
    texto,
  }: {
    autor: string;
    tema: string;
    texto: string;
  }) => {
    const nuevo: TComentario = {
      id: Date.now(),
      autor,
      tema,
      texto,
      cuando: "ahora mismo",
      likes: 0,
      respuestas: 0,
      destacado: false,
    };
    setComentarios((prev) => [nuevo, ...prev]);
    // Si el tema activo es distinto al del nuevo comentario, cambiamos al del nuevo
    if (temaActivo && temaActivo !== tema) setTemaActivo(tema);
  };

  // Conteo por tema (sobre la base no filtrada)
  const conteoPorTema = useMemo(() => {
    return comentarios.reduce<Record<string, number>>((acc, c) => {
      acc[c.tema] = (acc[c.tema] ?? 0) + 1;
      return acc;
    }, {});
  }, [comentarios]);

  // Lista filtrada + ordenada
  const visibles = useMemo(() => {
    const q = normalizar(query.trim());
    let lista = comentarios.filter((c) => {
      if (temaActivo && c.tema !== temaActivo) return false;
      if (!q) return true;
      const hay = normalizar(`${c.autor} ${c.texto} ${c.rol ?? ""}`);
      return hay.includes(q);
    });

    if (sort === "populares") {
      lista = [...lista].sort((a, b) => b.likes - a.likes);
    } else if (sort === "destacados") {
      lista = [...lista].sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado));
    }
    // "recientes" = orden original (los nuevos van al inicio porque hicimos prepend)
    return lista;
  }, [comentarios, query, temaActivo, sort]);

  const temaInfo = temaActivo ? TEMAS.find((t) => t.slug === temaActivo) : null;

  return (
    <>
      <Header />
      <PublicarBox onPublicar={publicar} />

      <main className="wrap mt-8 pb-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <Sidebar
            query={query}
            setQuery={setQuery}
            temaActivo={temaActivo}
            setTemaActivo={setTemaActivo}
            sort={sort}
            setSort={setSort}
            conteoPorTema={conteoPorTema}
            totalVisible={visibles.length}
            totalComentarios={comentarios.length}
          />

          <section>
            {/* Cabecera dinámica */}
            <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl">{temaInfo?.emoji ?? "🌊"}</span>
                <div className="min-w-0">
                  <h2
                    className={`font-display font-black text-2xl leading-tight ${
                      temaInfo?.acento ?? "text-mar-900"
                    }`}
                  >
                    {temaInfo?.nombre ?? (query ? "Resultados de búsqueda" : "Todo el foro")}
                  </h2>
                  <p className="text-mar-700/70 text-sm">
                    {temaInfo?.bajada ??
                      (query
                        ? `Buscando "${query}"`
                        : "Lo que dicen los vecinos del puerto, todo junto.")}
                  </p>
                </div>
              </div>
              {(temaActivo || query) && (
                <button
                  onClick={() => {
                    setTemaActivo(null);
                    setQuery("");
                  }}
                  className="pill bg-arena-100 text-mar-800 text-xs hover:bg-arena-200"
                >
                  Limpiar filtros ✕
                </button>
              )}
            </div>

            {/* Feed */}
            {visibles.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-4xl mb-3">🤷🏽</p>
                <h3 className="font-display font-bold text-xl text-mar-900">
                  No hay nada por aquí
                </h3>
                <p className="text-mar-700/70 text-sm mt-2">
                  Prueba con otra palabra o cambia de categoría.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {visibles.map((c, i) => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, delay: Math.min(i * 0.015, 0.2) }}
                    >
                      <Comentario c={c} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
