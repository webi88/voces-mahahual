"use client";

import { motion } from "framer-motion";
import Comentario from "./Comentario";
import type { Tema } from "@/lib/temas";
import type { Comentario as TComentario } from "@/lib/comentarios";

export default function TemaSection({
  tema,
  comentarios,
}: {
  tema: Tema;
  comentarios: TComentario[];
}) {
  return (
    <section id={tema.slug} className="wrap pt-12 pb-4 scroll-mt-6">
      {/* Header del tema */}
      <div className={`${tema.color} rounded-3xl px-6 py-5 mb-6 border-2 border-white relative overflow-hidden`}>
        <div className="flex items-start gap-4 relative">
          <span className="text-5xl leading-none">{tema.emoji}</span>
          <div className="flex-1 min-w-0">
            <h2 className={`font-display font-black text-2xl sm:text-3xl ${tema.acento} leading-tight`}>
              {tema.nombre}
            </h2>
            <p className="text-mar-900/70 text-sm mt-1 max-w-xl">{tema.bajada}</p>
          </div>
          <span className="hidden sm:inline-flex pill bg-white/80 text-mar-800 text-[11px]">
            {comentarios.length} comentarios
          </span>
        </div>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-3">
        {comentarios.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
          >
            <Comentario c={c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
