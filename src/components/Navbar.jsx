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
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar({ onOpenConnect }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#EFEFEF]/90 border-b border-[#1C1C21]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-[72px] flex items-center justify-between gap-4">
        {/* Left: Monogram + Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
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
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors ${isActive ? "text-[#1C1C21]" : "text-[#4A4A52] hover:text-[#1C1C21]"
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

        {/* Right: Connect CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenConnect()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-5 py-2.5 text-sm font-bold tracking-wider uppercase shadow-xs transition-colors cursor-pointer"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 border border-[#1C1C21]/15 text-[#1C1C21] hover:bg-[#E2E2E5] transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-[#EFEFEF] border-b border-[#1C1C21]/15"
          >
            <div className="px-4 py-4 flex flex-col divide-y divide-[#1C1C21]/10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`py-3 flex items-center justify-between text-xs font-bold tracking-[0.16em] uppercase ${isActive ? "text-[#9E2A2B]" : "text-[#1C1C21]"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 bg-[#9E2A2B]" />}
                  </a>
                );
              })}
              <div className="pt-4 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenConnect();
                  }}
                  className="w-full py-3 bg-[#9E2A2B] text-[#EFEFEF] text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONNECT WITH COACH</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
