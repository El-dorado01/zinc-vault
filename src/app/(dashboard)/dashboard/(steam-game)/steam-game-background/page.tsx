// src/components/SteamGameBackground.tsx
"use client";

import { useEffect, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "@/components/heading";
import Image from "next/image";
import EditGameBackground from "@/components/edit-game-background";
import EditGameTeam from "@/components/edit-game-team";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchGameBackground } from "@/lib/game-background/gameUtils";
import { TiptapJson, TeamMember } from "@/types";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const SteamGameBackground = () => {
  const [backgroundData, setBackgroundData] = useState<{
    id: string | null;
    content: TiptapJson | undefined;
    company_image: string | null;
    team_members: TeamMember[];
  }>({
    id: null,
    content: undefined,
    company_image: null,
    team_members: [],
  });

  // Fetch game background data
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGameBackground();
      setBackgroundData(data);
    };
    loadData();
  }, []);

  // Generate HTML from Tiptap JSON
  const renderContent = (content?: TiptapJson) => {
    if (!content) return "";
    try {
      return generateHTML(content, [StarterKit]);
    } catch (error) {
      console.error("Failed to generate HTML from Tiptap JSON:", error);
      return "";
    }
  };

  return (
    <SidebarInset>
      <DashboardBreadcrumb />
      <div className="min-h-[100vh] flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
        <Heading
          title="Steam Game Promotion - Background"
          description="Make changes to your steam game promotion background page here. You can drag the resizable handle to move the sections around."
          classname="mb-4"
        />
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[200px] rounded-lg border w-full"
        >
          {/* Our Story Section */}
          <ResizablePanel defaultSize={70} minSize={5}>
            <ScrollArea className="h-full w-full p-6">
              <div className="relative w-full overflow-hidden flex h-full items-center justify-center hover:[&_#editGameBgButton]:flex">
                <EditGameBackground section="Background" />
                <div className="flex flex-col items-start justify-start w-full mx-auto py-5 space-y-10">
                  <h1 className="font-bold text-3xl">Our Story</h1>
                  <div className="flex flex-col md:flex-row space-y-5 items-center justify-center space-x-7 w-full">
                    <div className="flex-1/2 w-full rounded-lg self-start">
                      {backgroundData.company_image ? (
                        <Image
                          src={backgroundData.company_image}
                          alt="About Us"
                          width={800}
                          height={400}
                          className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="/game-bg/about.jpg"
                          alt="About Us"
                          width={800}
                          height={400}
                          className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex-1/2 flex flex-col items-center justify-center self-start space-y-3 text-muted-foreground h-full">
                      {backgroundData.content ? (
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: renderContent(backgroundData.content),
                          }}
                        />
                      ) : (
                        <>
                          <p className="text-lg">
                            We started with a mission to help indie developers
                            overcome marketing challenges on Steam. With years
                            of experience in gaming and analytics, we specialize
                            in turning struggling games into success stories.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sequi repudiandae dignissimos dolorem optio
                            dolore repellat modi facere reprehenderit ipsum
                            aliquid aspernatur.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sequi repudiandae dignissimos dolorem optio
                            dolore repellat modi facere reprehenderit ipsum
                            aliquid.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* Meet Our Team Section */}
          <ResizablePanel defaultSize={30} minSize={5}>
            <ScrollArea className="h-full w-full p-6">
              <div className="relative w-full overflow-hidden flex h-full items-center justify-center hover:[&_#editTeamButton]:flex">
                <EditGameTeam section="Our Team" />
                <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
                  <h1 className="font-bold text-3xl">Meet Our Team</h1>
                  <div className="flex flex-col md:flex-row space-y-3 items-center justify-center space-x-5 w-full">
                    {backgroundData.team_members.length > 0 ? (
                      backgroundData.team_members.map((member, index) => (
                        <div
                          key={index}
                          className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
                        >
                          <Image
                            src={member.image || "/teams/person1.jpg"}
                            alt={member.name || `Team Member ${index + 1}`}
                            width={120}
                            height={120}
                            className="h-30 w-30 rounded-full object-cover"
                            loading="lazy"
                          />
                          <h2 className="font-bold">
                            {member.name || "Name Goes Here"}
                          </h2>
                          <p>{member.role || "Team Role goes in here"}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
                          <Image
                            src="/teams/person1.jpg"
                            alt="Team Member 1"
                            width={120}
                            height={120}
                            className="h-30 w-30 rounded-full object-cover"
                            loading="lazy"
                          />
                          <h2 className="font-bold">Name Goes Here</h2>
                          <p>Team Role goes in here</p>
                        </div>
                        <div className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
                          <Image
                            src="/teams/person1.jpg"
                            alt="Team Member 2"
                            width={120}
                            height={120}
                            className="h-30 w-30 rounded-full object-cover"
                            loading="lazy"
                          />
                          <h2 className="font-bold">Name Goes Here</h2>
                          <p>Team Role goes in here</p>
                        </div>
                        <div className="flex-1/3 flex flex-col items-center justify-center space-y-3 py-5 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
                          <Image
                            src="/teams/person1.jpg"
                            alt="Team Member 3"
                            width={120}
                            height={120}
                            className="h-30 w-30 rounded-full object-cover"
                            loading="lazy"
                          />
                          <h2 className="font-bold">Name Goes Here</h2>
                          <p>Team Role goes in here</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarInset>
  );
};

export default SteamGameBackground;
