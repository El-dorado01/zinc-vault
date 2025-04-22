import React from "react";
import { DesktopNavigation } from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeToggleTab from "@/components/themes";
import Link from "next/link";
import { ListComponent, NavItem } from "@/types";
import { ChevronsUpDown, LucideIcon, Sparkles } from "lucide-react";

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

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="hidden md:flex items-center justify-center space-x-1 mx-3 text-muted-foreground rounded-md p-1.5">
                <Sparkles className="size-4" />
                <ChevronsUpDown className="size-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Skills</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/youtube-automation">Youtube Automation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/steam-game-promotion">Steam Game Promotion</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/ecommerce-store-design">
                  Ecommerce Store Design
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/content-writing">Content Writing</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
