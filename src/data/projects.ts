export interface Project {
  title: string;
  category: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
}

export const projects: Project[] = [
  // ─── SISTEMAS ESCALÁVEIS (SaaS / White Label) ───
  {
    title: "ByteQuest White Label Engine",
    category: "Sistemas Escaláveis / White Label",
    description:
      "Motor de geração de LPs dinâmicas com injeção de temas via banco de dados (Neon/Supabase) e suporte total a PWA.",
    images: ["/projects/finance-war-room1.webp"],
    tags: ["Next.js", "Tailwind", "Neon Postgres", "Prisma"],
    link: "https://white-label-six-gamma.vercel.app/contabilidade-smart",
  },

  // ─── PWAs & GESTÃO FINANCEIRA ───
  {
    title: "Financy Flow",
    category: "PWA / Gestão Financeira",
    description:
      "PWA para controle financeiro pessoal com modo offline, sincronização em tempo real e foco em UX mobile-first.",
    images: [
      "/projects/finance-war-room1.webp",
      "/projects/finance-war-room2.webp",
      "/projects/finance-war-room3.webp",
      "/projects/finance-war-room4.webp",
      "/projects/finance-war-room5.webp",
    ],
    tags: ["React", "Supabase", "PostgreSQL"],
  },

  // ─── LANDING PAGES PREMIUM ───
  {
    title: "Dani Coiffer",
    category: "Landing Page Premium / Estética",
    description:
      "Landing page de alta conversão para salão de estética com design moderno e foco em agendamento.",
    images: ["/projects/atlas.webp"],
    tags: ["Next.js", "Tailwind", "SEO"],
  },
  {
    title: "Nutri Nunes",
    category: "Landing Page Premium / Saúde",
    description:
      "Página de conversão para nutricionista com foco em captação de leads e design clean.",
    images: ["/projects/atlas.webp"],
    tags: ["Next.js", "Tailwind", "Performance"],
  },

  // ─── ADTECH & CONTENT ───
  {
    title: "Enshrouded Atlas",
    category: "AdTech / Content Portal",
    description:
      "Portal de conteúdo gamer otimizado para Core Web Vitals e estratégias de monetização via AdSense sem prejudicar o CLS.",
    images: ["/projects/atlas.webp"],
    tags: ["SEO", "AdSense", "React", "Performance"],
  },
];
