import { ListComponent } from "@/types";
import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import ListTeams from "./list-teams";

const TeamMenuContent = ({
  teamNavItems,
}: {
  teamNavItems: ListComponent[];
}) => {
  return (
    <ul className="flex flex-col gap-2 md:grid md:gap-3 md:p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      {teamNavItems.map((teamMember) => (
        <>
          {teamMember.leader ? (
            <li className="row-span-3" key={teamMember.name}>
              <NavigationMenuLink asChild>
                <Link
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href={teamMember.href}
                >
                  <Image
                    src={teamMember.image}
                    alt={teamMember.name}
                    width={100}
                    height={100}
                    className="object-cover w-24 h-24 rounded-full self-center flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {teamMember.name}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {teamMember.role}
                    </p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ) : (
            <ListTeams title={teamMember.name} teamMember={teamMember}>
              {teamMember.role}
            </ListTeams>
          )}
        </>
      ))}
    </ul>
  );
};

export default TeamMenuContent;
