
import NavBar from "@/components/nav-bar";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center">
      <NavBar />
      {children}
    </div>
  );
};

export default AppLayout;
