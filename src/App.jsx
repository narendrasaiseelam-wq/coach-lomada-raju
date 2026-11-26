import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ArenaMarquee from "./components/ArenaMarquee";
import TrackAchievementsTable from "./components/TrackAchievementsTable";
import ChampionsSpotlight from "./components/ChampionsSpotlight";
import AboutJourney from "./components/AboutJourney";
import CoachingInteractive from "./components/CoachingInteractive";
import PersonalisedGuidance from "./components/PersonalisedGuidance";
import CareerTimeline from "./components/CareerTimeline";
import GalleryLightbox from "./components/GalleryLightbox";
import PodcastsSection from "./components/PodcastsSection";
import EducationHonors from "./components/EducationHonors";
import FooterConnect from "./components/FooterConnect";
import ConnectModal from "./components/ConnectModal";

export default function App() {
  const [connectOpen, setConnectOpen] = useState(false);
  const [connectAudience, setConnectAudience] = useState("athlete");

  const handleOpenConnect = (audienceId = "athlete") => {
    setConnectAudience(audienceId);
    setConnectOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EFEFEF] text-[#1C1C21] flex flex-col">
      <Navbar onOpenConnect={handleOpenConnect} />

      <main className="flex-1">
        <Hero onOpenConnect={handleOpenConnect} />
        <ArenaMarquee />
        <TrackAchievementsTable />
        <ChampionsSpotlight />
        <AboutJourney />
        <CoachingInteractive onOpenConnect={handleOpenConnect} />
        <PersonalisedGuidance onOpenConnect={handleOpenConnect} />
        <CareerTimeline />
        <GalleryLightbox />
        <PodcastsSection />
        <EducationHonors />
      </main>

      <FooterConnect onOpenConnect={handleOpenConnect} />

      <ConnectModal
        isOpen={connectOpen}
        onClose={() => setConnectOpen(false)}
        initialAudienceId={connectAudience}
      />
    </div>
  );
}
