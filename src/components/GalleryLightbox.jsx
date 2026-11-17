import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
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
  "All",
  "International Badminton",
  "Cricket & CCL",
  "Track & Press",
];

export default function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const activeItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

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
        {/* Header + Animated Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#1C1C21]/14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#9E2A2B]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#9E2A2B]">
                Courtside, Stadiums &amp; Press
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              VISUAL &amp; PRESS ARCHIVE
            </h2>
          </div>

          <div className="inline-flex flex-wrap gap-1 rounded-xl border border-[#1C1C21]/15 bg-[#EFEFEF] p-1.5 self-start lg:self-auto shadow-xs">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                    isSelected ? "text-[#EFEFEF]" : "text-[#4A4A52] hover:text-[#1C1C21]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#9E2A2B]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* True CSS Columns Masonry Layout (Natural Aspect Ratios, Zero Head Cropping) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pt-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
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
                    alt={item.title}
                    fit="contain"
                    className="rounded-xl"
                    label={item.category}
                  />
                  {/* Expand Icon Overlay */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#1C1C21]/85 text-[#EFEFEF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Expand className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9E2A2B]">
                      {item.category}
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
                    {item.caption}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
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
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#A67C52] shrink-0">
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
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#EFEFEF]/20 hover:border-[#EFEFEF] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-4 h-4 text-[#A67C52]" />
                      <span className="hidden sm:inline">Fit</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-4 h-4 text-[#A67C52]" />
                      <span className="hidden sm:inline">Zoom</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 border border-[#EFEFEF]/20 hover:border-[#9E2A2B] hover:bg-[#9E2A2B] transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8">
              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#1C1C21]/85 border border-[#EFEFEF]/25 hover:border-[#EFEFEF] text-[#EFEFEF] transition-colors cursor-pointer"
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
                  isZoomed ? "cursor-zoom-out max-w-none" : "cursor-zoom-in max-w-4xl w-full"
                }`}
                onClick={() => setIsZoomed((z) => !z)}
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className={
                    isZoomed
                      ? "w-[1300px] sm:w-[1600px] max-w-none h-auto mx-auto border border-[#EFEFEF]/20"
                      : "max-h-[70vh] w-auto max-w-full mx-auto object-contain border border-[#EFEFEF]/15"
                  }
                />
              </motion.div>

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#1C1C21]/85 border border-[#EFEFEF]/25 hover:border-[#EFEFEF] text-[#EFEFEF] transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-4 sm:px-8 py-4 border-t border-[#EFEFEF]/12 bg-[#1C1C21] shrink-0">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-sm text-[#E2E2E5]/90">{activeItem.caption}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#A67C52] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                  {activeItem.location}
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
