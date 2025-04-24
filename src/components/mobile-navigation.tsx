import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type ListComponent, type NavItem } from "@/types";
import { Navigation } from "./navigation";
import { NavigationMenu } from "./ui/navigation-menu";
import ThemeToggleTab from "./themes";
import { ScrollArea } from "./ui/scroll-area";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const MobileNavigation = ({
  navItems,
  teamNavItems,
  skillNavItems,
  isMobile,
}: {
  navItems: NavItem[];
  skillNavItems?: NavItem[];
  teamNavItems: ListComponent[];
  isMobile: boolean;
}) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="block md:hidden p-2 rounded-md hover:bg-zinc-500/10 focus:outline-none focus:ring-2 focus:ring-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-[var(--foreground)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <ScrollArea className="overflow-y-auto">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="mx-4">
                <DrawerTitle className="text-2xl font-bold">ZV</DrawerTitle>
                <DrawerDescription className="hidden">Mobile View Drawer</DrawerDescription>
              </DrawerHeader>
              <NavigationMenu className="px-3 md:hidden flex flex-col items-start justify-start w-full max-w-sm">
                <Navigation
                  navItems={navItems}
                  skillNavItems={skillNavItems}
                  teamNavItems={teamNavItems}
                  isMobile={isMobile}
                />
              </NavigationMenu>
              <div className="mx-5">
                <Separator className="my-4" />
              </div>
              <div className="flex flex-col items-start justify-center space-y-2 my-3 mx-5 text-sm text-muted-foreground">
                <Link
                  href={""}
                  className="flex space-x-3 items-center justify-center"
                >
                  <div className="flex items-center justify-center p-2">
                    <Twitter className="size-4" />
                  </div>
                  <span>Twitter</span>
                </Link>
                <Link
                  href={""}
                  className="flex space-x-3 items-center justify-center"
                >
                  <div className="flex items-center justify-center p-2">
                    <Facebook className="size-4" />
                  </div>
                  <span>Facebook</span>
                </Link>
                <Link
                  href={""}
                  className="flex space-x-3 items-center justify-center"
                >
                  <div className="flex items-center justify-center p-2">
                    <Youtube className="size-4" />
                  </div>
                  <span>Youtube</span>
                </Link>
                <Link
                  href={""}
                  className="flex space-x-3 items-center justify-center"
                >
                  <div className="flex items-center justify-center p-2">
                    <Linkedin className="size-4" />
                  </div>
                  <span>LinkedIn</span>
                </Link>
              </div>
              <div className="mx-5">
                <Separator className="my-4" />
              </div>
              <div className="mx-5 mb-2">
                <Link href={""} className="text-sm text-muted-foreground">
                  Terms of Services
                </Link>
                <span className="text-muted-foreground mx-1">&bull;</span>
                <Link href={""} className="text-sm text-muted-foreground">
                  Cookies
                </Link>
                <span className="text-muted-foreground mx-1">&bull;</span>
                <Link href={""} className="text-sm text-muted-foreground">
                  Privacy and Security
                </Link>
                <span className="text-muted-foreground mx-1">&bull;</span>
                <Link href={""} className="text-sm text-muted-foreground">
                  Change Language
                </Link>
              </div>
              <ThemeToggleTab className="mx-4 my-2" />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
