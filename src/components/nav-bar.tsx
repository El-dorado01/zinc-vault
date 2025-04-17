import React from 'react'
import { DesktopNavigation } from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import { NavItems, TeamNavItems } from "@/components/items";
import ThemeToggleTab from "@/components/themes";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="sticky w-full top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-blue-500 transition-colors"
        >
          ZV
        </Link>
        <div className="flex items-center justify-center space-x-2">
          <MobileNavigation
            navItems={NavItems}
            teamNavItems={TeamNavItems}
            isMobile={true}
          />
          <DesktopNavigation
            navItems={NavItems}
            teamNavItems={TeamNavItems}
            isMobile={false}
          />
          <ThemeToggleTab className="hidden md:flex" />
        </div>
      </div>
    </header>
  );
}

export default NavBar