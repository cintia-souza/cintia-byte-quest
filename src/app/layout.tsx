import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bytequest.com.br"),
  title: "Desenvolvedora Full-Stack em Barueri | Byte Quest - Next.js & Supabase",
  description:
    "Cintia Byte Quest — Desenvolvedora Full-Stack especialista em Next.js, TypeScript e Supabase. Criação de sites, sistemas web e PWAs de alta performance para médicos e empresas em Barueri, Alphaville e São Paulo.",
  keywords: [
    "Desenvolvedora Full-Stack Barueri",
    "Criação de sites Alphaville",
    "Desenvolvedora Next.js São Paulo",
    "Sites para médicos Alphaville",
    "Sistemas web Barueri",
    "PWA React Supabase",
    "Freelancer programadora Barueri",
    "Byte Quest",
  ],
  authors: [{ name: "Cintia - Byte Quest" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://bytequest.com.br" },
  openGraph: {
    title: "Byte Quest | Desenvolvimento Full-Stack de Alta Performance",
    description:
      "Sites e sistemas web para médicos e empresas de Alphaville. Next.js, Supabase e performance nota 100.",
    url: "https://bytequest.com.br",
    siteName: "Byte Quest",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Quest | Desenvolvedora Full-Stack em Barueri",
    description: "Next.js, Supabase e performance extrema para seu negócio.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Byte Quest - Cintia",
              description: "Desenvolvimento Full-Stack de alta performance",
              url: "https://bytequest.com.br",
              areaServed: ["Barueri", "Alphaville", "São Paulo"],
              serviceType: ["Desenvolvimento Web", "Criação de Sites", "Sistemas Web"],
            }),
          }}
        />
      </head>
      <body
        className={`${urbanist.variable} font-sans bg-brand-dark text-brand-silver antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
