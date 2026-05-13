"use client";
import { motion } from "framer-motion";
import { Layers, Zap, Database, Globe } from "lucide-react";
import type { ReactNode } from "react";

interface Service {
  title: string;
  desc: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Sistemas White Label",
    desc: "Motores de geração de LPs e SaaS com temas dinâmicos via banco de dados. Escale sem reescrever código.",
    icon: <Layers className="text-brand-blue" />,
  },
  {
    title: "PWAs & Apps Financeiros",
    desc: "Aplicações offline-first com sincronização em tempo real. UX mobile-first e performance extrema.",
    icon: <Database className="text-brand-blue" />,
  },
  {
    title: "Landing Pages Premium",
    desc: "Páginas de conversão para médicos e serviços de luxo. Core Web Vitals 100/100 garantido.",
    icon: <Zap className="text-brand-blue" />,
  },
  {
    title: "AdTech & SEO",
    desc: "Portais de conteúdo otimizados para monetização via AdSense sem prejudicar CLS ou experiência do usuário.",
    icon: <Globe className="text-brand-blue" />,
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-32 bg-brand-dark px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Soluções <span className="text-brand-blue">Full Stack</span>
          </h2>
          <p className="text-white/50 mt-6 max-w-xl text-lg">
            Da arquitetura ao deploy — produtos digitais escaláveis com métricas
            de performance impecáveis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-blue/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
