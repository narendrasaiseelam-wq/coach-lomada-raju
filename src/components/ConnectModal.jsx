import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, MapPin, X, ArrowUpRight } from "lucide-react";
import { coachProfile, coachingPathways } from "../data/portfolioData";

const AUDIENCE_OPTIONS = [
  {
    id: "athletes",
    label: "Competitive Athlete",
    prompt: coachingPathways[0].whatsappPrompt,
  },
  {
    id: "teams",
    label: "Sports Team / Academy",
    prompt: coachingPathways[1].whatsappPrompt,
  },
  {
    id: "youth",
    label: "Kids & Students",
    prompt: coachingPathways[2].whatsappPrompt,
  },
  {
    id: "professionals",
    label: "Doctor / Officer / Executive",
    prompt: coachingPathways[3].whatsappPrompt,
  },
];

export default function ConnectModal({ isOpen, onClose, initialAudienceId = "athletes" }) {
  const [name, setName] = useState("");
  const [userSelection, setUserSelection] = useState(null);
  const [goalNote, setGoalNote] = useState("");

  const selectedAudience = userSelection ?? initialAudienceId;

  const handleClose = () => {
    setUserSelection(null);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setUserSelection(null);
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const activeOption =
    AUDIENCE_OPTIONS.find((opt) => opt.id === selectedAudience) || AUDIENCE_OPTIONS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedGoal = goalNote.trim();

    const parts = [
      trimmedName
        ? `Hi Coach Lomada Raju, my name is ${trimmedName}.`
        : "Hi Coach Lomada Raju,",
      `Category: ${activeOption.label}.`,
      activeOption.prompt.replace(/^Hi Coach Lomada Raju,\s*/i, ""),
    ];

    if (trimmedGoal) {
      parts.push(`Goal / Sport: ${trimmedGoal}`);
    }

    const message = encodeURIComponent(parts.join(" "));
    const url = `https://wa.me/${coachProfile.whatsappNumber}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="connect-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1C1C21]/75 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-[#EFEFEF] border border-[#1C1C21]/20 text-[#1C1C21] shadow-xl overflow-hidden"
          >
            {/* Top Header Band */}
            <div className="bg-[#1C1C21] text-[#EFEFEF] px-6 py-5 flex items-start justify-between gap-4 border-b border-[#EFEFEF]/10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A67C52] mb-1">
                  Direct Coaching Enquiry
                </p>
                <h2
                  id="connect-modal-title"
                  className="font-editorial font-extrabold uppercase text-3xl tracking-wide leading-none"
                >
                  Connect with {coachProfile.fullName}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-[#E2E2E5]/70 hover:text-[#EFEFEF] border border-[#EFEFEF]/15 hover:border-[#EFEFEF]/40 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="visitor-name"
                  className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-2"
                >
                  Your Name
                </label>
                <input
                  id="visitor-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-[#E2E2E5]/70 border border-[#1C1C21]/20 focus:border-[#9E2A2B] focus:outline-none px-4 py-3 text-sm text-[#1C1C21] placeholder:text-[#4A4A52]/60"
                />
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-2">
                  I am enquiring as
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AUDIENCE_OPTIONS.map((option) => {
                    const isSelected = option.id === selectedAudience;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setUserSelection(option.id)}
                        className={`text-left px-3.5 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#1C1C21] text-[#EFEFEF] border-[#1C1C21]"
                            : "bg-[#E2E2E5]/50 text-[#1C1C21] border-[#1C1C21]/18 hover:border-[#1C1C21]/45"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="visitor-goal"
                  className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1C1C21] mb-2"
                >
                  Sport / Goal <span className="text-[#4A4A52] font-normal">(Optional)</span>
                </label>
                <input
                  id="visitor-goal"
                  type="text"
                  value={goalNote}
                  onChange={(e) => setGoalNote(e.target.value)}
                  placeholder="e.g., Badminton speed & injury prevention, or online plan"
                  className="w-full bg-[#E2E2E5]/70 border border-[#1C1C21]/20 focus:border-[#9E2A2B] focus:outline-none px-4 py-3 text-sm text-[#1C1C21] placeholder:text-[#4A4A52]/60"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#9E2A2B] hover:bg-[#7F2021] text-[#EFEFEF] py-3.5 px-5 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Message</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Direct Contact Footer */}
              <div className="pt-4 border-t border-[#1C1C21]/14 text-xs text-[#4A4A52] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" />
                  <span>
                    Direct: <strong className="text-[#1C1C21]">{coachProfile.phonePrimary}</strong> &bull;{" "}
                    {coachProfile.phoneSecondary}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0 mt-0.5" />
                  <span>{coachProfile.location}</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
