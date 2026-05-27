"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Users, Waves } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Fondo tipo agua caribeña */}
      <div className="absolute inset-0 bg-gradient-to-br from-mar-200 via-mar-300 to-mar-500">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.6) 0%, transparent 40%)",
          }}
        />
      </div>

      <div className="relative wrap pt-10 pb-12 lg:pb-16">
        {/* Logo + título */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Logo (cuando el usuario lo suba estará en /logo-voces.png) */}
          <motion.div
            initial={{ scale: 0.9, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden flex-shrink-0"
          >
            {/* Si existe /logo-voces.png lo muestra; si no, un fallback */}
            <picture>
              <source srcSet="/logo-voces.png" type="image/png" />
              <img
                src="/logo-voces.png"
                alt="Voces de Mahahual"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  // fallback: oculta la imagen rota para que se vea el emoji debajo
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </picture>
            <span className="absolute text-4xl">🐚</span>
          </motion.div>

          <div className="flex-1">
            <span className="pill bg-white/70 text-mar-800 text-xs backdrop-blur">
              <Waves className="w-3.5 h-3.5" /> Página vecinal · Costa Maya
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-3 leading-[0.95] drop-shadow-md">
              Voces de{" "}
              <span className="text-sol-300">Mahahual</span>
            </h1>
            <p className="font-hand text-2xl text-white/95 mt-2 drop-shadow">
              Lo que pensamos los del puerto, sin filtros.
            </p>
          </div>
        </div>

        {/* Stats casual */}
        <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
          {[
            { icon: Users, n: "247", t: "vecinos opinando" },
            { icon: MessageSquareText, n: "70+", t: "comentarios" },
            { icon: Waves, n: "8", t: "temas activos" },
          ].map(({ icon: Icon, n, t }) => (
            <div
              key={t}
              className="bg-white/85 backdrop-blur rounded-2xl px-4 py-2.5 flex items-center gap-2.5 border-2 border-white"
            >
              <Icon className="w-4 h-4 text-mar-600" />
              <div className="leading-tight">
                <div className="font-display font-bold text-mar-900">{n}</div>
                <div className="text-[10px] uppercase tracking-wide text-mar-700">{t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onda decorativa abajo */}
      <svg
        viewBox="0 0 1200 60"
        className="block w-full -mb-px"
        preserveAspectRatio="none"
        style={{ height: "40px", color: "#fdfaf2" }}
      >
        <path
          fill="currentColor"
          d="M0,32 C200,60 400,0 600,28 C800,56 1000,8 1200,32 L1200,60 L0,60 Z"
        />
      </svg>
    </header>
  );
}
