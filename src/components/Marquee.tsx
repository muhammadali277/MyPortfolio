import { type Theme } from "../lib/themes";

const items = [
  "Python",
  "RAG",
  "LLMs",
  "FastAPI",
  "FAISS",
  "Gemini",
  "Flutter",
  "NLP",
  "LangChain",
  "Supabase",
  "SentenceTransformers",
  "Scikit-learn",
];

type Props = {
  theme: Theme;
};

export default function Marquee({ theme }: Props) {
  const row = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-white/8 py-4 transition-colors duration-700 md:py-5"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="marquee-track flex w-max gap-0">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-5 font-display text-lg font-semibold tracking-tight text-white/35 md:px-6 md:text-xl">
              {item}
            </span>
            <span className="transition-colors duration-500" style={{ color: theme.accent }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
