"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "@/components/heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EditGameOverview from "@/components/edit-game-overview";
import { TrendingUp } from "lucide-react";
import WishlistChart from "@/components/wishlist-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditTrustSignals from "@/components/edit-trust-signals";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchHeroContent } from "@/actions/heroContent";
import {
  fetchTrustSignals,
} from "@/lib/trust-signals/trustSignalUtils";
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TiptapHeading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import sanitizeHtml from "sanitize-html";
import { TrustSignal } from "@/lib/trust-signals/formSchema";

interface HeroContent {
  id: string;
  hero_texts: {
    main: any; // TiptapJson
    sub: any; // TiptapJson
  };
  image_paths: string[];
  created_at: string;
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
      TiptapHeading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
    ]);

    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "br",
        "strong",
        "em",
        "b",
        "i",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
      ],
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

const SteamGameOverview = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isTrustSignalsLoading, setIsTrustSignalsLoading] = useState(true);

  // Fetch hero content
  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        setIsHeroLoading(true);
        const fetchedContent = await fetchHeroContent();
        if (fetchedContent.length > 0) {
          setHeroContent(fetchedContent[0]);
        } else {
          toast.info("No hero content found, using default values");
        }
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
        toast.error("Failed to load hero content");
      } finally {
        setIsHeroLoading(false);
      }
    };
    loadHeroContent();
  }, []);

  // Fetch trust signals
  useEffect(() => {
    const loadTrustSignals = async () => {
      try {
        setIsTrustSignalsLoading(true);
        const fetchedSignals = await fetchTrustSignals();
        setTrustSignals(fetchedSignals);
      } catch (error) {
        console.error("Failed to fetch trust signals:", error);
        toast.error("Failed to load trust signals");
      } finally {
        setIsTrustSignalsLoading(false);
      }
    };
    loadTrustSignals();
  }, []);

  return (
    <>
      <SidebarInset>
        <DashboardBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
          <Heading
            title="Steam Game Promotion - Overview"
            description="Make changes to your steam game promotion overview page here. You can drag the resizable handle to move the sections around."
            classname="mb-4"
          />
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] rounded-lg border w-full"
          >
            {/* Hero Section */}
            <ResizablePanel defaultSize={80} minSize={5}>
              <div className="relative w-full flex h-full items-center justify-center hover:[&_#editGameButton]:flex">
                <EditGameOverview section="Hero" />
                {isHeroLoading ? (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-3 md:px-5 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-3 md:px-5">
                    <h1
                      className="hero-title text-xl md:text-2xl font-bold md:mb-4 leading-tight line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html: heroContent?.hero_texts.main
                          ? tiptapToHTML(heroContent.hero_texts.main)
                          : "Revive Your Steam Game with Smart Marketing",
                      }}
                    />
                    <p
                      className="hero-subtext text-lg md:mb-6 line-clamp-1 md:line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: heroContent?.hero_texts.sub
                          ? tiptapToHTML(heroContent.hero_texts.sub)
                          : "We turn struggling indie games into Steam success stories with small budgets and big results.",
                      }}
                    />
                    <Button className="mt-2 md:mt-4 px-3 py-1 md:px-6 md:py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60">
                      Learn More
                    </Button>
                  </div>
                )}
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                  {isHeroLoading ? (
                    <Skeleton className="w-full h-full rounded-none" />
                  ) : (
                    <Image
                      src={
                        heroContent?.image_paths[0] || "/game-bg/watchdogs.jpg"
                      }
                      alt="Hero Background Image"
                      className="w-full h-full object-cover"
                      width={2000}
                      height={1400}
                    />
                  )}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Trust Signals Section */}
            <ResizablePanel defaultSize={10} minSize={5}>
              <ScrollArea className="h-full w-full p-6">
                <div className="flex flex-col items-start justify-start w-full mx-auto space-y-6 bg-sidebar relative hover:[&_#editTrustButton]:flex">
                  <EditTrustSignals section="Trust Signals" />
                  <div className="flex items-center justify-between w-full">
                    <h1 className="font-bold text-2xl">Trust Signals</h1>
                    <Image
                      src="/game-bg/steam.gif"
                      alt="Steam Logo"
                      width={100}
                      height={100}
                      unoptimized
                    />
                  </div>
                  {isTrustSignalsLoading ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm p-4 my-3 w-full bg-sidebar"
                        >
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-12 w-12" />
                          <Skeleton className="h-5 w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : trustSignals.length === 0 ? (
                    <div className="text-center py-6 text-gray-600 w-full">
                      No trust signals available
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                      {trustSignals.map((signal) => (
                        <div
                          key={signal.id}
                          className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-105 bg-sidebar"
                        >
                          <h2 className="font-semibold text-xl mb-2 line-clamp-1">
                            {signal.game_name || "Unnamed Signal"}
                          </h2>
                          <Image
                            src={signal.image_path || "/placeholder.jpg"}
                            alt={`${signal.game_name || "Signal"} logo`}
                            width={48}
                            height={48}
                            className="h-12 w-12"
                          />
                          <div
                            className={`font-semibold text-md ${
                              signal.comment ? "text-green-500" : ""
                            } flex items-center justify-center space-x-2`}
                          >
                            <span>{signal.comment || "Saved our launch!"}</span>
                            {signal.comment && (
                              <TrendingUp className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Success Story Section */}
            <ResizablePanel defaultSize={10} minSize={5}>
              <ScrollArea className="h-full w-full p-6">
                <div className="flex flex-col items-start justify-start w-full mx-auto space-y-6 bg-sidebar relative hover:[&_#editButton]:flex">
                  <h1 className="font-bold text-2xl mb-13 line-clamp-1">
                    Success Story: CyberSmith’s BattleForge
                  </h1>
                  <div className="flex flex-col w-full xl:flex-row items-center justify-center md:justify-between gap-5">
                    <div className="flex-1 md:flex-1/2 w-full flex flex-col space-y-4 items-center justify-center min-h-[55vh]">
                      <div className="w-full border rounded-md">
                        <Image
                          src="/games/image1.jpg"
                          alt="Image"
                          width={400}
                          height={300}
                          className="w-full min-h-[35vh] object-cover rounded-md"
                        />
                      </div>
                      <div className="w-fit line-clamp-3 leading-snug text-muted-foreground font-semibold">
                        Struggling with only 300 units sold, we optimized...
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cupiditate dolor dicta id consequatur pariatur
                        corporis a, labore repellat illo, omnis voluptates
                        debitis magni molestiae cumque quia mollitia reiciendis
                        molestias. Ullam!
                      </div>
                    </div>
                    <WishlistChart />
                  </div>
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </>
  );
};

export default SteamGameOverview;
