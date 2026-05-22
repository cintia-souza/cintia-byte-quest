import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import Footer from "@/components/layout/Footer";
import { projects as staticProjects } from "@/data/projects";
import { prisma } from "@/lib/prisma";

const Services = dynamic(() => import("@/components/sections/Services"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

async function getProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    if (dbProjects.length > 0) return dbProjects;
  } catch {}
  return staticProjects;
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="bg-brand-dark min-h-screen selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />

      <section id="projetos" className="py-24 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white">
              Portfólio <span className="text-brand-blue">Estratégico</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl">
              Produtos digitais escaláveis — do White Label ao AdTech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) =>
              project.images.length > 1 ? (
                <div
                  key={project.title}
                  className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <ProjectCarousel
                    title={project.title}
                    images={project.images}
                  />
                  <div className="p-8">
                    <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-white/50 text-sm mt-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/70 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-6 text-sm text-brand-blue font-bold hover:text-white transition-colors"
                      >
                        Ver Projeto
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  image={project.images[0]}
                  tags={project.tags}
                  link={project.link ?? undefined}
                />
              )
            )}
          </div>
        </div>
      </section>

      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
