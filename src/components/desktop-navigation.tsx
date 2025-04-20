"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { type ListComponent, type NavItem } from "@/types";
import { Navigation } from "./navigation";

export function DesktopNavigation({
  navItems,
  teamNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  teamNavItems?: ListComponent[];
  isMobile: boolean;
}) {
  return (
    <NavigationMenu className="hidden md:block">
      <Navigation
        navItems={navItems}
        teamNavItems={teamNavItems}
        isMobile={isMobile}
      />
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
