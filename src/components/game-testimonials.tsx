"use client"; 

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Testimonials } from "./items";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { getInitials } from "@/lib/getInitials";

const GameTestimonials = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-10 space-y-3">
      <h1 className="font-bold text-3xl mb-13">Testimonials</h1>
      <div className="w-full md:px-5">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {Testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <Card>
                  <CardContent className="flex flex-col md:flex-row gap-5 items-center justify-center">
                    <Image
                      src={testimonial.image}
                      alt={getInitials(testimonial.name)}
                      width={120}
                      height={120}
                      className="w-30 h-30 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <h3 className="font-semibold text-muted-foreground line-clamp-3">
                        {testimonial.message}
                      </h3>
                      <p className="self-end italic">~ {testimonial.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default GameTestimonials;
