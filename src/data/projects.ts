export interface Project {
  title: string;
  category: string;
  /** Imagem principal ou array de imagens para carrossel */
  images: string[];
  tags: string[];
}

/**
 * Para adicionar um novo projeto:
 * 1. Coloque as imagens em /public/projects/ (use .webp)
 * 2. Adicione um objeto abaixo seguindo o formato
 * 3. Se tiver apenas 1 imagem, será exibido como card estático
 *    Se tiver múltiplas imagens, será exibido como carrossel
 */
export const projects: Project[] = [
  {
    title: "Finance War Room",
    category: "Web System / PWA",
    images: [
      "/projects/finance-war-room1.webp",
      "/projects/finance-war-room2.webp",
      "/projects/finance-war-room3.webp",
      "/projects/finance-war-room4.webp",
      "/projects/finance-war-room5.webp",
    ],
    tags: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    title: "Enshrouded Atlas",
    category: "AdTech / Portal",
    images: ["/projects/atlas.webp"],
    tags: ["SEO", "Performance", "React"],
  },
  // ─── ADICIONE NOVOS PROJETOS AQUI ───
  // {
  //   title: "Nome do Projeto",
  //   category: "Categoria",
  //   images: ["/projects/imagem.webp"],
  //   tags: ["Tag1", "Tag2"],
  // },
];
