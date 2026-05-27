"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { TEMAS } from "@/lib/temas";

export default function PublicarBox({
  onPublicar,
}: {
  onPublicar: (data: { autor: string; tema: string; texto: string }) => void;
}) {
  const [autor, setAutor] = useState("");
  const [tema, setTema] = useState(TEMAS[0].slug);
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !texto.trim()) return;
    onPublicar({ autor: autor.trim(), tema, texto: texto.trim() });
    setTexto("");
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3500);
  };

  return (
    <section className="wrap -mt-6 relative z-10">
      <form
        onSubmit={handleSubmit}
        className="card p-5 sm:p-6 border-mar-300 shadow-lg"
        style={{ boxShadow: "0 8px 24px rgba(26,72,94,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-sol-500" />
          <h2 className="font-display font-bold text-lg text-mar-900">
            Di lo tuyo, vecin@
          </h2>
        </div>
        <p className="text-mar-700 text-sm mb-4">
          Página comunitaria. Sin partidos, sin filtros, sin pleitos. Respetando a los vecinos, claro 🌴
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Tu nombre (o como te conozcan)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-arena-200 focus:border-mar-400 focus:outline-none text-sm font-medium bg-arena-50/50 placeholder:text-mar-700/40"
          />
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-arena-200 focus:border-mar-400 focus:outline-none text-sm font-medium bg-arena-50/50"
          >
            {TEMAS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.emoji} {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="¿Qué piensas? ¿Qué propones? Cuéntale a la gente del puerto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-arena-200 focus:border-mar-400 focus:outline-none text-sm resize-none bg-arena-50/50 placeholder:text-mar-700/40"
        />

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <p className="text-[11px] text-mar-700/60">
            {enviado ? (
              <span className="text-mar-600 font-bold">
                ✓ Listo. Tu comentario ya aparece allá abajo 👇
              </span>
            ) : (
              "Tu comentario quedará visible para todos los vecinos."
            )}
          </p>
          <button type="submit" className="btn-sun text-sm">
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </form>
    </section>
  );
}
