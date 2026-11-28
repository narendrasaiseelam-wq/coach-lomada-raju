import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Trophy } from "lucide-react";
import { nationalAchievements, stateAchievements } from "../data/portfolioData";

const SLIDES = [
  {
    id: "national",
    slideLabel: "Slide 01",
    title: "INTERNATIONAL & NATIONAL ACHIEVEMENTS (2003 – 2011)",
    subtitle: "Official International, National, Federation Cup & All-India University Records",
    rows: nationalAchievements,
    hasPerformance: true,
  },
  {
    id: "state",
    slideLabel: "Slide 02",
    title: "STATE & UNIVERSITY ACHIEVEMENTS (2004 – 2011)",
    subtitle: "Official State Championships, Osmania University & Nagpur University Records",
    rows: stateAchievements,
    hasPerformance: false,
  },
];

const MEDAL_FILTERS = [
  { id: "all", label: "All" },
  { id: "gold", label: "Gold & Records" },
  { id: "silver", label: "Silver" },
  { id: "bronze", label: "Bronze" },
];

const MEDAL_PALETTES = {
  gold: {
    rimStart: "#FFF3B0",
    rimMid: "#F59E0B",
    rimEnd: "#B45309",
    faceStart: "#FEF08A",
    faceMid: "#EAB308",
    faceEnd: "#A16207",
    ribbonLeft: "#991B1B",
    ribbonRight: "#1E3A8A",
    starFill: "#FFFBEB",
  },
  record: {
    rimStart: "#FFF3B0",
    rimMid: "#F59E0B",
    rimEnd: "#B45309",
    faceStart: "#FEF08A",
    faceMid: "#EAB308",
    faceEnd: "#A16207",
    ribbonLeft: "#B45309",
    ribbonRight: "#1C1C21",
    starFill: "#FFFBEB",
  },
  silver: {
    rimStart: "#FFFFFF",
    rimMid: "#CBD5E1",
    rimEnd: "#64748B",
    faceStart: "#F8FAFC",
    faceMid: "#94A3B8",
    faceEnd: "#475569",
    ribbonLeft: "#1E3A8A",
    ribbonRight: "#334155",
    starFill: "#FFFFFF",
  },
  bronze: {
    rimStart: "#FED7AA",
    rimMid: "#D97706",
    rimEnd: "#78350F",
    faceStart: "#FDBA74",
    faceMid: "#B45309",
    faceEnd: "#6B2D0C",
    ribbonLeft: "#78350F",
    ribbonRight: "#1C1C21",
    starFill: "#FFF7ED",
  },
};

function MetallicMedalSvg({ type }) {
  if (type === "participation") {
    return (
      <span className="w-6 h-6 rounded-full bg-[#E2E2E5] border border-[#1C1C21]/15 flex items-center justify-center shrink-0">
        <Award className="w-3.5 h-3.5 text-[#4A4A52]" />
      </span>
    );
  }

  const p = MEDAL_PALETTES[type] || MEDAL_PALETTES.gold;
  const gradRim = `medal-rim-${type}`;
  const gradFace = `medal-face-${type}`;

  return (
    <svg
      viewBox="0 0 36 42"
      className="w-7 h-8 shrink-0 drop-shadow-xs"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradRim} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.rimStart} />
          <stop offset="50%" stopColor={p.rimMid} />
          <stop offset="100%" stopColor={p.rimEnd} />
        </linearGradient>
        <radialGradient id={gradFace} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={p.faceStart} />
          <stop offset="55%" stopColor={p.faceMid} />
          <stop offset="100%" stopColor={p.faceEnd} />
        </radialGradient>
      </defs>

      {/* Ribbon Drape */}
      <polygon points="9,0 16,0 18,14 13,14" fill={p.ribbonLeft} />
      <polygon points="27,0 20,0 18,14 23,14" fill={p.ribbonRight} />
      <rect x="14" y="12.5" width="8" height="2.5" rx="1" fill={`url(#${gradRim})`} />

      {/* Outer Metallic Rim */}
      <circle cx="18" cy="27" r="12.5" fill={`url(#${gradRim})`} />
      {/* Inner Laurel / Embossed Face */}
      <circle
        cx="18"
        cy="27"
        r="9.8"
        fill={`url(#${gradFace})`}
        stroke={p.rimStart}
        strokeWidth="0.7"
        strokeOpacity="0.65"
      />
      {/* Specular Sheen */}
      <path
        d="M11 21 A9 9 0 0 1 24 20"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Embossed Star */}
      <polygon
        points="18,21.2 19.6,24.6 23.4,25.1 20.6,27.8 21.3,31.5 18,29.7 14.7,31.5 15.4,27.8 12.6,25.1 16.4,24.6"
        fill={p.starFill}
        fillOpacity="0.92"
      />
    </svg>
  );
}

function MedalBadge({ medal }) {
  const isRecord = medal.type === "record";
  const isParticipation = medal.type === "participation";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 border text-xs font-semibold ${
        isRecord
          ? "bg-[#B45309]/10 border-[#B45309]/45 text-[#1C1C21]"
          : isParticipation
          ? "bg-[#EFEFEF] border-[#1C1C21]/12 text-[#4A4A52]"
          : "bg-white border-[#1C1C21]/12 text-[#1C1C21]"
      }`}
    >
      <MetallicMedalSvg type={medal.type} />
      <div className="flex flex-col leading-tight">
        <span>{medal.label}</span>
        {isRecord && (
          <span className="mt-0.5 inline-block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#B45309]">
            NEW MEET RECORD / HONOUR
          </span>
        )}
      </div>
    </div>
  );
}

export default function TrackAchievementsTable() {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [medalFilter, setMedalFilter] = useState("all");

  const activeSlide = SLIDES[activeSlideIdx];

  const handleSlideChange = (idx) => {
    setActiveSlideIdx(idx);
    setMedalFilter("all");
  };

  const filteredRows = activeSlide.rows.filter((row) => {
    if (medalFilter === "all") return true;
    if (medalFilter === "gold") {
      return row.medals.some((m) => m.type === "gold" || m.type === "record");
    }
    return row.medals.some((m) => m.type === medalFilter);
  });

  return (
    <section
      id="archive"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Section Header + 2-Slide Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#B45309]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B45309]">
                13+ Years Competitive Track Record (1999 – 2013)
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              OFFICIAL ATHLETICS ARCHIVE
            </h2>
          </div>

          {/* Previous / Next Slide Controls */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={() =>
                handleSlideChange((activeSlideIdx - 1 + SLIDES.length) % SLIDES.length)
              }
              aria-label="Previous achievements slide"
              className="w-10 h-10 rounded-xl border border-[#1C1C21]/18 bg-white hover:border-[#B45309] hover:text-[#B45309] text-[#1C1C21] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#4A4A52] px-2">
              Slide {activeSlideIdx + 1} of {SLIDES.length}
            </span>
            <button
              type="button"
              onClick={() => handleSlideChange((activeSlideIdx + 1) % SLIDES.length)}
              aria-label="Next achievements slide"
              className="w-10 h-10 rounded-xl border border-[#1C1C21]/18 bg-white hover:border-[#B45309] hover:text-[#B45309] text-[#1C1C21] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Top Slide Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SLIDES.map((slide, idx) => {
            const isSelected = idx === activeSlideIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSlideChange(idx)}
                className={`text-left rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1C1C21] text-[#EFEFEF] border-[#1C1C21] shadow-md"
                    : "bg-white text-[#1C1C21] border-[#1C1C21]/12 hover:border-[#B45309]"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                      isSelected ? "text-[#F59E0B]" : "text-[#B45309]"
                    }`}
                  >
                    {slide.slideLabel} &bull; {slide.rows.length} Official Entries
                  </span>
                  <Trophy
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#F59E0B]" : "text-[#4A4A52]/60"
                    }`}
                  />
                </div>
                <p className="font-editorial font-bold uppercase text-lg sm:text-xl leading-tight">
                  {slide.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Medal Filter Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#4A4A52]">{activeSlide.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {MEDAL_FILTERS.map((filter) => {
              const isActive = medalFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setMedalFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] border transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#B45309] text-[#EFEFEF] border-[#B45309]"
                      : "bg-white text-[#1C1C21] border-[#1C1C21]/15 hover:border-[#B45309]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Official Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSlide.id}-${medalFilter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-[#1C1C21]/15 bg-white shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto max-h-[560px] overflow-y-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead className="sticky top-0 z-10 bg-[#1C1C21] text-[#EFEFEF] text-[11px] font-bold uppercase tracking-[0.14em]">
                  <tr>
                    <th className="py-3.5 px-4 w-14">S.No</th>
                    <th className="py-3.5 px-4">Competition</th>
                    <th className="py-3.5 px-4 w-24">Year</th>
                    <th className="py-3.5 px-4">Event</th>
                    {activeSlide.hasPerformance && (
                      <th className="py-3.5 px-4">Performance</th>
                    )}
                    <th className="py-3.5 px-4">Position / Medal</th>
                    <th className="py-3.5 px-4">Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1C21]/10 text-sm">
                  {filteredRows.map((row, idx) => (
                    <tr
                      key={`${activeSlide.id}-${row.sno}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#F5F4F0]"}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#B45309] align-top">
                        {String(row.sno).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1C1C21] align-top">
                        {row.competition}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#4A4A52] whitespace-nowrap align-top">
                        {row.year}
                      </td>
                      <td className="py-3.5 px-4 text-[#1C1C21] align-top">
                        {row.event}
                      </td>
                      {activeSlide.hasPerformance && (
                        <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#1C1C21] whitespace-nowrap align-top">
                          {row.performance}
                        </td>
                      )}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {row.medals.map((medal, mIdx) => (
                            <MedalBadge key={mIdx} medal={medal} />
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#4A4A52] align-top">
                        {row.venue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer Bar */}
            <div className="bg-[#1C1C21] text-[#EFEFEF] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold uppercase tracking-[0.14em] text-[#F59E0B]">
                98 Total Track Medals &bull; 14 National &bull; 29 State &bull; 55 University &amp; District
              </span>
              <span className="text-[#E2E2E5]/75">
                Showing {filteredRows.length} of {activeSlide.rows.length} official entries
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
