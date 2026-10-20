import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { scrollTo } from "../lib/scroll";
import { type Theme } from "../lib/themes";

function SplitWord({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`hero-word inline-flex w-max overflow-hidden pt-[0.1em] pb-[0.12em] ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function WordCycle({ accentColor }: { accentColor: string }) {
  const words = ["intelligence", "systems", "pipelines", "products"];
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        y: -14,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          setIndex((v) => (v + 1) % words.length);
          gsap.fromTo(
            el,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, ease: "power3.out" }
          );
        },
      });
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-baseline">
      <span ref={ref} className="inline-block transition-colors duration-500" style={{ color: accentColor }}>
        {words[index]}
      </span>
    </span>
  );
}

function Glow({ glowColor }: { glowColor: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const x = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });
    const track = (clientX: number, clientY: number) => {
      x(clientX - 200);
      y(clientY - 200);
    };
    const move = (e: PointerEvent) => track(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      const finger = e.touches[0];
      const bounds = el.parentElement?.getBoundingClientRect();
      if (finger && bounds && bounds.top < window.innerHeight && bounds.bottom > 0) {
        track(finger.clientX, finger.clientY);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute top-0 left-0 z-0 h-[400px] w-[400px] rounded-full blur-[100px] transition-colors duration-700"
      style={{ backgroundColor: glowColor }}
    />
  );
}

type Props = {
  ready: boolean;
  theme: Theme;
};

export default function Hero({ ready, theme }: Props) {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = nameRef.current;
    const section = root.current;
    const word = heading?.querySelector<HTMLElement>(".hero-word");
    if (!heading || !section || !word) return;

    const fitName = () => {
      const width = section.clientWidth;
      const available = heading.clientWidth - 6;
      const base = width < 640 ? width * 0.11 : width < 768 ? width * 0.095 : width < 1024 ? width * 0.072 : width * 0.062;
      heading.style.fontSize = `${base}px`;

      // Measure at the desired size, then shrink only if the actual font needs more room.
      const measured = word.getBoundingClientRect().width;
      if (measured > available) {
        heading.style.fontSize = `${base * (available / measured)}px`;
      }
    };

    fitName();
    const observer = new ResizeObserver(fitName);
    observer.observe(section);
    document.fonts.ready.then(fitName);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-kicker", { y: 0, opacity: 1, duration: 0.8 }).to(
        ".hero-char",
        { y: 0, rotateZ: 0, duration: 1.15, stagger: 0.028 },
        "-=0.45"
      );
      tl.to(".hero-sub", { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, "-=0.55");
      tl.to(".hero-scroll", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      gsap.to(".hero-parallax", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const shift = root.current?.querySelector(".hero-shift") as HTMLElement | null;
      const xTo = shift ? gsap.quickTo(shift, "x", { duration: 1.1, ease: "power3.out" }) : null;
      const onMove = (e: MouseEvent) => {
        xTo?.((e.clientX / window.innerWidth - 0.5) * 24);
      };
      const canHover = !window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (shift && canHover) window.addEventListener("mousemove", onMove);

      const onTouchMove = (e: TouchEvent) => {
        const finger = e.touches[0];
        if (finger) xTo?.((finger.clientX / window.innerWidth - 0.5) * 14);
      };
      const onTouchEnd = () => xTo?.(0);
      const section = root.current;
      section?.addEventListener("touchmove", onTouchMove, { passive: true });
      section?.addEventListener("touchend", onTouchEnd, { passive: true });

      return () => {
        if (canHover) window.removeEventListener("mousemove", onMove);
        section?.removeEventListener("touchmove", onTouchMove);
        section?.removeEventListener("touchend", onTouchEnd);
      };
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-32 transition-colors duration-700 sm:px-8 sm:pb-14 md:px-12 md:pb-20 lg:px-16"
      style={{
        background: theme.bgWarm,
      }}
    >
      <Glow glowColor={theme.glow} />
      <div className="hero-parallax relative z-10">
        <div className="hero-shift">
          <p className="hero-kicker mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.23em] text-white/50 uppercase sm:text-[11px] sm:tracking-[0.38em] md:mb-8">
            <span
              className="status-dot inline-block h-1.5 w-1.5 rounded-full transition-colors duration-500"
              style={{ backgroundColor: theme.accent }}
            />
            AI ENGINEER · FAST-NUCES
          </p>

          <h1 ref={nameRef} className="min-w-0 w-full font-display leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
            <span className="block">
              <SplitWord text="MUHAMMAD" />
            </span>
            <span
              className="mt-1 block transition-colors duration-500"
              style={{ color: theme.accent }}
            >
              <SplitWord text="ALI" />
            </span>
          </h1>

          <div className="hero-sub mt-7 flex max-w-2xl flex-col gap-4 md:mt-12">
            <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg lg:text-xl">
              I craft <WordCycle accentColor={theme.accent} /> — RAG pipelines, LLM apps, and products that actually ship.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#experience")}
        className="hero-scroll group relative z-10 mt-10 flex items-center gap-4 self-start text-[11px] tracking-[0.32em] text-white/50 uppercase md:mt-14"
      >
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5">
          <span
            className="scroll-dot block h-1.5 w-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: theme.accent }}
          />
        </span>
        <span className="transition-colors group-hover:text-white">scroll</span>
      </button>
    </section>
  );
}
