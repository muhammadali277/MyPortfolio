import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type Theme } from "../lib/themes";

type Props = {
  theme: Theme;
};

export default function Statement({ theme }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stmt-line", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".stmt-meta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative px-6 py-20 transition-colors duration-700 md:px-12 md:py-28 lg:px-16"
      style={{ backgroundColor: theme.bg }}
    >
      <p className="stmt-meta mb-6 text-[11px] tracking-[0.32em] text-white/35 uppercase">A short brief</p>
      <h2 className="font-display leading-[0.88] font-extrabold tracking-[-0.035em] text-white">
        <span className="block overflow-hidden">
          <span className="stmt-line inline-block text-[9vw] sm:text-[7.2vw] md:text-[5.2vw] lg:text-[4.2vw]">
            from models
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            className="stmt-line inline-block text-[9vw] sm:text-[7.2vw] md:text-[5.2vw] lg:text-[4.2vw] transition-colors duration-500"
            style={{ color: theme.accent }}
          >
            to products
          </span>
        </span>
      </h2>
      <p className="stmt-meta mt-8 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
        FAST-NUCES · LangChain · Gemini · FAISS. I turn research-grade AI into robust, real-world systems.
      </p>
    </section>
  );
}
