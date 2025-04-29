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
import EditOverview from "@/components/edit-overview";
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
            className="min-h-[200px] rounded-lg border md:min-w-[450px] w-full"
          >
            <ResizablePanel defaultSize={80}>
              <div className="relative w-full overflow-hidden flex h-full items-center justify-center ">
                <EditOverview section="Hero" />

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
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </>
  );
};

export default SteamGameOverview;
