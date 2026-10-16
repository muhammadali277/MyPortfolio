import { useState } from "react";
import Magnetic from "./Magnetic";
import Logo from "./Logo";
import { scrollTo } from "../lib/scroll";
import { type Theme } from "../lib/themes";

type Props = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  visible: boolean;
  currentTheme: Theme;
  onNextTheme: () => void;
};

export default function Header({
  menuOpen,
  setMenuOpen,
  visible,
  currentTheme,
  onNextTheme,
}: Props) {
  const [showToast, setShowToast] = useState(false);

  const handleColorClick = () => {
    onNextTheme();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-5 transition-all duration-700 ease-out md:px-8 md:pt-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto">
        <Logo onClick={() => scrollTo("#top")} accentColor={currentTheme.accent} />
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        {/* Floating Theme Switch Notification */}
        <div
          className={`hidden items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300 sm:flex ${
            showToast ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <span
            className="h-2 w-2 rounded-full transition-colors duration-500"
            style={{ backgroundColor: currentTheme.accent }}
          />
          <span className="font-display tracking-wider text-white uppercase">
            {currentTheme.name}
          </span>
        </div>

        {/* Top Right Corner Background Color Changer Button */}
        <Magnetic strength={0.4}>
          <button
            onClick={handleColorClick}
            aria-label="Change Background Color"
            data-cursor
            title={`Current atmosphere: ${currentTheme.name} (Click to switch)`}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 md:h-[58px] md:w-[58px]"
          >
            <span
              className="absolute inset-1 rounded-full opacity-60 blur-xs transition-colors duration-500"
              style={{ backgroundColor: currentTheme.btn }}
            />
            <span className="relative flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 1 0 18v-18z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </Magnetic>

        {/* Top Right Menu Button */}
        <Magnetic strength={0.45}>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 md:h-[58px] md:w-[58px]"
            style={{ backgroundColor: currentTheme.btn }}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-3.5 w-5 flex-col items-center justify-between">
              <span
                className={`menu-line block h-[2px] rounded-full bg-white ${
                  menuOpen ? "w-5 translate-y-[6px] rotate-45" : "w-5"
                }`}
              />
              <span
                className={`menu-line block h-[2px] rounded-full bg-white ${
                  menuOpen ? "w-0 opacity-0" : "w-3.5"
                }`}
              />
              <span
                className={`menu-line block h-[2px] rounded-full bg-white ${
                  menuOpen ? "w-5 -translate-y-[6px] -rotate-45" : "w-5"
                }`}
              />
            </span>
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
