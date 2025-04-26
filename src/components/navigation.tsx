import Link from "next/link";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { type ListComponent, type NavItem } from "@/types";
import TeamMenuContent from "./team-menu-content";
import TeamMobile from "./team-mobile-collapsible";

export function Navigation({
  navItems,
  teamNavItems,
  skillNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  teamNavItems: ListComponent[];
  skillNavItems?: NavItem[];
  isMobile: boolean;
}) {
  return (
    <>
      <NavigationMenuList className="flex flex-col items-start justify-start md:flex-row w-full max-w-sm">
        {navItems.map(({ key, title, href, icon: Icon }) => (
          <NavigationMenuItem
            key={key}
            className="w-[90vw] flex flex-col items-start justify-center"
          >
            {teamNavItems && key === "teams" ? (
              <>
                {isMobile ? (
                  <TeamMobile
                    isMobile={isMobile}
                    teamNavItems={teamNavItems}
                    title={title}
                  />
                ) : (
                  <>
                    <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <TeamMenuContent teamNavItems={teamNavItems} />
                    </NavigationMenuContent>
                  </>
                )}
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={href}
                  className="flex flex-row space-x-3 items-center justify-center"
                >
                  {isMobile && (
                    <div className="flex items-center justify-center px-1.5">
                      <Icon className="size-4" />
                    </div>
                  )}

                  <span>{title}</span>
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      {Array.isArray(skillNavItems) &&
        <>
          <Separator className="my-4 w-full" />
          <NavigationMenuList className="flex flex-col items-start justify-start w-full max-w-sm">
            <h2 className="font-bold px-3 mb-2">STEAM GAME PROMOTION</h2>
            {skillNavItems.map(({ key, title, href, icon: Icon }) => (
              <NavigationMenuItem
                key={key}
                className="w-[90vw] flex flex-col items-start justify-center"
              >
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="flex flex-row space-x-3 items-center justify-center"
                  >
                    {isMobile && (
                      <div className="flex items-center justify-center px-1.5">
                        <Icon className="size-4" />
                      </div>
                    )}

                    <span>{title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </>
      }
    </>
  );
}
