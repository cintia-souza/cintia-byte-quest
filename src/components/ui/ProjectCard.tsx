import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProjectProps {
  title: string;
  category: string;
  description?: string;
  image: string;
  tags: string[];
  link?: string;
}

export function ProjectCard({ title, category, description, image, tags, link }: ProjectProps) {
  const isApiImage = image.startsWith("/api/");

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized={isApiImage}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60" />
      </div>

      <div className="p-8">
        <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
        {description && (
          <p className="text-white/50 text-sm mt-3 leading-relaxed">{description}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/70 uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-brand-blue font-bold hover:text-white transition-colors"
          >
            Ver Projeto <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
