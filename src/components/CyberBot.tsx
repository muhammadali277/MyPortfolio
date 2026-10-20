import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { type Theme } from "../lib/themes";

type Props = {
  theme: Theme;
  isTyping?: boolean;
  isSuccess?: boolean;
};

export default function CyberBot({ theme, isTyping = false, isSuccess = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const leftEyelidRef = useRef<SVGPathElement>(null);
  const rightEyelidRef = useRef<SVGPathElement>(null);
  const leftHandRef = useRef<SVGGElement>(null);
  const rightHandRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  const [mood, setMood] = useState<"idle" | "curious" | "happy" | "winking">("idle");
  const [clickCount, setClickCount] = useState(0);
  const [statusText, setStatusText] = useState("Tracking cursor");

  // Track either a cursor or a finger without interfering with page scrolling.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Quick setters for high performance smooth eye & head movement
    const headX = gsap.quickTo(headRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const headY = gsap.quickTo(headRef.current, "y", { duration: 0.6, ease: "power3.out" });
    const headRot = gsap.quickTo(headRef.current, "rotation", { duration: 0.6, ease: "power3.out" });
    
    const leftPupilX = gsap.quickTo(leftPupilRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const leftPupilY = gsap.quickTo(leftPupilRef.current, "y", { duration: 0.25, ease: "power2.out" });
    const rightPupilX = gsap.quickTo(rightPupilRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const rightPupilY = gsap.quickTo(rightPupilRef.current, "y", { duration: 0.25, ease: "power2.out" });

    const leftHandX = gsap.quickTo(leftHandRef.current, "x", { duration: 0.7, ease: "power3.out" });
    const leftHandY = gsap.quickTo(leftHandRef.current, "y", { duration: 0.7, ease: "power3.out" });
    const rightHandX = gsap.quickTo(rightHandRef.current, "x", { duration: 0.7, ease: "power3.out" });
    const rightHandY = gsap.quickTo(rightHandRef.current, "y", { duration: 0.7, ease: "power3.out" });

    const trackPosition = (clientX: number, clientY: number) => {
      if (isSuccess) return; // Keep happy victory stance
      
      const rect = container.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height * 0.45;

      const deltaX = clientX - botCenterX;
      const deltaY = clientY - botCenterY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Max pupil shift within the eye socket (radius limit: ~18px)
      const maxPupilOffset = 18;
      const pupilDist = Math.min(dist / 25, maxPupilOffset);
      const px = Math.cos(angle) * pupilDist;
      const py = Math.sin(angle) * pupilDist;

      // If user is typing in email, shift gaze downwards toward input
      if (isTyping) {
        leftPupilX(-12);
        leftPupilY(14);
        rightPupilX(-12);
        rightPupilY(14);
        headX(-10);
        headY(12);
        headRot(-5);
        return;
      }

      leftPupilX(px);
      leftPupilY(py);
      rightPupilX(px);
      rightPupilY(py);

      // 3D head shift
      const hx = Math.max(-28, Math.min(28, deltaX * 0.06));
      const hy = Math.max(-20, Math.min(20, deltaY * 0.05));
      const rot = Math.max(-14, Math.min(14, deltaX * 0.03));
      headX(hx);
      headY(hy);
      headRot(rot);

      // Floating hands reaction
      leftHandX(hx * 0.6);
      leftHandY(hy * 0.8 + Math.sin(Date.now() * 0.003) * 6);
      rightHandX(hx * 0.6);
      rightHandY(hy * 0.8 + Math.cos(Date.now() * 0.003) * 6);
    };

    const onPointerMove = (e: PointerEvent) => trackPosition(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const finger = e.touches[0];
      if (finger) trackPosition(finger.clientX, finger.clientY);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isTyping, isSuccess]);

  // Natural Blinking Cycle
  useEffect(() => {
    let blinkTimeout: number;

    const doBlink = () => {
      if (isSuccess || mood === "winking") {
        blinkTimeout = window.setTimeout(doBlink, 1600);
        return;
      }

      const tl = gsap.timeline();
      tl.to([leftEyelidRef.current, rightEyelidRef.current], {
        scaleY: 1,
        duration: 0.1,
        ease: "power2.in",
      }).to([leftEyelidRef.current, rightEyelidRef.current], {
        scaleY: 0,
        duration: 0.14,
        ease: "power2.out",
      });

      const nextBlink = Math.random() * 3200 + 2200;
      blinkTimeout = window.setTimeout(doBlink, nextBlink);
    };

    blinkTimeout = window.setTimeout(doBlink, 2000);
    return () => clearTimeout(blinkTimeout);
  }, [isSuccess, mood]);

  // Handle typing state
  useEffect(() => {
    if (isTyping) {
      setStatusText("Reading your email...");
      setMood("curious");
    } else if (isSuccess) {
      setStatusText("Message received! 🎉");
      setMood("happy");
      // Victory dance animation
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -35,
          repeat: 3,
          yoyo: true,
          duration: 0.28,
          ease: "power2.out",
        });
      }
    } else {
      setStatusText(window.matchMedia("(hover: none), (pointer: coarse)").matches ? "Touch or drag me" : "Tracking cursor");
      setMood("idle");
    }
  }, [isTyping, isSuccess]);

  // Interactive click on character
  const handleBotClick = () => {
    setClickCount((c) => c + 1);
    const phrases = [
      "Bzzzt! Hello human! 👋",
      "I love AI, RAG & LLMs! 🧠",
      "Nice to meet you! ✨",
      "Let's build something cool! 🚀",
      "Boing! 💫",
    ];
    setStatusText(phrases[clickCount % phrases.length]);
    setMood("winking");

    // Playful bounce & wink
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setMood("idle"), 1200);
      },
    });

    if (headRef.current) {
      tl.to(headRef.current, {
        scale: 1.14,
        y: -24,
        rotation: 12,
        duration: 0.2,
        ease: "back.out(2)",
      })
        .to(leftEyelidRef.current, { scaleY: 1, duration: 0.12 }, "-=0.1")
        .to(headRef.current, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.4)",
        })
        .to(leftEyelidRef.current, { scaleY: 0, duration: 0.15 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center select-none md:max-w-[360px] xl:max-w-[400px]"
    >
      {/* Floating Status Badge */}
      <div className="pointer-events-none absolute -top-3 z-20 flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 sm:-top-5 sm:px-4">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: theme.accent }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </span>
        <span className="font-display text-[10px] font-semibold tracking-wider text-ink uppercase sm:text-[11px]">
          {statusText}
        </span>
      </div>

      {/* Dynamic Floor Shadow */}
      <div
        ref={shadowRef}
        className="pointer-events-none absolute bottom-4 h-9 w-44 rounded-[100%] bg-black/20 blur-md transition-transform duration-300"
      />

      {/* Interactive Vector 3D Cyber Bot */}
      <svg
        viewBox="0 0 340 340"
        className="relative z-10 h-full w-full cursor-pointer touch-pan-y overflow-visible filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)]"
        onClick={handleBotClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleBotClick();
          }
        }}
        aria-label="Interactive AI Cyber Bot character that follows cursor"
      >
        <defs>
          {/* Body and Visor Gradients */}
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Dynamic Iris Gradient matching Theme Accent */}
          <radialGradient id="dynamicIrisGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor={theme.accent} />
            <stop offset="85%" stopColor={theme.btn} />
            <stop offset="100%" stopColor="#042f2e" />
          </radialGradient>

          {/* Dynamic Eye Ambient Glow */}
          <radialGradient id="dynamicEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="antennaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor={theme.accent} />
          </linearGradient>

          <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          
          <clipPath id="leftEyeClip">
            <rect x="96" y="112" width="56" height="66" rx="28" />
          </clipPath>
          <clipPath id="rightEyeClip">
            <rect x="188" y="112" width="56" height="66" rx="28" />
          </clipPath>
        </defs>

        {/* Ambient floating glow */}
        <circle cx="170" cy="170" r="120" fill="url(#dynamicEyeGlow)" />

        {/* MAIN HEAD & BODY GROUP */}
        <g ref={headRef} className="origin-[170px_180px]">
          {/* Top Antenna */}
          <g>
            <path d="M170 56 L170 82" stroke="url(#antennaGrad)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="170" cy="50" r="11" fill={theme.btn} className="animate-pulse" />
            <circle cx="170" cy="50" r="6" fill="#ffffff" />
          </g>

          {/* Cyber Ears / Side Pods */}
          <g>
            {/* Left Ear */}
            <rect x="42" y="132" width="22" height="48" rx="10" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <circle cx="53" cy="156" r="6" fill={theme.accent} className="animate-pulse" />
            {/* Right Ear */}
            <rect x="276" y="132" width="22" height="48" rx="10" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <circle cx="287" cy="156" r="6" fill={theme.accent} className="animate-pulse" />
          </g>

          {/* Outer Bot Shell (Smooth Ceramic Gloss) */}
          <ellipse cx="170" cy="170" rx="116" ry="110" fill="url(#bodyGrad)" stroke="#ffffff" strokeWidth="4" />

          {/* Top Highlight Bevel */}
          <path
            d="M80 110 C105 75, 235 75, 260 110 C220 90, 120 90, 80 110 Z"
            fill="#ffffff"
            opacity="0.75"
          />

          {/* Visor / Face Screen (Glossy Dark Glass) */}
          <rect
            x="76"
            y="94"
            width="188"
            height="126"
            rx="52"
            fill="url(#visorGrad)"
            stroke="#1e293b"
            strokeWidth="4"
          />

          {/* Visor Glare / Reflection streak */}
          <path
            d="M96 108 C135 100, 205 100, 244 108 C225 116, 115 116, 96 108 Z"
            fill="#ffffff"
            opacity="0.18"
          />

          {/* LEFT EYE ASSEMBLY */}
          <g>
            {/* Eye socket background */}
            <rect x="96" y="112" width="56" height="66" rx="28" fill="#030712" />
            <rect x="96" y="112" width="56" height="66" rx="28" stroke={theme.accent} strokeWidth="1.5" opacity="0.6" />

            {/* Left Pupil / Iris (Dynamic Tracking Cursor) */}
            <g clipPath="url(#leftEyeClip)">
              <g ref={leftPupilRef}>
                {isSuccess ? (
                  // Star / Happy Eye on victory
                  <path
                    d="M124 135 L127 142 L134 145 L127 148 L124 155 L121 148 L114 145 L121 142 Z"
                    fill={theme.accent}
                    transform="scale(1.4) translate(-36, -38)"
                  />
                ) : (
                  <>
                    <circle cx="124" cy="145" r="21" fill="url(#dynamicIrisGrad)" />
                    <circle cx="124" cy="145" r="12" fill="#090d16" />
                    {/* Big Catchlight */}
                    <circle cx="118" cy="138" r="6" fill="#ffffff" />
                    {/* Small Catchlight */}
                    <circle cx="130" cy="151" r="2.8" fill="#ffffff" opacity="0.85" />
                  </>
                )}
              </g>

              {/* Left Eyelid (Blinking) */}
              <path
                ref={leftEyelidRef}
                d="M92 108 H156 V182 H92 Z"
                fill="#1e1b4b"
                className="origin-top"
                style={{ transform: "scaleY(0)" }}
              />
            </g>
          </g>

          {/* RIGHT EYE ASSEMBLY */}
          <g>
            {/* Eye socket background */}
            <rect x="188" y="112" width="56" height="66" rx="28" fill="#030712" />
            <rect x="188" y="112" width="56" height="66" rx="28" stroke={theme.accent} strokeWidth="1.5" opacity="0.6" />

            {/* Right Pupil / Iris (Dynamic Tracking Cursor) */}
            <g clipPath="url(#rightEyeClip)">
              <g ref={rightPupilRef}>
                {isSuccess ? (
                  // Star / Happy Eye on victory
                  <path
                    d="M216 135 L219 142 L226 145 L219 148 L216 155 L213 148 L206 145 L213 142 Z"
                    fill={theme.accent}
                    transform="scale(1.4) translate(-62, -38)"
                  />
                ) : (
                  <>
                    <circle cx="216" cy="145" r="21" fill="url(#dynamicIrisGrad)" />
                    <circle cx="216" cy="145" r="12" fill="#090d16" />
                    {/* Big Catchlight */}
                    <circle cx="210" cy="138" r="6" fill="#ffffff" />
                    {/* Small Catchlight */}
                    <circle cx="222" cy="151" r="2.8" fill="#ffffff" opacity="0.85" />
                  </>
                )}
              </g>

              {/* Right Eyelid (Blinking) */}
              <path
                ref={rightEyelidRef}
                d="M184 108 H248 V182 H184 Z"
                fill="#1e1b4b"
                className="origin-top"
                style={{ transform: "scaleY(0)" }}
              />
            </g>
          </g>

          {/* Cute Rosy Cheeks */}
          <ellipse cx="88" cy="180" rx="9" ry="5" fill="#f43f5e" opacity="0.38" />
          <ellipse cx="252" cy="180" rx="9" ry="5" fill="#f43f5e" opacity="0.38" />

          {/* Digital LED Mouth / Visualizer */}
          {mood === "happy" || isSuccess ? (
            <path
              d="M152 192 Q170 206 188 192"
              fill="none"
              stroke={theme.accent}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ) : isTyping ? (
            <circle cx="170" cy="195" r="5" fill={theme.accent} className="animate-ping" />
          ) : (
            <g>
              <line x1="154" y1="194" x2="162" y2="194" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
              <line x1="166" y1="194" x2="174" y2="194" stroke={theme.accent} strokeWidth="4" strokeLinecap="round" />
              <line x1="178" y1="194" x2="186" y2="194" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {/* Chest Reactor Core / AI Chip Emblem */}
          <g>
            <circle cx="170" cy="242" r="16" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="170" cy="242" r="8" fill={theme.accent} className="animate-pulse" />
            <circle cx="170" cy="242" r="4" fill="#ffffff" />
          </g>
        </g>

        {/* Floating Left Hand Pod */}
        <g ref={leftHandRef} className="origin-[30px_230px]">
          <ellipse cx="32" cy="225" rx="18" ry="14" fill="url(#handGrad)" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="32" cy="225" r="4.5" fill={theme.accent} />
        </g>

        {/* Floating Right Hand Pod */}
        <g ref={rightHandRef} className="origin-[310px_230px]">
          <ellipse cx="308" cy="225" rx="18" ry="14" fill="url(#handGrad)" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="308" cy="225" r="4.5" fill={theme.accent} />
        </g>
      </svg>
    </div>
  );
}
