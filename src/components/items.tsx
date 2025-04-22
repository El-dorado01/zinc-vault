import { ServiceOverview, SkillItem, Testimonial, TrustSignal } from "@/types";
import { BatteryCharging, BookOpenText, Gamepad2, PiggyBank, Rocket, ShoppingCart, Youtube } from "lucide-react";

const NavItems = [
  { title: "Home", key: "home", href: "/" },
  { title: "About", key: "about", href: "/about" },
  { title: "Skills", key: "skills", href: "/" },
  { title: "Teams", key: "teams", href: "/" },
  { title: "Contact", key: "contact", href: "/contact" },
];

const GameNavItems = [
  { title: "Home", key: "home", href: "/" },
  { title: "About", key: "about", href: "/about" },
  { title: "Services", key: "services", href: "/" },
  { title: "Portfolio", key: "portfolio", href: "/" },
  { title: "Blog", key: "blog", href: "/" },
  { title: "Contact", key: "contact", href: "/contact" },
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
    href: "/youtube-automation"
  },
  {
    id: 2,
    icon: Gamepad2,
    image: "/ecommerce.png",
    title: "Steam Game Promotion",
    href: "/steam-game-promotion"
  },
  {
    id: 3,
    icon: ShoppingCart,
    image: "/ecommerce.png",
    title: "Ecommerce Store Design and Promotion",
    href: "ecommerce-store-design"
  },
  {
    id: 4,
    icon: BookOpenText,
    image: "/writing.png",
    title: "Content Writing",
    href: "/content-writing"
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
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero soluta ducimus magni quibusdam delectus dignissimos.",
    icon: Rocket,
  },
  {
    name: "Small Budget, Big Results",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero soluta ducimus magni quibusdam delectus dignissimos.",
    icon: PiggyBank,
  },
  {
    name: "Reviving Struggling Games",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero soluta ducimus magni quibusdam delectus dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero soluta ducimus magni quibusdam delectus dignissimos.",
    icon: BatteryCharging,
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
};
