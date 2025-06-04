"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { gameBgImages } from "./items";
import Link from "next/link";

export default function GameHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
      {/* Fixed Hero Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-3 md:px-5">
        <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Revive Your Steam Game with Smart Marketing
        </h1>
        <p className="hero-subtext text-lg md:text-xl mb-6">
          We turn struggling indie games into Steam success stories with small
          budgets and big results.
        </p>
        <Link
          href={"/steam-game-promotion/background"}
          className="mt-4 px-6 py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60"
        >
          Learn More
        </Link>
      </div>

      {/* Carousel for Background gameBgImages */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {gameBgImages.map((image, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="relative w-full h-screen">
                {/* <div className="absolute inset-0 bg-[#00C4FF]/20 z-0"> */}
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={2000}
                  height={1400}
                />
                {/* </div> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
