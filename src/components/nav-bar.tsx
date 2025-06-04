import React from "react";
import { DesktopNavigation } from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";

import ThemeToggleTab from "@/components/themes";
import Link from "next/link";
import { ListComponent, NavItem } from "@/types";
import { LucideIcon } from "lucide-react";


type NavBarProps = {
  navItems: NavItem[];
  teamNavItems: ListComponent[];
  skillNavItems?: NavItem[];
  icon?: LucideIcon;
  iconColor?: string;
};

const NavBar = ({
  navItems,
  teamNavItems,
  skillNavItems,
  icon: Icon,
  iconColor,
}: NavBarProps) => {
  return (
    <>
      <header className="sticky w-full top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm text-foreground h-18">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={"/"}
            className="text-2xl font-bold transition-colors flex items-center justify-center space-x-3"
          >
            <span>ZV</span>
            {Icon && (
              <Icon
                className={`-ml-1 h-6 w-6 text-[${iconColor == "youTubeColor" ? "#FF0000" : "#00C4FF"}]`}
              />
            )}
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <MobileNavigation
              navItems={navItems}
              teamNavItems={teamNavItems}
              skillNavItems={skillNavItems}
              isMobile={true}
            />
            <DesktopNavigation
              navItems={navItems}
              teamNavItems={teamNavItems}
              isMobile={false}
            />

            <ThemeToggleTab className="hidden md:flex" />
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
