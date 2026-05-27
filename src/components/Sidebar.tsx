"use client";

import { Search, X, Sparkles, Flame, Clock } from "lucide-react";
import { TEMAS } from "@/lib/temas";

export type SortMode = "recientes" | "populares" | "destacados";

export default function Sidebar({
  query,
  setQuery,
  temaActivo,
  setTemaActivo,
  sort,
  setSort,
  conteoPorTema,
  totalVisible,
  totalComentarios,
}: {
  query: string;
  setQuery: (v: string) => void;
  temaActivo: string | null;
  setTemaActivo: (v: string | null) => void;
  sort: SortMode;
  setSort: (v: SortMode) => void;
  conteoPorTema: Record<string, number>;
  totalVisible: number;
  totalComentarios: number;
}) {
  return (
    <aside className="lg:sticky lg:top-4 lg:self-start space-y-4">
      {/* Buscador */}
      <div className="card p-4">
        <label className="text-[11px] uppercase tracking-widest font-bold text-mar-700/60 block mb-2">
          Buscar en el foro
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mar-700/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nombre, palabra, tema..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border-2 border-arena-200 focus:border-mar-400 focus:outline-none text-sm bg-arena-50/50 placeholder:text-mar-700/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-arena-100 text-mar-700"
              aria-label="Limpiar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-[11px] text-mar-700/60 mt-2">
          Mostrando <span className="font-bold text-mar-800">{totalVisible}</span> de{" "}
          {totalComentarios} comentarios
        </p>
      </div>

      {/* Orden */}
      <div className="card p-4">
        <label className="text-[11px] uppercase tracking-widest font-bold text-mar-700/60 block mb-2">
          Ordenar por
        </label>
        <div className="grid grid-cols-3 gap-1">
          {(
            [
              { id: "recientes", label: "Recientes", icon: Clock },
              { id: "populares", label: "Populares", icon: Flame },
              { id: "destacados", label: "Destacados", icon: Sparkles },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSort(id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-[11px] font-bold transition-colors ${
                sort === id
                  ? "bg-mar-500 text-white"
                  : "bg-arena-50 text-mar-800 hover:bg-arena-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorías */}
      <div className="card p-4">
        <label className="text-[11px] uppercase tracking-widest font-bold text-mar-700/60 block mb-2">
          Categorías
        </label>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setTemaActivo(null)}
              className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                temaActivo === null
                  ? "bg-mar-100 text-mar-800"
                  : "text-mar-800 hover:bg-arena-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">🌊</span> Todo el foro
              </span>
              <span className="text-[11px] font-bold opacity-60">
                {totalComentarios}
              </span>
            </button>
          </li>
          {TEMAS.map((t) => {
            const count = conteoPorTema[t.slug] ?? 0;
            const active = temaActivo === t.slug;
            return (
              <li key={t.slug}>
                <button
                  onClick={() => setTemaActivo(active ? null : t.slug)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? `${t.color} ${t.acento} font-bold`
                      : "text-mar-800 hover:bg-arena-50"
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{t.emoji}</span>
                    <span className="truncate">{t.nombre}</span>
                  </span>
                  <span className="text-[11px] font-bold opacity-60 ml-2 flex-shrink-0">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pista del foro */}
      <div className="card p-4 bg-sol-50 border-sol-200">
        <p className="font-hand text-2xl text-mar-900 leading-tight">
          ¿No ves tu opinión?
        </p>
        <p className="text-mar-800/80 text-xs mt-1 leading-relaxed">
          Ahí arriba está la caja para publicar. ¡Ánimo, vecin@!
        </p>
      </div>
    </aside>
  );
}
