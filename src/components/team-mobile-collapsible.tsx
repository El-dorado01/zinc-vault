"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { Users } from "lucide-react";
import TeamMenuContent from "./team-menu-content";
import { ListComponent } from "@/types";

type TeamMobileProps = {
  teamNavItems: ListComponent[];
  isMobile: boolean;
  title: string;
};

const TeamMobile = ({ isMobile, teamNavItems, title }: TeamMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <NavigationMenuLink
            className="flex flex-row space-x-3 items-center justify-start"
          >
            {isMobile && (
              <div className="flex items-center justify-center px-1.5">
                <Users className="size-4" />
              </div>
            )}

            <span>{title}</span>
          </NavigationMenuLink>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TeamMenuContent teamNavItems={teamNavItems} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default TeamMobile;
