import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { coachProfile } from "../data/portfolioData";

const NAV_LINKS = [
  { id: "home", label: "HOME" },
  { id: "champions", label: "CHAMPIONS" },
  { id: "about", label: "ABOUT" },
  { id: "coaching", label: "COACHING" },
  { id: "career", label: "CAREER" },
  { id: "gallery", label: "GALLERY" },
  { id: "podcasts", label: "PODCASTS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar({ onOpenConnect }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);
    document.body.style.overflow = "";

    setTimeout(() => {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -84;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EFEFEF]/90 border-b border-[#1C1C21]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-[72px] flex items-center justify-between gap-4">
        {/* Left: Monogram + Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group shrink-0"
        >
          <span className="w-9 h-9 rounded-lg bg-[#1C1C21] text-[#EFEFEF] font-editorial font-extrabold text-lg tracking-wider flex items-center justify-center border border-[#1C1C21] group-hover:bg-[#9E2A2B] group-hover:border-[#9E2A2B] transition-colors">
            {coachProfile.monogram}
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-editorial font-bold text-xl tracking-[0.06em] uppercase text-[#1C1C21]">
              {coachProfile.fullName}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#A67C52] hidden sm:block">
              S&amp;C Coach • India
            </span>
          </div>
        </a>

        {/* Center: Desktop Links */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative py-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors ${
                  isActive ? "text-[#1C1C21]" : "text-[#4A4A52] hover:text-[#1C1C21]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#9E2A2B]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Compact Connect CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpenConnect()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs transition-colors cursor-pointer"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="xl:hidden p-2.5 rounded-xl border border-[#1C1C21]/15 text-[#1C1C21] hover:bg-[#E2E2E5] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="xl:hidden overflow-hidden bg-[#EFEFEF] border-b border-[#1C1C21]/15 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`py-3.5 px-4 text-base font-medium rounded-xl flex items-center justify-between tracking-wide uppercase transition-colors ${
                      isActive
                        ? "bg-[#9E2A2B]/10 text-[#9E2A2B] font-semibold"
                        : "text-[#1C1C21] hover:bg-[#E2E2E5]/70"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#9E2A2B]" />}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-[#1C1C21]/12 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = "";
                    onOpenConnect();
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>START YOUR TRAINING JOURNEY / CONNECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
