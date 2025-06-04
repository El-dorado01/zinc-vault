"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "./items";
import Image from "next/image";


export default function ServicesSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!api) return;

    const updateCurrentSlide = () => {
      const scrollSnap =
        api.selectedScrollSnap?.() ??
        api.scrollSnapList().indexOf(api.scrollProgress());
      setCurrent(scrollSnap);
    };

    updateCurrentSlide();

    let autoplayInterval: NodeJS.Timeout | null = null;
    const startAutoplay = () => {
      if (!isPaused) {
        autoplayInterval = setInterval(() => {
          if (api) api.scrollNext();
        }, 5000); // 5 seconds autoplay
      }
    };

    startAutoplay();
    api.on("select", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [api, isPaused]);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-13">
          Our Services
        </h2>

        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 rounded-lg">
                  {/* Graphic */}
                  <div className="w-full">
                    <Image
                      src={service.graphic}
                      alt={`${service.title} graphic`}
                      width={600}
                      height={300}
                      className="w-full h-[300px] object-cover rounded-md"
                    />
                  </div>
                  {/* Text Content */}
                  <div className="w-full space-y-4">
                    <h3 className="text-2xl font-semibold">
                      {service.title}
                    </h3>
                    <p
                      className={`text-gray-600 transition-all duration-300 ${
                        expanded === index ? "line-clamp-none" : "line-clamp-2"
                      }`}
                    >
                      {service.description}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 text-[#FF0000] hover:text-[#FF0000]/80"
                      onClick={() => toggleExpand(index)}
                    >
                      {expanded === index ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Control Buttons */}
        <div className="flex items-center justify-end gap-4 my-3">
          <Button
            size="icon"
            className="w-9 h-9 rounded-full border bg-transparent border-gray-300 hover:bg-gray-100"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </Button>
          <Button
            size="icon"
            className="w-9 h-9 rounded-full border bg-transparent border-gray-300 hover:bg-gray-100"
            onClick={() => api?.scrollNext()}
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}
