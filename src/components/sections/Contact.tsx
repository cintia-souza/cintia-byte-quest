"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactForm) {
    try {
      if (!supabase) throw new Error("Serviço indisponível");
      const { error } = await supabase.from("leads").insert([data]);
      if (error) throw error;
      setSent(true);
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <section id="contato" className="py-32 bg-brand-dark px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white leading-tight">
            Vamos iniciar sua <br />
            <span className="text-brand-blue">Próxima Quest?</span>
          </h2>
          <p className="text-white/60 mt-6 text-lg">
            Seja para um site médico em Alphaville ou um sistema complexo, estou
            pronta para elevar o nível do seu projeto.
          </p>

          <div className="mt-12 space-y-4">
            <p className="text-white/40 text-sm uppercase font-bold tracking-widest">
              Contato Direto
            </p>
            <p className="text-2xl text-white">contato@bytequest.com.br</p>
            <p className="text-brand-blue font-mono">Barueri, São Paulo</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 p-10 rounded-[2rem] border border-white/10"
        >
          {sent ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-brand-blue">
                Missão Recebida!
              </h3>
              <p className="text-white/60 mt-2">
                Responderei em menos de 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Seu Nome"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Seu E-mail"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Como posso ajudar seu negócio hoje?"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,71,255,0.3)]"
              >
                {isSubmitting ? (
                  "Processando..."
                ) : (
                  <>
                    <Send size={18} /> Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
