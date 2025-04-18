
import NavBar from "@/components/nav-bar";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center">
      <NavBar />
      {children}
      <div className="border-t border-dashed flex flex-1 py-4 w-full items-center justify-center">
        &copy; ZincVault {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>
  );
};

export default AppLayout;
