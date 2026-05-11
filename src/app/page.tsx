import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import Footer from "@/components/layout/Footer";

const Services = dynamic(() => import("@/components/sections/Services"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen selection:bg-brand-blue selection:text-white">
      {/* Navegação Fixa */}
      <Navbar />

      {/* Hero: O Impacto Inicial */}
      <Hero />

      {/* Showroom: Seção de Projetos Estáticos (Para carregar rápido) */}
      <section id="projetos" className="py-24 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white">
              Portfólio <span className="text-brand-blue">Estratégico</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl">
              Soluções reais que unem design sofisticado e engenharia de
              software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <ProjectCarousel
                title="Finance War Room"
                images={[
                  "/projects/finance-war-room1.webp",
                  "/projects/finance-war-room2.webp",
                  "/projects/finance-war-room3.webp",
                  "/projects/finance-war-room4.webp",
                  "/projects/finance-war-room5.webp",
                ]}
              />
              <div className="p-8">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                  Web System / PWA
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Finance War Room</h3>
                <div className="flex gap-2 mt-6">
                  {["Next.js", "Supabase", "TypeScript"].map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/70 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ProjectCard
              title="Enshrouded Atlas"
              category="AdTech / Portal"
              image="/projects/atlas.webp"
              tags={["SEO", "Performance", "React"]}
            />
          </div>
        </div>
      </section>

      {/* Serviços: O que você resolve para o cliente */}
      <Services />

      {/* Prova Social: Onde os médicos dão o aval */}
      <Testimonials />

      {/* Conversão: O fechamento da Quest */}
      <Contact />

      {/* Footer: Credibilidade final */}
      <Footer />
    </main>
  );
}
