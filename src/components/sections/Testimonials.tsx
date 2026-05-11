"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Marcos Silva",
    role: "Clínica Alphaville",
    text: "A velocidade do site que a Cintia entregou superou todas as expectativas. Meus pacientes agora agendam consultas em segundos pelo celular.",
  },
  {
    name: "Portfólio Gamer",
    role: "Enshrouded Atlas",
    text: "Otimização impecável. Conseguimos manter um Core Web Vitals nota 100 mesmo com alta carga de anúncios e tráfego intenso.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-dark/50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="text-brand-blue">//</span> Impacto Real
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-10 bg-white/5 border border-white/10 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-8 text-brand-blue/20 w-12 h-12" />
              <p className="text-white/80 italic text-lg leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-white font-bold">{t.name}</p>
                <p className="text-brand-blue text-sm uppercase tracking-widest">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
