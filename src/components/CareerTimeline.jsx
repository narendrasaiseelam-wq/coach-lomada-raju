import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import { careerTimeline } from "../data/portfolioData";

const FILTERS = ["All", "Coaching Career", "Track Athlete"];

function renderFormattedText(text) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-[#1C1C21]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

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
              <span className="h-[2px] w-8 bg-[#B45309]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B45309]">
                1999 — Present
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              MY CAREER MILESTONES
            </h2>
          </div>

          {/* Filter Pills + Archive Link */}
          <div className="flex flex-col items-start lg:items-end gap-3 self-start lg:self-auto">
            <a
              href="#archive"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B45309] hover:text-[#1C1C21] transition-colors"
            >
              Explore 1999–2013 Athletics Archive &uarr;
            </a>

            <div className="inline-flex flex-wrap rounded-xl border border-[#1C1C21]/15 bg-[#E2E2E5]/70 p-1.5 shadow-xs">
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
          </div>
        </motion.div>

        {/* Single-Column Vertical Career Timeline with Scroll-Animated Spine */}
        <div className="pt-12 max-w-5xl">
          <div ref={timelineRef} className="relative pl-7 sm:pl-10">
            {/* Background Hairline Spine */}
            <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-[#1C1C21]/12" />
            {/* Animated Championship Crimson Progress Spine */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-[#B45309]"
            />

            <AnimatePresence mode="popLayout">
              <div className="space-y-6">
                {filteredItems.map((item) => (
                  <motion.article
                    key={item.id}
                    id={item.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative scroll-mt-32 rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/55 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Spine Node Marker */}
                    <span className="absolute -left-[27px] sm:-left-[35px] top-7 w-3.5 h-3.5 rounded-full bg-[#EFEFEF] border-2 border-[#B45309]" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        {item.orgLogo ? (
                          <span className="w-8 h-8 rounded-lg bg-white border border-[#1C1C21]/10 p-1 flex items-center justify-center shrink-0">
                            <img
                              src={item.orgLogo}
                              alt={`${item.role} official organization logo`}
                              className="w-full h-full object-contain"
                            />
                          </span>
                        ) : (
                          <span className="w-8 h-8 rounded-lg bg-[#B45309]/10 border border-[#B45309]/30 text-[#B45309] flex items-center justify-center shrink-0">
                            <Award className="w-4 h-4" />
                          </span>
                        )}
                        <span className="font-editorial font-bold text-lg tracking-wider uppercase text-[#B45309]">
                          {item.period}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full border border-[#A67C52]/50 text-[#A67C52] bg-[#EFEFEF]">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="font-editorial font-bold uppercase text-2xl sm:text-3xl text-[#1C1C21] leading-tight mb-2.5">
                          {item.role}
                        </h3>

                        {item.description && (
                          <p className="text-sm text-[#4A4A52] leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {item.bullets && item.bullets.length > 0 && (
                          <ul
                            className={`space-y-1.5 text-sm text-[#4A4A52] leading-relaxed ${
                              item.description ? "mt-2.5" : ""
                            }`}
                          >
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0 mt-2" />
                                <span>{renderFormattedText(bullet)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {item.image && (
                        <div className="w-full sm:w-52 h-40 shrink-0 rounded-xl overflow-hidden border border-[#1C1C21]/12 bg-[#EFEFEF]">
                          <img
                            src={item.image}
                            alt={`Coach Lomada Raju — ${item.role} (${item.period})`}
                            className={`w-full h-full object-cover ${item.imagePosition || "object-top"}`}
                          />
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
