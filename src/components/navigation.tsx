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
import { type ListComponent, type NavItem } from "@/types";
import TeamMenuContent from "./team-menu-content";
import { Contact, House, Info, Sparkles, Users } from "lucide-react";
import { useState } from "react";

export function Navigation({
  navItems,
  teamNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  teamNavItems?: ListComponent[];
  isMobile: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenuList className="flex flex-col items-start justify-start md:flex-row">
      {navItems.map((item) => (
        <NavigationMenuItem key={item.key}>
          {teamNavItems && item.key === "teams" ? (
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
