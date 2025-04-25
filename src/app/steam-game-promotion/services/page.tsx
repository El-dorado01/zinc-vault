import { ServicesOverview } from "@/components/items";
import Image from "next/image";
import React from "react";

const ServicesPage = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
        {/* Fixed Hero Text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-5">
          <p className="hero-subtext text-lg md:text-xl mb-6">
            Tailored Solutions for Steam Success
          </p>
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Our services are designed to rescue and revive your game.
          </h1>
        </div>
        {/* Background Image */}
        <Image
          src={"/game-bg/about.jpg"}
          alt="Services Bg Image"
          width={2000}
          height={1400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Our Story */}
      {ServicesOverview.map(
        ({ name, icon: Icon, text, process, extraText }, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10"
          >
            <h1 className="font-bold text-3xl">{name}</h1>
            <div className="flex flex-col md:flex-row space-y-5 items-center justify-start space-x-7 w-full">
              <div className="flex flex-col md:flex-1/3 space-y-4 items-start justify-center self-start py-4">
                <div className="flex items-center justify-center space-x-5">
                  <div className="rounded-full p-2 flex items-center justify-center h-12 w-12 self-start">
                    <Icon className="size-8" />
                  </div>
                  <p className="leading-snug">{text}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-1/3 space-y-4 items-start justify-center self-start py-4">
                {process && (
                  <>
                    <h2 className="text-2xl font-semibold">{process.key}</h2>
                    <p className="leading-snug">{process.text}</p>
                  </>
                )}
                <h2 className="text-2xl font-semibold">{extraText.key}</h2>
                <p className="leading-snug">{extraText.text}</p>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ServicesPage;
