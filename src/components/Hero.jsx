import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { coachProfile, keyHighlights } from "../data/portfolioData";
import SmartImage from "./SmartImage";

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
      // Total seconds = 3 * 60 + 16.43 = 196.43
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

export default function Hero({ onOpenConnect }) {
  const portraitWrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: portraitWrapperRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [-14, 18]);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative bg-[#EFEFEF] border-b border-[#1C1C21]/14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline, Intro, CTAs */}
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
            <h1 className="font-editorial font-extrabold uppercase text-[#1C1C21] text-[3.75rem] sm:text-[5.25rem] xl:text-[6.5rem] leading-[0.88] tracking-[-0.02em] mb-6">
              {coachProfile.fullName}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-semibold text-[#1C1C21] leading-snug max-w-2xl mb-4">
              {coachProfile.tagline}
            </p>

            {/* Conversational First-Person Intro */}
            <p className="text-sm sm:text-base text-[#4A4A52] leading-relaxed max-w-2xl mb-8">
              {coachProfile.personalIntro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenConnect()}
                className="inline-flex items-center gap-2 bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.16em] uppercase shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>CONNECT WITH COACH</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToAbout}
                className="inline-flex items-center gap-2 border border-[#1C1C21]/20 hover:border-[#1C1C21]/45 bg-[#EFEFEF] hover:bg-[#E2E2E5] text-[#1C1C21] px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.16em] uppercase shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>EXPLORE HIS JOURNEY</span>
                <ArrowDownRight className="w-4 h-4 text-[#9E2A2B]" />
              </motion.button>
            </div>

            {/* Bottom 4-Column Metric Bar with Animated Counters */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/70 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1C1C21]/10">
                {keyHighlights.map((item) => (
                  <div key={item.label} className="p-4 sm:px-5 sm:py-5">
                    <div className="font-editorial font-extrabold text-2xl sm:text-3xl text-[#1C1C21] tracking-tight leading-none mb-1.5 tabular-nums">
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

          {/* Right Column: Editorial Portrait Frame with Subtle Parallax */}
          <motion.div
            ref={portraitWrapperRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            style={{ y: portraitY }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[448px] rounded-2xl border border-[#1C1C21]/12 p-2.5 bg-[#E2E2E5] shadow-sm overflow-hidden">
              <SmartImage
                src={coachProfile.heroImage}
                alt="Coach Lomada Raju in official Indian National Team blazer"
                aspectClass="aspect-[4/5] max-h-[560px]"
                objectPosition="object-top"
                className="rounded-t-xl"
                label="Hero Portrait"
              />

              {/* Integrated Credential Caption Footer Bar */}
              <div className="rounded-b-xl bg-[#1C1C21] text-[#EFEFEF] p-4 sm:px-5 sm:py-4 border-t border-[#A67C52]/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A67C52] mb-0.5">
                      Verified National Credential
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#EFEFEF] leading-snug">
                      Indian National Badminton S&amp;C &bull; SAI &amp; NIS Certified
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
