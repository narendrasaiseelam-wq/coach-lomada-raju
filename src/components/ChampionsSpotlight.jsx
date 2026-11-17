import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronRight, Trophy, Users } from "lucide-react";
import {
  championsTrained,
  notableRoster,
  sportsAndTeams,
} from "../data/portfolioData";

export default function ChampionsSpotlight() {
  const [selectedId, setSelectedId] = useState(championsTrained[0].id);
  const [selectedSport, setSelectedSport] = useState(sportsAndTeams[0].sport);

  const activeChampion =
    championsTrained.find((c) => c.id === selectedId) || championsTrained[0];
  const activeSport =
    sportsAndTeams.find((s) => s.sport === selectedSport) || sportsAndTeams[0];

  return (
    <section
      id="champions"
      className="bg-[#1C1C21] text-[#EFEFEF] border-b border-[#EFEFEF]/10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EFEFEF]/12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#A67C52]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A67C52]">
                Olympic, Paralympic &amp; World Champions
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl tracking-[-0.01em] leading-[0.94] text-[#EFEFEF]">
              CHAMPIONS CONDITIONED
            </h2>
          </div>
          <p className="text-sm text-[#E2E2E5]/75 max-w-md leading-relaxed">
            Select an athlete to read how individualized strength, landing mechanics, and match-durability programming supported their podium journeys.
          </p>
        </motion.div>

        {/* Interactive Master-Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Master List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {championsTrained.map((champion, index) => {
              const isSelected = champion.id === activeChampion.id;
              return (
                <button
                  key={champion.id}
                  type="button"
                  onClick={() => setSelectedId(champion.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between gap-4 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#EFEFEF]/[0.09] border-[#9E2A2B] shadow-md"
                      : "bg-[#EFEFEF]/[0.02] border-[#EFEFEF]/10 hover:bg-[#EFEFEF]/[0.05] hover:border-[#EFEFEF]/25"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="font-editorial font-bold text-lg text-[#A67C52] tabular-nums pt-0.5">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-editorial font-bold uppercase text-2xl tracking-wide text-[#EFEFEF]">
                          {champion.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-[#A67C52]/50 bg-[#A67C52]/10 text-[#A67C52]">
                          <Trophy className="w-2.5 h-2.5" />
                          {champion.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#E2E2E5]/70">
                        {champion.achievement}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "text-[#9E2A2B] translate-x-0.5" : "text-[#E2E2E5]/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.04] p-7 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChampion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B] text-[#EFEFEF] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
                    <Trophy className="w-3.5 h-3.5" />
                    {activeChampion.badge}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67C52] rounded-full border border-[#A67C52]/40 px-3.5 py-1">
                    {activeChampion.category}
                  </span>
                </div>

                <h3 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl text-[#EFEFEF] tracking-tight leading-none mb-2">
                  {activeChampion.name}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-[#A67C52] mb-6">
                  {activeChampion.achievement}
                </p>

                <div className="border-l-2 border-[#9E2A2B] pl-5">
                  <p className="text-base sm:text-lg text-[#E2E2E5]/90 leading-relaxed">
                    {activeChampion.story}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Notable Roster Strip */}
        <div className="pt-2 pb-4 border-b border-[#EFEFEF]/12">
          <div className="flex items-center gap-2.5 mb-4">
            <Users className="w-4 h-4 text-[#A67C52]" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52]">
              Notable Athletes &amp; International Competitors Coached
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {notableRoster.map((athlete) => (
              <span
                key={athlete}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EFEFEF]/15 bg-[#EFEFEF]/[0.04] text-xs sm:text-[13px] font-medium text-[#EFEFEF]"
              >
                <Award className="w-3.5 h-3.5 text-[#A67C52] shrink-0" />
                {athlete}
              </span>
            ))}
          </div>
        </div>

        {/* Sports & Teams — Clean Horizontal Pill Tabs */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52]">
              National Squads, Franchises &amp; Multi-Sport Experience
            </p>
            <div className="flex flex-wrap gap-2">
              {sportsAndTeams.map((item) => {
                const isSelected = item.sport === activeSport.sport;
                return (
                  <button
                    key={item.sport}
                    type="button"
                    onClick={() => setSelectedSport(item.sport)}
                    className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                      isSelected
                        ? "text-[#1C1C21]"
                        : "text-[#E2E2E5]/75 hover:text-[#EFEFEF] border border-[#EFEFEF]/15"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="sport-tab-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#EFEFEF]"
                      />
                    )}
                    <span className="relative z-10">{item.sport}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.04] p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSport.sport}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-5">
                  <h4 className="font-editorial font-bold uppercase text-3xl text-[#EFEFEF] tracking-wide mb-1">
                    {activeSport.sport}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#A67C52]">
                    {activeSport.level}
                  </p>
                </div>
                <div className="md:col-span-7 md:border-l md:border-[#EFEFEF]/12 md:pl-6">
                  <p className="text-sm text-[#E2E2E5]/85 leading-relaxed">
                    {activeSport.events}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
