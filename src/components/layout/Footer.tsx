"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/logo-byte-quest.png"
                alt="Byte Quest Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-lg text-white tracking-tighter">
                BYTE <span className="text-brand-blue">QUEST</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Desenvolvendo soluções full-stack com precisão e alta performance
              em Barueri, SP.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <Link
                  href="#projetos"
                  className="hover:text-brand-blue transition-colors"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="#servicos"
                  className="hover:text-brand-blue transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="hover:text-brand-blue transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Especialidades
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>Next.js & React</li>
              <li>Supabase & Databases</li>
              <li>Automação com IA</li>
              <li>Performance (Lighthouse)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
              Social & Status
            </h4>
            <div className="flex gap-4 mb-6">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all"
              >
                <FaGithub size={18} className="text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all"
              >
                <FaLinkedin size={18} className="text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all"
              >
                <FaInstagram size={18} className="text-white" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] text-green-500 font-mono uppercase tracking-tighter">
                Sistemas Online em Barueri
              </span>
            </div>
          </div>
        </div>

        {/* Linha Final */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} CINTIA BYTE QUEST. TODOS OS DIREITOS
            RESERVADOS.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[12px] text-white/30 hover:text-brand-blue transition-colors uppercase tracking-widest font-bold"
          >
            Voltar ao Topo <ArrowUpCircle size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
