"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavTemas from "@/components/NavTemas";
import PublicarBox from "@/components/PublicarBox";
import TemaSection from "@/components/TemaSection";
import Footer from "@/components/Footer";
import { TEMAS } from "@/lib/temas";
import { COMENTARIOS, type Comentario } from "@/lib/comentarios";

export default function Home() {
  const [comentarios, setComentarios] = useState<Comentario[]>(COMENTARIOS);

  const publicar = ({
    autor,
    tema,
    texto,
  }: {
    autor: string;
    tema: string;
    texto: string;
  }) => {
    const nuevo: Comentario = {
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

    // Scroll suavemente al tema donde se publicó
    setTimeout(() => {
      const el = document.getElementById(tema);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  return (
    <>
      <Header />
      <PublicarBox onPublicar={publicar} />
      <NavTemas />

      <main className="pb-8">
        {TEMAS.map((t) => (
          <TemaSection
            key={t.slug}
            tema={t}
            comentarios={comentarios.filter((c) => c.tema === t.slug)}
          />
        ))}
      </main>

      <Footer />
    </>
  );
}
