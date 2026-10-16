import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { scrollTo, startScroll, stopScroll } from "../lib/scroll";
import { type Theme } from "../lib/themes";

type Props = {
  open: boolean;
  onClose: () => void;
  currentTheme: Theme;
};

const links = [
  { label: "home", href: "#top" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#work" },
  { label: "contact", href: "#contact" },
];

export default function Menu({ open, onClose, currentTheme }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (open) {
        stopScroll();
        gsap.to(root.current, { autoAlpha: 1, duration: 0.45, ease: "power3.out" });
        gsap.fromTo(
          ".menu-link",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power4.out", delay: 0.1 }
        );
        gsap.fromTo(
          ".menu-meta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 0.28 }
        );
      } else {
        startScroll();
        gsap.to(root.current, { autoAlpha: 0, duration: 0.35, ease: "power3.inOut" });
      }
    },
    { dependencies: [open] }
  );

  const go = (href: string) => {
    onClose();
    setTimeout(() => scrollTo(href), 280);
  };

  return (
    <div
      ref={root}
      className="invisible fixed inset-0 z-40 flex flex-col justify-between overflow-hidden px-6 py-20 opacity-0 backdrop-blur-2xl transition-colors duration-700 md:px-16 md:py-24"
      style={{
        background: currentTheme.bgWarm,
        backgroundColor: currentTheme.bg,
      }}
    >
      {/* Ambient Theme Atmospheric Glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[120px] transition-colors duration-700"
        style={{ backgroundColor: currentTheme.glow }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-[120px] transition-colors duration-700"
        style={{ backgroundColor: currentTheme.glow }}
      />

      {/* Navigation Links */}
      <nav className="relative z-10 flex flex-col gap-2 md:gap-3">
        {links.map((l, i) => (
          <button
            key={l.href}
            onClick={() => go(l.href)}
            data-cursor
            className="menu-link group relative flex w-fit items-baseline gap-4 text-left focus:outline-none"
          >
            <span
              className="font-sans text-xs font-semibold tracking-[0.25em] transition-colors duration-500"
              style={{ color: `${currentTheme.accent}99` }}
            >
              0{i + 1}
            </span>
            <span
              className="font-display text-[9vw] sm:text-[6.5vw] md:text-[4.8vw] lg:text-[4vw] leading-[1] font-extrabold tracking-tight text-white uppercase transition-colors duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
              }}
            >
              {l.label}
            </span>
            {/* Subtle animated hover dot */}
            <span
              className="hidden h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-100 sm:inline-block scale-0"
              style={{ backgroundColor: currentTheme.accent }}
            />
          </button>
        ))}
      </nav>

      {/* Footer / Contact Details inside Menu */}
      <div className="menu-meta relative z-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
        <div>
          <p
            className="mb-2 text-[11px] font-semibold tracking-[0.28em] uppercase transition-colors duration-500"
            style={{ color: currentTheme.accent }}
          >
            Get in touch
          </p>
          <a
            href="mailto:muhammadbintariq277@gmail.com"
            data-cursor
            className="block font-display text-xl font-semibold text-white transition-colors duration-300 md:text-2xl"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white";
            }}
          >
            muhammadbintariq277@gmail.com
          </a>
          <a
            href="tel:+923113760980"
            data-cursor
            className="mt-1 block font-display text-lg text-white/80 transition-colors duration-300 md:text-xl"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
          >
            +92 311 376 0980
          </a>
        </div>
        <div className="text-sm text-white/50 md:text-right">
          <p className="tracking-[0.2em] uppercase">Karachi, Pakistan</p>
          <p
            className="mt-1 font-medium transition-colors duration-500"
            style={{ color: currentTheme.accent }}
          >
            AI ENGINEER · FAST-NUCES
          </p>
        </div>
      </div>
    </div>
  );
}
