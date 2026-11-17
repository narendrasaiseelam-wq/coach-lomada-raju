import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Medal, Trophy } from "lucide-react";
import { careerTimeline, trackRecordMedals } from "../data/portfolioData";

const FILTERS = ["All", "Coaching Career", "Track Athlete"];

export default function CareerTimeline() {
  const [filter, setFilter] = useState("All");
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filteredItems = careerTimeline.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Track Athlete") return item.type === "Competitive Career";
    return item.type !== "Competitive Career";
  });

  return (
    <section
      id="career"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header + Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1C1C21]/14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#9E2A2B]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#9E2A2B]">
                1999 — Present
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              CAREER &amp; TRACK RECORD
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex flex-wrap rounded-xl border border-[#1C1C21]/15 bg-[#E2E2E5]/70 p-1.5 self-start lg:self-auto shadow-xs">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                    isActive ? "text-[#EFEFEF]" : "text-[#4A4A52] hover:text-[#1C1C21]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="career-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#1C1C21]"
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main 2-Column Content: Timeline (Left) + Track Medals Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Left: Vertical Career Timeline with Scroll-Animated Spine */}
          <div ref={timelineRef} className="lg:col-span-7 relative pl-7 sm:pl-10">
            {/* Background Hairline Spine */}
            <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-[#1C1C21]/12" />
            {/* Animated Championship Crimson Progress Spine */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-[#9E2A2B]"
            />

            <AnimatePresence mode="popLayout">
              <div className="space-y-6">
                {filteredItems.map((item) => (
                  <motion.article
                    key={item.period + item.role}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/55 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Spine Node Marker */}
                    <span className="absolute -left-[27px] sm:-left-[35px] top-7 w-3.5 h-3.5 rounded-full bg-[#EFEFEF] border-2 border-[#9E2A2B]" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <span className="font-editorial font-bold text-lg tracking-wider uppercase text-[#9E2A2B]">
                        {item.period}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full border border-[#A67C52]/50 text-[#A67C52] bg-[#EFEFEF]">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="font-editorial font-bold uppercase text-2xl sm:text-3xl text-[#1C1C21] leading-tight mb-3">
                      {item.role}
                    </h3>

                    <p className="text-sm text-[#4A4A52] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Right: Track Record Medal Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl bg-[#1C1C21] text-[#EFEFEF] border border-[#1C1C21] p-6 sm:p-8 shadow-md lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#EFEFEF]/15">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-1">
                  Competitive Athletics (1999–2013)
                </p>
                <h3 className="font-editorial font-extrabold uppercase text-3xl text-[#EFEFEF] leading-none">
                  NATIONAL TRACK MEDALS
                </h3>
              </div>
              <Trophy className="w-7 h-7 text-[#A67C52] shrink-0" />
            </div>

            {/* Record & Medal Totals Callout */}
            <div className="grid grid-cols-2 border-b border-[#EFEFEF]/15 divide-x divide-[#EFEFEF]/15">
              <div className="py-4 pr-4">
                <div className="font-editorial font-extrabold text-3xl sm:text-4xl text-[#EFEFEF] leading-none mb-1">
                  3:16.43
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9E2A2B]">
                  National Meet Record
                </p>
                <p className="text-[11px] text-[#E2E2E5]/65 mt-0.5">
                  4&times;400m Relay • Chennai 2006
                </p>
              </div>
              <div className="py-4 pl-4">
                <div className="font-editorial font-extrabold text-3xl sm:text-4xl text-[#EFEFEF] leading-none mb-1">
                  43 Medals
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A67C52]">
                  14 National &bull; 29 State
                </p>
                <p className="text-[11px] text-[#E2E2E5]/65 mt-0.5">
                  400m &amp; 4&times;400m Relay
                </p>
              </div>
            </div>

            {/* Verified Medal List */}
            <div className="divide-y divide-[#EFEFEF]/12 pt-2">
              {trackRecordMedals.map((row) => (
                <div
                  key={`${row.year}-${row.event}`}
                  className="py-4 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold tracking-[0.14em] text-[#A67C52]">
                        {row.year}
                      </span>
                      <span className="text-[11px] text-[#E2E2E5]/60">&bull;</span>
                      <span className="text-xs font-semibold text-[#EFEFEF]">
                        {row.discipline}
                      </span>
                    </div>
                    <p className="text-xs text-[#E2E2E5]/75 leading-snug">
                      {row.event}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] border ${
                      row.medal === "Gold"
                        ? "border-[#A67C52] text-[#A67C52] bg-[#A67C52]/10"
                        : row.medal === "Silver"
                        ? "border-[#E2E2E5]/40 text-[#E2E2E5]"
                        : "border-[#9E2A2B] text-[#EFEFEF] bg-[#9E2A2B]/30"
                    }`}
                  >
                    <Medal className="w-3 h-3" />
                    {row.medal}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
