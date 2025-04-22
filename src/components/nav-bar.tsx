import React from "react";
import { DesktopNavigation } from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";

import ThemeToggleTab from "@/components/themes";
import Link from "next/link";
import { ListComponent, NavItem } from "@/types";
import { LucideIcon } from "lucide-react";

type NavBarProps = {
  navItems: NavItem[];
  teamNavItems?: ListComponent[];
  icon?: LucideIcon;
  iconColor?: string;
  mainHref?: string;
};

const NavBar = ({
  navItems,
  teamNavItems,
  icon: Icon,
  iconColor,
  mainHref = "/",
}: NavBarProps) => {
  return (
    <header className="sticky w-full top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={mainHref}
          className="text-2xl font-bold hover:text-blue-500 transition-colors flex items-center justify-center space-x-3"
        >
          <span>ZV</span>
          {Icon && <Icon className={`-ml-1 h-6 w-6 text-[${iconColor}]`} />}
        </Link>
        <div className="flex items-center justify-center space-x-2">
          <MobileNavigation
            navItems={navItems}
            teamNavItems={teamNavItems}
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
  );
};

export default NavBar;
