"use client";

import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import {
  Contact,
  House,
  Info,
  Sparkles,
  Users,
  ChevronsUpDown,
} from "lucide-react";
import { useState } from "react";

export function Navigation({
  navItems,
  teamNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  teamNavItems: ListComponent[];
  isMobile: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenuList className="flex flex-col items-start justify-start md:flex-row">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.key}>
          {item.key === "teams" ? (
            <>
              {isMobile ? (
                <>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                  >
                    <CollapsibleTrigger asChild>
                      <NavigationMenuLink
                        // className={navigationMenuTriggerStyle()}
                        className="flex flex-row space-x-3 items-center justify-start"
                      >
                        {isMobile && (
                          <div className="flex items-center justify-center px-1.5">
                            <Users className="size-4" />
                          </div>
                        )}

                        <span>{item.title}</span>
                      </NavigationMenuLink>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <TeamMenuContent teamNavItems={teamNavItems} />
                    </CollapsibleContent>
                  </Collapsible>
                  {/* <Popover>
                    <PopoverTrigger asChild></PopoverTrigger>
                    <PopoverContent
                      className="w-[90vw] max-w-[400px] rounded-lg overflow-hidden touch-auto pointer-events-auto"
                      align="center"
                      side="bottom"
                      sideOffset={12}
                      collisionPadding={16}
                    >
                      <ScrollArea className="h-[50vh] w-full py-2 px-4 overflow-y-auto touch-auto -webkit-overflow-scrolling-touch"></ScrollArea>
                    </PopoverContent>
                  </Popover> */}
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
                {isMobile && (
                  <div className="flex items-center justify-center px-1.5">
                    {item.key === "home" ? (
                      <House className="size-4" />
                    ) : item.key === "about" ? (
                      <Info className="size-4" />
                    ) : item.key === "skills" ? (
                      <Sparkles className="size-4" />
                    ) : (
                      <Contact className="size-4" />
                    )}
                  </div>
                )}

                <span>{item.title}</span>
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}
