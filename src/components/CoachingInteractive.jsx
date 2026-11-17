import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Target,
} from "lucide-react";
import {
  coachProfile,
  coachingPathways,
  scientificRoadmap,
  trainingPillars,
} from "../data/portfolioData";

export default function CoachingInteractive() {
  const [selectedPathwayId, setSelectedPathwayId] = useState(coachingPathways[0].id);
  const [activePillar, setActivePillar] = useState(trainingPillars[0].number);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activePathway =
    coachingPathways.find((p) => p.id === selectedPathwayId) || coachingPathways[0];
  const currentStep = scientificRoadmap[activeStepIdx];

  const handleStartWhatsApp = (promptText) => {
    const url = `https://wa.me/${coachProfile.whatsappNumber}?text=${encodeURIComponent(
      promptText
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="coaching"
      className="bg-[#E2E2E5]/60 border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        {/* 1. Interactive Audience Matcher */}
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
                  Talk to Coach &amp; Find Your Program
                </p>
              </div>
              <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
                WHO COACH RAJU TRAINS
              </h2>
            </div>
            <p className="text-sm text-[#4A4A52] max-w-md leading-relaxed">
              Select your profile below to see how training is tailored to your body, schedule, and performance goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Audience Selector */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {coachingPathways.map((pathway, idx) => {
                const isSelected = pathway.id === activePathway.id;
                return (
                  <button
                    key={pathway.id}
                    type="button"
                    onClick={() => setSelectedPathwayId(pathway.id)}
                    className={`w-full text-left p-5 rounded-2xl flex items-center justify-between gap-4 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1C1C21] text-[#EFEFEF] border-[#1C1C21] shadow-md"
                        : "bg-[#EFEFEF] text-[#1C1C21] border-[#1C1C21]/10 shadow-xs hover:shadow-sm hover:border-[#1C1C21]/25"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] block mb-1 ${
                          isSelected ? "text-[#A67C52]" : "text-[#9E2A2B]"
                        }`}
                      >
                        0{idx + 1} &bull; {pathway.badge}
                      </span>
                      <h3 className="font-editorial font-bold uppercase text-2xl tracking-wide">
                        {pathway.audience}
                      </h3>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? "text-[#A67C52] translate-x-0.5" : "text-[#4A4A52]/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Pathway Details */}
            <div className="lg:col-span-7 rounded-2xl border border-[#1C1C21]/12 bg-[#EFEFEF] p-7 sm:p-10 lg:p-12 shadow-sm flex flex-col justify-between min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePathway.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="flex flex-col h-full justify-between gap-8"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#A67C52]/50 bg-[#A67C52]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67C52] mb-4">
                      <Target className="w-3.5 h-3.5 text-[#9E2A2B]" />
                      {activePathway.badge}
                    </div>
                    <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-[0.98] mb-4">
                      {activePathway.headline}
                    </h3>
                    <p className="text-base text-[#4A4A52] leading-relaxed">
                      {activePathway.details}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1C1C21]/10 flex flex-wrap items-center justify-between gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartWhatsApp(activePathway.whatsappPrompt)}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start This Program on WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                    <span className="text-xs text-[#4A4A52] font-medium">
                      Baseline assessment included before programming
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 2. The 5 Training Pillars — Sleek Interactive Pill-Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-7"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E2A2B] mb-2">
              Performance Architecture
            </p>
            <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-none">
              THE 5 TRAINING PILLARS
            </h3>
          </motion.div>

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

                    <h4 className="font-editorial font-bold uppercase text-2xl tracking-wide mb-1">
                      {pillar.title}
                    </h4>
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

        {/* 3. Interactive 9-Step Scientific Roadmap */}
        <div className="rounded-2xl bg-[#1C1C21] text-[#EFEFEF] border border-[#1C1C21] p-6 sm:p-10 shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EFEFEF]/12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A67C52] mb-2">
                Methodology
              </p>
              <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] leading-none">
                9-STEP SCIENTIFIC ROADMAP
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeStepIdx === 0}
                className="p-2 rounded-lg border border-[#EFEFEF]/20 hover:border-[#EFEFEF] disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold tracking-[0.16em] uppercase px-2 tabular-nums text-[#A67C52]">
                Step {currentStep.step} / 09
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveStepIdx((prev) => Math.min(scientificRoadmap.length - 1, prev + 1))
                }
                disabled={activeStepIdx === scientificRoadmap.length - 1}
                className="p-2 rounded-lg border border-[#EFEFEF]/20 hover:border-[#EFEFEF] disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Next step"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Step Pills + Progress Bar */}
          <div className="py-6 border-b border-[#EFEFEF]/12">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-4">
              {scientificRoadmap.map((item, idx) => {
                const isCurrent = idx === activeStepIdx;
                const isPast = idx < activeStepIdx;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    className={`px-3 py-2.5 rounded-xl text-left border transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-[#9E2A2B] border-[#9E2A2B] text-[#EFEFEF]"
                        : isPast
                        ? "bg-[#EFEFEF]/[0.08] border-[#A67C52]/50 text-[#EFEFEF]"
                        : "bg-transparent border-[#EFEFEF]/15 text-[#E2E2E5]/65 hover:border-[#EFEFEF]/40"
                    }`}
                  >
                    <span className="block text-[10px] font-bold tracking-[0.14em] opacity-80">
                      {item.step}
                    </span>
                    <span className="font-editorial font-bold uppercase text-lg tracking-wide leading-none">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Animated Progress Bar */}
            <div className="h-[3px] w-full rounded-full bg-[#EFEFEF]/15 overflow-hidden">
              <motion.div
                className="h-full bg-[#9E2A2B] rounded-full"
                initial={false}
                animate={{
                  width: `${((activeStepIdx + 1) / scientificRoadmap.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Active Step Detail */}
          <div className="pt-8 min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-1">
                    Phase {currentStep.step} &bull; {currentStep.name}
                  </p>
                  <h4 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] leading-none">
                    {currentStep.headline}
                  </h4>
                </div>
                <div className="md:col-span-7 space-y-3">
                  {currentStep.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#9E2A2B] shrink-0 mt-1" />
                      <p className="text-sm sm:text-base text-[#E2E2E5]/90 leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
