import Footer from "@/components/footer";
import { NavItems, TeamNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import PageBreadcrumbs from "@/components/page-breadcrumbs";
import { GameNavItems } from "@/components/skill-nav-items";
import { Gamepad2 } from "lucide-react";
import { PropsWithChildren } from "react";

const SteamGameLayout = ({ children }: PropsWithChildren) => {
  const iconColor = "steamGameColor";
  // const iconColor = "#00C4FF";
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar
        navItems={NavItems}
        skillNavItems={GameNavItems}
        teamNavItems={TeamNavItems}
        icon={Gamepad2}
        iconColor={iconColor}
      />
      <PageBreadcrumbs skillNavItems={GameNavItems} iconColor={iconColor} />
      {children}
      <Footer />
    </div>
  );
};

export default SteamGameLayout;
