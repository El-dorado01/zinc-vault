import React from "react";
import NavBar from "@/components/nav-bar";
import { NavItems, TeamNavItems } from "@/components/items";
import Footer from "@/components/footer";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar navItems={NavItems} teamNavItems={TeamNavItems} />
      <div className="h-[calc(100vh-72px)] flex flex-col items-center justify-center space-y-1 w-full max-w-6xl mx-auto px-4 text-center">
        <h1 className="font-bold text-3xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
