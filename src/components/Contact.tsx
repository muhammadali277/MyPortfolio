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
