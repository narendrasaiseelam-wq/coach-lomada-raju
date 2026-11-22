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
    <div className="flex items-center gap-8 pr-8 shrink-0">
      {ARENAS.map((arena) => (
        <div key={arena} className="flex items-center gap-8 shrink-0">
          <span className="font-editorial font-bold uppercase text-sm sm:text-base tracking-[0.22em] text-[#EFEFEF]/90">
            {arena}
          </span>
          <span className="w-1.5 h-1.5 bg-[#1D4ED8] rotate-45 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function ArenaMarquee() {
  return (
    <div
      className="bg-[#1C1C21] border-b border-[#EFEFEF]/12 py-3.5 overflow-hidden select-none"
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
