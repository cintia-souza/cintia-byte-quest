export interface Project {
  title: string;
  category: string;

  images: string[];
  tags: string[];
}

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
];
