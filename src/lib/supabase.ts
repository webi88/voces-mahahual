import { createClient } from "@supabase/supabase-js";
import type { Comentario } from "./comentarios";

const sbUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const sbAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const SUPABASE_READY =
  sbUrl.startsWith("https://") &&
  !sbUrl.includes("placeholder") &&
  sbAnon.length > 20;

export const supabase = createClient(
  SUPABASE_READY ? sbUrl : "https://placeholder.supabase.co",
  SUPABASE_READY ? sbAnon : "placeholder",
  { auth: { persistSession: false } },
);

const LS_KEY = "voces_mahahual_comentarios_v1";

// ─── Fetch comentarios extra (los publicados por usuarios) ──
export async function fetchComentariosExtra(): Promise<Comentario[]> {
  if (!SUPABASE_READY) {
    // fallback: localStorage
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from("voces_comentarios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[voces] fetch error:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    autor: row.autor,
    rol: row.rol || undefined,
    tema: row.tema,
    texto: row.texto,
    likes: row.likes ?? 0,
    respuestas: 0,
    destacado: row.destacado ?? false,
    cuando: tiempoRelativo(row.created_at),
  }));
}

// ─── Publicar nuevo comentario ───
export async function publicarComentario(input: {
  autor: string;
  tema: string;
  texto: string;
}): Promise<Comentario> {
  const ahora = new Date().toISOString();

  if (!SUPABASE_READY) {
    // fallback: localStorage
    const nuevo: Comentario = {
      id: Date.now(),
      autor: input.autor,
      tema: input.tema,
      texto: input.texto,
      cuando: "ahora mismo",
      likes: 0,
      respuestas: 0,
      destacado: false,
    };
    try {
      const raw = localStorage.getItem(LS_KEY);
      const arr: Comentario[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(LS_KEY, JSON.stringify([nuevo, ...arr]));
    } catch {}
    return nuevo;
  }

  const { data, error } = await supabase
    .from("voces_comentarios")
    .insert({
      autor: input.autor,
      tema: input.tema,
      texto: input.texto,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    autor: data.autor,
    rol: data.rol || undefined,
    tema: data.tema,
    texto: data.texto,
    likes: data.likes ?? 0,
    respuestas: 0,
    destacado: data.destacado ?? false,
    cuando: "ahora mismo",
  };
}

// ─── Incrementar like ───
export async function darLike(id: number): Promise<void> {
  if (!SUPABASE_READY) return;
  try {
    await supabase.rpc("voces_like", { p_id: id });
  } catch (e) {
    console.warn("[voces] like error:", e);
  }
}

// ─── Util: tiempo relativo (sin libs) ───
function tiempoRelativo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "ahora mismo";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  if (diff < 172800) return "ayer";
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`;
  if (diff < 2592000) return `hace ${Math.floor(diff / 604800)} sem`;
  return `hace ${Math.floor(diff / 2592000)} meses`;
}
