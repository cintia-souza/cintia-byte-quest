"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, ArrowRight } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-dark overflow-hidden pt-24 pb-16">
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Disponível para Projetos em Barueri &amp; Alphaville
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10">
            <Image
              src="/logo-byte-quest.png"
              alt="Byte Quest Logo"
              width={160}
              height={160}
              className="object-contain drop-shadow-[0_0_25px_rgba(0,71,255,0.4)] w-32 h-32 md:w-40 md:h-40"
              priority
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-7xl font-bold text-white leading-[1.1] tracking-tighter max-w-4xl"
          >
            Arquitetando soluções <br />
            <span className="text-brand-blue">de alta performance.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            Desenvolvedora Full-Stack especialista em{" "}
            <span className="text-white">Next.js</span> e{" "}
            <span className="text-white">Supabase</span>. Transformo sistemas
            complexos em experiências digitais impecáveis e lucrativas.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col sm:flex-row gap-4 items-center"
          >
            <a
              href="#projetos"
              className="group bg-brand-blue text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(0,71,255,0.3)] hover:shadow-[0_0_40px_rgba(0,71,255,0.5)]"
            >
              Iniciar Quest{" "}
              <Rocket
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contato"
              className="px-8 py-4 text-white/80 font-bold hover:text-white transition-colors flex items-center gap-2"
            >
              Consultoria Estratégica <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-24 pt-10 border-t border-white/5 w-full max-w-3xl flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 hover:opacity-70 transition-opacity duration-500"
          >
            <span className="text-sm font-bold tracking-widest text-white">
              NEXT.JS 14
            </span>
            <span className="text-sm font-bold tracking-widest text-white">
              TYPESCRIPT
            </span>
            <span className="text-sm font-bold tracking-widest text-white">
              SUPABASE
            </span>
            <span className="text-sm font-bold tracking-widest text-white">
              TAILWIND
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
