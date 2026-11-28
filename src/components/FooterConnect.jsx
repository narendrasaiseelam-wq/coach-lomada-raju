import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { coachProfile, consultationSteps } from "../data/portfolioData";

const CURRENT_YEAR = new Date().getFullYear();

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { id: "home", label: "Home" },
  { id: "archive", label: "Archive" },
  { id: "champions", label: "Champions" },
  { id: "about", label: "About" },
  { id: "coaching", label: "Coaching" },
  { id: "career", label: "Career" },
  { id: "gallery", label: "Gallery" },
  { id: "education", label: "Education" },
];

const ROLE_OPTIONS = [
  "Elite / Competitive Athlete",
  "Sports Team / Franchise / Academy",
  "Parent / Junior Athlete",
  "Media / Event / Speaking",
  "General Enquiry",
];

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
  WhatsApp: MessageCircle,
};

export default function FooterConnect({ onOpenConnect }) {
  const [showFloating, setShowFloating] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [roleSport, setRoleSport] = useState(ROLE_OPTIONS[0]);
  const [messageText, setMessageText] = useState("");
  const [formError, setFormError] = useState("");

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

  const buildPayload = () => {
    const lines = [
      `Hi Coach Lomada Raju, my name is ${fullName.trim()}.`,
      `Category / Sport: ${roleSport}`,
      `Contact (Email/Phone): ${contactInfo.trim()}`,
      `Message / Goals: ${messageText.trim()}`,
    ];
    return lines.join("\n");
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !contactInfo.trim() || !messageText.trim()) {
      setFormError("Please enter your name, email or phone, and your training goals.");
      return;
    }
    setFormError("");
    const url = `https://wa.me/${coachProfile.whatsappNumber}?text=${encodeURIComponent(
      buildPayload()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailCompose = () => {
    if (!fullName.trim() || !messageText.trim()) {
      setFormError("Please enter your name and message before composing an email.");
      return;
    }
    setFormError("");
    const subject = encodeURIComponent(`Coaching Enquiry from ${fullName.trim()} (${roleSport})`);
    const body = encodeURIComponent(buildPayload());
    window.location.href = `mailto:${coachProfile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <footer id="contact" className="bg-[#1C1C21] text-[#EFEFEF] pt-16 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Closing Chapter: What Happens When You Visit or Consult Me */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-14 pb-12 border-b border-[#EFEFEF]/12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="h-[2px] w-8 bg-[#B45309]" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#F59E0B]">
                    Your First Session
                  </p>
                </div>
                <h2 className="font-editorial font-extrabold uppercase text-3xl sm:text-4xl text-[#EFEFEF] leading-none">
                  WHAT HAPPENS WHEN YOU VISIT OR CONSULT ME
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#E2E2E5]/70 max-w-md leading-relaxed">
                Whether you are an athlete, parent, doctor, officer, or everyday fitness seeker—every journey begins with clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {consultationSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.04] p-5 sm:p-6 flex flex-col gap-2.5"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
                    {item.step}
                  </span>
                  <h3 className="font-editorial font-bold uppercase text-xl text-[#EFEFEF] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#E2E2E5]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Elevated 2-Column Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#EFEFEF]/12 items-start"
          >
            {/* Left Column: Signature Headline, Direct Contact, Email & Social Links */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-[2px] w-8 bg-[#B45309]" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A67C52]">
                    Direct Connection
                  </p>
                </div>
                <h2 className="font-editorial font-extrabold uppercase text-5xl sm:text-6xl text-[#EFEFEF] leading-[0.92] tracking-[-0.01em] mb-4">
                  Start your training journey.
                </h2>
                <p className="text-sm sm:text-base text-[#E2E2E5]/75 leading-relaxed">
                  Reach out directly for personal strength &amp; conditioning, national/franchise squad consultation, or speaking invitations.
                </p>
              </div>

              {/* Direct Phones & Professional Email */}
              <div className="rounded-2xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.04] p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C52] mb-0.5">
                      Professional Email
                    </p>
                    <a
                      href={`mailto:${coachProfile.email}`}
                      className="text-sm font-semibold text-[#EFEFEF] hover:text-[#A67C52] transition-colors block"
                    >
                      {coachProfile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#EFEFEF]/10">
                  <Phone className="w-4 h-4 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C52] mb-0.5">
                      Direct Phone
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <a
                        href={`tel:${coachProfile.phoneRaw}`}
                        className="font-semibold text-[#EFEFEF] hover:text-[#A67C52] transition-colors"
                      >
                        {coachProfile.phonePrimary}
                      </a>
                      <span className="text-[#EFEFEF]/30">&bull;</span>
                      <a
                        href={`tel:${coachProfile.phoneAltRaw}`}
                        className="font-semibold text-[#EFEFEF] hover:text-[#A67C52] transition-colors"
                      >
                        {coachProfile.phoneAlt}
                      </a>
                      <span className="text-[#EFEFEF]/30">&bull;</span>
                      <a
                        href={`tel:${coachProfile.phoneSecondary}`}
                        className="text-[#E2E2E5]/80 hover:text-[#A67C52] transition-colors"
                      >
                        {coachProfile.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#EFEFEF]/10">
                  <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A67C52] mb-0.5">
                      Training Base
                    </p>
                    <p className="text-xs sm:text-sm text-[#E2E2E5]/80 leading-snug">
                      {coachProfile.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-3">
                  Connect on Social
                </p>
                <div className="flex flex-wrap gap-2.5 mb-3">
                  {coachProfile.socialLinks.map((social) => {
                    const Icon = SOCIAL_ICONS[social.label] || ArrowUpRight;
                    if (social.active && social.href) {
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Coach Lomada Raju on ${social.label}`}
                          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#B45309] bg-[#B45309]/20 hover:bg-[#B45309] text-sm font-semibold text-[#EFEFEF] transition-colors"
                        >
                          <Icon className="w-4 h-4 text-[#A67C52] group-hover:text-[#EFEFEF] transition-colors" />
                          <span>{social.label}</span>
                        </a>
                      );
                    }
                    return (
                      <span
                        key={social.label}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#EFEFEF]/12 bg-[#EFEFEF]/[0.02] text-xs font-medium text-[#E2E2E5]/55 select-none"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#E2E2E5]/40" />
                        <span>{social.label}</span>
                      </span>
                    );
                  })}
                </div>
                <p className="text-xs text-[#E2E2E5]/65 leading-relaxed">
                  Connect on Instagram &amp; LinkedIn, or message directly on{" "}
                  <a
                    href={`https://wa.me/${coachProfile.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A67C52] underline underline-offset-4 hover:text-[#EFEFEF]"
                  >
                    WhatsApp
                  </a>{" "}
                  or{" "}
                  <a
                    href={`mailto:${coachProfile.email}`}
                    className="text-[#A67C52] underline underline-offset-4 hover:text-[#EFEFEF]"
                  >
                    Email
                  </a>{" "}
                  below.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7 rounded-2xl border border-[#EFEFEF]/15 bg-[#EFEFEF] text-[#1C1C21] p-6 sm:p-8 shadow-xl">
              <div className="pb-5 mb-6 border-b border-[#1C1C21]/12 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B45309] mb-1">
                    Send an Enquiry
                  </p>
                  <h3 className="font-editorial font-extrabold uppercase text-3xl text-[#1C1C21] leading-none">
                    Message Coach Lomada Raju
                  </h3>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-[#1C1C21] text-[#EFEFEF]">
                  Direct Reply
                </span>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-xl bg-[#E2E2E5]/70 border border-[#1C1C21]/18 focus:border-[#B45309] focus:outline-none px-4 py-3 text-sm text-[#1C1C21] placeholder:text-[#4A4A52]/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-info"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-1.5"
                    >
                      Email or Phone *
                    </label>
                    <input
                      id="contact-info"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="you@example.com / +91..."
                      className="w-full rounded-xl bg-[#E2E2E5]/70 border border-[#1C1C21]/18 focus:border-[#B45309] focus:outline-none px-4 py-3 text-sm text-[#1C1C21] placeholder:text-[#4A4A52]/60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-role"
                    className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-1.5"
                  >
                    Role / Sport
                  </label>
                  <select
                    id="contact-role"
                    value={roleSport}
                    onChange={(e) => setRoleSport(e.target.value)}
                    className="w-full rounded-xl bg-[#E2E2E5]/70 border border-[#1C1C21]/18 focus:border-[#B45309] focus:outline-none px-4 py-3 text-sm text-[#1C1C21]"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-1.5"
                  >
                    Message / Training Goals *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Share your sport, upcoming tournament calendar, or consultation requirements..."
                    className="w-full rounded-xl bg-[#E2E2E5]/70 border border-[#1C1C21]/18 focus:border-[#B45309] focus:outline-none px-4 py-3 text-sm text-[#1C1C21] placeholder:text-[#4A4A52]/60 resize-none"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-semibold text-[#B45309]" role="alert">
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-6 py-3.5 text-sm font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleEmailCompose}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1C1C21]/25 hover:border-[#1C1C21] bg-[#E2E2E5]/60 hover:bg-[#E2E2E5] text-[#1C1C21] px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#B45309]" />
                    <span>Compose Email</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Footer Navigation & Copyright */}
          <div className="pt-10 pb-8 border-b border-[#EFEFEF]/12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#B45309]/60 shadow-sm shrink-0">
                <img
                  src="/images/nav-coach-avatar.jpg"
                  alt="Coach Lomada Raju"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-editorial font-bold uppercase text-xl tracking-wider leading-none text-[#EFEFEF]">
                  {coachProfile.fullName}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A67C52]">
                  {coachProfile.title}
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2E2E5]/55">
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

      {/* Floating "Message Coach" Quick-Action Pill (Desktop only, appears after scrolling past 550px) */}
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
            className="hidden md:inline-flex fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] border border-[#EFEFEF]/20 shadow-lg cursor-pointer"
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
