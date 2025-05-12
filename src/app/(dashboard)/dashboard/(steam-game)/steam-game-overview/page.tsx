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
import { TrustSignals } from "@/components/items";
import { TrendingUp } from "lucide-react";
import WishlistChart from "@/components/wishlist-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditTrustSignals from "@/components/edit-trust-signals";
const SteamGameOverview = () => {
  return (
    <>
      <SidebarInset>
        {/* Dashboard Breadcrumb */}
        <DashboardBreadcrumb />
        <div className="min-h-[100vh] flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
          <Heading
            title="Steam Game Promotion - Overview"
            description="Make changes to your steam game promotion overview page here. You can drag the resizable handle to move the sections around."
            classname="mb-4"
          />
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] rounded-lg border w-full"
          >
            <ResizablePanel defaultSize={80}>
              <div className="relative w-full overflow-hidden flex h-full items-center justify-center hover:[&_#editButton]:flex">
                <EditGameOverview section="Hero" />

                <div className="absolute inset-0 z-2 flex flex-col items-center justify-center text-center text-white bg-black/30 px-3 md:px-5">
                  <h1 className="hero-title text-xl md:text-2xl font-bold md:mb-4 leading-tight line-clamp-1">
                    Revive Your Steam Game with Smart Marketing
                  </h1>
                  <p className="hero-subtext text-lg md:mb-6 line-clamp-1 md:line-clamp-2">
                    We turn struggling indie games into Steam success stories
                    with small budgets and big results.
                  </p>
                  <Button className="mt-2 md:mt-4 px-3 py-1 md:px-6 md:py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60">
                    Learn More
                  </Button>
                </div>
                <div className="relative w-full h-screen">
                  <Image
                    src={"/game-bg/watchdogs.jpg"}
                    // src={"/placeholder.svg"}
                    alt={"Bg Image"}
                    className="w-full h-full object-cover"
                    width={2000}
                    height={1400}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={10}>
              <div className="h-fit p-6 flex flex-col items-start justify-start w-full mx-auto space-y-6 bg-sidebar relative hover:[&_#editButton]:flex">
                <EditTrustSignals section="Trust Signals" />
                <div className="flex items-center justify-between w-full">
                  <h1 className="font-bold text-2xl">Trust Signals</h1>
                  <Image
                    src={"/game-bg/steam.gif"}
                    alt="Steam Logo"
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                  {TrustSignals.map((signal, index) => (
                    <div
                      key={index}
                      className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-105 bg-sidebar"
                    >
                      <h2 className="font-semibold text-xl mb-2 line-clamp-1">
                        {signal.name}
                      </h2>
                      <Image
                        src={signal.image}
                        alt={signal.alt}
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                      <div
                        className={`font-semibold text-md ${
                          signal.comment && "text-green-500"
                        }  flex items-center justify-center space-x-2`}
                      >
                        <span>
                          {signal.comment
                            ? signal.comment
                            : "Saved our launch!"}
                        </span>{" "}
                        {signal.comment && <TrendingUp className="h-5 w-5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={10}>
              <div className="h-fit p-6 flex flex-col items-start justify-start w-full mx-auto space-y-6 bg-sidebar relative hover:[&_#editButton]:flex">
                <EditGameOverview section="Success Story" />
                <ScrollArea className="overflow-y-auto">
                  <h1 className="font-bold text-2xl mb-13 line-clamp-1">
                    Success Story: CyberSmith’s BattleForge
                  </h1>
                  <div className="flex flex-col w-full xl:flex-row items-center justify-center md:justify-between gap-5">
                    {/* Carousel */}
                    <div className="flex-1 md:flex-1/2 w-full flex flex-col space-y-4 items-center justify-center  min-h-[55vh]">
                      <div className="w-full border rounded-md">
                        <Image
                          src={"/games/image1.jpg"}
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
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </>
  );
};

export default SteamGameOverview;
