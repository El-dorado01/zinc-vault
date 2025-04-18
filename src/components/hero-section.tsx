"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  useEffect(() => {
    // Initially hide subtext elements
    gsap.set(".hero-subtext", { display: "none", opacity: 0 });

    // Animate the largest hero text (h1): left to right with blur
    gsap.fromTo(
      ".hero-title",
      { x: -150, opacity: 0, filter: "blur(10px)" },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          // Show and animate subtext (p, button): diagonal with blur
          gsap.set(".hero-subtext", { display: "block" });
          gsap.fromTo(
            ".hero-subtext",
            { x: -50, y: 50, opacity: 0, filter: "blur(8px)" },
            {
              x: 0,
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.3,
              ease: "power3.out",
            }
          );
        },
      }
    );

    // Image animation with blur
    gsap.fromTo(
      ".hero-image",
      { y: 50, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.7,
        ease: "power3.out",
      }
    );

    // Bouncing arrow animation
    gsap.to(".bounce-arrow", {
      y: 10,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-background pt-6">
      {/* Green Light Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="green-light"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-8 flex flex-col md:flex-row items-center justify-between space-x-3 min-h-[80vh]">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 min-h-[50vh] flex flex-col justify-between space-y-4">
          <div className="flex flex-col gap-6">
            <h1 className="hero-title text-4xl md:text-5xl font-bold text-foreground mb-4 leading-loose">
              Build the Future
            </h1>
            <p className="hero-subtext text-lg md:text-xl text-muted-foreground mb-6">
              Transform your ideas into reality with innovative solutions and
              cutting-edge technology.
            </p>
          </div>
          <Link
            href="/get-started"
            className="hero-subtext inline-block text-center px-6 py-3 bg-primary text-black font-semibold rounded-md hover:bg-primary/90 transition-colors w-[200px] dark:text-white"
          >
            Get Started
          </Link>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 flex justify-center min-h-[50vh]">
          <div className="hero-image relative w-full max-w-md">
            <Image
              src="/teams/person3.jpg" // Replace with your image path
              alt="Hero Image"
              width={500}
              height={500}
              className="object-cover rounded-sm h-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bouncing Arrow Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Link href="#next-section" className="bounce-arrow inline-block">
          <ArrowDown
            className="w-8 h-8 text-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          />
        </Link>
      </div>
    </section>
  );
}
