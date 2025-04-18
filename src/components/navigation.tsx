"use client";

import Link from "next/link";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ListComponent, type NavItem } from "@/types";
import TeamMenuContent from "./team-menu-content";

export function Navigation({
  navItems,
  teamNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  teamNavItems: ListComponent[];
  isMobile: boolean;
}) {
  return (
    <NavigationMenuList className="flex flex-col items-start justify-start md:flex-row">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.key}>
          {item.key === "teams" ? (
            <>
              {isMobile ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <NavigationMenuLink
                        // className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[90vw] max-w-[400px] rounded-lg overflow-hidden touch-auto pointer-events-auto"
                      align="center"
                      side="bottom"
                      sideOffset={12}
                      collisionPadding={16}
                    >
                      <ScrollArea className="h-[50vh] w-full py-2 px-4 overflow-y-auto touch-auto -webkit-overflow-scrolling-touch">
                        <TeamMenuContent teamNavItems={teamNavItems} />
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <TeamMenuContent teamNavItems={teamNavItems} />
                  </NavigationMenuContent>
                </>
              )}
            </>
          ) : (
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="flex flex-row space-x-3 items-center justify-center"
              >
                {/* {isMobile && (
                  <div className="flex items-center justify-center px-1.5">
                    <House className="size-4" />
                  </div>
                )} */}

                <span>{item.title}</span>
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}
