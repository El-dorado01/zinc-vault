import GameHero from "@/components/game-hero";
import ServicesOverviewComponent from "@/components/services-overview";
import { TrustSignalsComponent } from "@/components/trust-signals";

const SteamGamePage = () => {
  return (
    <>
      <GameHero />
      <TrustSignalsComponent />
      <ServicesOverviewComponent />
      <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-10 space-y-3">
        <h1 className="font-bold text-3xl mb-13">
          Success Story: CyberSmith’s BattleForge
        </h1>
      </div>
    </>
  );
};

export default SteamGamePage;
