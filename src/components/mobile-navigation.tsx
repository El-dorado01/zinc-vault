import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { type ListComponent, type NavItem } from "@/types";
import { Navigation } from "./nav-bar";
import { NavigationMenu } from "./ui/navigation-menu";
import ThemeToggleTab from "./themes";

const MobileNavigation = ({
  navItems,
  teamNavItems,
  isMobile,
}: {
  navItems: NavItem[];
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
          {/* <ScrollArea className="w-full h-[60vh]">
          </ScrollArea> */}
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="mx-4">
                <DrawerTitle className="text-2xl font-bold">ZV</DrawerTitle>
              </DrawerHeader>
              <NavigationMenu className="md:hidden">
                <Navigation
                  navItems={navItems}
                  teamNavItems={teamNavItems}
                  isMobile={isMobile}
                />
              </NavigationMenu>
              <ThemeToggleTab className="mx-4 my-2" />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
