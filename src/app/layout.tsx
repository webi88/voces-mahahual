import type { Metadata } from "next";
import { Fraunces, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voces de Mahahual — Lo que pensamos los del puerto",
  description:
    "Un foro abierto para que la gente de Mahahual, Bacalar y toda la Costa Maya diga lo que opina. Sin filtros, sin partidos.",
  keywords: ["Mahahual", "Costa Maya", "Quintana Roo", "foro", "vecinos", "comunidad"],
  openGraph: {
    title: "Voces de Mahahual",
    description: "Lo que pensamos los del puerto, sin filtros.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
