"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Comentario as TComentario } from "@/lib/comentarios";

const AVATAR_COLORS = [
  "bg-mar-500", "bg-sol-500", "bg-coral-500", "bg-mar-700",
  "bg-sol-600", "bg-coral-400", "bg-mar-400", "bg-sol-400",
];

function iniciales(nombre: string) {
  return nombre
    .replace(/^(Don|Doña|Profe|Profesor|Profesora)\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function colorAvatar(autor: string) {
  const sum = autor.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function Comentario({ c }: { c: TComentario }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(c.likes);

  return (
    <article
      className={`card p-5 ${c.destacado ? "ring-2 ring-sol-300/60 ring-offset-2 ring-offset-arena-50" : ""} card-hover relative`}
    >
      {c.destacado && (
        <span className="absolute -top-2.5 left-5 pill bg-sol-300 text-mar-950 text-[10px]">
          ⭐ Comentario destacado
        </span>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`avatar ${colorAvatar(c.autor)}`}>{iniciales(c.autor)}</div>

        {/* Header */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-bold text-mar-950 text-sm">{c.autor}</span>
            {c.rol && (
              <span className="text-[11px] text-mar-700 italic">· {c.rol}</span>
            )}
            <span className="text-[11px] text-mar-700/60 ml-auto">{c.cuando}</span>
          </div>

          {/* Texto */}
          <p className="text-mar-950/85 text-[15px] leading-relaxed mt-2 whitespace-pre-line">
            {c.texto}
          </p>

          {/* Acciones */}
          <div className="flex items-center gap-1 mt-3 -ml-2">
            <button
              onClick={() => {
                setLiked((v) => !v);
                setLikes((v) => v + (liked ? -1 : 1));
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                liked ? "text-coral-500 bg-coral-100" : "text-mar-700 hover:bg-arena-100"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-coral-500" : ""}`} />
              {likes}
            </button>

            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-mar-700 hover:bg-arena-100 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              {c.respuestas}
            </button>

            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-mar-700 hover:bg-arena-100 transition-colors ml-auto">
              <Share2 className="w-3.5 h-3.5" />
              Compartir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
