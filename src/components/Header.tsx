"use client";

import { motion } from "framer-motion";
import { Waves, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Foto de portada real */}
      <div className="absolute inset-0">
        <img
          src="/portada.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mar-900/30 via-mar-900/20 to-mar-900/55" />
      </div>

      <div className="relative wrap pt-10 pb-12 lg:pb-16">
        {/* Logo + título */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Voces de Mahahual"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="pill bg-white/70 text-mar-800 text-xs backdrop-blur">
                <Waves className="w-3.5 h-3.5" /> Página vecinal · Costa Maya
              </span>
              <a
                href="https://api.whatsapp.com/send/?phone=525643848889&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sol-400 hover:bg-sol-300 text-mar-950 text-xs font-bold shadow transition-colors"
              >
                <Plus className="w-3 h-3" /> Crea tu Foro
              </a>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mt-3 leading-[0.95] drop-shadow-md">
              Voces de{" "}
              <span className="text-sol-300">Mahahual</span>
            </h1>
            <p className="font-hand text-2xl text-white/95 mt-2 drop-shadow">
              Lo que pensamos los del puerto, sin filtros.
            </p>
          </div>
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
