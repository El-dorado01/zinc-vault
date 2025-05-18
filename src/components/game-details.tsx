// src/components/game-details.tsx
import React from "react";
import {
  Facebook,
  //Inbox,
  Instagram,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CloseGame from "./close-game";
import { Game } from "@/types";

interface GameDetailsProps {
  game: Game;
}

const GameDetails = ({ game }: GameDetailsProps) => {
  return (
    <Card className="rounded-lg relative w-full shadow-sm dark:border-0">
      <CardContent className="p-3 lg:p-4 flex flex-col space-y-2">
        <div className="hidden lg:flex items-start justify-start space-x-3">
          <CloseGame />
          <Image
            src={game.thumbnail || "/games/thumbnail5.jpg"}
            alt={game.name}
            width={100}
            height={100}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-start justify-start space-y-1">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p className="line-clamp-2 text-muted-foreground">
              {game.description || "No description available."}
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
        <h1 className="text-bold text-xl lg:text-2xl mb-5 lg:my-5">
          {game.name} - Noxus Arena
        </h1>
        <p className="text-muted-foreground">
          {game.description ||
            "We had the amazing opportunity to work as the 3D Art Director for this game."}
        </p>
        <p className="underline cursor-pointer">Show more</p>
        <div className="flex flex-wrap items-center justify-between gap-3 my-2">
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Facebook className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Instagram className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Twitter className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Linkedin className="size-5" />
            <span>Share</span>
          </a>
        </div>
        <h2 className="text-bold text-xl my-5">Tools and Systems</h2>
        <div className="flex flex-wrap gap-2">
          {game.tools?.map((tool, index) => (
            <div
              key={index}
              className="flex items-center justify-center py-1 px-2 space-x-2 bg-neutral-100 dark:bg-neutral-800 w-fit rounded-sm"
            >
              <Image
                src={
                  tool === "Blender"
                    ? "/blender.png"
                    : tool === "Photoshop"
                      ? "/Photoshop.png"
                      : "/placeholder.png"
                }
                alt={tool}
                width={20}
                height={20}
                className="size-5 object-contain"
              />
              <span>{tool}</span>
            </div>
          ))}
          {(!game.tools || game.tools.length === 0) && (
            <div className="text-muted-foreground">No tools specified.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameDetails;
