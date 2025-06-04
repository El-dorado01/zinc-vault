import Image from "next/image";
import { User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import SingleGameCarousel from "@/components/single-game-carousel";
import GameDetails from "@/components/game-details-keep";
import GameProblem from "@/components/game-problem-keep";
import GameApproach from "@/components/game-approach-keep";
import GameResult from "@/components/game-result";
import CloseGame from "@/components/close-game";

const SingleGamePage = () => {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row gap-4 h-fit">
          <Card className="block lg:hidden rounded-lg relative w-full shadow-sm dark:border-0">
            <CloseGame />
            <CardContent className="p-2 flex flex-col space-y-2">
              <div className="flex items-start justify-start space-x-3">
                <Image
                  src={"/games/thumbnail5.jpg"}
                  alt=""
                  width={60}
                  height={60}
                  className="h-15 w-15 rounded-full object-cover"
                />
                <div className="flex flex-col items-start justify-start space-y-1">
                  <h2 className="text-xl font-bold">League of Legends</h2>
                  <p className="line-clamp-2 text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi, dolore.
                  </p>
                  <a
                    href={""}
                    target="_blank"
                    className="flex items-center justify-center space-x-2 text-sm mt-2 italic font-bold text-[#00C4FF] hover:underline hover:text-[#00C4FF]/50 transition-colors duration-300 ease-in-out"
                  >
                    <User className="size-4" />
                    <span>CyberSmith Studio</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          <SingleGameCarousel />
          <ScrollArea className="flex-1 lg:flex-1/3 flex flex-col items-center justify-start lg:max-h-[80vh] overflow-y-auto lg:mr-2">
            <GameDetails />
            <GameProblem />
            <GameApproach />
            <GameResult />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default SingleGamePage;
