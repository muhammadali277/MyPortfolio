import { useEffect, useRef } from "react";
import gsap from "gsap";
import { type Theme } from "../lib/themes";

type Props = {
  theme: Theme;
};

export default function Cursor({ theme }: Props) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const down = () => {
      gsap.to(ring, { scale: 0.72, duration: 0.25 });
      gsap.to(dot, { scale: 0.6, duration: 0.2 });
    };
    const up = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const enter = () => {
      gsap.to(ring, {
        scale: 2.4,
        backgroundColor: `${theme.accent}26`,
        borderColor: "transparent",
        duration: 0.35,
      });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };
    const leave = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255,255,255,0.7)",
        duration: 0.35,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const bind = () => {
      document.querySelectorAll("a, button, input, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      mo.disconnect();
    };
  }, [theme]);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 mix-blend-difference lg:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference transition-colors duration-500 lg:block"
        style={{ backgroundColor: theme.accent }}
      />
    </>
  );
}
