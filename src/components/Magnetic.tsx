import { useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({ children, strength = 0.35, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.45, ease: "power3.out" });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  const onPress = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    gsap.to(ref.current, { scale: 0.9, duration: 0.16, ease: "power2.out" });
  };

  const onRelease = () => {
    gsap.to(ref.current, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onPress}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      className={className}
    >
      {children}
    </div>
  );
}
