import {
  BookOpenText,
  Frame,
  GalleryVerticalEnd,
  Gamepad2,
  House,
  Info,
  Map,
  PieChart,
  ShoppingCart,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  logo: {
    name: "Zinc Vault",
    logo: GalleryVerticalEnd,
    plan: "Inc.",
  },
  navMain: [
    {
      name: "Home",
      url: "#",
      icon: House,
    },
    {
      name: "About",
      url: "#",
      icon: Info,
    },
    {
      name: "Skills",
      url: "#",
      icon: Sparkles,
    },
    {
      name: "Teams",
      url: "#",
      icon: Users,
    },
  ],
  navPortfolio: [
    {
      title: "Steam Game",
      url: "#",
      icon: Gamepad2,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/steam-game-overview",
        },
        {
          title: "Background",
          url: "/dashboard/steam-game-background",
        },
        {
          title: "Services",
          url: "/dashboard/steam-game-services",
        },
        {
          title: "Portfolio",
          url: "/dashboard/steam-game-portfolio",
        },
      ],
    },
    {
      title: "Youtube Automation",
      url: "#",
      icon: Youtube,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Background",
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Portfolio",
          url: "#",
        },
      ],
    },
    {
      title: "Store Design",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Background",
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Portfolio",
          url: "#",
        },
      ],
    },
    {
      title: "Content Writing",
      url: "#",
      icon: BookOpenText,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Background",
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Portfolio",
          url: "#",
        },
      ],
    },
  ],
};

export { data };
