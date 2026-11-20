import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, HelpCircle, Trophy } from "lucide-react";
import { coachingFaqs, sportsAndTeams, trainingPillars } from "../data/portfolioData";

export default function CoachingInteractive({ onOpenConnect }) {
  const [activePillar, setActivePillar] = useState(trainingPillars[0].number);
  const [selectedSport, setSelectedSport] = useState(sportsAndTeams[0].sport);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const activeSport =
    sportsAndTeams.find((s) => s.sport === selectedSport) || sportsAndTeams[0];

  return (
    <section
      id="coaching"
      className="bg-[#E2E2E5]/60 border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        {/* 1. Section Header + 5 Core Conditioning Pillars */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-8 bg-[#9E2A2B]" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#9E2A2B]">
                  My Coaching Method
                </p>
              </div>
              <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
                HOW I TRAIN &amp; MY SPECIALISATIONS
              </h2>
            </div>
            <p className="text-sm text-[#4A4A52] max-w-md leading-relaxed">
              How I build an athlete step by step—starting with joint stability and base strength before adding speed, and using Yoga science to prevent injuries.
            </p>
          </motion.div>

          {/* 5 Core Conditioning Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trainingPillars.map((pillar, idx) => {
              const isExpanded = activePillar === pillar.number;
              return (
                <motion.button
                  key={pillar.number}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setActivePillar(pillar.number)}
                  onMouseEnter={() => setActivePillar(pillar.number)}
                  className={`text-left p-5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
                    isExpanded
                      ? "bg-[#1C1C21] text-[#EFEFEF] border-[#1C1C21] shadow-md -translate-y-0.5"
                      : "bg-[#EFEFEF] text-[#1C1C21] border-[#1C1C21]/10 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-editorial font-extrabold text-3xl leading-none ${
                          isExpanded ? "text-[#9E2A2B]" : "text-[#A67C52]"
                        }`}
                      >
                        {pillar.number}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded
                            ? "rotate-180 text-[#A67C52]"
                            : "text-[#4A4A52]/50"
                        }`}
                      />
                    </div>

                    <h3 className="font-editorial font-bold uppercase text-2xl tracking-wide mb-1">
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-[11px] font-bold uppercase tracking-[0.12em] mb-3 ${
                        isExpanded ? "text-[#A67C52]" : "text-[#9E2A2B]"
                      }`}
                    >
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isExpanded ? "text-[#E2E2E5]/85" : "text-[#4A4A52]"
                    }`}
                  >
                    {pillar.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 2. Sports Specialisations (Badminton, Cricket, Athletics, Kabaddi, Basketball, Tennis) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl bg-[#1C1C21] text-[#EFEFEF] p-6 sm:p-10 shadow-md"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EFEFEF]/12">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Trophy className="w-4 h-4 text-[#A67C52]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A67C52]">
                  Multi-Sport Pedigree
                </p>
              </div>
              <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] leading-none">
                SPORTS SPECIALISATIONS &amp; SQUADS
              </h3>
            </div>

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
                        layoutId="coaching-sport-pill"
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

          <div className="pt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSport.sport}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-5">
                  <h4 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] tracking-wide mb-1.5">
                    {activeSport.sport}
                  </h4>
                  <p className="text-sm font-semibold text-[#A67C52]">
                    {activeSport.level}
                  </p>
                </div>

                <div className="lg:col-span-5 lg:border-l lg:border-[#EFEFEF]/12 lg:pl-6">
                  <p className="text-sm text-[#E2E2E5]/85 leading-relaxed">
                    {activeSport.events}
                  </p>
                </div>

                <div className="lg:col-span-2 flex lg:justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenConnect("team")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  >
                    <span>Consult</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 3. Relevant Questions About Coaching Programmes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-2">
              <HelpCircle className="w-4 h-4 text-[#9E2A2B]" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9E2A2B]">
                Programme Clarity
              </p>
            </div>
            <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-none mb-3">
              RELEVANT QUESTIONS ABOUT COACHING PROGRAMMES
            </h3>
            <p className="text-sm text-[#4A4A52] leading-relaxed">
              Clear answers for competitive athletes, parents, and sports teams preparing for upcoming seasons.
            </p>
          </div>

          <div className="lg:col-span-8 rounded-2xl border border-[#1C1C21]/12 bg-[#EFEFEF] divide-y divide-[#1C1C21]/10 shadow-sm overflow-hidden">
            {coachingFaqs.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:px-6 flex items-center justify-between gap-4 hover:bg-[#E2E2E5]/50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#1C1C21]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#9E2A2B] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-0 text-sm text-[#4A4A52] leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
