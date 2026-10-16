type Props = {
  className?: string;
  onClick?: () => void;
  accentColor?: string;
};

export default function Logo({
  className = "",
  onClick,
  accentColor = "#2de2a8",
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="MUHAMMAD ALI — Home"
      data-cursor
      className={`group relative inline-flex items-center gap-3.5 focus:outline-none ${className}`}
    >
      {/* MA Geometric Monogram Mark */}
      <div className="relative flex h-10 w-12 items-center justify-center transition-transform duration-500 group-hover:scale-105 md:h-12 md:w-14">
        <svg
          viewBox="0 0 68 52"
          className="h-full w-full overflow-visible transition-all duration-500"
          fill="none"
          aria-hidden="true"
        >
          {/* Subtle Ambient Glow filter */}
          <defs>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Letter 'M' path - Left stem, diagonal down to center, diagonal up */}
          <path
            d="M 10 44 L 10 10 L 25 31 L 40 10"
            stroke={accentColor}
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 group-hover:stroke-[5px]"
            style={{
              filter: "drop-shadow(0 0 8px rgba(45,226,168,0.25))",
            }}
          />

          {/* Letter 'A' path - Shares vertex at (40,10), slopes down to (58,44) */}
          <path
            d="M 40 10 L 58 44"
            stroke={accentColor}
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 group-hover:stroke-[5px]"
          />

          {/* Letter 'A' horizontal crossbar */}
          <path
            d="M 31 32 L 50 32"
            stroke={accentColor}
            strokeWidth="4.2"
            strokeLinecap="round"
            className="transition-all duration-500 group-hover:translate-x-0.5"
          />

          {/* Tech Vertex Accent dot at top M/A convergence */}
          <circle
            cx="40"
            cy="10"
            r="3.2"
            fill="#ffffff"
            className="transition-transform duration-500 group-hover:scale-125"
          />
        </svg>
      </div>

      {/* Brand Text Badge */}
      <div className="flex flex-col text-left leading-none">
        <span className="font-display text-[14px] font-extrabold tracking-[0.22em] text-white transition-colors duration-300">
          MA
        </span>
        <span
          className="mt-0.5 font-sans text-[9px] font-semibold tracking-[0.32em] uppercase transition-colors duration-500"
          style={{ color: accentColor }}
        >
          AI ENG
        </span>
      </div>
    </button>
  );
}
