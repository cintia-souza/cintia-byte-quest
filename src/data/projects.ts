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
    images: [
      "/projects/contabil-1.png",
      "/projects/contabil-2.png",
      "/projects/contabil-3.png",
      "/projects/contabil-4.png",
    ],
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
    images: [
      "/projects/dani-coiffer-home.png",
      "/projects/dani-coiffer.png",
      "/projects/dani-coiffer-2.png",
      "/projects/dani-coiffer-login.png",
    ],
    tags: ["Next.js", "Tailwind", "SEO"],
  },

  // ─── OLYMPUS IMAGES ───
  {
    title: "Olympus Images",
    category: "Dashboard / Sistema Web",
    description:
      "Plataforma de gestão de imagens com dashboard administrativo completo e interface moderna.",
    images: [
      "/projects/olympus-images_1.png",
      "/projects/olympus-images_2.png",
      "/projects/olympus-images_dash-1.png",
      "/projects/olympus-images_dash-2.png",
      "/projects/olympus-images_dash-3.png",
      "/projects/olympus-images_dash-4.png",
    ],
    tags: ["Next.js", "TypeScript", "Dashboard"],
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
