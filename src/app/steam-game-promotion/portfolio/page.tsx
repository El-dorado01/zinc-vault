"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Games, PortfolioGames } from "@/components/items";
import Link from "next/link";
import { getInitials, splitAndJoin } from "@/lib/getInitials";

const PortfolioPage = () => {
  return (
    <>
      <div className="w-full px-4 md:px-8 xl:px-35 py-5">
        <Carousel className="w-full">
          <CarouselContent className="px-4">
            {PortfolioGames.map((game, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 lg:basis-1/3 h-50 pl-2"
              >
                <Link
                  href={`/steam-game-promotion/portfolio/${splitAndJoin(
                    game.name
                  )}`}
                  className="w-full h-full rounded-lg relative overflow-hidden group"
                >
                  {/* Gradient background with hover effect */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 ease-in-out group-hover:h-3/4 z-0 rounded-bl-lg rounded-br-lg"></div>

                  <Image
                    src={game.image}
                    alt={getInitials(game.name)}
                    width={850}
                    height={500}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-start justify-between text-muted-foreground">
                    <div className="flex items-start justify-between w-full p-4">
                      {game.firstIcon && (
                        <div className="px-2 py-1 rounded-full bg-background">
                          Art Blast
                        </div>
                      )}
                      {game.secondIcon && (
                        <div className="py-1 px-2 rounded-md bg-background">
                          Ad
                        </div>
                      )}
                    </div>
                    <div className=" text-white text-shadow-lg p-4 w-full">
                      <h2 className="line-clamp-2 leading-snug text-xl font-bold">
                        {game.name}
                      </h2>
                      {game.description && (
                        <p className="line-clamp-2 leading-snug text-lg">
                          {game.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute left-1" />
          <CarouselNext className="hidden md:flex absolute right-1" />
        </Carousel>
      </div>
      <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-10 space-y-10">
        <h1 className="font-bold text-3xl">Case Studies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 w-full min-h-screen gap-2">
          {Games.map((game, index) => (
            <div key={index} className="border w-full h-full rounded-md">
              <Link
                href={`/steam-game-promotion/portfolio/${splitAndJoin(
                  game.name
                )}`}
                className="rounded-md relative group"
              >
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 ease-in-out group-hover:h-3/4 z-0 rounded-bl-md rounded-br-md"></div>
                <Image
                  src={game.thumbnail}
                  alt={getInitials(game.name)}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
