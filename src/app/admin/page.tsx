"use client";
import { useState, useEffect, useRef } from "react";
import {
  Trash2,
  Plus,
  Save,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  Upload,
  X,
  GripVertical,
  ExternalLink,
  ImageIcon,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface Project {
  id?: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  order: number;
  visible: boolean;
}

interface Testimonial {
  id?: number;
  name: string;
  role?: string;
  message: string;
  order: number;
  visible: boolean;
}

const DEFAULT_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "Node.js",
  "PWA",
  "SEO",
  "AdSense",
  "Performance",
  "Dashboard",
  "Landing Page",
  "E-commerce",
  "White Label",
  "API REST",
  "Framer Motion",
];

const DEFAULT_CATEGORIES = [
  "Landing Page Premium",
  "Sistemas Escaláveis / White Label",
  "PWA / Gestão Financeira",
  "Dashboard / Sistema Web",
  "AdTech / Content Portal",
  "E-commerce",
  "Site Institucional",
];

const emptyProject: Project = {
  title: "",
  category: "",
  description: "",
  images: [],
  tags: [],
  link: "",
  order: 0,
  visible: true,
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"projects" | "testimonials">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [availableTags, setAvailableTags] = useState(DEFAULT_TAGS);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addCategory() {
    const val = newCategory.trim();
    if (val && !categories.includes(val)) {
      setCategories([...categories, val]);
      if (editing) setEditing({ ...editing, category: val });
    }
    setNewCategory("");
  }

  function addTag() {
    const val = newTag.trim();
    if (val && !availableTags.includes(val)) {
      setAvailableTags([...availableTags, val]);
      if (editing) setEditing({ ...editing, tags: [...editing.tags, val] });
    }
    setNewTag("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      loadProjects();
    } else {
      alert("Senha incorreta");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE", credentials: "include" });
    setAuthenticated(false);
    setProjects([]);
    setTestimonials([]);
    setPassword("");
  }

  async function loadProjects() {
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }

  async function loadTestimonials() {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _admin: true }),
      credentials: "include",
    });
    if (res.ok) setTestimonials(await res.json());
  }

  async function toggleTestimonialVisibility(t: Testimonial) {
    await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, visible: !t.visible }),
      credentials: "include",
    });
    await loadTestimonials();
  }

  async function updateTestimonialOrder(t: Testimonial, order: number) {
    await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, order }),
      credentials: "include",
    });
    await loadTestimonials();
  }

  async function deleteTestimonial(id: number) {
    if (!confirm("Excluir este depoimento?")) return;
    await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    await loadTestimonials();
  }

  function startEdit(project?: Project) {
    setEditing(project ? { ...project } : { ...emptyProject, order: projects.length + 1 });
  }

  function toggleTag(tag: string) {
    if (!editing) return;
    const tags = editing.tags.includes(tag)
      ? editing.tags.filter((t) => t !== tag)
      : [...editing.tags, tag];
    setEditing({ ...editing, tags });
  }

  async function handleUpload(files: FileList | null) {
    if (!files || !editing) return;
    setUploading(true);

    const newImages = [...editing.images];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
      if (res.ok) {
        const { url } = await res.json();
        newImages.push(url);
      }
    }
    setEditing({ ...editing, images: newImages });
    setUploading(false);
  }

  function removeImage(index: number) {
    if (!editing) return;
    setEditing({ ...editing, images: editing.images.filter((_, i) => i !== index) });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);

    const method = editing.id ? "PUT" : "POST";
    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
      credentials: "include",
    });

    if (res.ok) {
      setEditing(null);
      await loadProjects();
    } else {
      alert("Erro ao salvar");
    }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Excluir este projeto permanentemente?")) return;
    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    await loadProjects();
  }

  async function toggleVisibility(project: Project) {
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: project.id, visible: !project.visible }),
      credentials: "include",
    });
    await loadProjects();
  }

  useEffect(() => {
    fetch("/api/projects").then((r) => {
      if (r.ok) {
        setAuthenticated(true);
        loadProjects();
        loadTestimonials();
      }
    });
  }, []);

  // ─── LOGIN ───
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <form
          onSubmit={handleLogin}
          className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-sm space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-brand-blue" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
            <p className="text-white/40 text-sm">Byte Quest • Gerenciador de Projetos</p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 outline-none transition-all"
          />

          <button className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(0,71,255,0.3)] transition-all active:scale-[0.98]">
            <LogIn size={18} /> Acessar Painel
          </button>
        </form>
      </div>
    );
  }

  // ─── FORMULÁRIO DE EDIÇÃO ───
  if (editing) {
    return (
      <div className="min-h-screen bg-brand-dark px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {editing.id ? "Editar" : "Novo"}{" "}
                <span className="text-brand-blue">Projeto</span>
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Preencha os dados e adicione imagens do projeto
              </p>
            </div>
            <button
              onClick={() => setEditing(null)}
              className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Título e Categoria */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                  Título do Projeto
                </label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Ex: Meu Projeto Incrível"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-brand-blue outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                  Categoria
                </label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all appearance-none"
                >
                  <option value="" className="bg-brand-dark">Selecione...</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-brand-dark">{c}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                    placeholder="Nova categoria..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-brand-blue outline-none"
                  />
                  <button type="button" onClick={addCategory} className="px-3 py-2 bg-brand-blue/20 text-brand-blue rounded-lg text-sm font-bold hover:bg-brand-blue/30 transition-all">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                Descrição
              </label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                placeholder="Descreva o projeto, tecnologias usadas e resultados..."
                rows={3}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-brand-blue outline-none transition-all resize-none"
              />
            </div>

            {/* Upload de Imagens */}
            <div className="space-y-3">
              <label className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <ImageIcon size={14} /> Imagens do Projeto
              </label>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-brand-blue bg-brand-blue/5"
                    : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleUpload(e.target.files)}
                  className="hidden"
                />
                <Upload className={`mx-auto mb-3 ${dragOver ? "text-brand-blue" : "text-white/30"}`} size={32} />
                <p className="text-white/50 text-sm">
                  {uploading ? (
                    <span className="text-brand-blue animate-pulse">Enviando...</span>
                  ) : (
                    <>Arraste imagens aqui ou <span className="text-brand-blue">clique para selecionar</span></>
                  )}
                </p>
                <p className="text-white/20 text-xs mt-1">PNG, JPG, WebP</p>
              </div>

              {/* Preview das imagens */}
              {editing.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {editing.images.map((img, i) => (
                    <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-500 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white/70 text-[10px] px-2 py-0.5 rounded-full">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="text-white/60 text-xs font-bold uppercase tracking-wider">
                Tecnologias / Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                      editing.tags.includes(tag)
                        ? "bg-brand-blue text-white shadow-[0_0_12px_rgba(0,71,255,0.3)]"
                        : "bg-white/5 text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Adicionar nova tag..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-brand-blue outline-none"
                />
                <button type="button" onClick={addTag} className="px-3 py-2 bg-brand-blue/20 text-brand-blue rounded-lg text-sm font-bold hover:bg-brand-blue/30 transition-all">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Link e Posição */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink size={12} /> Link do Projeto
                </label>
                <input
                  value={editing.link || ""}
                  onChange={(e) => setEditing({ ...editing, link: e.target.value })}
                  placeholder="https://meu-projeto.vercel.app"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-brand-blue outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <GripVertical size={12} /> Posição
                </label>
                <input
                  type="number"
                  min={1}
                  value={editing.order}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all"
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-4 pt-6 border-t border-white/5">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(0,71,255,0.3)] transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                <Save size={18} /> {loading ? "Salvando..." : "Salvar Projeto"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-8 py-4 border border-white/10 text-white/60 rounded-xl hover:text-white hover:border-white/30 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── LISTAGEM ───
  return (
    <div className="min-h-screen bg-brand-dark px-6 py-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">
            Painel <span className="text-brand-blue">Admin</span>
          </h1>
          <div className="flex items-center gap-3">
            {tab === "projects" && (
              <button
                onClick={() => startEdit()}
                className="bg-brand-blue text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(0,71,255,0.3)] transition-all active:scale-[0.98]"
              >
                <Plus size={18} /> Novo Projeto
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-3 text-white/40 hover:text-red-400 hover:bg-red-400/5 border border-white/10 rounded-xl transition-all"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("projects")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === "projects"
                ? "bg-brand-blue text-white"
                : "bg-white/5 text-white/50 border border-white/10 hover:text-white"
            }`}
          >
            Projetos ({projects.length})
          </button>
          <button
            onClick={() => { setTab("testimonials"); loadTestimonials(); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              tab === "testimonials"
                ? "bg-brand-blue text-white"
                : "bg-white/5 text-white/50 border border-white/10 hover:text-white"
            }`}
          >
            <MessageSquare size={14} /> Depoimentos ({testimonials.length})
          </button>
        </div>

        {/* Tab: Projetos */}
        {tab === "projects" && (
          <div className="grid gap-4">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={20} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-bold truncate">{p.title}</p>
                      <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full border border-white/10">
                        #{p.order}
                      </span>
                      {!p.visible && (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">
                          Oculto
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm mt-0.5">{p.category}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-[10px] text-white/30">+{p.tags.length - 4}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleVisibility(p)}
                      className="p-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      title={p.visible ? "Ocultar" : "Mostrar"}
                    >
                      {p.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      className="px-4 py-2 text-sm text-brand-blue font-bold border border-brand-blue/20 rounded-xl hover:bg-brand-blue/10 transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id!)}
                      className="p-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto">
                  <Sparkles className="text-brand-blue/50" size={32} />
                </div>
                <p className="text-white/40 text-lg">Nenhum projeto cadastrado ainda</p>
                <p className="text-white/20 text-sm">Clique em &quot;Novo Projeto&quot; para começar</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Depoimentos */}
        {tab === "testimonials" && (
          <div className="grid gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={16} className="text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-bold">{t.name}</p>
                      {t.role && <span className="text-white/30 text-xs">{t.role}</span>}
                      {!t.visible && (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">
                          Oculto
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm mt-1 italic">&ldquo;{t.message}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <input
                      type="number"
                      min={0}
                      value={t.order}
                      onChange={(e) => updateTestimonialOrder(t, Number(e.target.value))}
                      className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs text-center focus:border-brand-blue outline-none"
                      title="Posição"
                    />
                    <button
                      onClick={() => toggleTestimonialVisibility(t)}
                      className="p-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      title={t.visible ? "Ocultar" : "Aprovar e mostrar"}
                    >
                      {t.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => deleteTestimonial(t.id!)}
                      className="p-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto">
                  <MessageSquare className="text-brand-blue/50" size={32} />
                </div>
                <p className="text-white/40 text-lg">Nenhum depoimento recebido ainda</p>
                <p className="text-white/20 text-sm">Os clientes podem enviar pelo site</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
