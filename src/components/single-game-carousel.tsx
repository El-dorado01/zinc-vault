"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const SingleGameCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  return (
    <div className="flex-1 lg:flex-2/3 border rounded-lg p-4 md:py-15 flex items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="h-[35vh] sm:h-[60vh]">
          <CarouselItem className="h-full w-full">
            <Image
              src={"/games/zugzug-1.jpg"}
              alt=""
              width={1900}
              height={1000}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-full w-full">
            <Image
              src={"/games/zugzug-2.jpg"}
              alt=""
              width={1900}
              height={1000}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-full w-full">
            <Image
              src={"/games/zugzug-3.jpg"}
              alt=""
              width={1900}
              height={1000}
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default SingleGameCarousel;
