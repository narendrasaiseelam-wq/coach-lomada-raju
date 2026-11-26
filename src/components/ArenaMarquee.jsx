import { motion } from "framer-motion";

const ARENAS = [
  "ALL ENGLAND OPEN",
  "SUDIRMAN CUP",
  "THOMAS & UBER CUP",
  "OLYMPIC & PARALYMPIC MEDALLISTS",
  "TELUGU WARRIORS CCL",
  "SAI & NIS PATIALA",
];

function MarqueeTrack() {
  return (
    <div className="flex items-center gap-6 pr-6 shrink-0">
      {ARENAS.map((arena) => (
        <div key={arena} className="flex items-center gap-6 shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/95">
            {arena}
          </span>
          <span className="text-[10px] text-[#F59E0B] shrink-0" aria-hidden="true">
            &#9830;
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ArenaMarquee() {
  return (
    <div
      className="bg-[#1C1C21] text-white border-b border-white/10 py-2 overflow-hidden select-none"
      aria-label="International Arenas and Credentials"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <MarqueeTrack />
        <MarqueeTrack />
      </motion.div>
    </div>
  );
}
