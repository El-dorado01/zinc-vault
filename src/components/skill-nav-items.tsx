"use client"

import { NavItem } from "@/types";
import { House } from "lucide-react";

const GameNavItems: NavItem[] = [
  {
    title: "Overview",
    key: "overview",
    href: "/steam-game-promotion",
    icon: House,
  },
  {
    title: "Background",
    key: "background",
    href: "/steam-game-promotion/background",
    icon: House,
  },
  {
    title: "Services",
    key: "services",
    href: "/steam-game-promotion/services",
    icon: House,
  },
  {
    title: "Portfolio",
    key: "portfolio",
    href: "/steam-game-promotion/portfolio",
    icon: House,
  },
  // { title: "Blog", key: "blog", href: "/", icon: House },
];

const YoutubeNavItems = []

export { GameNavItems, YoutubeNavItems };