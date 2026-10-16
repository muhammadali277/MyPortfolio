import Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}

export function scrollTo(target: string | HTMLElement, options?: { offset?: number }) {
  if (!lenis) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenis.scrollTo(target, { offset: options?.offset ?? 0, duration: 1.35 });
}
