"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* Substitua pelo caminho real da sua logo */}
          <Image
            src="/logo-byte-quest.png"
            alt="Byte Quest Logo"
            width={40}
            height={40}
            className="object-contain drop-shadow-[0_0_8px_rgba(0,71,255,0.8)]"
          />
          <span className="font-bold text-xl tracking-tighter text-white">
            CINTIA <span className="text-brand-blue">BYTE QUEST</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link
            href="#projetos"
            className="hover:text-brand-blue transition-colors"
          >
            Projetos
          </Link>
          <Link
            href="#servicos"
            className="hover:text-brand-blue transition-colors"
          >
            Serviços
          </Link>
          <Link
            href="#contato"
            className="bg-brand-blue/10 border border-brand-blue/50 text-brand-blue px-4 py-2 rounded-full hover:bg-brand-blue hover:text-white transition-all"
          >
            Falar com a Especialista
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
