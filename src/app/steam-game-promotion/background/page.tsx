"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/utils/getInitials";
import { fetchGameBackground } from "@/lib/game-background/gameUtils";
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import sanitizeHtml from "sanitize-html";

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
}

interface GameBackground {
  id: string | null;
  content: any; // TiptapJson | undefined
  company_image: string | null;
  team_members: TeamMember[];
}

const tiptapToHTML = (tiptapJson: any): string => {
  try {
    if (!tiptapJson || typeof tiptapJson !== "object" || !tiptapJson.content) {
      console.warn("Invalid Tiptap JSON structure:", tiptapJson);
      return "";
    }

    const html = generateHTML(tiptapJson, [
      Document,
      Paragraph,
      Text,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
    ]);

    return sanitizeHtml(html, {
      allowedTags: ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li"],
      allowedAttributes: {},
    });
  } catch (error) {
    console.error("Error converting Tiptap JSON to HTML:", {
      error,
      tiptapJson,
    });
    return "";
  }
};

const AboutPage = () => {
  const [gameBackground, setGameBackground] = useState<GameBackground | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch game background data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGameBackground();
        setGameBackground(data);
      } catch (error) {
        console.error("Failed to fetch game background:", error);
        // Toast is handled in fetchGameBackground
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-5">
          <p className="hero-subtext text-lg md:text-xl mb-6">
            Empowering Indie Games with Expertise.
          </p>
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
            We&apos;re passionate about helping Steam games succeed.
          </h1>
        </div>
        <Image
          src="/game-bg/about.jpg"
          alt="About Bg Image"
          width={2000}
          height={1400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Our Story */}
      <div className="relative flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl">Our Story</h1>
        {isLoading ? (
          <div className="flex flex-col md:flex-row space-y-5 items-center justify-center space-x-7 w-full">
            <div className="flex-1/2 w-full">
              <Skeleton className="w-full h-64 rounded-lg" />
            </div>
            <div className="flex-1/2 flex flex-col space-y-3 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row space-y-5 items-center justify-center space-x-7 w-full">
            <div className="flex-1/2 w-full rounded-lg self-start">
              <Image
                src={gameBackground?.company_image || "/game-bg/about.jpg"}
                alt="About Us"
                width={800}
                height={400}
                className="w-full h-full max-h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              />
            </div>
            <div
              className="flex-1/2 flex flex-col items-center justify-center self-start space-y-3 text-muted-foreground h-full"
              dangerouslySetInnerHTML={{
                __html: gameBackground?.content
                  ? tiptapToHTML(gameBackground.content)
                  : `
                    <p class="text-lg">
                      We started with a mission to help indie developers overcome marketing challenges on Steam. With years of experience in gaming and analytics, we specialize in turning struggling games into success stories.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae dignissimos dolorem optio dolore repellat modi facere reprehenderit ipsum aliquid aspernatur.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae dignissimos dolorem optio dolore repellat modi facere reprehenderit ipsum aliquid.
                    </p>
                  `,
              }}
            />
          </div>
        )}
      </div>

      {/* Meet Our Team */}
      <div className="relative flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="font-bold text-3xl">Meet Our Team</h1>
        {isLoading ? (
          <div className="flex flex-col md:flex-row space-y-3 items-center justify-center space-x-5 w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6"
              >
                <Skeleton className="h-30 w-30 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : gameBackground?.team_members.length === 0 ? (
          <div className="text-center py-6 text-gray-600 w-full">
            No team members available
          </div>
        ) : (
          <div className="flex flex-col md:flex-row space-y-3 items-center justify-center space-x-5 w-full">
            {gameBackground?.team_members.map((team, index) => (
              <div
                key={index}
                className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                <Image
                  src={team.image || "/game-bg/about.jpg"}
                  alt={getInitials(team.name)}
                  width={120}
                  height={120}
                  className="h-30 w-30 rounded-full object-cover"
                />
                <h2 className="font-bold">{team.name || "Unnamed Member"}</h2>
                <p>{team.role || "No Role"}</p>
              </div>
            ))}
          </div>
        )}
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
            href="/steam-game-promotion/services"
            className="flex items-center justify-center space-x-1 text-[#00C4FF] hover:text-[#00C4FF]/60 transition duration-300 ease-in-out font-semibold"
          >
            <span>Learn More About Our Services</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
