import { NavItem } from "@/types";
import { BookOpen, Briefcase, LayoutDashboard, MonitorCog } from "lucide-react";

const GameNavItems: NavItem[] = [
  {
    title: "Overview",
    key: "overview",
    href: "/steam-game-promotion",
    icon: LayoutDashboard,
  },
  {
    title: "Background",
    key: "background",
    href: "/steam-game-promotion/background",
    icon: BookOpen,
  },
  {
    title: "Services",
    key: "services",
    href: "/steam-game-promotion/services",
    icon: MonitorCog,
  },
  {
    title: "Portfolio",
    key: "portfolio",
    href: "/steam-game-promotion/portfolio",
    icon: Briefcase,
  },
  // { title: "Blog", key: "blog", href: "/", icon: House },
];

const YoutubeNavItems = []

export { GameNavItems, YoutubeNavItems };