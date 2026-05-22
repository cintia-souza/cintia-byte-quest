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
  title: "Desenvolvedora de Sites em Barueri e Alphaville | Byte Quest",
  description:
    "Desenvolvedora de sites e sistemas web em Barueri, Alphaville e região de São Paulo. Criação de sites profissionais, landing pages e lojas virtuais com Next.js. Orçamento rápido e atendimento local.",
  keywords: [
    "criar site Barueri",
    "desenvolvedor de sites Alphaville",
    "fazer site Barueri",
    "criação de sites Osasco",
    "programador web Alphaville",
    "freelancer criação de sites São Paulo zona oeste",
    "site para empresa Barueri",
    "site para médico Alphaville",
    "landing page Barueri",
    "loja virtual Alphaville",
    "desenvolvedor web perto de mim",
    "Byte Quest",
  ],
  authors: [{ name: "Cintia - Byte Quest" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://bytequest.com.br" },
  openGraph: {
    title: "Criação de Sites em Barueri e Alphaville | Byte Quest",
    description:
      "Desenvolvedora de sites profissionais em Barueri e Alphaville. Sites rápidos, modernos e otimizados para Google. Atendimento local.",
    url: "https://bytequest.com.br",
    siteName: "Byte Quest",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites em Barueri e Alphaville | Byte Quest",
    description: "Desenvolvedora de sites profissionais na região de Barueri. Orçamento rápido.",
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
              description:
                "Criação de sites profissionais e sistemas web em Barueri, Alphaville e São Paulo. Desenvolvedora freelancer com atendimento local.",
              url: "https://bytequest.com.br",
              telephone: "+55-11-99999-9999",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Barueri",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -23.5114,
                longitude: -46.8761,
              },
              areaServed: [
                { "@type": "City", name: "Barueri" },
                { "@type": "City", name: "Osasco" },
                { "@type": "City", name: "Santana de Parnaíba" },
                { "@type": "City", name: "Carapicuíba" },
                { "@type": "City", name: "São Paulo" },
              ],
              serviceType: [
                "Criação de Sites",
                "Desenvolvimento Web",
                "Landing Pages",
                "Loja Virtual",
                "Sistemas Web",
              ],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
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
