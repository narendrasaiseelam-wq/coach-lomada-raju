import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Compass,
  Flame,
  MapPin,
  Phone,
  Quote,
} from "lucide-react";
import { coachProfile } from "../data/portfolioData";
import SmartImage from "./SmartImage";

const LIFE_CHAPTERS = [
  {
    id: "roots",
    number: "01",
    tabLabel: "Roots & Discipline",
    subtitle: "Chilamkuru to Hyderabad",
    icon: Compass,
    headline: "Son of Kadapa, State Rank 1 Scholar",
    summary:
      "Born to Ankalaiah and Ankalamma in Bhadrampalle / Chilamkuru (YSR Kadapa District), Lomada Raju learned early that discipline is built from the ground up.",
    story:
      "Moving to Hyderabad for his Bachelor of Arts at Railway Degree College (2006–2009), he balanced rigorous athletics training with academics—going on to secure State First Rank in his B.P.Ed at Govt College, Osmania University (2010–2011) and completing his M.P.Ed in 2013.",
    highlights: [
      { label: "Hometown", value: "Bhadrampalle / Chilamkuru, YSR Kadapa" },
      { label: "Academic Honour", value: "State First Rank — B.P.Ed (Osmania Univ.)" },
    ],
  },
  {
    id: "track",
    number: "02",
    tabLabel: "13 Years on the Track",
    subtitle: "1999 — 2013",
    icon: Flame,
    headline: "43 Medals & a National Meet Record",
    summary:
      "Before standing courtside with a stopwatch, Coach Raju spent over thirteen years on the athletics track chasing tenths of a second in the 400m and 4×400m relay.",
    story:
      "Across 1999–2013, he won 43 total track medals—14 National (4 Gold, 5 Silver, 5 Bronze) and 29 State (17 Gold, 10 Silver, 2 Bronze). At the 2006 Junior Federation Cup in Chennai, his squad set the National Meet Record of 3:16.43 in the 4×400m relay.",
    highlights: [
      { label: "National Meet Record", value: "3:16.43 (4×400m Relay, Chennai 2006)" },
      { label: "Career Medal Haul", value: "14 National & 29 State Medals" },
    ],
  },
  {
    id: "science",
    number: "03",
    tabLabel: "Science + Yoga Philosophy",
    subtitle: "2010 — Present",
    icon: BookOpen,
    headline: "Modern Sports Science Meets Ancient Yoga",
    summary:
      "Transitioning from competitive track to coaching Indian Railways teams in 2010, he fused evidence-based strength & conditioning with breath, mobility, and longevity.",
    story:
      "Blending SAI & NIS Patiala strength conditioning certifications with an M.Sc. in Yoga (Annamalai University) and ongoing Ph.D. research in Physical Education, he has mentored Olympic and Paralympic medallists with the Indian National Badminton Team and founded Dhwajam Strength & Conditioning Centre in Hyderabad.",
    highlights: [
      { label: "Credentials", value: "SAI & NIS Certified • M.Sc. Yoga • Ph.D. Scholar" },
      { label: "National Duty", value: "Indian National Badminton Team (2015–2024)" },
    ],
  },
];

export default function AboutJourney({ onOpenConnect }) {
  const [activeChapterId, setActiveChapterId] = useState(LIFE_CHAPTERS[0].id);

  const activeChapter =
    LIFE_CHAPTERS.find((c) => c.id === activeChapterId) || LIFE_CHAPTERS[0];

  return (
    <section
      id="about"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* 1. Chapter Header & Personal Manifesto (Full-Width Editorial Intro) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#1C1C21]/14"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#9E2A2B]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#9E2A2B]">
                The Man Behind the Athletes
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.92] tracking-[-0.01em]">
              FROM CHILAMKURU TO{" "}
              <span className="text-[#9E2A2B]">THE WORLD STAGE.</span>
            </h2>
          </div>

          {/* Pull-Quote Callout with Warm Bronze Accent Bar */}
          <div className="lg:col-span-5">
            <blockquote className="rounded-2xl border border-[#1C1C21]/10 border-l-4 border-l-[#A67C52] bg-[#E2E2E5]/70 p-5 sm:p-6 shadow-xs">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-semibold text-[#1C1C21] leading-relaxed">
                  &ldquo;Every program starts with the person in front of me—their sport, their calendar, and their body.&rdquo;
                </p>
              </div>
            </blockquote>
          </div>
        </motion.div>

        {/* 2. Balanced Bento Grid: Interactive 3-Chapter Switcher + Dhwajam HQ (Left) | 2-Photo Visual Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3-Chapter Interactive Story + Dhwajam HQ Card */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Chapter Switcher Card */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/55 p-6 sm:p-7 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                {/* 3 Tactile Chapter Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 p-1.5 rounded-xl bg-[#EFEFEF] border border-[#1C1C21]/10">
                  {LIFE_CHAPTERS.map((chapter) => {
                    const isSelected = chapter.id === activeChapter.id;
                    const Icon = chapter.icon;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => setActiveChapterId(chapter.id)}
                        className={`relative text-left px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? "text-[#EFEFEF]"
                            : "text-[#4A4A52] hover:text-[#1C1C21]"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="about-chapter-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-lg bg-[#1C1C21]"
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-1.5 mb-0.5">
                          <Icon
                            className={`w-3.5 h-3.5 ${
                              isSelected ? "text-[#A67C52]" : "text-[#9E2A2B]"
                            }`}
                          />
                          <span
                            className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                              isSelected ? "text-[#A67C52]" : "text-[#9E2A2B]"
                            }`}
                          >
                            Ch. {chapter.number}
                          </span>
                        </div>
                        <p className="relative z-10 text-xs font-bold leading-tight">
                          {chapter.tabLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Active Chapter Narrative */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChapter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E2A2B] mb-1">
                        Chapter {activeChapter.number} &bull; {activeChapter.subtitle}
                      </p>
                      <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-none">
                        {activeChapter.headline}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base font-semibold text-[#1C1C21] leading-relaxed">
                      {activeChapter.summary}
                    </p>

                    <p className="text-sm text-[#4A4A52] leading-relaxed">
                      {activeChapter.story}
                    </p>

                    {/* Chapter Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {activeChapter.highlights.map((hl) => (
                        <div
                          key={hl.label}
                          className="rounded-xl bg-[#EFEFEF] border border-[#1C1C21]/10 p-3.5"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A67C52] mb-1">
                            {hl.label}
                          </p>
                          <p className="text-xs font-semibold text-[#1C1C21] leading-snug">
                            {hl.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dark-Graphite Dhwajam Headquarters Card (Aligned Flush at Bottom) */}
            <div className="rounded-2xl bg-[#1C1C21] text-[#EFEFEF] border border-[#1C1C21] p-6 sm:p-7 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EFEFEF]/12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 rounded-xl border border-[#EFEFEF]/15 bg-[#EFEFEF] p-1.5 overflow-hidden flex items-center justify-center">
                    <SmartImage
                      src={coachProfile.dhwajamLogo}
                      alt={`${coachProfile.centreName} logo`}
                      fit="contain"
                      objectPosition="object-center"
                      className="rounded-lg bg-transparent"
                      label="Logo"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-0.5">
                      Training Headquarters
                    </p>
                    <h3 className="font-editorial font-extrabold uppercase text-2xl sm:text-3xl text-[#EFEFEF] leading-none mb-1">
                      {coachProfile.centreName}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E2A2B]">
                      &ldquo;{coachProfile.centreMotto}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div className="space-y-2 text-xs sm:text-sm text-[#E2E2E5]/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#9E2A2B] shrink-0 mt-0.5" />
                    <span>{coachProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#9E2A2B] shrink-0" />
                    <span>
                      {coachProfile.phonePrimary} &bull; {coachProfile.phoneSecondary}
                    </span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenConnect()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] shrink-0 transition-colors cursor-pointer"
                >
                  <span>Book an Assessment</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced 2-Photo Visual Bento Showcase + Compact Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-between gap-6"
          >
            {/* Tight 2-Photo Row (No Vertical Stretching Inside Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Photo 1: Off-Court Desk Portrait */}
              <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/65 p-2.5 shadow-sm">
                <SmartImage
                  src={coachProfile.aboutImage}
                  alt="Coach Lomada Raju smiling at his coaching desk"
                  aspectClass="aspect-[3/4]"
                  objectPosition="object-top"
                  className="rounded-xl"
                  label="Coach Portrait"
                />
                <div className="p-3 pt-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-3.5 h-3.5 text-[#9E2A2B]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9E2A2B]">
                      Athlete-First Mentorship
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4A52] leading-relaxed">
                    Calm, personal guidance tailored to every athlete&apos;s calendar, recovery, and mindset.
                  </p>
                </div>
              </div>

              {/* Photo 2: Track Sprint Bib #11 */}
              <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/65 p-2.5 shadow-sm">
                <SmartImage
                  src={coachProfile.trackImage}
                  alt="Lomada Raju competing on the athletics track in Bib 11"
                  fit="contain"
                  className="rounded-xl"
                  label="Track Era • Bib 11"
                />
                <div className="p-3 pt-3.5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C52]">
                      1999 — 2013 Track Era
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E2A2B]">
                      Bib #11
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4A52] leading-relaxed">
                    400m &amp; 4&times;400m relay competitor — 43 medals &amp; 3:16.43 National Meet Record.
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Personal Coaching Philosophy & Stats Strip */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/65 p-5 sm:p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E2A2B] mb-3">
                Track-Tested &bull; Science-Backed
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#1C1C21]/12">
                <div className="sm:pr-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    13+ Years
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">
                    Competitive Track
                  </p>
                </div>
                <div className="sm:px-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    State Rank 1
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">
                    B.P.Ed (Osmania Univ.)
                  </p>
                </div>
                <div className="sm:pl-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    M.Sc. Yoga
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">
                    + Ph.D. Scholar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
