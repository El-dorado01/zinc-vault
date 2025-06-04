"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

const youtubeBgVideos = [
  "/youtube-bg/youtube-icon.mp4",
  "/youtube-bg/youtube-icon.mp4",
  "/youtube-bg/youtube-icon.mp4",
];

export default function YouTubeHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // Fallback if selectedScrollSnap is not available
    const updateCurrentSlide = () => {
      const scrollSnap =
        api.selectedScrollSnap?.() ??
        api.scrollSnapList().indexOf(api.scrollProgress());
      setCurrent(scrollSnap);
    };

    updateCurrentSlide(); // Set initial slide

    const totalSlides = youtubeBgVideos.length;
    const updateProgress = () => {
      const elapsed = (Date.now() % 4000) / 4000;
      setProgress(elapsed * 100);
    };

    api.on("select", updateCurrentSlide);
    const interval = setInterval(updateProgress, 50);

    return () => {
      api.off("select", updateCurrentSlide);
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
      {/* Fixed Hero Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/40 px-4 md:px-6">
        <h1 className="hero-title text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
          Boost Your YouTube Channel with Automation
        </h1>
        <p className="hero-subtext text-lg md:text-2xl mb-8 max-w-2xl">
          Skyrocket views, grow subscribers, and monetize faster with smart
          automation and proven promotion strategies.
        </p>
        <Link
          href={"/youtube-promotion/automation"}
          className="mt-4 px-8 py-3 bg-[#FF0000] text-white font-semibold rounded-full hover:bg-[#FF0000]/80 transition-colors duration-300"
        >
          Start Growing Now
        </Link>
      </div>

      {/* Carousel for Background Videos */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {youtubeBgVideos.map((video, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="relative w-full h-screen">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src={video}
                  aria-label={`Video Slide ${index + 1}`}
                />
                <div className="absolute inset-0 bg-[#FF0000]/10 z-0" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Circular Progress Indicator */}
      <div className="absolute bottom-4 right-4 z-20">
        <svg width="40" height="40" viewBox="0 0 60 60" className="relative">
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="5"
          />
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#FF0000"
            strokeWidth="5"
            strokeDasharray="157"
            strokeDashoffset={157 - (progress * 157) / 100}
            transform="rotate(-90 30 30)"
          />
          <text
            x="30"
            y="30"
            textAnchor="middle"
            dy=".3em"
            className="text-white text-sm font-semibold"
          >
            {current + 1}/{youtubeBgVideos.length}
          </text>
        </svg>
      </div>
    </div>
  );
}
