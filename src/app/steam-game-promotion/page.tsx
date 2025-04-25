import GameHero from "@/components/game-hero";
import GameTestimonials from "@/components/game-testimonials";
import ServicesOverviewComponent from "@/components/services-overview";
import SuccessStory from "@/components/success-story";
import { TrustSignalsComponent } from "@/components/trust-signals";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SteamGamePage = () => {
  return (
    <>
      <GameHero />
      <ServicesOverviewComponent />
      <TrustSignalsComponent />
      <SuccessStory />
      <GameTestimonials />
      <div className="flex flex-col md:flex-row items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl flex-1/2">
          Ready to promote your game?
        </h1>
        <div className="flex-1/2 flex flex-col items-start justify-center space-y-3">
          <p className="font-bold text-muted-foreground">
            Take your game to the next level with tailored marketing strategies
            designed to boost visibility, engage players, and drive success on
            Steam. Let’s help your game stand out and reach the audience it
            truly deserves.
          </p>
          <Link
            href={"/contact"}
            className="flex items-center justify-center space-x-1 text-[#00C4FF] hover:text-[#00C4FF]/60 transition duration-300 ease-in-out font-semibold"
          >
            <span>Contact Us</span> <ChevronRight className="w-5 h-5" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SteamGamePage;
