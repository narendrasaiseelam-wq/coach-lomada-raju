import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import {
  educationAndCertifications,
  honorsAndAwards,
} from "../data/portfolioData";

const CREDENTIAL_TABS = [
  { id: "degrees", label: "Academic Degrees", icon: BookOpen },
  { id: "certifications", label: "SAI & NIS Certifications", icon: ShieldCheck },
];

export default function EducationHonors() {
  const [activeTab, setActiveTab] = useState("degrees");

  const degrees = educationAndCertifications.filter((e) => e.category === "Degree");
  const certifications = educationAndCertifications.filter(
    (e) => e.category === "Certification"
  );

  return (
    <section
      id="education"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pb-8 border-b border-[#1C1C21]/14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-[#B45309]" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B45309]">
              Academic Foundation &amp; State Recognition
            </p>
          </div>
          <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
            EDUCATION, CERTIFICATIONS &amp; HONOURS
          </h2>
        </motion.div>

        {/* 2-Column Layout: Degrees & Certifications (Left) | State Honours & Awards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Academic Degrees & SAI/NIS Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Interactive Tabs */}
            <div className="flex flex-wrap gap-2 rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/75 p-1.5 shadow-xs">
              {CREDENTIAL_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 min-w-[180px] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isSelected ? "text-[#EFEFEF]" : "text-[#4A4A52] hover:text-[#1C1C21]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="edu-tab-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-[#1C1C21]"
                      />
                    )}
                    <Icon className="relative z-10 w-3.5 h-3.5 text-[#A67C52]" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Card */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/45 p-2 sm:p-3 shadow-sm">
              <AnimatePresence mode="wait">
                {activeTab === "degrees" && (
                  <motion.div
                    key="degrees"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="divide-y divide-[#1C1C21]/10"
                  >
                    {degrees.map((item) => (
                      <div
                        key={item.degree}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl hover:bg-[#EFEFEF]/60 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-base text-[#1C1C21]">
                            {item.degree}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#4A4A52] mt-0.5">
                            {item.institution}
                          </p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#B45309] shrink-0">
                          {item.year}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "certifications" && (
                  <motion.div
                    key="certifications"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-3 p-2"
                  >
                    {certifications.map((cert) => (
                      <div
                        key={cert.degree}
                        className="rounded-xl border border-[#1C1C21]/12 border-l-4 border-l-[#A67C52] bg-[#EFEFEF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
                      >
                        <div>
                          <h3 className="font-semibold text-base text-[#1C1C21]">
                            {cert.degree}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#4A4A52] mt-0.5">
                            {cert.institution}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-[#1C1C21] text-[#EFEFEF] self-start sm:self-auto shrink-0">
                          {cert.year}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: State Honours & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl bg-[#1C1C21] text-[#EFEFEF] p-6 sm:p-8 shadow-md"
          >
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#EFEFEF]/15">
              <Award className="w-5 h-5 text-[#A67C52]" />
              <h3 className="font-editorial font-bold uppercase text-2xl tracking-wide text-[#EFEFEF]">
                State Honours &amp; Awards
              </h3>
            </div>

            <div className="space-y-5">
              {honorsAndAwards.map((honor) => (
                <div
                  key={honor.title}
                  className="border-l-2 border-[#B45309] pl-4"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67C52] block mb-1">
                    {honor.year}
                  </span>
                  <h4 className="font-semibold text-base text-[#EFEFEF] leading-snug">
                    {honor.title}
                  </h4>
                  <p className="text-xs text-[#E2E2E5]/70 mt-0.5">
                    {honor.venue}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
