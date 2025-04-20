
import NavBar from "@/components/nav-bar";
import Link from "next/link";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      {children}
      <div className="border-t border-dashed flex flex-col md:flex-row space-y-3.5 flex-1 py-7 px-10 w-full items-center justify-between">
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

export default AppLayout;
