import { GameNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

const SteamGameLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar
        navItems={GameNavItems}
        icon={Gamepad2}
        iconColor="#00C4FF"
        mainHref="/steam-game-promotion"
      />
      {children}
      <div className="border-t border-dashed flex flex-col md:flex-row space-y-3.5 flex-1 py-7 px-4 md:px-8 xl:px-35 w-full items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-blue-500 transition-colors"
        >
          ZV
        </Link>
        <div className="text-muted-foreground text-md">
          {" "}
          &copy; ZincVault {new Date().getFullYear()}. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default SteamGameLayout;
