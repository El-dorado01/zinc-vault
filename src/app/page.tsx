import { DesktopNavigation } from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import { NavItems, TeamNavItems } from "@/components/navigations";
import ThemeToggleTab from "@/components/themes";
import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)] text-[var(--foreground)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-500 transition-colors animate-in fade-in"
          >
            ZV
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <MobileNavigation navItems={NavItems} teamNavItems={TeamNavItems} isMobile={true} />
            <DesktopNavigation navItems={NavItems} teamNavItems={TeamNavItems} isMobile={false} />
            <ThemeToggleTab className="hidden md:flex" />
          </div>
        </div>
      </header>
    </>
  );
}
