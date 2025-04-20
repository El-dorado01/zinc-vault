import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DisplayAvatar from "./display-avatar";
import { type ListComponent } from "@/types";

type ListTeamsProps = {
  className?: string;
  title: string;
  teamMember: ListComponent;
  children: React.ReactNode;
};

const ListTeams = ({
  className,
  title,
  teamMember,
  children,
  ...props
}: ListTeamsProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={teamMember.href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex space-x-2 items-start justify-center">
          <DisplayAvatar
            avatarProps={{
              image: teamMember.image,
              name: teamMember.name,
            }}
          />
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  );
};

export default ListTeams;
