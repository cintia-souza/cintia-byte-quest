"use client";
import { motion } from "framer-motion";
import { Monitor, Zap, Database, Bot } from "lucide-react";
import type { ReactNode } from "react";

interface Service {
  title: string;
  desc: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: "Landing Pages Premium",
    desc: "Páginas de conversão para médicos e serviços de luxo. Foco total em Core Web Vitals e velocidade extrema.",
    icon: <Zap className="text-brand-blue" />,
  },
  {
    title: "Sistemas Web & PWAs",
    desc: "Aplicações robustas como o 'Finance War Room'. Gestão de dados segura com Supabase e interfaces React.",
    icon: <Database className="text-brand-blue" />,
  },
  {
    title: "Otimização de Performance",
    desc: "Transformo sites lentos em máquinas de vendas. Auditoria completa e correção de métricas do Google.",
    icon: <Monitor className="text-brand-blue" />,
  },
  {
    title: "Automação com IA",
    desc: "Agentes inteligentes para atendimento e processos, integrando Make.com para escalar seu negócio.",
    icon: <Bot className="text-brand-blue" />,
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
            Serviços <span className="text-brand-blue">Especializados</span>
          </h2>
          <p className="text-white/50 mt-6 max-w-xl text-lg">
            Soluções Full-Stack pensadas para o público de Barueri e Alphaville.
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
