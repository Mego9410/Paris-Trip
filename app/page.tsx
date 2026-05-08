import HeroSection from "@/components/sections/HeroSection";
import DatesSection from "@/components/sections/DatesSection";
import LoungeSection from "@/components/sections/LoungeSection";
import FlightSection from "@/components/sections/FlightSection";
import ParisSection from "@/components/sections/ParisSection";
import FinaleSection from "@/components/sections/FinaleSection";
import ScrollRefresher from "@/components/ScrollRefresher";
import BackgroundStage from "@/components/BackgroundStage";

export default function Page() {
  return (
    <main className="relative">
      <BackgroundStage />
      <ScrollRefresher />
      <HeroSection />
      <DatesSection />
      <LoungeSection />
      <FlightSection />
      <ParisSection />
      <FinaleSection />
    </main>
  );
}
