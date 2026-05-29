export type Comentario = {
  id: number;
  autor: string;
  rol?: string;
  cuando: string;
  texto: string;
  likes: number;
  respuestas: number;
  tema: string; // slug
  destacado?: boolean;
};

export const COMENTARIOS: Comentario[] = [];

export const comentariosPorTema = (slug: string) =>
  COMENTARIOS.filter((c) => c.tema === slug);
