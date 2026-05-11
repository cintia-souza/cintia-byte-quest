export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
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
