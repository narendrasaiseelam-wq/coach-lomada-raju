import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { coachProfile } from "../data/portfolioData";

const CURRENT_YEAR = new Date().getFullYear();

const QUICK_LINKS = [
  { id: "home", label: "Home" },
  { id: "champions", label: "Champions" },
  { id: "about", label: "About" },
  { id: "coaching", label: "Coaching" },
  { id: "career", label: "Career" },
  { id: "gallery", label: "Gallery" },
  { id: "education", label: "Education" },
];

export default function FooterConnect({ onOpenConnect }) {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-[#1C1C21] text-[#EFEFEF] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Closing High-Conversion CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-[#EFEFEF]/15 bg-[#EFEFEF]/[0.04] p-8 sm:p-12 mb-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-8 bg-[#9E2A2B]" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A67C52]">
                  {coachProfile.centreName}
                </p>
              </div>
              <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#EFEFEF] leading-[0.94] tracking-[-0.01em] mb-3">
                Ready to Train With Purpose? Let&apos;s Talk.
              </h2>
              <p className="text-sm sm:text-base text-[#E2E2E5]/75 leading-relaxed">
                In-person conditioning at Hyderabad or structured online coaching worldwide—every program begins with a conversation and a baseline assessment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenConnect()}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <a
                href={`tel:${coachProfile.phonePrimary}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EFEFEF]/25 hover:border-[#EFEFEF] text-[#EFEFEF] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#A67C52]" />
                <span>Call {coachProfile.phonePrimary}</span>
              </a>
            </div>
          </motion.div>

          {/* Footer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EFEFEF]/12">
            {/* Brand & Motto */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 bg-[#9E2A2B] text-[#EFEFEF] font-editorial font-extrabold text-lg tracking-wider flex items-center justify-center">
                  {coachProfile.monogram}
                </span>
                <div>
                  <p className="font-editorial font-bold uppercase text-2xl tracking-wider leading-none text-[#EFEFEF]">
                    {coachProfile.fullName}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A67C52]">
                    {coachProfile.centreMotto}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#E2E2E5]/70 leading-relaxed max-w-sm">
                {coachProfile.title}. Building resilient athletes, squads, students, and leaders since 2010.
              </p>
            </div>

            {/* Location & Direct Phones */}
            <div className="md:col-span-4 space-y-3 text-sm text-[#E2E2E5]/80">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-2">
                Training Centre &amp; Contact
              </p>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9E2A2B] shrink-0 mt-0.5" />
                <span>{coachProfile.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9E2A2B] shrink-0" />
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${coachProfile.phonePrimary}`}
                    className="hover:text-[#A67C52] transition-colors font-medium"
                  >
                    {coachProfile.phonePrimary}
                  </a>
                  <span className="text-[#EFEFEF]/30">&bull;</span>
                  <a
                    href={`tel:${coachProfile.phoneSecondary}`}
                    className="hover:text-[#A67C52] transition-colors font-medium"
                  >
                    {coachProfile.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Section Links */}
            <div className="md:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-3">
                Navigate
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {QUICK_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-[#E2E2E5]/75 hover:text-[#EFEFEF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2E2E5]/55">
            <p>
              &copy; {CURRENT_YEAR} {coachProfile.fullName} &mdash;{" "}
              {coachProfile.centreName}
            </p>
            <p className="uppercase tracking-[0.16em] text-[11px] text-[#A67C52]">
              Discipline Today, Champions Tomorrow
            </p>
          </div>
        </div>
      </footer>

      {/* Floating "Message Coach" Quick-Action Pill (appears after scrolling past Hero) */}
      <AnimatePresence>
        {showFloating && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenConnect()}
            className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] border border-[#EFEFEF]/20 shadow-lg cursor-pointer"
            aria-label="Message Coach Lomada Raju"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message Coach</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
