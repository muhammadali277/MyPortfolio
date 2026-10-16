import { useEffect, useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import { THEMES, type Theme } from "./lib/themes";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const currentTheme: Theme = THEMES[themeIndex];

  const handleNextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  // Sync body and CSS custom variables dynamically with smooth transition
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.bg;
    document.documentElement.style.backgroundColor = currentTheme.bg;
    document.body.style.transition = "background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)";

    // Set root CSS variables for global selection and hover states
    document.documentElement.style.setProperty("--color-accent", currentTheme.accent);
    document.documentElement.style.setProperty("--color-btn", currentTheme.btn);
    document.documentElement.style.setProperty("--color-bg", currentTheme.bg);
    document.documentElement.style.setProperty("--color-hill", currentTheme.hill);
  }, [currentTheme]);

  return (
    <div
      className="relative min-h-screen transition-colors duration-700"
      style={{ backgroundColor: currentTheme.bg }}
    >
      <div className="grain" />
      <Cursor theme={currentTheme} />
      {!loading && <SmoothScroll />}
      {loading && <Loader onDone={() => setLoading(false)} accentColor={currentTheme.accent} />}
      
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        visible={!loading}
        currentTheme={currentTheme}
        onNextTheme={handleNextTheme}
      />

      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentTheme={currentTheme}
      />

      <main>
        <Hero ready={!loading} theme={currentTheme} />
        <Marquee theme={currentTheme} />
        <Experience theme={currentTheme} />
        <Work theme={currentTheme} />
        <Statement theme={currentTheme} />
        <Contact theme={currentTheme} />
      </main>
    </div>
  );
}
