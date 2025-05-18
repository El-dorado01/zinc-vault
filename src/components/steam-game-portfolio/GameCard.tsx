// src/components/steam-game-portfolio/GameCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, Star } from "lucide-react";
import { Game } from "@/types";
import { getInitials, splitAndJoin } from "@/utils/getInitials";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
  onAddToSpecialList: (gameId: string) => void;
}

const GameCard = ({
  game,
  onEdit,
  onDelete,
  onAddToSpecialList,
}: GameCardProps) => {
  return (
    <div className="border w-full h-full rounded-md relative group">
      <Link
        href={`/steam-game-promotion/portfolio/${splitAndJoin(game.name)}`}
        className="rounded-md"
      >
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 ease-in-out group-hover:h-3/4 z-0 rounded-bl-md rounded-br-md"></div>
        <Image
          src={game.thumbnail || "/games/thumbnail5.jpg"}
          alt={getInitials(game.name)}
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={() => onEdit(game)}>
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(game)}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToSpecialList(game.id)}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
