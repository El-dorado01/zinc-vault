import GameHero from "@/components/game-hero";
import GameTestimonials from "@/components/game-testimonials";
import ServicesOverviewComponent from "@/components/services-overview";
import SuccessStory from "@/components/success-story";
import { TrustSignalsComponent } from "@/components/trust-signals";

const SteamGamePage = () => {
  return (
    <>
      <GameHero />
      <ServicesOverviewComponent />
      <TrustSignalsComponent />
      <SuccessStory />
      <GameTestimonials />
    </>
  );
};

export default SteamGamePage;
