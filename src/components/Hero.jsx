import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { affiliationsData, coachProfile, keyHighlights } from "../data/portfolioData";
import AffiliationModal from "./AffiliationModal";

const HERO_SLIDES = [
  {
    src: "/images/hero-portrait-blazer.jpg",
    objectPos: "object-[50%_15%]",
    tag: "VERIFIED NATIONAL CREDENTIAL",
    line: "Indian National Badminton S&C • BAI, SAI & NIS Certified",
    alt: "Coach Lomada Raju in Team India blazer on the badminton court",
  },
  {
    src: "/images/hero-slides/02-pv-sindhu-gym.jpg",
    objectPos: "object-[50%_20%]",
    tag: "OLYMPIC CONDITIONING",
    line: "1-on-1 Strength & Conditioning with Two-Time Olympic Medallist P.V. Sindhu",
    alt: "Coach Lomada Raju with two-time Olympic medallist P.V. Sindhu in the gym",
  },
  {
    src: "/images/hero-slides/03-srikanth-sag-gold.jpg",
    objectPos: "object-[50%_15%]",
    tag: "13TH SOUTH ASIAN GAMES • GOLD",
    line: "Gold Medal Podium with Former World No. 1 Kidambi Srikanth",
    alt: "Coach Lomada Raju and Kidambi Srikanth on the South Asian Games Gold Medal podium",
  },
  {
    src: "/images/hero-slides/04-wuhan-2017.jpg",
    objectPos: "object-center",
    tag: "BADMINTON ASIA CHAMPIONSHIPS",
    line: "Team India S&C Duty at the 2017 Asian Championships in Wuhan, China",
    alt: "Coach Lomada Raju on Team India duty at the 2017 Badminton Asia Championships in Wuhan",
  },
  {
    src: "/images/hero-slides/05-gopichand-camp.jpg",
    objectPos: "object-[50%_20%]",
    tag: "NATIONAL ELITE CAMP",
    line: "Conditioning Session with Chief Coach Pullela Gopichand & National Squad",
    alt: "Coach Lomada Raju with Chief Coach Pullela Gopichand and the Indian National Squad",
  },
  {
    src: "/images/hero-slides/06-satwik-chirag.jpg",
    objectPos: "object-[50%_15%]",
    tag: "WORLD DOUBLES CHAMPIONS",
    line: "Court-Side Training with Asian Games Champions Satwik & Chirag",
    alt: "Coach Lomada Raju with Asian Games champions Satwiksairaj Rankireddy and Chirag Shetty",
  },
  {
    src: "/images/hero-slides/07-indian-team-blue.jpg",
    objectPos: "object-[50%_20%]",
    tag: "THOMAS & UBER CUP DUTY",
    line: "Indian National Badminton Squad on International Tour Duty",
    alt: "Coach Lomada Raju with the Indian National Badminton Squad on international tour duty",
  },
  {
    src: "/images/hero-slides/08-ccl-karnataka-dycm.jpg",
    objectPos: "object-[50%_25%]",
    tag: "CELEBRITY CRICKET LEAGUE",
    line: "Telugu Warriors Squad Reception with Hon'ble Karnataka DyCM D.K. Shivakumar",
    alt: "Coach Lomada Raju and Telugu Warriors squad with Karnataka DyCM D.K. Shivakumar",
  },
  {
    src: "/images/hero-slides/09-ccl-nagarjuna.jpg",
    objectPos: "object-[50%_15%]",
    tag: "TELUGU WARRIORS • HEAD S&C",
    line: "Match-Day Readiness with Telugu Warriors Mentor Akkineni Nagarjuna",
    alt: "Coach Lomada Raju with Telugu Warriors mentor Akkineni Nagarjuna",
  },
];

function AnimatedMetric({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    if (value === "15+") {
      const controls = animate(0, 15, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(`${Math.round(latest)}+`),
      });
      return () => controls.stop();
    }

    if (value === "98") {
      const controls = animate(0, 98, {
        duration: 1.3,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(`${Math.round(latest)}`),
      });
      return () => controls.stop();
    }

    if (value === "3:16.43") {
      const controls = animate(0, 196.43, {
        duration: 1.4,
        ease: "easeOut",
        onUpdate: (latest) => {
          const mins = Math.floor(latest / 60);
          const secs = (latest % 60).toFixed(2).padStart(5, "0");
          setDisplay(`${mins}:${secs}`);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function Hero() {
  const [activeAffiliationId, setActiveAffiliationId] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const portraitWrapperRef = useRef(null);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[activeSlide];
  const { scrollYProgress } = useScroll({
    target: portraitWrapperRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [-10, 14]);

  const scrollToSection = (id, yOffset = -84) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative bg-[#EFEFEF] border-b border-[#1C1C21]/14 overflow-hidden scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 lg:pt-10 pb-16">
        {/* Top Bar: Interactive National & League Affiliations (7 Official Logos) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pb-6 mb-8 border-b border-stone-200/80"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A4A52] mb-3.5">
            National &amp; League Affiliations &bull; Click any crest to view full experience
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {affiliationsData.map((org) => (
              <button
                key={org.id}
                type="button"
                onClick={() => setActiveAffiliationId(org.id)}
                className="group flex flex-col items-center text-center gap-2 bg-white/95 rounded-2xl border border-[#1C1C21]/10 px-3 py-3.5 shadow-xs cursor-pointer hover:border-[#B45309] hover:shadow-md transition-all"
                title={`View Coach Lomada Raju's role with ${org.fullName}`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-[#1C1C21]/8 p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={org.logo}
                    alt={`Coach Lomada Raju — ${org.fullName} official affiliation emblem`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-[#1C1C21] leading-tight">
                    {org.shortName}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#B45309] group-hover:text-[#92400E] transition-colors">
                    <span>View Role</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Specialisation, Intro, Exact CTAs & Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#B45309]" />
              <p className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#B45309]">
                {coachProfile.title}
              </p>
            </div>

            {/* Massive Condensed Display Headline */}
            <h1 className="font-editorial font-extrabold uppercase text-[#1C1C21] text-[3.75rem] sm:text-[5.25rem] xl:text-[6.25rem] leading-[0.88] tracking-[-0.02em] mb-5">
              {coachProfile.fullName}
            </h1>

            {/* Explicit Professional Experience & Specialisation (Two-Line Block) */}
            <p className="text-sm sm:text-base font-bold text-[#B45309] leading-snug max-w-2xl mb-4 border-l-2 border-[#A67C52] pl-3.5">
              15+ Years International Strength &amp; Conditioning Coaching Specialist
              <br />
              Olympic &amp; Para-Badminton | National Cricket | Athletics | Sports Yoga Science
            </p>

            {/* Conversational First-Person Intro */}
            <p className="text-sm sm:text-base text-[#4A4A52] leading-relaxed max-w-2xl mb-8">
              {coachProfile.personalIntro}
            </p>

            {/* Exact Required CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("coaching")}
                className="inline-flex items-center gap-2 bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Explore coaching</span>
                <ArrowDownRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 border border-[#1C1C21]/25 hover:border-[#1C1C21]/50 bg-[#EFEFEF] hover:bg-[#E2E2E5] text-[#1C1C21] px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Contact coach</span>
                <ArrowUpRight className="w-4 h-4 text-[#B45309]" />
              </motion.button>
            </div>

            {/* Bottom 4-Column Metric Bar */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/70 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1C1C21]/10">
                {keyHighlights.map((item) => (
                  <div key={item.label} className="p-4 sm:px-4 sm:py-5">
                    <div className="font-editorial font-extrabold text-xl sm:text-2xl text-[#1C1C21] tracking-tight leading-none mb-1.5 tabular-nums whitespace-nowrap">
                      <AnimatedMetric value={item.metric} />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#B45309] mb-1">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[#4A4A52] leading-snug">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Edge-to-Edge Seamless Portrait Card */}
          <motion.div
            ref={portraitWrapperRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            style={{ y: portraitY }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div
              className="w-full max-w-[440px] rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-[#1C1C21]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative h-[440px] sm:h-[490px] w-full overflow-hidden bg-[#1C1C21] group">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <img
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      className={`absolute inset-0 w-full h-full object-cover ${slide.objectPos} transition-all duration-700 ease-in-out ${
                        isActive
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-105 z-0 pointer-events-none"
                      }`}
                    />
                  );
                })}

                {/* Prev / Next Controls */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous highlight photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1C1C21]/70 hover:bg-[#B45309] text-[#EFEFEF] border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Next highlight photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#1C1C21]/70 hover:bg-[#B45309] text-[#EFEFEF] border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Seamless Integrated Footer Bar */}
              <div className="bg-[#1C1C21] text-[#EFEFEF] p-4 sm:px-5 sm:py-4 border-t border-[#A67C52]/30 space-y-3">
                <div className="flex items-start gap-3 min-h-[54px]">
                  <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#F59E0B] mb-0.5 truncate">
                      {currentSlide.tag}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#EFEFEF] leading-snug line-clamp-2">
                      {currentSlide.line}
                    </p>
                  </div>
                </div>

                {/* Clickable Mini Progress Dots (1-9) */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === activeSlide;
                      return (
                        <button
                          key={slide.src}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          aria-label={`View slide ${idx + 1}: ${slide.tag}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            isActive
                              ? "w-5 bg-[#F59E0B]"
                              : "w-1.5 bg-white/25 hover:bg-white/55"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/55">
                    {activeSlide + 1} / {HERO_SLIDES.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AffiliationModal
        activeId={activeAffiliationId}
        onSelectOrg={setActiveAffiliationId}
        onClose={() => setActiveAffiliationId(null)}
      />
    </section>
  );
}
