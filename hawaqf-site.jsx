import React, { useState, useEffect } from "react";
import {
  Menu, X, ChevronRight, ChevronDown, MapPin, Phone, Mail, Clock,
  ArrowUpRight, Facebook, Linkedin, Youtube, Send, Check, Download,
  FileText, Users, Landmark, Droplets, GraduationCap, HeartPulse,
  Sprout, ShieldCheck, BarChart3, MessageCircle, LayoutDashboard,
  FolderKanban, Wallet, Newspaper, Settings, UserCircle2, Bot
} from "lucide-react";

/* ---------------------------------------------------------------
   HAWaqf — Haute Autorité du Waqf du Niger
   Prototype de plateforme institutionnelle
   Palette : vert émeraude institutionnel + sable + or discret
   Typo : Fraunces (titres) / Inter (texte)
--------------------------------------------------------------- */

const injectFonts = () => {
  if (document.getElementById("hawaqf-fonts")) return;
  const link = document.createElement("link");
  link.id = "hawaqf-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
  document.head.appendChild(link);
};

const COLORS = {
  ink: "#17231F",
  emerald: "#1E4635",
  emeraldDark: "#12291F",
  sand: "#F6F2E9",
  sandDeep: "#EDE5D3",
  gold: "#A9813F",
  clay: "#B4552A",
  line: "#DDD3BC",
};

function Placeholder({ w = "100%", h = "100%", label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center text-[11px] tracking-wide ${className}`}
      style={{
        width: w,
        height: h,
        background:
          "repeating-linear-gradient(135deg, #EDE5D3, #EDE5D3 10px, #E3D8BE 10px, #E3D8BE 20px)",
        color: "#7A6A46",
        border: "1px solid #DDD3BC",
      }}
    >
      {label}
    </div>
  );
}

function Logo({ dark }) {
  const c = dark ? "#F6F2E9" : COLORS.emerald;
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 3 L36 20 L20 37 L4 20 Z"
          stroke={c}
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M20 11 L28 20 L20 29 L12 20 Z"
          stroke={c}
          strokeWidth="1.4"
          fill="none"
        />
        <circle cx="20" cy="20" r="2.6" fill={c} />
      </svg>
      <div style={{ lineHeight: 1.05 }}>
        <div
          style={{ fontFamily: "Fraunces, serif", color: c }}
          className="text-lg font-semibold tracking-tight"
        >
          HAWaqf
        </div>
        <div
          style={{ color: dark ? "#C9C0AC" : "#5C6B62" }}
          className="text-[10.5px] leading-tight"
        >
          Haute Autorité du Waqf
          <br />
          du Niger
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "La HAWaqf" },
  { id: "waqf", label: "Le Waqf" },
  { id: "projets", label: "Nos projets" },
  { id: "actualites", label: "Actualités" },
  { id: "ressources", label: "Ressources" },
  { id: "contact", label: "Contact" },
];

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("FR");
  const [langNote, setLangNote] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setPage(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "auto" : "auto" });
  };

  return (
    <header
      className="sticky top-0 z-40 transition-all"
      style={{
        background: scrolled ? "rgba(246,242,233,0.92)" : "#F6F2E9",
        backdropFilter: "blur(6px)",
        borderBottom: `1px solid ${scrolled ? COLORS.line : "transparent"}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
        <button onClick={() => go("accueil")} className="shrink-0">
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-[14px] transition-colors"
              style={{
                color: page === n.id ? COLORS.emerald : "#5C6B62",
                fontWeight: page === n.id ? 600 : 500,
                borderBottom:
                  page === n.id ? `1.5px solid ${COLORS.gold}` : "1.5px solid transparent",
                paddingBottom: 3,
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 relative">
          <div className="flex items-center gap-1.5 text-[13px]" style={{ color: "#5C6B62" }}>
            {["FR", "EN", "AR"].map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span style={{ color: COLORS.line }}>|</span>}
                <button
                  onClick={() => {
                    setLang(l);
                    setLangNote(true);
                    setTimeout(() => setLangNote(false), 2600);
                  }}
                  style={{
                    color: lang === l ? COLORS.emerald : "#8A8271",
                    fontWeight: lang === l ? 700 : 500,
                  }}
                >
                  {l === "AR" ? "العربية" : l}
                </button>
              </React.Fragment>
            ))}
          </div>
          {langNote && (
            <div
              className="absolute top-9 right-0 text-[12px] px-3 py-2 rounded-md shadow-lg whitespace-nowrap"
              style={{ background: COLORS.emeraldDark, color: "#F6F2E9" }}
            >
              Version {lang} — disponible dans la plateforme finale
            </div>
          )}
          <button
            onClick={() => go("contribuer")}
            className="px-5 py-2.5 rounded-md text-[13.5px] font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: COLORS.gold, color: "#211705" }}
          >
            Faire un Waqf
          </button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} color={COLORS.emerald} /> : <Menu size={24} color={COLORS.emerald} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-6 flex flex-col gap-1" style={{ background: "#F6F2E9" }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-left py-3 text-[15px] border-b"
              style={{
                borderColor: COLORS.line,
                color: page === n.id ? COLORS.emerald : "#3A4740",
                fontWeight: page === n.id ? 700 : 500,
              }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("contribuer")}
            className="mt-4 px-5 py-3 rounded-md text-[14px] font-semibold"
            style={{ background: COLORS.gold, color: "#211705" }}
          >
            Faire un Waqf
          </button>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.emeraldDark, color: "#D8D2C1" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Logo dark />
          <p className="mt-4 text-[13.5px] leading-relaxed" style={{ color: "#B7AF98" }}>
            Le Waqf au service du développement durable du Niger.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Linkedin, Youtube].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: "1px solid #3A5347" }}
              >
                <Icon size={15} color="#D8D2C1" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[13px] font-semibold mb-4 text-white">Institution</div>
          {["apropos", "waqf", "projets", "actualites", "ressources", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className="block text-[13.5px] py-1.5 hover:text-white"
              style={{ color: "#B7AF98" }}
            >
              {NAV.find((n) => n.id === id)?.label}
            </button>
          ))}
        </div>
        <div>
          <div className="text-[13px] font-semibold mb-4 text-white">Contact</div>
          <p className="text-[13.5px] leading-relaxed" style={{ color: "#B7AF98" }}>
            Plateau, Niamey, Niger
            <br />
            +227 20 00 00 00
            <br />
            contact@hawaqf.ne
          </p>
        </div>
        <div>
          <div className="text-[13px] font-semibold mb-4 text-white">Newsletter</div>
          <p className="text-[13px] mb-3" style={{ color: "#B7AF98" }}>
            Recevez les actualités du Waqf.
          </p>
          <div className="flex">
            <input
              placeholder="Votre email"
              className="flex-1 px-3 py-2.5 text-[13px] rounded-l-md outline-none"
              style={{ background: "#1B3A2F", color: "#F6F2E9", border: "1px solid #3A5347" }}
            />
            <button
              className="px-3.5 rounded-r-md"
              style={{ background: COLORS.gold }}
            >
              <Send size={15} color="#211705" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto px-5 md:px-8 py-5 text-[12px] flex justify-between border-t"
        style={{ borderColor: "#2C463A", color: "#8E8770" }}
      >
        <span>© {new Date().getFullYear()} Haute Autorité du Waqf du Niger — Prototype</span>
        <span>Données illustratives</span>
      </div>
    </footer>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col">
      <span
        style={{ fontFamily: "Fraunces, serif", color: COLORS.emerald }}
        className="text-3xl md:text-4xl font-medium"
      >
        {value}
      </span>
      <span className="text-[13px] mt-1" style={{ color: "#5C6B62" }}>
        {label}
      </span>
      <span className="text-[10.5px] mt-0.5" style={{ color: "#A79B7C" }}>
        donnée illustrative
      </span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="text-[13px] font-semibold mb-3"
      style={{ color: COLORS.gold }}
    >
      {children}
    </div>
  );
}

function HomePage({ setPage, openProject }) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: COLORS.sand }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-[fadeIn_0.8s_ease]">
            <div
              className="text-[13px] mb-5 font-medium"
              style={{ color: COLORS.gold }}
            >
              Haute Autorité du Waqf du Niger
            </div>
            <h1
              style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
              className="text-4xl md:text-[3.2rem] leading-[1.08] font-medium"
            >
              Le Waqf au service du développement durable du Niger
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed max-w-md" style={{ color: "#4B5750" }}>
              Mobiliser les ressources, soutenir les communautés et construire
              un avenir meilleur grâce au Waqf.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("projets")}
                className="px-6 py-3.5 rounded-md text-[14.5px] font-semibold flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                style={{ background: COLORS.emerald, color: "#F6F2E9" }}
              >
                Découvrir nos projets <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setPage("contribuer")}
                className="px-6 py-3.5 rounded-md text-[14.5px] font-semibold border"
                style={{ borderColor: COLORS.gold, color: COLORS.gold }}
              >
                Faire un Waqf
              </button>
            </div>
          </div>
          <div className="relative h-[380px] md:h-[460px] rounded-lg overflow-hidden">
            <Placeholder label="Image — communauté, éducation, solidarité, Niger" />
            <div
              className="absolute bottom-5 left-5 right-5 rounded-md px-5 py-4 flex gap-6"
              style={{ background: "rgba(23,35,31,0.85)", backdropFilter: "blur(4px)" }}
            >
              <span className="text-white text-[13px]">Niamey, Niger</span>
              <span className="text-white text-[13px]">Solidarité communautaire</span>
            </div>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: COLORS.line }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid grid-cols-3 gap-6">
            <Stat value="12" label="Projets Waqf" />
            <Stat value="8 400+" label="Bénéficiaires" />
            <Stat value="312 M FCFA" label="Ressources mobilisées" />
          </div>
        </div>
      </section>

      {/* COMPRENDRE LE WAQF */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <SectionLabel>Le Waqf</SectionLabel>
            <h2
              style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
              className="text-3xl md:text-4xl font-medium"
            >
              Comprendre le Waqf
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "#4B5750" }}>
            Le Waqf est un bien immobilisé au bénéfice durable d'une cause
            d'intérêt général. Ses revenus financent des œuvres sociales,
            éducatives ou religieuses, de génération en génération.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Landmark,
              title: "Waqf public",
              desc: "Constitué au bénéfice de la collectivité : mosquées, écoles, infrastructures d'intérêt général.",
            },
            {
              icon: Users,
              title: "Waqf familial",
              desc: "Destiné à assurer un revenu durable aux descendants d'un même fondateur.",
            },
            {
              icon: HeartPulse,
              title: "Waqf privé",
              desc: "Créé par un particulier ou une entreprise au profit d'une cause qu'il choisit.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="p-7 rounded-lg border transition-shadow hover:shadow-md"
              style={{ borderColor: COLORS.line, background: "#FFFFFF" }}
            >
              <c.icon size={26} color={COLORS.emerald} />
              <div
                style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
                className="text-lg font-medium mt-4"
              >
                {c.title}
              </div>
              <p className="text-[13.5px] mt-2 leading-relaxed" style={{ color: "#5C6B62" }}>
                {c.desc}
              </p>
              <button
                onClick={() => setPage("waqf")}
                className="mt-4 text-[13px] font-semibold flex items-center gap-1"
                style={{ color: COLORS.gold }}
              >
                En savoir plus <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h3
              style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
              className="text-2xl font-medium mb-5"
            >
              Pourquoi créer un Waqf ?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Impact social", Users],
                ["Développement économique", BarChart3],
                ["Éducation", GraduationCap],
                ["Santé", HeartPulse],
                ["Solidarité", ShieldCheck],
                ["Transmission durable", Landmark],
              ].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon size={17} color={COLORS.gold} />
                  <span className="text-[13.5px]" style={{ color: "#3A4740" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-56 md:h-auto">
            <Placeholder label="Illustration — motif géométrique / patrimoine" />
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section style={{ background: COLORS.sandDeep }} className="py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <SectionLabel>Nos projets</SectionLabel>
              <h2
                style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
                className="text-3xl md:text-4xl font-medium"
              >
                Des projets qui transforment des vies
              </h2>
            </div>
            <button
              onClick={() => setPage("projets")}
              className="text-[13.5px] font-semibold flex items-center gap-1"
              style={{ color: COLORS.emerald }}
            >
              Voir tous les projets <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} p={p} setPage={setPage} openProject={openProject} />
            ))}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>HAWaqf AI</SectionLabel>
          <h2
            style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
            className="text-3xl md:text-4xl font-medium mb-4"
          >
            Votre assistant HAWaqf
          </h2>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#4B5750" }}>
            Une nouvelle façon d'accéder à l'information sur le Waqf — bientôt
            connectée à la base documentaire officielle de la HAWaqf.
          </p>
          <button
            onClick={() => setPage("ai")}
            className="px-6 py-3.5 rounded-md text-[14.5px] font-semibold flex items-center gap-2 w-fit"
            style={{ background: COLORS.emerald, color: "#F6F2E9" }}
          >
            Discuter avec HAWaqf AI <MessageCircle size={16} />
          </button>
        </div>
        <ChatPreview />
      </section>

      {/* TRANSPARENCY teaser */}
      <section style={{ background: COLORS.emeraldDark }} className="py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[13px] font-medium mb-3" style={{ color: "#C9A15E" }}>
              Transparence
            </div>
            <h2
              style={{ fontFamily: "Fraunces, serif" }}
              className="text-3xl md:text-4xl font-medium text-white mb-4"
            >
              Notre engagement pour la transparence
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "#C7CDC5" }}>
              Chaque ressource mobilisée est suivie et publiée. Consultez les
              indicateurs et rapports de la HAWaqf.
            </p>
            <button
              className="mt-6 px-6 py-3 rounded-md text-[14px] font-semibold"
              style={{ background: COLORS.gold, color: "#211705" }}
            >
              Voir les rapports
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["24", "Rapports publiés"],
              ["7", "Régions couvertes"],
              ["12", "Projets financés"],
              ["8 400+", "Bénéficiaires"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="p-6 rounded-lg"
                style={{ background: "#1B3A2F", border: "1px solid #2C463A" }}
              >
                <div
                  style={{ fontFamily: "Fraunces, serif" }}
                  className="text-2xl text-white font-medium"
                >
                  {v}
                </div>
                <div className="text-[12.5px] mt-1" style={{ color: "#9CA79C" }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ChatPreview() {
  return (
    <div className="rounded-lg border overflow-hidden shadow-sm" style={{ borderColor: COLORS.line }}>
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ background: COLORS.emerald }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#2C5C46" }}>
          <Bot size={16} color="#F6F2E9" />
        </div>
        <span className="text-white text-[14px] font-medium">HAWaqf AI</span>
      </div>
      <div className="p-5 space-y-3" style={{ background: "#FFFFFF" }}>
        <div
          className="text-[13.5px] px-4 py-3 rounded-lg max-w-[85%]"
          style={{ background: COLORS.sand, color: "#3A4740" }}
        >
          Bonjour, je suis l'assistant virtuel de la Haute Autorité du Waqf du
          Niger. Comment puis-je vous aider ?
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {["Qu'est-ce que le Waqf ?", "Comment créer un Waqf ?", "Projets en cours"].map((s) => (
            <span
              key={s}
              className="text-[12px] px-3 py-1.5 rounded-full border"
              style={{ borderColor: COLORS.line, color: COLORS.emerald }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    id: "cimetiere-bourbourkabe",
    name: "Cimetière musulman de Bourbourkabé",
    category: "Infrastructure religieuse",
    location: "Niamey",
    goal: 45000000,
    raised: 31000000,
    status: "En cours",
    icon: Landmark,
  },
  {
    id: "education",
    name: "Projet Éducation",
    category: "Éducation",
    location: "Tillabéri",
    goal: 60000000,
    raised: 22000000,
    status: "En cours",
    icon: GraduationCap,
  },
  {
    id: "sante",
    name: "Projet Santé",
    category: "Santé",
    location: "Maradi",
    goal: 80000000,
    raised: 54000000,
    status: "En cours",
    icon: HeartPulse,
  },
  {
    id: "eau",
    name: "Projet Eau et Assainissement",
    category: "Eau & Assainissement",
    location: "Zinder",
    goal: 35000000,
    raised: 35000000,
    status: "Achevé",
    icon: Droplets,
  },
  {
    id: "agriculture",
    name: "Projet Agriculture",
    category: "Agriculture",
    location: "Dosso",
    goal: 50000000,
    raised: 9000000,
    status: "En cours",
    icon: Sprout,
  },
];

function fmt(n) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

function ProjectCard({ p, setPage, openProject }) {
  const pct = Math.round((p.raised / p.goal) * 100);
  return (
    <div
      className="rounded-lg border overflow-hidden bg-white transition-shadow hover:shadow-md flex flex-col"
      style={{ borderColor: COLORS.line }}
    >
      <div className="h-40 relative">
        <Placeholder label={p.category} />
        <span
          className="absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full font-medium"
          style={{
            background: p.status === "Achevé" ? "#1E4635" : "#FFFFFF",
            color: p.status === "Achevé" ? "#F6F2E9" : COLORS.emerald,
            border: p.status === "Achevé" ? "none" : `1px solid ${COLORS.line}`,
          }}
        >
          {p.status}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[12px] mb-2" style={{ color: COLORS.gold }}>
          <p.icon size={14} /> {p.category}
        </div>
        <div
          style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
          className="text-[16.5px] font-medium leading-snug"
        >
          {p.name}
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] mt-1.5" style={{ color: "#5C6B62" }}>
          <MapPin size={12} /> {p.location}
        </div>

        <div className="mt-4">
          <div className="h-1.5 rounded-full w-full" style={{ background: COLORS.sandDeep }}>
            <div
              className="h-1.5 rounded-full"
              style={{ width: `${pct}%`, background: COLORS.emerald }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[12px]" style={{ color: "#5C6B62" }}>
            <span>{fmt(p.raised)}</span>
            <span className="font-semibold" style={{ color: COLORS.emerald }}>
              {pct}%
            </span>
          </div>
          <div className="text-[11.5px] mt-0.5" style={{ color: "#A79B7C" }}>
            Objectif : {fmt(p.goal)}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => openProject(p.id)}
            className="flex-1 text-[12.5px] font-semibold py-2.5 rounded-md border"
            style={{ borderColor: COLORS.emerald, color: COLORS.emerald }}
          >
            Découvrir le projet
          </button>
          <button
            onClick={() => setPage("contribuer")}
            className="flex-1 text-[12.5px] font-semibold py-2.5 rounded-md"
            style={{ background: COLORS.gold, color: "#211705" }}
          >
            Contribuer
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ setPage, openProject }) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Nos projets</SectionLabel>
      <h1
        style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
        className="text-4xl font-medium mb-3"
      >
        Des projets qui transforment des vies
      </h1>
      <p className="text-[15px] max-w-2xl mb-10" style={{ color: "#4B5750" }}>
        Chaque contribution finance un projet suivi et documenté. Découvrez
        les initiatives soutenues par le Waqf à travers le Niger.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} setPage={setPage} openProject={openProject} />
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ projectId, setPage }) {
  const p = PROJECTS.find((x) => x.id === projectId) || PROJECTS[0];
  const pct = Math.round((p.raised / p.goal) * 100);
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <button
        onClick={() => setPage("projets")}
        className="text-[13px] mb-6 flex items-center gap-1"
        style={{ color: COLORS.emerald }}
      >
        ← Retour aux projets
      </button>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="h-72 rounded-lg overflow-hidden mb-6">
            <Placeholder label={p.category} />
          </div>
          <div className="text-[12.5px] font-medium mb-2" style={{ color: COLORS.gold }}>
            {p.category}
          </div>
          <h1
            style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
            className="text-3xl font-medium mb-4"
          >
            {p.name}
          </h1>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#4B5750" }}>
            Présentation du projet : ce projet vise à répondre à un besoin
            communautaire prioritaire identifié par la HAWaqf en collaboration
            avec les autorités locales de la région de {p.location}.
          </p>
          {[
            ["Objectifs", "Améliorer durablement les conditions de vie des bénéficiaires directs et indirects du projet."],
            ["Budget", `Budget global estimé à ${fmt(p.goal)}, réparti entre travaux, équipements et suivi.`],
            ["Impact attendu", "Bénéfice communautaire durable, aligné sur les principes du Waqf."],
          ].map(([t, d]) => (
            <div key={t} className="mb-5">
              <div
                style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }}
                className="text-lg font-medium mb-1.5"
              >
                {t}
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5C6B62" }}>
                {d}
              </p>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-md overflow-hidden">
                <Placeholder label={`Galerie ${i}`} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className="rounded-lg border p-6 sticky top-28"
            style={{ borderColor: COLORS.line, background: "#FFFFFF" }}
          >
            <div className="flex items-center gap-1.5 text-[13px] mb-4" style={{ color: "#5C6B62" }}>
              <MapPin size={14} /> {p.location}, Niger
            </div>
            <div className="h-1.5 rounded-full w-full mb-2" style={{ background: COLORS.sandDeep }}>
              <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: COLORS.emerald }} />
            </div>
            <div className="flex justify-between text-[13px] mb-1">
              <span style={{ color: COLORS.emerald, fontWeight: 700 }}>{pct}% atteint</span>
              <span style={{ color: "#5C6B62" }}>{fmt(p.raised)}</span>
            </div>
            <div className="text-[12.5px] mb-5" style={{ color: "#A79B7C" }}>
              Objectif : {fmt(p.goal)}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5 text-[12.5px]">
              <div>
                <div style={{ color: "#A79B7C" }}>Superficie</div>
                <div style={{ color: COLORS.ink, fontWeight: 600 }}>—</div>
              </div>
              <div>
                <div style={{ color: "#A79B7C" }}>Contributeurs</div>
                <div style={{ color: COLORS.ink, fontWeight: 600 }}>184</div>
              </div>
            </div>
            <button
              onClick={() => setPage("contribuer")}
              className="w-full py-3.5 rounded-md text-[14px] font-semibold"
              style={{ background: COLORS.gold, color: "#211705" }}
            >
              Contribuer à ce projet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContributionPage({ setPage }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("Don");
  const [project, setProject] = useState(PROJECTS[0].id);
  const [amount, setAmount] = useState(25000);
  const [custom, setCustom] = useState("");
  const [payment, setPayment] = useState("Mobile Money");
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", tel: "", pays: "Niger" });
  const done = step === 6;

  const steps = ["Type", "Projet", "Montant", "Informations", "Paiement"];

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: COLORS.emerald }}
        >
          <Check size={28} color="#F6F2E9" />
        </div>
        <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-2xl font-medium mb-3">
          Merci pour votre contribution.
        </h1>
        <p className="text-[14px] mb-8" style={{ color: "#5C6B62" }}>
          Un reçu numérique a été généré pour {form.prenom || "votre"} contribution
          de {(custom || amount).toLocaleString("fr-FR")} FCFA.
        </p>
        <div className="border rounded-lg p-6 text-left mb-8" style={{ borderColor: COLORS.line }}>
          <div className="flex justify-between text-[13px] py-1.5" style={{ color: "#5C6B62" }}>
            <span>Reçu N°</span><span>HAW-2026-00184</span>
          </div>
          <div className="flex justify-between text-[13px] py-1.5" style={{ color: "#5C6B62" }}>
            <span>Type</span><span>{type}</span>
          </div>
          <div className="flex justify-between text-[13px] py-1.5" style={{ color: "#5C6B62" }}>
            <span>Montant</span><span>{(custom || amount).toLocaleString("fr-FR")} FCFA</span>
          </div>
          <button className="mt-4 flex items-center gap-2 text-[13px] font-semibold" style={{ color: COLORS.emerald }}>
            <Download size={14} /> Télécharger le reçu
          </button>
        </div>
        <button
          onClick={() => setPage("accueil")}
          className="px-6 py-3 rounded-md text-[14px] font-semibold"
          style={{ background: COLORS.emerald, color: "#F6F2E9" }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-3xl font-medium mb-2">
        Je souhaite contribuer
      </h1>
      <div className="flex gap-1 mt-6 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className="h-1 rounded-full"
              style={{ background: i + 1 <= step ? COLORS.emerald : COLORS.line }}
            />
            <div className="text-[11px] mt-1.5" style={{ color: i + 1 === step ? COLORS.emerald : "#A79B7C" }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-7" style={{ borderColor: COLORS.line, background: "#FFFFFF" }}>
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {["Don", "Waqf", "Contribution à un projet", "Partenariat"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="p-4 rounded-md border text-left text-[13.5px] font-medium"
                style={{
                  borderColor: type === t ? COLORS.emerald : COLORS.line,
                  background: type === t ? COLORS.sand : "#FFFFFF",
                  color: COLORS.ink,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-2.5">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProject(p.id)}
                className="w-full flex items-center justify-between p-3.5 rounded-md border text-left"
                style={{
                  borderColor: project === p.id ? COLORS.emerald : COLORS.line,
                  background: project === p.id ? COLORS.sand : "#FFFFFF",
                }}
              >
                <span className="text-[13.5px]" style={{ color: COLORS.ink }}>{p.name}</span>
                <span className="text-[11.5px]" style={{ color: "#A79B7C" }}>{p.location}</span>
              </button>
            ))}
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[10000, 25000, 50000, 100000].map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustom(""); }}
                  className="py-3.5 rounded-md border text-[14px] font-semibold"
                  style={{
                    borderColor: amount === a && !custom ? COLORS.emerald : COLORS.line,
                    background: amount === a && !custom ? COLORS.sand : "#FFFFFF",
                    color: COLORS.ink,
                  }}
                >
                  {a.toLocaleString("fr-FR")} FCFA
                </button>
              ))}
            </div>
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
              placeholder="Montant personnalisé (FCFA)"
              className="w-full px-4 py-3 rounded-md border text-[14px] outline-none"
              style={{ borderColor: COLORS.line }}
            />
          </div>
        )}
        {step === 4 && (
          <div className="grid grid-cols-2 gap-3.5">
            {["nom", "prenom", "email", "tel"].map((f) => (
              <input
                key={f}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                placeholder={{ nom: "Nom", prenom: "Prénom", email: "Email", tel: "Téléphone" }[f]}
                className="px-4 py-3 rounded-md border text-[14px] outline-none"
                style={{ borderColor: COLORS.line }}
              />
            ))}
            <input
              value={form.pays}
              onChange={(e) => setForm({ ...form, pays: e.target.value })}
              placeholder="Pays"
              className="col-span-2 px-4 py-3 rounded-md border text-[14px] outline-none"
              style={{ borderColor: COLORS.line }}
            />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-2.5">
            {["Mobile Money", "Carte bancaire", "Virement bancaire", "Autres moyens"].map((m) => (
              <button
                key={m}
                onClick={() => setPayment(m)}
                className="w-full flex items-center justify-between p-3.5 rounded-md border text-left text-[13.5px]"
                style={{
                  borderColor: payment === m ? COLORS.emerald : COLORS.line,
                  background: payment === m ? COLORS.sand : "#FFFFFF",
                  color: COLORS.ink,
                }}
              >
                {m}
                {payment === m && <Check size={15} color={COLORS.emerald} />}
              </button>
            ))}
            <p className="text-[11.5px] pt-2" style={{ color: "#A79B7C" }}>
              Intégration réelle des moyens de paiement prévue dans la version finale.
            </p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="px-5 py-2.5 rounded-md text-[13.5px] font-medium"
            style={{ color: "#5C6B62", visibility: step === 1 ? "hidden" : "visible" }}
          >
            Précédent
          </button>
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 rounded-md text-[13.5px] font-semibold"
            style={{ background: COLORS.gold, color: "#211705" }}
          >
            {step === 5 ? "Confirmer la contribution" : "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AIPage() {
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "Bonjour, je suis l'assistant virtuel de la Haute Autorité du Waqf du Niger. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const suggestions = [
    "Qu'est-ce que le Waqf ?",
    "Comment créer un Waqf ?",
    "Quels sont les projets en cours ?",
    "Comment contribuer ?",
    "Quels documents dois-je fournir ?",
  ];
  const send = (text) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      {
        role: "bot",
        text: "Ceci est un prototype : HAWaqf AI n'est pas encore connectée à une base documentaire réelle. Dans la version finale, l'agent répondra à partir des textes officiels de la HAWaqf.",
      },
    ]);
    setInput("");
  };
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <SectionLabel>HAWaqf AI</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-3xl font-medium mb-2">
        Votre assistant HAWaqf
      </h1>
      <p className="text-[14px] mb-8" style={{ color: "#5C6B62" }}>
        Une nouvelle façon d'accéder à l'information sur le Waqf.
      </p>
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: COLORS.line }}>
        <div className="h-96 overflow-y-auto p-5 space-y-3" style={{ background: "#FFFFFF" }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[80%] text-[13.5px] px-4 py-3 rounded-lg leading-relaxed"
                style={{
                  background: m.role === "user" ? COLORS.emerald : COLORS.sand,
                  color: m.role === "user" ? "#F6F2E9" : "#3A4740",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex flex-wrap gap-2" style={{ borderColor: COLORS.line }}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[12px] px-3 py-1.5 rounded-full border"
              style={{ borderColor: COLORS.line, color: COLORS.emerald }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2" style={{ borderColor: COLORS.line }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Écrivez votre question…"
            className="flex-1 px-4 py-3 rounded-md border text-[14px] outline-none"
            style={{ borderColor: COLORS.line }}
          />
          <button
            onClick={() => send(input)}
            className="px-4 rounded-md"
            style={{ background: COLORS.emerald }}
          >
            <Send size={16} color="#F6F2E9" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Institution</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-6">
        La Haute Autorité du Waqf du Niger
      </h1>
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <p className="text-[15px] leading-relaxed" style={{ color: "#4B5750" }}>
          La HAWaqf est l'institution chargée d'organiser, de superviser et de
          promouvoir le Waqf sur l'ensemble du territoire nigérien. Elle veille
          à la bonne gestion des biens Waqf et à la transparence des ressources
          mobilisées au bénéfice des communautés.
        </p>
        <div className="h-56 rounded-lg overflow-hidden">
          <Placeholder label="Siège de la HAWaqf, Niamey" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          ["Mission", "Encadrer juridiquement et administrativement le Waqf au Niger."],
          ["Vision", "Faire du Waqf un levier durable de développement communautaire."],
          ["Valeurs", "Transparence, intégrité, solidarité et redevabilité."],
        ].map(([t, d]) => (
          <div key={t} className="p-6 rounded-lg border" style={{ borderColor: COLORS.line }}>
            <div style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-lg font-medium mb-2">
              {t}
            </div>
            <p className="text-[13.5px] leading-relaxed" style={{ color: "#5C6B62" }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaqfPage({ setPage }) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Le Waqf</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-6">
        Comprendre et créer un Waqf
      </h1>
      <p className="text-[15px] leading-relaxed max-w-2xl mb-10" style={{ color: "#4B5750" }}>
        Le Waqf immobilise un bien pour en affecter durablement les revenus à
        une cause d'intérêt général. La HAWaqf accompagne toute personne
        souhaitant constituer un Waqf, du dépôt du dossier à la mise en œuvre.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {["Waqf public", "Waqf familial", "Waqf privé"].map((t) => (
          <div key={t} className="p-6 rounded-lg border" style={{ borderColor: COLORS.line }}>
            <div style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-lg font-medium mb-2">
              {t}
            </div>
            <p className="text-[13.5px] leading-relaxed" style={{ color: "#5C6B62" }}>
              Cadre juridique et accompagnement dédiés à la constitution d'un {t.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage("contribuer")}
        className="px-6 py-3.5 rounded-md text-[14.5px] font-semibold"
        style={{ background: COLORS.gold, color: "#211705" }}
      >
        Faire un Waqf
      </button>
    </div>
  );
}

const ARTICLES = [
  { title: "Lancement du programme Éducation 2026", date: "3 sept. 2026", cat: "Éducation" },
  { title: "La HAWaqf publie son rapport annuel", date: "18 août 2026", cat: "Transparence" },
  { title: "Inauguration du projet Eau à Zinder", date: "2 août 2026", cat: "Infrastructure" },
];

function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Actualités</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-10">
        Actualités du Waqf
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {ARTICLES.map((a) => (
          <div key={a.title} className="rounded-lg border overflow-hidden" style={{ borderColor: COLORS.line }}>
            <div className="h-40"><Placeholder label={a.cat} /></div>
            <div className="p-5">
              <div className="flex justify-between text-[11.5px] mb-2" style={{ color: COLORS.gold }}>
                <span>{a.cat}</span><span style={{ color: "#A79B7C" }}>{a.date}</span>
              </div>
              <div style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-[15.5px] font-medium leading-snug mb-3">
                {a.title}
              </div>
              <button className="text-[13px] font-semibold flex items-center gap-1" style={{ color: COLORS.emerald }}>
                Lire l'article <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DOCS = [
  { t: "Loi organique relative au Waqf", cat: "Textes juridiques", size: "1.2 Mo" },
  { t: "Rapport annuel 2025", cat: "Rapports", size: "3.8 Mo" },
  { t: "Guide : créer un Waqf familial", cat: "Guides", size: "640 Ko" },
  { t: "Publication — Waqf et développement local", cat: "Publications", size: "980 Ko" },
];

function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Ressources</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-10">
        Bibliothèque documentaire
      </h1>
      <div className="divide-y" style={{ borderColor: COLORS.line }}>
        {DOCS.map((d) => (
          <div key={d.t} className="flex items-center justify-between py-5 border-b" style={{ borderColor: COLORS.line }}>
            <div className="flex items-center gap-4">
              <FileText size={20} color={COLORS.emerald} />
              <div>
                <div style={{ color: COLORS.ink }} className="text-[14.5px] font-medium">{d.t}</div>
                <div className="text-[12px]" style={{ color: "#A79B7C" }}>{d.cat} · {d.size}</div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: COLORS.gold }}>
              <Download size={14} /> Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const FAQS = [
  ["Qu'est-ce que le Waqf ?", "Le Waqf est un bien immobilisé dont les revenus financent durablement une cause d'intérêt général."],
  ["Comment créer un Waqf au Niger ?", "En déposant un dossier auprès de la HAWaqf, qui accompagne la constitution juridique du Waqf."],
  ["Qui peut créer un Waqf ?", "Toute personne physique ou morale disposant d'un bien éligible peut constituer un Waqf."],
  ["Comment contribuer à un projet ?", "Via la rubrique « Faire un Waqf », en choisissant un projet et un montant."],
  ["Comment suivre une contribution ?", "Chaque contributeur dispose d'un espace personnel avec l'historique de ses contributions."],
  ["Comment contacter la HAWaqf ?", "Par le formulaire de contact ou les coordonnées disponibles sur le site."],
];

function FAQPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <SectionLabel>FAQ</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-10">
        Questions fréquentes
      </h1>
      <div className="divide-y" style={{ borderColor: COLORS.line }}>
        {FAQS.map(([q, a], i) => (
          <div key={q} className="border-b" style={{ borderColor: COLORS.line }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="text-[15px] font-medium" style={{ color: COLORS.ink }}>{q}</span>
              <ChevronDown
                size={17}
                color={COLORS.gold}
                style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
            {open === i && (
              <p className="text-[13.5px] pb-5 leading-relaxed" style={{ color: "#5C6B62" }}>{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionLabel>Contact</SectionLabel>
      <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-4xl font-medium mb-10">
        Contactez la HAWaqf
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="space-y-5 mb-8">
            {[
              [MapPin, "Plateau, Niamey, Niger"],
              [Phone, "+227 20 00 00 00"],
              [Mail, "contact@hawaqf.ne"],
              [Clock, "Lun–Ven, 8h–17h"],
            ].map(([Icon, t], i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon size={18} color={COLORS.gold} />
                <span className="text-[14px]" style={{ color: "#3A4740" }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="h-56 rounded-lg overflow-hidden">
            <Placeholder label="Carte — Niamey, Niger" />
          </div>
        </div>
        <div>
          {sent ? (
            <div className="p-8 rounded-lg border text-center" style={{ borderColor: COLORS.line }}>
              <Check size={24} color={COLORS.emerald} className="mx-auto mb-3" />
              <p className="text-[14px]" style={{ color: COLORS.ink }}>
                Votre message a été envoyé. Nous vous répondrons rapidement.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <input placeholder="Nom" className="px-4 py-3 rounded-md border text-[14px]" style={{ borderColor: COLORS.line }} />
                <input placeholder="Email" className="px-4 py-3 rounded-md border text-[14px]" style={{ borderColor: COLORS.line }} />
              </div>
              <input placeholder="Téléphone" className="w-full px-4 py-3 rounded-md border text-[14px]" style={{ borderColor: COLORS.line }} />
              <input placeholder="Sujet" className="w-full px-4 py-3 rounded-md border text-[14px]" style={{ borderColor: COLORS.line }} />
              <textarea placeholder="Message" rows={5} className="w-full px-4 py-3 rounded-md border text-[14px]" style={{ borderColor: COLORS.line }} />
              <button
                onClick={() => setSent(true)}
                className="px-6 py-3 rounded-md text-[14px] font-semibold"
                style={{ background: COLORS.emerald, color: "#F6F2E9" }}
              >
                Envoyer le message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPage() {
  const [tab, setTab] = useState("Dashboard");
  const tabs = [
    ["Dashboard", LayoutDashboard], ["Projets", FolderKanban], ["Contributions", Wallet],
    ["Donateurs", Users], ["Actualités", Newspaper], ["Documents", FileText],
    ["Rapports", BarChart3], ["Utilisateurs", UserCircle2], ["Paramètres", Settings],
    ["HAWaqf AI", Bot],
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <div className="space-y-1">
        {tabs.map(([t, Icon]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-[13.5px]"
            style={{
              background: tab === t ? COLORS.sand : "transparent",
              color: tab === t ? COLORS.emerald : "#5C6B62",
              fontWeight: tab === t ? 600 : 500,
            }}
          >
            <Icon size={15} /> {t}
          </button>
        ))}
      </div>
      <div>
        <h1 style={{ fontFamily: "Fraunces, serif", color: COLORS.ink }} className="text-2xl font-medium mb-6">
          {tab}
        </h1>
        {tab === "Dashboard" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[
                ["312 M FCFA", "Total contributions"],
                ["18 M FCFA", "Ce mois-ci"],
                ["12", "Projets actifs"],
                ["1 240", "Donateurs"],
                ["8 400+", "Bénéficiaires"],
              ].map(([v, l]) => (
                <div key={l} className="p-4 rounded-lg border" style={{ borderColor: COLORS.line }}>
                  <div style={{ fontFamily: "Fraunces, serif", color: COLORS.emerald }} className="text-xl font-medium">{v}</div>
                  <div className="text-[11.5px] mt-1" style={{ color: "#A79B7C" }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="h-56 rounded-lg border"><Placeholder label="Graphique — évolution des contributions" /></div>
          </>
        )}
        {tab === "Projets" && (
          <div className="space-y-2">
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: COLORS.line }}>
                <span className="text-[13.5px]" style={{ color: COLORS.ink }}>{p.name}</span>
                <div className="flex gap-2 text-[12px]">
                  <button className="px-3 py-1.5 rounded-md" style={{ background: COLORS.sand, color: COLORS.emerald }}>Modifier</button>
                  <button className="px-3 py-1.5 rounded-md" style={{ background: COLORS.sand, color: COLORS.emerald }}>Publier</button>
                  <button className="px-3 py-1.5 rounded-md" style={{ background: "#F3E7DD", color: COLORS.clay }}>Archiver</button>
                </div>
              </div>
            ))}
            <button className="mt-3 px-4 py-2.5 rounded-md text-[13px] font-semibold" style={{ background: COLORS.emerald, color: "#F6F2E9" }}>
              + Ajouter un projet
            </button>
          </div>
        )}
        {!["Dashboard", "Projets"].includes(tab) && (
          <div className="h-64 rounded-lg border"><Placeholder label={`Module ${tab} — maquette`} /></div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("accueil");
  const [projectId, setProjectId] = useState(PROJECTS[0].id);

  useEffect(() => {
    injectFonts();
  }, []);

  const openProject = (id) => {
    setProjectId(id);
    setPage("projet-detail");
  };

  const pages = {
    accueil: <HomePage setPage={setPage} openProject={openProject} />,
    apropos: <AboutPage />,
    waqf: <WaqfPage setPage={setPage} />,
    projets: <ProjectsPage setPage={setPage} openProject={openProject} />,
    "projet-detail": <ProjectDetailPage projectId={projectId} setPage={setPage} />,
    contribuer: <ContributionPage setPage={setPage} />,
    ai: <AIPage />,
    actualites: <NewsPage />,
    ressources: <ResourcesPage />,
    faq: <FAQPage />,
    contact: <ContactPage />,
    admin: <AdminPage />,
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#FFFFFF" }} className="min-h-screen">
      <Header page={page} setPage={setPage} />
      {pages[page] || pages.accueil}
      <div className="text-center py-3" style={{ background: COLORS.sand }}>
        <button onClick={() => setPage("admin")} className="text-[11.5px]" style={{ color: "#A79B7C" }}>
          Accès administration (démo)
        </button>
        <span className="mx-2" style={{ color: COLORS.line }}>·</span>
        <button onClick={() => setPage("faq")} className="text-[11.5px]" style={{ color: "#A79B7C" }}>
          FAQ
        </button>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}
