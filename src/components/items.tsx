import {
  GameItem,
  ListComponent,
  PortfolioGame,
  ServiceOverview,
  SkillItem,
  Testimonial,
  TrustSignal,
} from "@/types";
import {
  BatteryCharging,
  BookOpenText,
  Gamepad2,
  PiggyBank,
  Rocket,
  ShoppingCart,
  Youtube,
} from "lucide-react";

const NavItems = [
  { title: "Home", key: "home", href: "/" },
  { title: "About", key: "about", href: "/about" },
  { title: "Skills", key: "skills", href: "/" },
  { title: "Teams", key: "teams", href: "/" },
  { title: "Contact", key: "contact", href: "/contact" },
];

const GameNavItems = [
  { title: "Home", key: "home", href: "//steam-game-promotion" },
  { title: "About", key: "about", href: "/steam-game-promotion/about" },
  {
    title: "Services",
    key: "services",
    href: "/steam-game-promotion/services",
  },
  {
    title: "Portfolio",
    key: "portfolio",
    href: "/steam-game-promotion/portfolio",
  },
  // { title: "Blog", key: "blog", href: "/" },
  { title: "Contact", key: "contact", href: "/steam-game-promotion/contact" },
];

const TeamNavItems = [
  {
    name: "Jonathan Zhang",
    image: "/teams/team-leader.jpg",
    href: "/",
    leader: true,
    role: "Team Leader with a passion for building innovative solutions and leading teams to success.",
  },
  {
    name: "Karen McMillan",
    image: "/teams/person1.jpg",
    href: "/",
    leader: false,
    role: "Product Manager with a knack for turning ideas into reality and a passion for user experience.",
  },
  {
    name: "Bukayo Saka",
    image: "/teams/person2.jpg",
    href: "/",
    leader: false,
    role: "Marketing Specialist with a passion for creating engaging content and building brand awareness.",
  },
  {
    name: "Ademola Lookman",
    image: "/teams/person3.jpg",
    href: "/",
    leader: false,
    role: "Backend Developer with a focus on building scalable and efficient systems.",
  },
];

const skillsData: SkillItem[] = [
  {
    id: 1,
    icon: Youtube,
    image: "/ecommerce.png",
    title: "Youtube Automation and Monetization",
    href: "/youtube-automation",
  },
  {
    id: 2,
    icon: Gamepad2,
    image: "/ecommerce.png",
    title: "Steam Game Promotion",
    href: "/steam-game-promotion",
  },
  {
    id: 3,
    icon: ShoppingCart,
    image: "/ecommerce.png",
    title: "Ecommerce Store Design and Promotion",
    href: "ecommerce-store-design",
  },
  {
    id: 4,
    icon: BookOpenText,
    image: "/writing.png",
    title: "Content Writing",
    href: "/content-writing",
  },
];

const gameBgImages = [
  "/game-bg/watchdogs.jpg",
  "/game-bg/arcane.jpg",
  "/game-bg/unnamed.jpg",
];

const TrustSignals: TrustSignal[] = [
  {
    name: "Mortal Kombat 11",
    image: "/game-bg/mortal-kombat.svg",
    alt: "MK",
    comment: "Sales +300%",
  },
  {
    name: "Call of Duty",
    image: "/game-bg/call-of-duty.svg",
    alt: "CoD",
    comment: "WishLists +300%",
  },
  {
    name: "Spider Man - Mile Morales",
    image: "/game-bg/spider-man.png",
    alt: "SM",
  },
];

const ServicesOverview: ServiceOverview[] = [
  {
    name: "Post-Launch Market Rescue",
    text: "We analyze why your game isn’t performing and deploy targeted campaigns to boost visibility and sales.",
    icon: Rocket,
    process: {
      key: "Process",
      text: "Data analysis, audience targeting, campaign execution, performance tracking.",
    },
    extraText: {
      key: "Tools",
      text: "Steam analytics, social media ads, influencers.",
    },
  },
  {
    name: "Small Budget, Big Results",
    text: "We maximize ROI with high-impact, low-cost strategies like community engagement and organic growth.",
    icon: PiggyBank,
    extraText: {
      key: "Examples",
      text: "Discord community building, Reddit campaigns, cross-promotions.",
    },
  },
  {
    name: "Reviving Struggling Games",
    text: "We identify core issues (e.g., poor discoverability, negative reviews) and implement tailored solutions.",
    icon: BatteryCharging,
    extraText: {
      key: "Approach",
      text: "Review management, Steam page optimization, relaunch campaigns.",
    },
  },
];

const SuccessStoryImages: string[] = [
  "/game-bg/success-one.jpg",
  "/game-bg/success-two.jpg",
  "/game-bg/arcane.jpg",
];

const Testimonials: Testimonial[] = [
  {
    name: "CyberSmith Studios",
    image: "/teams/person1.jpg",
    message: "Your team turned our game around!",
  },
  {
    name: "Arcane Inc.",
    image: "/teams/person3.jpg",
    message:
      "They increased our sales in just two months, I highly recommend them!",
  },
  {
    name: "Marvel Studios",
    image: "/teams/person2.jpg",
    message: "Your team turned our game around!",
  },
  {
    name: "Davies Films",
    image: "/teams/person2.jpg",
    message:
      "They increased our sales in just two months, I highly recommend them!",
  },
];

const GameTeams: ListComponent[] = [
  {
    name: "Karen McMillan",
    image: "/teams/person1.jpg",
    href: "",
    role: "Led campaigns for 10+ indie titles.",
  },
  {
    name: "Bukayo Saka",
    image: "/teams/person2.jpg",
    href: "",
    role: "Expert in Steam algorithm optimization.",
  },
  {
    name: "Ademola Lookman",
    image: "/teams/person3.jpg",
    href: "",
    role: "Backend Developer with a focus on building scalable and efficient systems.",
  },
];

const PortfolioGames: PortfolioGame[] = [
  {
    name: "Game Title 1",
    image: "/games/image2.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    firstIcon: "Art Blast",
    secondIcon: "Ad",
  },
  {
    name: "Game Title 1",
    image: "/games/image1.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    firstIcon: "Art Blast",
    secondIcon: "Ad",
  },
  {
    name: "Game Title 1",
    image: "/games/image3.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Game Title 1",
    image: "/games/image4.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    firstIcon: "Art Blast",
    secondIcon: "Ad",
  },
  {
    name: "Game Title 1",
    image: "/games/image5.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Game Title 1",
    image: "/games/image6.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Game Title 1",
    image: "/games/image7.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    firstIcon: "Art Blast",
    secondIcon: "Ad",
  },
];

const Games: GameItem[] = [
  {
    thumbnail: "/games/thumbnail1.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail2.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail3.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail4.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail5.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail6.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail7.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail8.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail9.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail10.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail11.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail12.jpg",
    name: "Game One",
  },
  {
    thumbnail: "/games/thumbnail13.png",
    name: "Game One",
  },
];

export {
  NavItems,
  TeamNavItems,
  skillsData,
  GameNavItems,
  gameBgImages,
  TrustSignals,
  ServicesOverview,
  SuccessStoryImages,
  Testimonials,
  GameTeams,
  PortfolioGames,
  Games,
};
