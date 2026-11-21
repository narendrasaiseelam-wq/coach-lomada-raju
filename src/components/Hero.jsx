import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { affiliations, coachProfile, keyHighlights } from "../data/portfolioData";

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

    if (value === "43") {
      const controls = animate(0, 43, {
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
  const portraitWrapperRef = useRef(null);
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
      className="relative bg-[#EFEFEF] border-b border-[#1C1C21]/14 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 lg:pt-10 pb-16">
        {/* Top Bar: Interactive National & League Affiliations (7 Official Logos) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pb-6 mb-8 border-b border-stone-200/80"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A4A52] mb-3">
            National &amp; League Affiliations &bull; Click to Jump to Milestone
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {affiliations.map((org) => (
              <button
                key={org.shortName}
                type="button"
                onClick={() => scrollToSection(org.targetId, -96)}
                className="flex items-center gap-2.5 bg-white/95 rounded-xl border border-[#1C1C21]/10 px-3 py-2 shadow-xs cursor-pointer hover:border-[#9E2A2B] hover:shadow-md transition-all text-left"
                title={`Jump to ${org.name}`}
              >
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-7 h-7 object-contain shrink-0"
                />
                <span className="text-[11px] font-bold text-[#1C1C21] leading-tight">
                  {org.shortName}
                </span>
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
              <span className="h-[2px] w-8 bg-[#9E2A2B]" />
              <p className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#9E2A2B]">
                {coachProfile.title}
              </p>
            </div>

            {/* Massive Condensed Display Headline */}
            <h1 className="font-editorial font-extrabold uppercase text-[#1C1C21] text-[3.75rem] sm:text-[5.25rem] xl:text-[6.25rem] leading-[0.88] tracking-[-0.02em] mb-5">
              {coachProfile.fullName}
            </h1>

            {/* Explicit Professional Experience & Specialisation (Two-Line Block) */}
            <p className="text-sm sm:text-base font-bold text-[#9E2A2B] leading-snug max-w-2xl mb-4 border-l-2 border-[#A67C52] pl-3.5">
              15+ Years International Strength &amp; Conditioning Specialist &mdash;
              <br />
              Olympic &amp; Para-Badminton, National Cricket, Athletics &amp; Sports Yoga Science.
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
                className="inline-flex items-center gap-2 bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase shadow-sm hover:shadow-md transition-all cursor-pointer"
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
                <ArrowUpRight className="w-4 h-4 text-[#9E2A2B]" />
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
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9E2A2B] mb-1">
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
            <div className="w-full max-w-[440px] rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-[#1C1C21]">
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#1C1C21]">
                <img
                  src={coachProfile.heroImage}
                  alt="Coach Lomada Raju receiving National Excellence recognition"
                  className="w-full h-full object-cover object-[48%_22%] block"
                />
              </div>

              {/* Seamless Integrated Footer Bar */}
              <div className="bg-[#1C1C21] text-[#EFEFEF] p-4 sm:px-5 sm:py-4 border-t border-[#A67C52]/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A67C52] mb-0.5">
                      Verified National Credential
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#EFEFEF] leading-snug">
                      Indian National Badminton S&amp;C &bull; BAI, SAI &amp; NIS Certified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
