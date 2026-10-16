import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  onDone: () => void;
  accentColor?: string;
};

export default function Loader({ onDone, accentColor = "#2de2a8" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: onDone,
      });

      tl.fromTo(
        ".loader-stem-m",
        { strokeDashoffset: 120, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: "power3.inOut" }
      )
        .fromTo(
          ".loader-stem-a",
          { strokeDashoffset: 80, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: "power3.inOut" },
          "-=0.4"
        )
        .fromTo(
          ".loader-dot",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          "-=0.2"
        )
        .fromTo(".loader-word", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2")
        .to(".loader-mark", { scale: 1.1, duration: 0.35, ease: "power2.inOut" }, "+=0.1")
        .to(".loader-mark", { scale: 0.9, opacity: 0, duration: 0.35, ease: "power2.in" })
        .to(".loader-word", { y: -20, opacity: 0, duration: 0.35, ease: "power2.in" }, "-=0.3")
        .to(root.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
    >
      <div className="loader-mark mb-8">
        <svg viewBox="0 0 68 52" className="h-16 w-auto md:h-20" fill="none">
          <path
            className="loader-stem-m"
            d="M 10 44 L 10 10 L 25 31 L 40 10"
            stroke={accentColor}
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120"
          />
          <path
            className="loader-stem-a"
            d="M 40 10 L 58 44"
            stroke={accentColor}
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
          />
          <path
            className="loader-stem-a"
            d="M 31 32 L 50 32"
            stroke={accentColor}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeDasharray="30"
          />
          <circle className="loader-dot" cx="40" cy="10" r="3.6" fill="#ffffff" />
        </svg>
      </div>
      <p className="loader-word font-display text-sm font-bold tracking-[0.4em] text-white/80 uppercase">
        MUHAMMAD ALI
      </p>
      <p className="loader-word mt-2 font-sans text-[10px] tracking-[0.3em] uppercase opacity-40">
        AI ENGINEER · FAST-NUCES
      </p>
    </div>
  );
}
