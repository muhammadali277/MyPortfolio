import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type Theme } from "../lib/themes";

type ExperienceItem = {
  id: string;
  n: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  skills: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: "js-bank",
    n: "01",
    company: "JS Bank",
    role: "AI Engineer",
    period: "Aug 2026 — Present",
    location: "Karachi, Pakistan",
    type: "Current Role",
    summary:
      "Architecting enterprise RAG pipelines, low-latency FastAPI microservices, and LLM automation systems.",
    highlights: [
      "Sub-second FAISS vector indexing & Google Gemini integrations.",
      "High-throughput FastAPI microservices with strict Pydantic schemas.",
      "Autonomous intent filtering and real-time document search.",
    ],
    skills: ["Python", "FastAPI", "RAG", "FAISS", "Gemini", "LangChain"],
  },
  {
    id: "cerisma",
    n: "02",
    company: "Cerisma (PSO)",
    role: "Software Engineer",
    period: "Feb 2026 — Jun 2026",
    location: "Karachi, Pakistan",
    type: "Past Experience",
    summary:
      "Engineered LawLink — real-time legal-tech collaboration suite deployed to production.",
    highlights: [
      "Full-stack Flutter Web frontend with reactive Dart architecture.",
      "Supabase & Firebase real-time database sync and secure auth.",
      "Automated zero-downtime CI/CD deployment on Netlify.",
    ],
    skills: ["Flutter Web", "Dart", "Supabase", "Firebase", "Netlify"],
  },
];

type Props = {
  theme: Theme;
};

export default function Experience({ theme }: Props) {
  const root = useRef<HTMLElement>(null);
  // Closed by default until user clicks
  const [activeExp, setActiveExp] = useState<string | null>(null);
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(".exp-head", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-head", start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="experience"
      className="relative px-5 py-16 transition-colors duration-700 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-28"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="exp-head mb-12 flex items-end justify-between md:mb-20">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-white/40 uppercase">Career journey</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,8vw,3rem)] font-bold tracking-tight text-white md:text-[3.2vw] lg:text-[2.6vw]">
            Experience
          </h2>
        </div>
        <p className="hidden text-sm text-white/30 md:block">02 / 02</p>
      </div>

      {/* Experience List */}
      <ul className="space-y-4">
        {experiences.map((exp) => {
          const isSelected = activeExp === exp.id;
          const isHovered = hoveredExp === exp.id;

          return (
            <li key={exp.id} className="exp-row">
              <div
                data-cursor
                role="button"
                tabIndex={0}
                aria-expanded={isSelected}
                aria-label={`${exp.company}, ${exp.role}. ${isSelected ? "Hide" : "Show"} details`}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
                onClick={() => setActiveExp(isSelected ? null : exp.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveExp(isSelected ? null : exp.id);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border p-4 outline-none transition-all duration-500 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-white/40 sm:p-8 md:p-9"
                style={{
                  borderColor: isHovered
                    ? `${theme.accent}66`
                    : isSelected
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(255,255,255,0.08)",
                  backgroundColor: isHovered
                    ? `${theme.accent}0f`
                    : isSelected
                    ? "rgba(255,255,255,0.035)"
                    : "rgba(255,255,255,0.015)",
                }}
              >
                {/* Top Row: Number, Company, Role, Period & Expand indicator */}
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 sm:gap-x-6 md:grid-cols-[60px_minmax(0,1fr)_auto]">
                  <span
                    className="font-display text-sm font-semibold transition-colors duration-500"
                    style={{
                      color: isHovered || isSelected ? theme.accent : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {exp.n}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
                      <h3
                        className="font-display text-[clamp(1.35rem,6vw,2.1rem)] leading-[1.1] font-extrabold tracking-[-0.025em] transition-colors duration-500 md:text-[3vw] lg:text-[2.4vw]"
                        style={{
                          color: isHovered ? theme.accent : "white",
                        }}
                      >
                        {exp.company}
                      </h3>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors duration-500"
                        style={{
                          backgroundColor: `${theme.accent}1f`,
                          color: theme.accent,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <p className="mt-1 font-display text-sm font-semibold text-white/80 sm:text-lg md:text-xl">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="hidden flex-col items-end sm:flex">
                      <span
                        className="font-sans text-xs font-medium tracking-wider uppercase transition-colors duration-500 sm:text-sm"
                        style={{
                          color: isHovered ? theme.accent : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {exp.period}
                      </span>
                      <span className="text-[11px] text-white/35">{exp.location}</span>
                    </div>

                    {/* Interactive Animated Expand Indicator */}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/30"
                      style={{
                        backgroundColor: isSelected ? `${theme.accent}26` : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="transition-transform duration-300"
                        style={{
                          transform: isSelected ? "rotate(180deg)" : "rotate(0deg)",
                          color: isSelected || isHovered ? theme.accent : "rgba(255,255,255,0.6)",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile Period Subtitle */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:hidden">
                  <span
                    className="font-sans text-xs font-medium uppercase"
                    style={{ color: isHovered ? theme.accent : "rgba(255,255,255,0.5)" }}
                  >
                    {exp.period}
                  </span>
                  <span className="text-[11px] text-white/35">{exp.location}</span>
                </div>

                {/* Expanded Details - Closed by default until clicked */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isSelected
                      ? "mt-5 grid-rows-[1fr] border-t border-white/10 pt-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden space-y-3.5">
                    <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                      {exp.summary}
                    </p>

                    {/* Bullet Highlights - Brief & Impactful */}
                    <ul className="space-y-1.5 text-xs text-white/60 sm:text-sm">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 text-xs transition-colors duration-500"
                            style={{ color: theme.accent }}
                          >
                            ✦
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75 transition-colors duration-300 hover:border-white/25"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Indicator */}
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-500"
                  style={{
                    backgroundColor: theme.accent,
                    transform: isHovered || isSelected ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
