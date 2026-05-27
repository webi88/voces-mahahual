import { Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mar-900 text-mar-100 mt-16">
      <div className="wrap py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              Voces de Mahahual
            </h3>
            <p className="text-mar-300 text-sm mt-2 max-w-md leading-relaxed">
              Página vecinal hecha entre amigos del puerto. No representamos a ningún
              partido ni empresa. Si quieres ayudar a moderar, escríbenos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-mar-800 hover:bg-mar-700 text-white text-sm font-bold transition-colors"
            >
              <Facebook className="w-4 h-4" /> Síguenos en Facebook
            </a>
          </div>
        </div>

        {/* Blog discreto */}
        <div className="mt-8 pt-6 border-t border-mar-800/60">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-mar-300 hover:text-white text-xs transition-colors"
          >
            <span className="opacity-60">📝</span>
            <span className="underline underline-offset-2">Blog del puerto</span>
            <span className="text-mar-500">·</span>
            <span className="text-mar-500">próximamente</span>
          </a>
        </div>

        <div className="mt-6 text-center text-[11px] text-mar-400 flex items-center justify-center gap-1.5">
          Hecho con <Heart className="w-3 h-3 fill-coral-400 text-coral-400" /> por vecinos del puerto · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
