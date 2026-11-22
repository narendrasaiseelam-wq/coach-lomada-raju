import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { galleryItems } from "../data/portfolioData";
import SmartImage from "./SmartImage";

const CATEGORIES = [
  "All Moments",
  "Champions & Podiums",
  "International Tours",
  "Cricket & CCL",
  "Press & Track Archives",
];

const CHAMPION_SUBCATEGORIES = [
  "All Champions",
  "P. V. Sindhu",
  "Manasi Joshi",
  "Thulasimathi & Para-Badminton",
  "Srikanth & Men's Squad",
  "Sikki Reddy & Lakshya Sen",
];

export default function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState("All Moments");
  const [activeSubCategory, setActiveSubCategory] = useState("All Champions");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handleChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const getCategoryCount = (category) => {
    if (category === "All Moments") return galleryItems.length;
    return galleryItems.filter((item) => item.category === category).length;
  };

  const getSubCategoryCount = (sub) => {
    const championItems = galleryItems.filter(
      (item) => item.category === "Champions & Podiums"
    );
    if (sub === "All Champions") return championItems.length;
    return championItems.filter((item) => item.subCategory === sub).length;
  };

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "All Moments") return true;
    if (item.category !== activeCategory) return false;
    if (
      activeCategory === "Champions & Podiums" &&
      activeSubCategory !== "All Champions"
    ) {
      return item.subCategory === activeSubCategory;
    }
    return true;
  });

  const activeItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  const visibleItems =
    isMobile && !showAllMobile && filteredItems.length > 6
      ? filteredItems.slice(0, 6)
      : filteredItems;

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const goNext = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section
      id="gallery"
      className="bg-[#E2E2E5]/60 border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header + Two-Tier Interactive Filter Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pb-8 border-b border-[#1C1C21]/14 space-y-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-8 bg-[#1D4ED8]" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1D4ED8]">
                  Courtside, Stadiums &amp; Press
                </p>
              </div>
              <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
                MY PHOTO MEMORIES &amp; PRESS ARCHIVE
              </h2>
            </div>

            {/* Primary Category Tabs (Horizontal scroll on mobile, wrap on desktop) */}
            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-1 rounded-xl border border-[#1C1C21]/15 bg-[#EFEFEF] p-1.5 max-w-full shadow-xs">
              {CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                const count = getCategoryCount(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveSubCategory("All Champions");
                      setShowAllMobile(false);
                      setLightboxIndex(null);
                    }}
                    className={`relative shrink-0 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected ? "text-[#EFEFEF]" : "text-[#4A4A52] hover:text-[#1C1C21]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="gallery-filter-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-[#1D4ED8]"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{category}</span>
                    <span
                      className={`relative z-10 text-[10px] tabular-nums ${
                        isSelected ? "text-[#EFEFEF]/80" : "text-[#A67C52]"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Sub-Section Pills (Horizontal scroll on mobile, wrap on desktop) */}
          <AnimatePresence>
            {activeCategory === "Champions & Podiums" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pt-2 flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar items-center gap-2">
                  <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A4A52] mr-1">
                    Filter by Champion:
                  </span>
                  {CHAMPION_SUBCATEGORIES.map((sub) => {
                    const isSubSelected = activeSubCategory === sub;
                    const subCount = getSubCategoryCount(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setActiveSubCategory(sub);
                          setShowAllMobile(false);
                          setLightboxIndex(null);
                        }}
                        className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 border ${
                          isSubSelected
                            ? "border-[#1C1C21] text-[#EFEFEF]"
                            : "border-[#1C1C21]/15 bg-[#EFEFEF] text-[#1C1C21] hover:border-[#1C1C21]/40"
                        }`}
                      >
                        {isSubSelected && (
                          <motion.span
                            layoutId="gallery-subfilter-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-[#1C1C21]"
                          />
                        )}
                        <span className="relative z-10 whitespace-nowrap">{sub}</span>
                        <span
                          className={`relative z-10 text-[10px] tabular-nums ${
                            isSubSelected ? "text-[#A67C52]" : "text-[#1D4ED8]"
                          }`}
                        >
                          ({subCount})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Uncropped CSS Columns Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pt-10">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.28,
                  delay: Math.min(idx * 0.03, 0.24),
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setIsZoomed(false);
                  setLightboxIndex(idx);
                }}
                className="break-inside-avoid group rounded-2xl bg-[#EFEFEF] border border-[#1C1C21]/12 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative p-2.5 bg-[#E2E2E5]/55 border-b border-[#1C1C21]/10">
                  <SmartImage
                    src={item.image}
                    alt={`Coach Lomada Raju — ${item.title} (${item.location})`}
                    fit="contain"
                    className="rounded-xl"
                    label={item.subCategory || item.category}
                  />

                  {/* Expand Story & Zoom Pill */}
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#1C1C21]/90 text-[#EFEFEF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Expand className="w-3 h-3 text-[#A67C52]" />
                    <span>Expand Story &amp; Zoom</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#1D4ED8]/10 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                      {item.subCategory || item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#A67C52]">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-editorial font-bold uppercase text-2xl text-[#1C1C21] leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A4A52] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Show All / Show Less Toggle */}
        {isMobile && filteredItems.length > 6 && (
          <div className="pt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllMobile((prev) => !prev)}
              className="w-full sm:w-auto rounded-xl border border-[#1C1C21]/25 bg-[#EFEFEF] hover:bg-[#1C1C21] hover:text-[#EFEFEF] text-[#1C1C21] px-6 py-3.5 text-sm font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
            >
              {showAllMobile
                ? "Show Less"
                : `Show All Photos (${filteredItems.length - 6} more)`}
            </button>
          </div>
        )}
      </div>

      {/* Elevated Full-Screen Lightbox Modal with Editorial Sidebar */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex flex-col bg-[#1C1C21]/95 text-[#EFEFEF] backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 border-b border-[#EFEFEF]/12 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#A67C52] shrink-0 tabular-nums">
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </span>
                <span className="text-[#EFEFEF]/30">&bull;</span>
                <p className="font-editorial font-bold uppercase text-lg sm:text-xl tracking-wide truncate">
                  {activeItem.title}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EFEFEF]/20 hover:border-[#EFEFEF] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  aria-label={isZoomed ? "Zoom out to 1x" : "Zoom in to 2x"}
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4 text-[#A67C52]" />
                      <span className="hidden sm:inline">1x Fit</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4 text-[#A67C52]" />
                      <span className="hidden sm:inline">2x Zoom</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-lg border border-[#EFEFEF]/20 hover:border-[#1D4ED8] hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Stage: High-Res Image + Editorial Sidebar */}
            <div className="relative flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Image Stage */}
              <div className="lg:col-span-8 relative overflow-auto flex items-center justify-center p-4 sm:p-8 bg-[#141418]">
                {filteredItems.length > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="fixed lg:absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1C1C21]/90 border border-[#EFEFEF]/25 hover:border-[#EFEFEF] text-[#EFEFEF] transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`transition-transform duration-300 ${
                    isZoomed ? "cursor-zoom-out max-w-none" : "cursor-zoom-in max-w-full"
                  }`}
                  onClick={() => setIsZoomed((z) => !z)}
                >
                  <img
                    src={activeItem.image}
                    alt={`Coach Lomada Raju — ${activeItem.title} (${activeItem.location})`}
                    className={
                      isZoomed
                        ? "w-[1400px] sm:w-[1800px] max-w-none h-auto mx-auto rounded-lg border border-[#EFEFEF]/20"
                        : "max-h-[65vh] lg:max-h-[78vh] w-auto max-w-full mx-auto object-contain rounded-lg border border-[#EFEFEF]/15"
                    }
                  />
                </motion.div>

                {filteredItems.length > 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="fixed lg:absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1C1C21]/90 border border-[#EFEFEF]/25 hover:border-[#EFEFEF] text-[#EFEFEF] transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Editorial Story Sidebar */}
              <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#EFEFEF]/12 bg-[#1C1C21] p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-y-auto">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1D4ED8] text-[#EFEFEF] text-[10px] font-bold uppercase tracking-[0.16em]">
                      {activeItem.category}
                    </span>
                    {activeItem.subCategory && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#A67C52]/50 text-[#A67C52] text-[10px] font-bold uppercase tracking-[0.14em]">
                        {activeItem.subCategory}
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] leading-none">
                    {activeItem.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#A67C52] pb-4 border-b border-[#EFEFEF]/12">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeItem.location}
                    </span>
                    {activeItem.year && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {activeItem.year}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-[#E2E2E5]/90 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFEFEF]/12 flex items-center justify-between text-[11px] text-[#E2E2E5]/60">
                  <span>Use &larr; / &rarr; keys to browse</span>
                  <span>Esc to close</span>
                </div>
              </aside>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
