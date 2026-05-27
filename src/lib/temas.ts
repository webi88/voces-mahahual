export type Tema = {
  slug: string;
  nombre: string;
  emoji: string;
  bajada: string;
  color: string; // bg color (tailwind class)
  acento: string; // text color
};

export const TEMAS: Tema[] = [
  {
    slug: "trabajo",
    nombre: "Trabajo y chamba",
    emoji: "💼",
    bajada: "Lo que se siente cuando llega y cuando se va el trabajo en el puerto.",
    color: "bg-coral-100",
    acento: "text-coral-600",
  },
  {
    slug: "turismo",
    nombre: "Turismo, cruceros y malecón",
    emoji: "🚢",
    bajada: "Cómo nos va con la temporada, los cruceros y los turistas en el muelle.",
    color: "bg-mar-100",
    acento: "text-mar-700",
  },
  {
    slug: "pesca",
    nombre: "Pesca y mar",
    emoji: "🐟",
    bajada: "Lo que se ve en la laguna, en la sonda y en las cooperativas.",
    color: "bg-mar-50",
    acento: "text-mar-600",
  },
  {
    slug: "politica",
    nombre: "Política y municipio",
    emoji: "🏛️",
    bajada: "Lo que dicen y no dicen los del palacio. Sin partidos, solo lo que vemos.",
    color: "bg-sol-100",
    acento: "text-sol-700",
  },
  {
    slug: "servicios",
    nombre: "Servicios e infraestructura",
    emoji: "🔧",
    bajada: "Agua, luz, calles, internet. Las quejas de siempre... y a veces las buenas.",
    color: "bg-arena-100",
    acento: "text-mar-800",
  },
  {
    slug: "deportes",
    nombre: "Deportes y juventud",
    emoji: "⚽",
    bajada: "Béisbol, fútbol, lo que arman los chavos en la cancha y en la playa.",
    color: "bg-sol-50",
    acento: "text-sol-600",
  },
  {
    slug: "fiestas",
    nombre: "Fiestas y tradiciones",
    emoji: "🎉",
    bajada: "Las del santo, las del pescador, la feria, las novenas... la vida que sí.",
    color: "bg-coral-100",
    acento: "text-coral-500",
  },
  {
    slug: "vecinos",
    nombre: "Cosas de los vecinos",
    emoji: "🌴",
    bajada: "El chisme bueno, las recomendaciones, los avisos de la cuadra.",
    color: "bg-arena-200",
    acento: "text-mar-900",
  },
];
