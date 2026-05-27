"use client";

import { TEMAS } from "@/lib/temas";

export default function NavTemas() {
  return (
    <nav className="wrap mt-8 mb-2">
      <p className="text-[11px] uppercase tracking-widest font-bold text-mar-700/60 mb-2 ml-1">
        Salta a un tema
      </p>
      <div className="flex flex-wrap gap-2">
        {TEMAS.map((t) => (
          <a
            key={t.slug}
            href={`#${t.slug}`}
            className="pill bg-white border-2 border-arena-200 hover:border-mar-400 hover:-translate-y-0.5 transition-all text-mar-800 text-xs"
          >
            <span>{t.emoji}</span>
            <span>{t.nombre}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
