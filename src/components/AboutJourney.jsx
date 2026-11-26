import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Compass,
  Flame,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { coachProfile } from "../data/portfolioData";
import SmartImage from "./SmartImage";

const BOOK_CHAPTERS = [
  {
    id: "chapter-1",
    number: "01",
    tabLabel: "Chapter 01",
    title: "My Roots in Chilamkuru",
    subtitle: "1999 – 2009 • YSR Kadapa District",
    icon: Compass,
    quote:
      "Before there were synthetic tracks or stopwatches, there were harvested farm fields at dawn.",
    paragraphs: [
      "I was born to Ankalaiah and Ankalamma in Bhadrampalle / Chilamkuru, a small village in YSR Kadapa District. My parents worked hard as daily labourers, and I helped them before school.",
      "When I realized sports could change my life, I woke up before sunrise, levelled a harvested farm field into my own running track, and ran every single morning until I earned a sports-quota seat at Railway Degree College in Hyderabad.",
    ],
    highlights: [
      { label: "Hometown", value: "Bhadrampalle / Chilamkuru, YSR Kadapa" },
      { label: "Breakthrough", value: "Sports-Quota Seat, Railway Degree College" },
    ],
    photos: [
      {
        src: "/images/press-2006-national-record.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "EARLY PRESS ARCHIVE",
        caption:
          "Newspaper coverage chronicling my rise from Chilamkuru (YSR Kadapa) to Railway Degree College & SAI Hyderabad.",
        alt: "Early newspaper press archive of Lomada Raju",
      },
      {
        src: "/images/press-eenadu-2023.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "EENADU FEATURE • JULY 2023",
        caption:
          "Sharing how dawn runs on levelled village farm fields laid the foundation for my national athletics career.",
        alt: "Eenadu July 2023 feature on Lomada Raju",
      },
    ],
  },
  {
    id: "chapter-2",
    number: "02",
    tabLabel: "Chapter 02",
    title: "13 Years on the Track",
    subtitle: "1999 – 2013 • 400m & 4×400m Relay",
    icon: Flame,
    quote:
      "Those years taught me what real discipline, fatigue, and recovery feel like inside an athlete's body.",
    paragraphs: [
      "Before becoming a coach, I lived the life of an athlete for more than thirteen years. Competing in the 400m and 4×400m relay, I won 14 National medals and 29 State medals—and in 2006, our team set the National Meet Record of 3:16.43 at the Junior Federation Cup in Chennai.",
      "Every tenth of a second I chased on the track still guides how I train athletes today—because I know firsthand how hard the body works under pressure.",
    ],
    highlights: [
      { label: "National Meet Record", value: "3:16.43 (4×400m Relay, Chennai 2006)" },
      { label: "Medals Won", value: "14 National & 29 State Track Medals" },
    ],
    photos: [
      {
        src: "/images/03-track-bib-11.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "1999 — 2013 TRACK ERA",
        caption:
          "Competing in the 400m & 4×400m relay — 98 National, State & University/District medals and 3:16.43 National Meet Record (2006).",
        alt: "Lomada Raju competing on the athletics track in Bib 11",
      },
      {
        src: "/images/about-assam-inauguration.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "NATIONAL CENTER OF EXCELLENCE",
        caption:
          "Representing Indian badminton sports science at the National Center of Excellence inauguration.",
        alt: "Lomada Raju at the National Center of Excellence inauguration",
      },
    ],
  },
  {
    id: "chapter-3",
    number: "03",
    tabLabel: "Chapter 03",
    title: "My Education & Sports Science",
    subtitle: "Degrees, SAI, NIS Patiala & Yoga",
    icon: ShieldCheck,
    quote:
      "I wanted my coaching to be backed by real science, not guesswork.",
    paragraphs: [
      "I topped the state with Rank 1 in my B.P.Ed at Osmania University and completed my M.P.Ed in Nagpur. To bring the best methods to my athletes, I earned Strength & Conditioning certifications from the Sports Authority of India (SAI) and NIS Patiala.",
      "I also completed an M.Sc. in Yoga at Annamalai University to help athletes stay flexible and injury-free, and I am currently pursuing my Ph.D. in Physical Education.",
    ],
    highlights: [
      { label: "State Rank 1", value: "B.P.Ed (Osmania Univ.) & M.P.Ed" },
      { label: "Science + Yoga", value: "SAI & NIS Certified • M.Sc. Yoga • Ph.D. Scholar" },
    ],
    photos: [
      {
        src: "/images/press-eenadu-athletics-raju.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "EENADU FEATURE • NIS TOPPER",
        caption:
          "Newspaper feature documenting my Railway Degree College honours and selection as the sole South Indian among 30 candidates at NIS Patiala.",
        alt: "Eenadu feature on Lomada Raju's NIS Patiala selection",
      },
      {
        src: "/images/intl-gopichand-academy.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "GOPICHAND BADMINTON ACADEMY",
        caption:
          "Working alongside Chief National Coach Pullela Gopichand as National Squad S&C Coach in Hyderabad.",
        alt: "Lomada Raju with Chief National Coach Pullela Gopichand",
      },
    ],
  },
  {
    id: "chapter-4",
    number: "04",
    tabLabel: "Chapter 04",
    title: "Coaching India & Dhwajam",
    subtitle: "2010 — Present • Legacy & Academy",
    icon: BookOpen,
    quote:
      "Deep roots create unshakeable athletes—on the podium and in everyday life.",
    paragraphs: [
      "Since 2010, I have been fortunate to serve with Indian Railways, Hyderabad Cricket, the Indian National Badminton Team (2015–2024), and the Telugu Warriors in CCL.",
      "Today, I also lead Dhwajam Strength & Conditioning Centre in Hyderabad—where we train athletes and teams with one core belief: Roots Build Resilience.",
    ],
    highlights: [
      { label: "Academy", value: "Dhwajam Strength & Conditioning Centre" },
      { label: "Location", value: "Botanical Garden, Kondapur, Hyderabad" },
    ],
    isAcademyChapter: true,
    photos: [
      {
        src: "/images/04-dhwajam-logo.png",
        fit: "contain",
        objectPosition: "object-center",
        frameClass: "bg-[#F8F7F4] p-4 aspect-[3/4] flex items-center justify-center",
        eyebrow: "DHWAJAM S&C CENTRE",
        caption:
          "Strength, Flexibility, Endurance, Coordination & Speed — founded by Lomada Raju in Hyderabad.",
        alt: "Dhwajam Strength & Conditioning Centre emblem",
      },
      {
        src: "/images/02-about-desk-portrait.jpg",
        fit: "cover",
        objectPosition: "object-top",
        eyebrow: "ATHLETE-FIRST MENTORSHIP",
        caption:
          "One-on-one assessment and personal planning at Dhwajam Centre, Botanical Garden, Kondapur.",
        alt: "Coach Lomada Raju at his desk at Dhwajam Centre",
      },
    ],
  },
];

export default function AboutJourney() {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const current = BOOK_CHAPTERS[activeChapterIdx];

  return (
    <section
      id="about"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Chapter Header & Personal Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#1C1C21]/14"
        >
          <div className="lg:col-span-7">
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              MY STORY:
              <br />
              <span className="text-[#B45309]">
                FROM A SMALL VILLAGE TO THE WORLD STAGE
              </span>
            </h2>
          </div>

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

        {/* Balanced Bento: Interactive 4-Chapter Virtual Book (Left) | Dynamic Synchronized 2-Photo Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4-Chapter Virtual Book Reader + Dhwajam Epilogue */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/60 p-6 sm:p-8 shadow-sm">
              {/* 4 Chapter Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-1.5 rounded-xl bg-[#EFEFEF] border border-[#1C1C21]/10">
                {BOOK_CHAPTERS.map((chapter, idx) => {
                  const isSelected = idx === activeChapterIdx;
                  const Icon = chapter.icon;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setActiveChapterIdx(idx)}
                      className={`relative text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${isSelected
                          ? "text-[#EFEFEF]"
                          : "text-[#4A4A52] hover:text-[#1C1C21]"
                        }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="virtual-book-tab"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-lg bg-[#1C1C21]"
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-1.5 mb-0.5">
                        <Icon
                          className={`w-3.5 h-3.5 ${isSelected ? "text-[#A67C52]" : "text-[#B45309]"
                            }`}
                        />
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.14em] ${isSelected ? "text-[#A67C52]" : "text-[#B45309]"
                            }`}
                        >
                          {chapter.tabLabel}
                        </span>
                      </div>
                      <p className="relative z-10 text-xs font-bold leading-snug">
                        {chapter.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Chapter Page */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B45309] mb-1">
                      Chapter {current.number} &bull; {current.subtitle}
                    </p>
                    <h3 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#1C1C21] leading-none">
                      {current.title}
                    </h3>
                  </div>

                  <p className="text-sm italic font-semibold text-[#1C1C21] border-l-2 border-[#A67C52] pl-3.5 py-0.5">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  {current.paragraphs.map((para) => (
                    <p key={para} className="text-sm text-[#4A4A52] leading-relaxed">
                      {para}
                    </p>
                  ))}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {current.highlights.map((hl) => (
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

                  {current.isAcademyChapter && (
                    <div className="pt-2">
                      <a
                        href="https://dhwajam.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors"
                      >
                        <span>Visit Dhwajam Academy</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Book Page Navigation Footer */}
              <div className="mt-6 pt-5 border-t border-[#1C1C21]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveChapterIdx((i) => Math.max(0, i - 1))}
                  disabled={activeChapterIdx === 0}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev Chapter</span>
                </button>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67C52]">
                  Page {activeChapterIdx + 1} of {BOOK_CHAPTERS.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveChapterIdx((i) => Math.min(BOOK_CHAPTERS.length - 1, i + 1))
                  }
                  disabled={activeChapterIdx === BOOK_CHAPTERS.length - 1}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B45309] disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dignified Dhwajam Epilogue Bridge Card */}
            <div className="rounded-2xl bg-[#1C1C21] text-[#EFEFEF] border border-[#1C1C21] p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-4 pb-5 border-b border-[#EFEFEF]/12">
                <div className="w-14 h-14 shrink-0 rounded-full border border-[#EFEFEF]/15 bg-[#EFEFEF] p-1 overflow-hidden flex items-center justify-center">
                  <SmartImage
                    src={coachProfile.dhwajamLogo}
                    alt={`${coachProfile.centreName} logo`}
                    fit="contain"
                    objectPosition="object-center"
                    className="rounded-full bg-transparent"
                    label="Logo"
                  />
                </div>
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-none">
                    DHWAJAM
                  </h3>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-amber-400/90 mt-1">
                    {coachProfile.centreMotto}
                  </p>
                  <p className="text-base sm:text-lg font-medium text-stone-300 mt-1.5 leading-snug">
                    Strength &amp; Conditioning Centre
                  </p>
                </div>
              </div>

              <ul className="py-4 border-b border-[#EFEFEF]/12 space-y-2 text-xs sm:text-sm text-[#E2E2E5]/90">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>
                    <strong className="text-white font-semibold">Personalised 1-on-1 Assessment:</strong>{" "}
                    Individual movement &amp; pain-root diagnosis before any training begins
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>
                    <strong className="text-white font-semibold">Multi-Sport &amp; Health Coaching:</strong>{" "}
                    Athletes, IAS/IPS officers, doctors, legislators &amp; everyday fitness seekers
                  </span>
                </li>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>
                    <strong className="text-white font-semibold">Science + Sports Yoga:</strong>{" "}
                    Blending Olympic S&amp;C methods with M.Sc. Yoga recovery &amp; longevity
                  </span>
                </li>
              </ul>

              <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-2.5 text-xs sm:text-sm text-[#E2E2E5]/85">
                  <div className="flex items-start gap-2.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-1" />
                    <span>
                      Inside Botanical Garden, Kondapur, Gachibowli, Hyderabad, Telangana
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#B45309] shrink-0" />
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${coachProfile.phoneRaw}`}
                        className="font-semibold text-[#EFEFEF] hover:text-[#A67C52] transition-colors"
                      >
                        {coachProfile.phonePrimary}
                      </a>
                      <span className="text-[#EFEFEF]/30">&bull;</span>
                      <a
                        href={`tel:${coachProfile.phoneSecondary}`}
                        className="font-semibold text-[#EFEFEF] hover:text-[#A67C52] transition-colors"
                      >
                        {coachProfile.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="https://dhwajam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-6 py-3.5 text-sm font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  <span>EXPLORE DHWAJAM ACADEMY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Column: Synchronized 2-Photo Visual Showcase + Compact Stats Strip */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
              >
                {current.photos.map((photo) => (
                  <div
                    key={photo.src}
                    className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/65 p-2.5 shadow-sm"
                  >
                    <SmartImage
                      src={photo.src}
                      alt={photo.alt}
                      fit={photo.fit}
                      aspectClass={photo.fit === "contain" ? "" : "aspect-[3/4]"}
                      objectPosition={photo.objectPosition}
                      className={`rounded-xl ${photo.frameClass || ""}`}
                      label={photo.eyebrow}
                    />
                    <div className="p-3 pt-3.5">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B45309]">
                          {photo.eyebrow}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A4A52] leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Compact Stats Strip */}
            <div className="rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/65 p-5 sm:p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B45309] mb-3">
                Track-Tested &bull; Science-Backed
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#1C1C21]/12">
                <div className="sm:pr-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    13+ Years
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">Competitive Track</p>
                </div>
                <div className="sm:px-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    State Rank 1
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">B.P.Ed (Osmania Univ.)</p>
                </div>
                <div className="sm:pl-4">
                  <p className="font-editorial font-extrabold uppercase text-xl text-[#1C1C21] leading-tight">
                    M.Sc. Yoga
                  </p>
                  <p className="text-xs text-[#4A4A52] mt-0.5">+ Ph.D. Scholar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holistic Approach & My Mission */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          <div className="lg:col-span-7 rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/60 p-6 sm:p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-[2px] w-6 bg-[#B45309]" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B45309]">
                Holistic Approach
              </p>
            </div>
            <p className="text-sm sm:text-base text-[#1C1C21]/90 leading-relaxed">
              {coachProfile.holisticApproach}
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-[#1C1C21]/12 border-l-4 border-l-[#B45309] bg-[#EFEFEF] p-6 sm:p-8 shadow-sm flex flex-col justify-center">
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full bg-[#B45309] text-[#EFEFEF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                MY MISSION
              </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[#1C1C21] leading-relaxed">
              &ldquo;{coachProfile.mission}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
