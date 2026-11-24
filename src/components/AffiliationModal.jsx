import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, Award, X } from "lucide-react";
import { affiliationsData } from "../data/portfolioData";

export default function AffiliationModal({ activeId, onSelectOrg, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0);

  const activeOrg = affiliationsData.find((org) => org.id === activeId) || null;

  useEffect(() => {
    setSlideIdx(0);
  }, [activeId]);

  useEffect(() => {
    if (!activeOrg) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && activeOrg.photos.length > 1) {
        setSlideIdx((prev) => (prev + 1) % activeOrg.photos.length);
      } else if (e.key === "ArrowLeft" && activeOrg.photos.length > 1) {
        setSlideIdx((prev) => (prev - 1 + activeOrg.photos.length) % activeOrg.photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeOrg, onClose]);

  if (!activeOrg) return null;

  const photos = activeOrg.photos || [];
  const safeSlideIdx = slideIdx < photos.length ? slideIdx : 0;
  const currentPhoto = photos[safeSlideIdx];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-[#1C1C21]/85 backdrop-blur-sm overflow-y-auto px-4 py-6 sm:py-10"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={activeOrg.fullName}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="max-w-4xl mx-auto rounded-3xl bg-[#EFEFEF] text-[#1C1C21] border border-[#1C1C21]/15 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar: Back to Home + Quick Switcher */}
          <div className="bg-[#1C1C21] text-[#EFEFEF] px-5 sm:px-8 py-4 border-b border-[#EFEFEF]/12 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-[#EFEFEF]/10 hover:bg-[#B45309] text-[#EFEFEF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close affiliation details"
                className="p-2 rounded-xl border border-[#EFEFEF]/15 hover:border-[#B45309] hover:bg-[#B45309] text-[#EFEFEF] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Switcher Pills for All 7 Organizations */}
            <div className="flex flex-wrap gap-2">
              {affiliationsData.map((org) => {
                const isSelected = org.id === activeOrg.id;
                return (
                  <button
                    key={org.id}
                    type="button"
                    onClick={() => onSelectOrg(org.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#B45309] text-[#EFEFEF]"
                        : "bg-[#EFEFEF]/8 text-[#E2E2E5]/75 hover:bg-[#EFEFEF]/16 hover:text-[#EFEFEF]"
                    }`}
                  >
                    <img
                      src={org.logo}
                      alt=""
                      className="w-4 h-4 object-contain rounded-xs bg-white p-0.5 shrink-0"
                    />
                    <span>{org.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-7">
            {/* 1. Large Logo Badge + Bold Title + Full Form + Role & Years Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-[#1C1C21]/12">
              <div className="w-20 h-20 rounded-2xl bg-white border border-[#1C1C21]/12 p-2.5 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src={activeOrg.logo}
                  alt={activeOrg.fullName}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B45309] text-[#EFEFEF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
                    <Award className="w-3 h-3" />
                    <span>{activeOrg.period}</span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#A67C52]">
                    {activeOrg.roleTitle}
                  </span>
                </div>

                <h2 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-none">
                  {activeOrg.shortName}
                </h2>
                <p className="text-sm font-medium text-[#4A4A52]">
                  {activeOrg.fullName}
                </p>
              </div>
            </div>

            {/* 2. About the Organization Box */}
            <div className="rounded-2xl bg-[#E2E2E5]/70 border border-[#1C1C21]/10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-[#B45309] shrink-0" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B45309]">
                  About the Organization
                </p>
              </div>
              <p className="text-sm text-[#1C1C21]/90 leading-relaxed">
                {activeOrg.aboutOrg}
              </p>
            </div>

            {/* 3. My Work & Experience Section */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="h-[2px] w-6 bg-[#B45309]" />
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B45309]">
                  My Work &amp; Experience
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#1C1C21] leading-relaxed">
                {activeOrg.coachExperience.summary}
              </p>

              <ul className="space-y-2 text-sm text-[#4A4A52] leading-relaxed pt-1">
                {activeOrg.coachExperience.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Large Photo Viewer & Slide Carousel (hidden if photos is empty) */}
            {photos.length > 0 && currentPhoto && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4A4A52]">
                    Official Highlights &amp; Moments
                  </p>
                  {photos.length > 1 && (
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#B45309]">
                      {safeSlideIdx + 1} / {photos.length}
                    </span>
                  )}
                </div>

                <div className="relative rounded-2xl bg-[#1C1C21] overflow-hidden border border-[#1C1C21]/15 shadow-md">
                  <div className="h-[280px] sm:h-[400px] max-h-[420px] w-full flex items-center justify-center p-2">
                    <img
                      src={currentPhoto.src}
                      alt={`Coach Lomada Raju — ${activeOrg.shortName}: ${currentPhoto.caption}`}
                      className="max-h-[420px] w-full h-full object-contain rounded-xl"
                    />
                  </div>

                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSlideIdx((prev) => (prev - 1 + photos.length) % photos.length)
                        }
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1C1C21]/80 hover:bg-[#B45309] text-[#EFEFEF] border border-[#EFEFEF]/20 flex items-center justify-center transition-colors cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlideIdx((prev) => (prev + 1) % photos.length)}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1C1C21]/80 hover:bg-[#B45309] text-[#EFEFEF] border border-[#EFEFEF]/20 flex items-center justify-center transition-colors cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption Bar + Dot Indicators */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#E2E2E5]/60 border border-[#1C1C21]/10 px-4 py-3">
                  <p className="text-xs sm:text-sm text-[#1C1C21]/90 leading-snug">
                    {currentPhoto.caption}
                  </p>

                  {photos.length > 1 && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {photos.map((p, idx) => (
                        <button
                          key={p.src}
                          type="button"
                          onClick={() => setSlideIdx(idx)}
                          aria-label={`View photo ${idx + 1}`}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === safeSlideIdx
                              ? "w-6 bg-[#B45309]"
                              : "w-2 bg-[#1C1C21]/25 hover:bg-[#1C1C21]/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
