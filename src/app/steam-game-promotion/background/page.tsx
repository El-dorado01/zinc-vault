import { GameTeams } from "@/components/items";
import { getInitials } from "@/utils/getInitials";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
        {/* Fixed Hero Text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-5">
          <p className="hero-subtext text-lg md:text-xl mb-6">
            Empowering Indie Games with Expertise.
          </p>
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
            We’re passionate about helping Steam games succeed.
          </h1>
        </div>
        {/* Background Image */}
        <Image
          src={"/game-bg/about.jpg"}
          alt="About Bg Image"
          width={2000}
          height={1400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Our Story */}
      <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl">Our Story</h1>
        <div className="flex flex-col md:flex-row space-y-5 items-center justify-center space-x-7 w-full">
          <div className="flex-1/2 w-full rounded-lg self-start">
            <Image
              src={"/game-bg/about.jpg"}
              alt="About Us"
              width={800}
              height={400}
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            />
          </div>
          <div className="flex-1/2 flex flex-col items-center justify-center self-start space-y-3 text-muted-foreground h-full">
            <p className="text-lg">
              We started with a mission to help indie developers overcome
              marketing challenges on Steam. With years of experience in gaming
              and analytics, we specialize in turning struggling games into
              success stories.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              repudiandae dignissimos dolorem optio dolore repellat modi facere
              reprehenderit ipsum aliquid aspernatur.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              repudiandae dignissimos dolorem optio dolore repellat modi facere
              reprehenderit ipsum aliquid.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl">Meet Our Team</h1>
        <div className="flex flex-col md:flex-row space-y-3 items-center justify-center space-x-5 w-full">
          {GameTeams.map((team, index) => (
            <div
              key={index}
              className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <Image
                src={team.image}
                alt={getInitials(team.name)}
                width={120}
                height={120}
                className="h-30 w-30 rounded-full object-cover"
              />
              <h2 className="font-bold">{team.name}</h2>
              <p>{team.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission */}
      <div className="flex flex-col md:flex-row items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl flex-1/2">Our Mission</h1>
        <div className="flex-1/2 flex flex-col items-start justify-center space-y-3">
          <p className="font-bold text-muted-foreground">
            We empower indie developers to succeed on Steam by solving marketing
            challenges with creativity and data.
          </p>
          <Link
            href={"/steam-game-promotion/services"}
            className="flex items-center justify-center space-x-1 text-[#00C4FF] hover:text-[#00C4FF]/60 transition duration-300 ease-in-out font-semibold"
          >
            <span>Learn More About Our Services</span>{" "}
            <ChevronRight className="w-5 h-5" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
