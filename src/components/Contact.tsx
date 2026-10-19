import { FormEvent, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CyberBot from "./CyberBot";
import Magnetic from "./Magnetic";
import { type Theme } from "../lib/themes";

type Props = {
  theme: Theme;
};

export default function Contact({ theme }: Props) {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-col", {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setIsTyping(false);
    gsap.fromTo(".thanks", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden pt-16 transition-colors duration-700 md:pt-24"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Curved Hill Top matching Poppr signature shape */}
      <div
        className="curve-hill pointer-events-none absolute -top-20 left-1/2 h-40 w-[160%] -translate-x-1/2 transition-colors duration-700 md:-top-32 md:h-60"
        style={{ backgroundColor: theme.hill }}
      />

      <div
        className="relative min-h-[85svh] px-5 pt-8 pb-8 transition-colors duration-700 sm:px-8 md:px-12 md:pt-8 md:pb-10 lg:px-16"
        style={{
          backgroundColor: theme.hill,
          color: theme.hillText,
        }}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6 xl:gap-8">
          {/* Left Column: Newsletter & Let's talk */}
          <div className="contact-col order-2 min-w-0 md:order-1 lg:order-1">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.32em] uppercase opacity-75">
              Stay up to date
            </p>
            <h2 className="font-display text-[clamp(2.7rem,10vw,5rem)] leading-[0.9] font-extrabold tracking-[-0.035em] md:text-[5.8vw] lg:text-[3.5vw]">
              let’s
              <br />
              talk
            </h2>

            <form onSubmit={onSubmit} className="mt-8 max-w-sm">
              {sent ? (
                <div className="thanks space-y-1">
                  <p className="font-display text-xl font-bold">You’ll hear from me.</p>
                  <p className="text-xs opacity-75">I reply within 24 hours.</p>
                </div>
              ) : (
                <div className="flex items-end gap-3">
                  <label className="min-w-0 flex-1">
                    <span className="sr-only">Your email</span>
                    <input
                      className="ghost w-full py-2 font-display text-lg placeholder:font-normal md:text-xl"
                      type="email"
                      required
                      placeholder="Your email"
                      value={email}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsTyping(true);
                      }}
                    />
                  </label>
                  <Magnetic strength={0.4}>
                    <button
                      type="submit"
                      aria-label="Send"
                      data-cursor
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-105 md:h-13 md:w-13"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </Magnetic>
                </div>
              )}
            </form>
          </div>

          {/* Center Column: Interactive AI Cyber Bot */}
          <div className="contact-col order-1 min-w-0 md:order-2">
            <CyberBot theme={theme} isTyping={isTyping} isSuccess={sent} />
          </div>

          {/* Right Column: Contact Details */}
          <div className="contact-col order-3 min-w-0 md:col-span-2 lg:col-span-1 lg:pl-4">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.32em] uppercase opacity-75">
              Get in touch
            </p>
            <a
              href="mailto:muhammadbintariq277@gmail.com"
              className="group relative block max-w-full break-all font-display text-[clamp(1rem,5.3vw,1.75rem)] leading-[1.2] font-semibold tracking-[-0.025em] md:text-[clamp(1.1rem,2.6vw,1.8rem)] lg:text-[clamp(1rem,1.65vw,1.8rem)]"
            >
              muhammadbintariq277
              <br />
              @gmail.com
              <span className="underline-grow absolute bottom-0 left-0 h-px w-full" />
            </a>
            <a
              href="tel:+923113760980"
              className="mt-2.5 block font-display text-[clamp(1.2rem,5.5vw,2rem)] leading-[1.2] font-semibold tracking-[-0.025em] md:text-[2.6vw] lg:text-[clamp(1.05rem,1.8vw,2rem)]"
            >
              +92 311 376 0980
            </a>
            <p className="mt-5 text-sm leading-relaxed opacity-85 md:text-base">
              Karachi, Pakistan
              <br />
              AI Engineer · JS Bank
            </p>
          </div>
        </div>

        {/* Footer info row */}
        <footer className="mt-14 border-t border-current/15 pt-6 md:mt-18">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium tracking-[0.18em] uppercase opacity-85">
              <span>JS Bank</span>
              <span>Cerisma</span>
              <span>FAST-NUCES</span>
              <span className="opacity-60">BS Artificial Intelligence</span>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/muhammadali277"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                data-cursor
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/muhammad-ali-040883283/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                data-cursor
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
              <a
                href="mailto:muhammadbintariq277@gmail.com"
                aria-label="Email Muhammad Ali"
                data-cursor
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a
                href="tel:+923113760980"
                aria-label="Call Muhammad Ali"
                data-cursor
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform hover:scale-110"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.3 2.6 3.5 4.8 6.1 6.1l2-2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2z" />
                </svg>
              </a>
            </div>

            <p className="text-left text-[11px] font-medium tracking-[0.22em] uppercase opacity-75 lg:text-right">
              Karachi · Pakistan
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
