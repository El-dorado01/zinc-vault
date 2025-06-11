import Footer from "@/components/footer";
import { NavItems, TeamNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import PageBreadcrumbs from "@/components/page-breadcrumbs";
import { YoutubeNavItems } from "@/components/skill-nav-items";
import { Youtube } from "lucide-react";
import { PropsWithChildren } from "react";

const YouTubeAutomationLayout = ({ children }: PropsWithChildren) => {
  const iconColor = "youTubeColor";
  // const iconColor = "#FF0000";
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar
        navItems={NavItems}
        skillNavItems={YoutubeNavItems}
        teamNavItems={TeamNavItems}
        icon={Youtube}
        iconColor={iconColor}
      />
      <PageBreadcrumbs skillNavItems={YoutubeNavItems} iconColor={iconColor} />
      {children}
      <Footer />
    </div>
  );
};

export default YouTubeAutomationLayout;
