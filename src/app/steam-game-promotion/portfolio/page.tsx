"use client";

// src/components/single-game-page.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
//import SingleGameCarousel from "@/components/single-game-carousel";
import GameDetails from "@/components/game-details";
import GameProblem from "@/components/game-problem";
import GameApproach from "@/components/game-approach";
import GameResult from "@/components/game-result";
import CloseGame from "@/components/close-game";
import { Game } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SingleGamePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchGame = async () => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("name", slug.toString().replace(/-/g, " "))
        .single();

      if (error) {
        toast.error("Failed to fetch game: " + error.message);
        console.error("Fetch game error:", error);
        return;
      }

      setGame(data);
    };

    fetchGame();
  }, [slug]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-5">
      <div className="flex flex-col lg:flex-row gap-4 h-fit">
        <Card className="block lg:hidden rounded-lg relative w-full shadow-sm dark:border-0">
          <CloseGame />
          <CardContent className="p-2 flex flex-col space-y-2">
            <div className="flex items-start justify-start space-x-3">
              <Image
                src={game.thumbnail || "/games/thumbnail5.jpg"}
                alt={game.name}
                width={60}
                height={60}
                className="h-15 w-15 rounded-full object-cover"
              />
              <div className="flex flex-col items-start justify-start space-y-1">
                <h2 className="text-xl font-bold">{game.name}</h2>
                <p className="line-clamp-2 text-muted-foreground">
                  {/* {game.description || "No description available."} */}
                </p>
                <a
                  href={""}
                  target="_blank"
                  className="flex items-center justify-center space-x-2 text-sm mt-2 italic font-bold text-[#00C4FF] hover:underline hover:text-[#00C4FF]/50 transition-colors duration-300 ease-in-out"
                >
                  <User className="size-4" />
                  <span>{game.studio || "Unknown Studio"}</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <SingleGameCarousel images={game.carousel_images || []} /> */}
        <ScrollArea className="flex-1 lg:flex-1/3 flex flex-col items-center justify-start lg:max-h-[80vh] overflow-y-auto lg:mr-2">
          <GameDetails game={game} />
          <GameProblem content={game.problem} />
          <GameApproach content={game.approach} />
          <GameResult />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SingleGamePage;
