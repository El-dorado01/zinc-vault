import { GameNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import { Gamepad2 } from "lucide-react";
import { PropsWithChildren } from "react";

const SteamGameLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar navItems={GameNavItems} icon={Gamepad2} />
      {children}
    </div>
  );
};

export default SteamGameLayout;
