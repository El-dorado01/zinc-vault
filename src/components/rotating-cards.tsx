"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { skillsData } from "@/components/items";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RotatingCards = () => {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Stacking animation
    gsap.fromTo(
      ".rotating-cards-grid",
      { y: 0 },
      {
        y: -300,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rotating-cards-grid",
          start: "top 80%",
          end: "top -20%",
          scrub: 2,
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cursor glow effect
    cardRefs.current.forEach((card, index) => {
      if (!card) {
        console.warn(`Card at index ${index} is null`);
        return;
      }
      const glow = card.querySelector(".glow-effect") as HTMLElement | null;

      if (!glow) {
        console.warn(`Glow element not found in card at index ${index}`);
        return;
      }

      const handleMouseMove = (e: MouseEvent) => {
        console.log(
          `Mouse move on card ${index}: x=${e.clientX}, y=${e.clientY}`
        );
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = "1";
      };

      const handleMouseLeave = () => {
        console.log(`Mouse leave on card ${index}`);
        glow.style.opacity = "0";
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <section
      id="rotating-cards"
      className="relative py-8 z-30 max-w-6xl mx-auto px-4"
    >
      <div
        className="rotating-cards-grid grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 w-full gap-5 mx-auto"
        style={{ marginBottom: "-300px" }}
      >
        {skillsData.map(({ id, icon: Icon, title, href, text }, index) => (
          <div
            key={id}
            className={`relative overflow-hidden ${
              id === 1 || id === 4
                ? "col-span-1 md:col-span-2 rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-x-5 md:min-h-[300px] md:pt-6 bg-background border border-muted shadow-sm glowing-border"
                : "row-span-1 rounded-md flex flex-col space-y-8 md:row-span-2 bg-background border border-muted shadow-sm glowing-border"
            }`}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }}
          >
            <div className="glow-effect" />
            <div
              className={`relative z-10 ${
                id === 1 || id === 4
                  ? "flex flex-col items-start justify-center py-7 px-8.5 h-fit max-h-[300px] space-y-2 md:flex-1/2 md:px-6 md:h-full"
                  : "flex flex-col items-start justify-center py-7 px-8.5 h-fit max-h-[300px] space-y-2"
              }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center justify-center bg-accent p-2 rounded-full">
                  <Icon className="size-5" />
                </div>
                <h1 className="font-semi-bold text-lg">{title}</h1>
              </div>
              <p className="text-muted-foreground">{text}</p>
              <Link
                href={href}
                className="flex items-center justify-center space-x-1 text-center py-2 px-4 rounded-full border border-primary mt-3"
              >
                <span>Learn More</span>
                <div className="flex items-center justify-center">
                  <ArrowRight className="size-4.5 lg:6" />
                </div>
              </Link>
            </div>
            <div
              className={`relative z-10 min-h-[300px] flex-1 ml-8.5 ${
                (id === 1 || id === 4) && "md:flex-1/2 md:ml-0"
              }`}
            >
              <div
                className={`absolute right-0 bottom-0 border border-r-0 border-b-0 flex-1/2 w-full h-[300px] rounded-tl-md ${
                  (id === 1 || id === 4) && "md:h-[260px]"
                }`}
              >
                <Image
                  src="/writing.png"
                  alt="E-Commerce"
                  width={300}
                  height={260}
                  className="w-full h-full object-cover rounded-tl-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RotatingCards;
