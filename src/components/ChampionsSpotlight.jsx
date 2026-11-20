import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronRight, Trophy, Users } from "lucide-react";
import { championsTrained, notableRoster } from "../data/portfolioData";
import SmartImage from "./SmartImage";

export default function ChampionsSpotlight() {
  const [selectedId, setSelectedId] = useState(championsTrained[0].id);

  const activeChampion =
    championsTrained.find((c) => c.id === selectedId) || championsTrained[0];

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
              CHAMPIONS I HAVE WORKED WITH
            </h2>
          </div>
          <p className="text-sm text-[#E2E2E5]/75 max-w-md leading-relaxed">
            Click on any athlete to see their achievements and my personal memory of helping them prepare for major tournaments.
          </p>
        </motion.div>

        {/* Interactive Master-Detail Card with Real Champion Photos */}
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
                  className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center justify-between gap-3 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#EFEFEF]/[0.1] border-[#9E2A2B] shadow-md"
                      : "bg-[#EFEFEF]/[0.02] border-[#EFEFEF]/10 hover:bg-[#EFEFEF]/[0.05] hover:border-[#EFEFEF]/25"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-editorial font-bold text-base text-[#A67C52] tabular-nums pt-0.5">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="font-editorial font-bold uppercase text-xl sm:text-2xl tracking-wide text-[#EFEFEF]">
                          {champion.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border border-[#A67C52]/50 bg-[#A67C52]/10 text-[#A67C52]">
                          <Trophy className="w-2.5 h-2.5" />
                          {champion.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#E2E2E5]/70 line-clamp-1">
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

          {/* Right Detail Panel with Champion Photo + Complete Achievements */}
          <div className="lg:col-span-7 rounded-2xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.04] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChampion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Champion Photograph */}
                <div className="md:col-span-5">
                  <div className="rounded-xl border border-[#EFEFEF]/15 bg-[#1C1C21] p-1.5 overflow-hidden">
                    <SmartImage
                      src={activeChampion.image}
                      alt={`${activeChampion.name} with Coach Lomada Raju`}
                      fit="contain"
                      className="rounded-lg"
                      label={activeChampion.name}
                    />
                  </div>
                </div>

                {/* Champion Story & Complete Achievement Claims */}
                <div className="md:col-span-7">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9E2A2B] text-[#EFEFEF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                      <Trophy className="w-3 h-3" />
                      {activeChampion.badge}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C52] rounded-full border border-[#A67C52]/40 px-3 py-1">
                      {activeChampion.category}
                    </span>
                  </div>

                  <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] tracking-tight leading-none mb-2">
                    {activeChampion.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#A67C52] mb-5 leading-snug">
                    {activeChampion.achievement}
                  </p>

                  <div className="border-l-2 border-[#9E2A2B] pl-4">
                    <p className="text-sm sm:text-base text-[#E2E2E5]/90 leading-relaxed">
                      {activeChampion.story}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Notable Roster Strip */}
        <div className="pt-2">
          <div className="flex items-center gap-2.5 mb-4">
            <Users className="w-4 h-4 text-[#A67C52]" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52]">
              Notable International &amp; National Athletes Conditioned
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
      </div>
    </section>
  );
}
