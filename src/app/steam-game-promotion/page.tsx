import GameHero from "@/components/game-hero";
import Image from "next/image";

const SteamGamePage = () => {
  return (
    <>
      <GameHero />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 px-5 py-16 border w-full">
        <div className="flex flex-col space-y-2 items-center justify-center">
          <Image
            src={"/game-bg/mortal-kombat.svg"}
            alt={"MK"}
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <div className="font-semibold text-md text-green-500">
            Sales +300%
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center">
          <Image
            src={"/game-bg/call-of-duty.svg"}
            alt={"MK"}
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <div className="font-semibold text-md text-green-500">
            Wishlists +480%
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center">
          <Image
            src={"/game-bg/call-of-duty.svg"}
            alt={"MK"}
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <div className="font-semibold text-md text-green-500">
            Sales +300%
          </div>
        </div>
      </div>
    </>
  );
};

export default SteamGamePage;
