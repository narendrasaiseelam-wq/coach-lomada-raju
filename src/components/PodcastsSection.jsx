import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Mic, Play, X } from "lucide-react";
import { podcasts } from "../data/portfolioData";

function getYouTubeId(url) {
  if (!url || url.startsWith("[")) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function PodcastThumbnail({ thumbnail, videoId, fallbackImage, title }) {
  const [imgFailed, setImgFailed] = useState(false);

  const src = !imgFailed
    ? thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : fallbackImage)
    : fallbackImage;

  return (
    <img
      src={src}
      alt={title}
      onError={() => setImgFailed(true)}
      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  );
}

export default function PodcastsSection() {
  const [activePodcast, setActivePodcast] = useState(null);

  useEffect(() => {
    if (!activePodcast) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActivePodcast(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePodcast]);

  const activeVideoId = activePodcast
    ? activePodcast.videoId || getYouTubeId(activePodcast.youtubeUrl)
    : null;

  return (
    <section
      id="podcasts"
      className="bg-[#EFEFEF] border-b border-[#1C1C21]/14 py-16 md:py-24 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C1C21]/14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-8 bg-[#B45309]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B45309]">
                In Conversation
              </p>
            </div>
            <h2 className="font-editorial font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl text-[#1C1C21] leading-[0.94] tracking-[-0.01em]">
              PODCASTS &amp; VIDEO INTERVIEWS
            </h2>
          </div>
          <p className="text-sm text-[#4A4A52] max-w-md leading-relaxed">
            Long-form conversations where I speak openly about my journey from Kadapa to national athletics, fitness discipline, and conditioning India&apos;s champions.
          </p>
        </motion.div>

        {/* 2-Column Editorial Podcast Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {podcasts.map((podcast, idx) => {
            const videoId = podcast.videoId || getYouTubeId(podcast.youtubeUrl);
            const hasValidUrl = Boolean(videoId);

            return (
              <motion.article
                key={podcast.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className="group rounded-2xl border border-[#1C1C21]/12 bg-[#E2E2E5]/60 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail with Play Overlay & Duration Pill */}
                  <div
                    onClick={() => setActivePodcast(podcast)}
                    className="relative aspect-video bg-[#1C1C21] overflow-hidden cursor-pointer border-b border-[#1C1C21]/12"
                  >
                    <PodcastThumbnail
                      thumbnail={podcast.thumbnail}
                      videoId={videoId}
                      fallbackImage={podcast.fallbackImage}
                      title={podcast.title}
                    />
                    <div className="absolute inset-0 bg-[#1C1C21]/30 group-hover:bg-[#1C1C21]/20 transition-colors flex items-center justify-center">
                      <span className="w-16 h-16 rounded-full bg-[#B45309] group-hover:bg-[#92400E] text-[#EFEFEF] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </span>
                    </div>

                    {/* Top-Left Channel Badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#1C1C21]/90 text-[#EFEFEF] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] border border-[#EFEFEF]/15">
                      <Mic className="w-3 h-3 text-[#A67C52]" />
                      {podcast.channel}
                    </span>

                    {/* Bottom-Right Duration Pill */}
                    <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1C1C21]/90 text-[#EFEFEF] px-3 py-1.5 text-xs font-bold tabular-nums border border-[#EFEFEF]/15">
                      <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
                      {podcast.durationBadge}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#B45309]">
                      <span>Podcast {podcast.number}</span>
                      <span className="text-[#A67C52]">{podcast.durationLabel}</span>
                    </div>

                    <h3 className="font-editorial font-extrabold uppercase text-2xl sm:text-3xl text-[#1C1C21] leading-tight">
                      {podcast.title}
                    </h3>

                    <p className="text-sm text-[#4A4A52] leading-relaxed">
                      {podcast.description}
                    </p>
                  </div>
                </div>

                {/* Two Clean Actions */}
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActivePodcast(podcast)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-[#EFEFEF] px-6 py-3.5 text-sm font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Here</span>
                  </button>

                  {hasValidUrl ? (
                    <a
                      href={podcast.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#1C1C21]/25 hover:border-[#1C1C21] bg-[#EFEFEF] hover:bg-[#E2E2E5] text-[#1C1C21] px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Open on YouTube</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B45309]" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-xl border border-[#1C1C21]/15 bg-[#EFEFEF]/60 text-[#4A4A52] px-5 py-3.5 text-xs font-bold uppercase tracking-wider">
                      YouTube URL Pending
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Inline Video Player Modal */}
      <AnimatePresence>
        {activePodcast && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={activePodcast.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActivePodcast(null)}
              className="fixed inset-0 bg-[#1C1C21]/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl rounded-2xl bg-[#1C1C21] text-[#EFEFEF] border border-[#EFEFEF]/15 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-[#EFEFEF]/12">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A67C52]">
                    {activePodcast.channel} &bull; {activePodcast.durationBadge}
                  </p>
                  <h3 className="font-editorial font-bold uppercase text-xl sm:text-2xl text-[#EFEFEF] truncate">
                    {activePodcast.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePodcast(null)}
                  className="p-2 rounded-lg border border-[#EFEFEF]/20 hover:border-[#B45309] hover:bg-[#B45309] transition-colors cursor-pointer shrink-0"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Player Stage */}
              <div className="aspect-video bg-[#141418] flex items-center justify-center">
                {activeVideoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                    title={activePodcast.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="p-8 text-center max-w-md space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#B45309]/20 border border-[#B45309] text-[#F59E0B] flex items-center justify-center mx-auto">
                      <Mic className="w-5 h-5" />
                    </div>
                    <h4 className="font-editorial font-bold uppercase text-2xl text-[#EFEFEF]">
                      YouTube Link Ready to Connect
                    </h4>
                    <p className="text-sm text-[#E2E2E5]/75 leading-relaxed">
                      Paste the {activePodcast.channel} YouTube URL into{" "}
                      <code className="text-[#A67C52]">src/data/portfolioData.js</code>{" "}
                      to enable inline playback and auto-load the YouTube thumbnail.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
