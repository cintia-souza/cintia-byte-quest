"use client";
import { motion } from "framer-motion";
import { Quote, Send } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  message: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setTestimonials)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSent(true);
      setForm({ name: "", role: "", message: "" });
    }
    setSending(false);
  }

  return (
    <section className="py-24 bg-brand-dark/50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <span className="text-brand-blue">//</span> Impacto Real
        </h2>

        {/* Depoimentos existentes */}
        {testimonials.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white/5 border border-white/10 rounded-3xl relative"
              >
                <Quote className="absolute top-6 right-8 text-brand-blue/20 w-12 h-12" />
                <p className="text-white/80 italic text-lg leading-relaxed">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="text-white font-bold">{t.name}</p>
                  {t.role && (
                    <p className="text-brand-blue text-sm uppercase tracking-widest">
                      {t.role}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Formulário para enviar depoimento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
            <h3 className="text-white font-bold text-lg mb-1">Deixe seu depoimento</h3>
            <p className="text-white/40 text-sm mb-6">
              Conte como foi sua experiência trabalhando conosco
            </p>

            {sent ? (
              <div className="text-center py-6">
                <p className="text-brand-blue font-bold">Obrigado pelo seu depoimento! 🎉</p>
                <p className="text-white/40 text-sm mt-1">Ele será exibido após aprovação.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-blue outline-none text-sm"
                  />
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Cargo / Empresa (opcional)"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-blue outline-none text-sm"
                  />
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Escreva aqui seu depoimento..."
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-blue outline-none text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  <Send size={16} /> {sending ? "Enviando..." : "Enviar Depoimento"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
