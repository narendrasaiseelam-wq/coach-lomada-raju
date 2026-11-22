import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { personalisedGuidanceData } from "../data/portfolioData";

const AUDIENCE_ICONS = {
  shield: Shield,
  landmark: Landmark,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  graduation: GraduationCap,
  heart: HeartHandshake,
};

export default function PersonalisedGuidance({ onOpenConnect }) {
  const { eyebrow, heading, lead, steps, audiences } = personalisedGuidanceData;

  return (
    <section
      id="personalised-guidance"
      className="bg-[#F5F4F0] border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* 1. Header & First-Person Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#1D4ED8]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
                {eyebrow}
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.95] tracking-[-0.01em]">
              {heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#4A4A52] leading-relaxed border-l-2 border-[#A67C52]/60 pl-5">
              {lead}
            </p>
          </div>
        </motion.div>

        {/* 2. 3-Step Observe -> Diagnose -> Custom Pattern Strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl bg-[#1C1C21] text-[#EFEFEF] p-6 sm:p-8 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-[#EFEFEF]/15">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className={
                  idx === 0
                    ? "md:pr-6"
                    : idx === 1
                    ? "md:px-6"
                    : "md:pl-6"
                }
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52]">
                    {item.step}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#EFEFEF]/35 hidden md:block" />
                  )}
                </div>
                <p className="text-sm text-[#E2E2E5]/85 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. Six-Card "Who I Guide & Heal" Grid */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A4A52]">
              Who I Guide &amp; Heal
            </p>
            <span className="h-[1px] flex-1 bg-[#1C1C21]/12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map((audience, idx) => {
              const Icon = AUDIENCE_ICONS[audience.iconKey] || Shield;
              return (
                <motion.article
                  key={audience.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
                  className="rounded-2xl bg-[#EFEFEF] border border-[#1C1C21]/12 p-6 flex flex-col justify-between gap-5 hover:border-[#1D4ED8]/40 hover:shadow-sm transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="w-10 h-10 rounded-xl bg-[#1D4ED8]/10 border border-[#1D4ED8]/25 text-[#1D4ED8] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#A67C52]/45 text-[#8A6238] bg-[#F5F4F0]">
                        {audience.focusTag}
                      </span>
                    </div>

                    <h3 className="font-editorial font-extrabold uppercase text-2xl text-[#1C1C21] leading-tight mb-2">
                      {audience.title}
                    </h3>

                    <p className="text-sm text-[#4A4A52] leading-relaxed">
                      {audience.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1C1C21]/10">
                    <button
                      type="button"
                      onClick={() => onOpenConnect("general")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1D4ED8] hover:text-[#1E40AF] transition-colors cursor-pointer"
                    >
                      <span>Book Personal Assessment</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
