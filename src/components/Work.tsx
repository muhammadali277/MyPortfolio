import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type Theme } from "../lib/themes";

const projects = [
  {
    n: "01",
    title: "legalease",
    tag: "FYP · RAG",
    copy: "AI legal compliance & search assistant with LLaMA 3.3, FAISS, multilingual English/Urdu, and voice input.",
  },
  {
    n: "02",
    title: "lead gen",
    tag: "ML · Automation",
    copy: "Machine learning intent filtering, high-speed web scraping automation, and intelligent Selenium outreach.",
  },
  {
    n: "03",
    title: "resume match",
    tag: "NLP · Vectors",
    copy: "Vector search candidate evaluation using SentenceTransformers, FAISS scoring, and T5-Small explainable summaries.",
  },
];

type Props = {
  theme: Theme;
};

export default function Work({ theme }: Props) {
  const root = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".work-head", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-head", start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
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
      id="work"
      className="relative px-5 py-16 transition-colors duration-700 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-28"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="work-head mb-12 flex items-end justify-between md:mb-20">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-white/40 uppercase">Selected work</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,8vw,3rem)] font-bold tracking-tight text-white md:text-[3.2vw] lg:text-[2.6vw]">
            Projects
          </h2>
        </div>
        <p className="hidden text-sm text-white/30 md:block">03 / 03</p>
      </div>

      <ul>
        {projects.map((p, idx) => {
          const isHovered = hoveredIndex === idx || selectedIndex === idx;
          return (
            <li key={p.n} className="work-row">
              <article
                data-cursor
                role="button"
                tabIndex={0}
                aria-pressed={selectedIndex === idx}
                aria-label={`Highlight ${p.title} project`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedIndex(selectedIndex === idx ? null : idx);
                  }
                }}
                className="work-link group relative grid cursor-pointer grid-cols-[28px_minmax(0,1fr)] items-baseline gap-x-3 overflow-hidden border-t border-white/10 py-6 outline-none transition-colors active:bg-white/5 focus-visible:bg-white/5 sm:gap-x-6 md:grid-cols-[70px_minmax(0,1fr)_minmax(0,1fr)] md:py-8"
              >
                <span
                  className="font-display text-sm font-semibold transition-colors duration-500"
                  style={{
                    color: isHovered ? theme.accent : "rgba(255,255,255,0.3)",
                  }}
                >
                  {p.n}
                </span>
                <h3
                  className="work-title font-display text-[clamp(1.5rem,7.5vw,2.5rem)] leading-[1] font-extrabold tracking-[-0.03em] transition-colors duration-500 sm:text-[6vw] md:text-[4vw] lg:text-[3.2vw]"
                  style={{
                    color: isHovered ? theme.accent : "white",
                  }}
                >
                  {p.title}
                </h3>
                <div className="col-span-2 mt-3 max-w-md md:col-span-1 md:mt-0 md:justify-self-end md:text-right">
                  <p
                    className="text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-500"
                    style={{ color: theme.accent }}
                  >
                    {p.tag}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/45 md:text-base">{p.copy}</p>
                </div>

                {/* Accent hover underline */}
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    backgroundColor: theme.accent,
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
