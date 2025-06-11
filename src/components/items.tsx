import {
  GameItem,
  ListComponent,
  NavItem,
  PortfolioGame,
  ServiceOverview,
  SkillItem,
  Testimonial,
  TrustSignal,
} from "@/types";
import {
  BatteryCharging,
  BookOpenText,
  Contact,
  Gamepad2,
  House,
  Info,
  PiggyBank,
  Rocket,
  ShoppingCart,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react";

const NavItems: NavItem[] = [
  { title: "Home", key: "home", href: "/", icon: House },
  { title: "About", key: "about", href: "/about", icon: Info },
  { title: "Skills", key: "skills", href: "/skills", icon: Sparkles },
  { title: "Teams", key: "teams", href: "/teams", icon: Users },
  { title: "Contact", key: "contact", href: "/contact", icon: Contact },
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
    text: "Skyrocket your YouTube channel with automated growth strategies and proven monetization tactics.",
    href: "/youtube-automation",
  },
  {
    id: 2,
    icon: Gamepad2,
    image: "/ecommerce.png",
    title: "Steam Game Promotion",
    text: "Boost your Steam game’s success with targeted marketing and indie-friendly promotion.",
    href: "/steam-game-promotion",
  },
  {
    id: 3,
    icon: ShoppingCart,
    image: "/ecommerce.png",
    title: "Ecommerce Store Design and Promotion",
    text: "Stunning ecommerce stores designed to convert, paired with powerful promotion strategies.",
    href: "/ecommerce-store-design",
  },
  {
    id: 4,
    icon: BookOpenText,
    image: "/writing.png",
    title: "Content Writing",
    text: "Engaging, SEO-optimized content that captivates audiences and drives results.",
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

const services = [
  {
    title: "YouTube Automation",
    description:
      "Transform your YouTube channel with cutting-edge automation tools designed to streamline your workflow. From automated video editing and scheduling to seamless posting, our solutions save you time and effort, allowing you to focus on creating compelling content. Experience enhanced efficiency with smart algorithms that optimize uploads and manage repetitive tasks. Grow your audience effortlessly as our automation adapts to your needs, ensuring consistent engagement and a professional presence. Elevate your channel with the power of automation today!",
    graphic: "/youtube-bg/automation.png",
  },
  {
    title: "YouTube Promotion",
    description:
      "Boost your channel's visibility with our expert promotion strategies tailored for YouTube success. We leverage targeted SEO, social media campaigns, and innovative ad placements to drive traffic and attract subscribers fast. Our team optimizes your content for maximum reach, utilizing data-driven insights to amplify your brand. Watch your views soar as we connect you with the right audience, enhancing your growth trajectory. Start promoting smarter and see your channel rise to new heights with our proven techniques!",
    graphic: "/youtube-bg/automation-2.png",
  },
  {
    title: "YouTube Monetization",
    description:
      "Unlock the full earning potential of your YouTube channel with our comprehensive monetization guidance. From maximizing ad revenue to securing lucrative sponsorships and merchandise sales, we pave the way for multiple income streams. Our experts provide strategies to meet monetization thresholds and optimize earnings, ensuring long-term profitability. Turn your passion into profit with tailored advice that enhances your financial success. Begin your journey to monetization mastery and watch your revenue grow steadily!",
    graphic: "/youtube-bg/automation.png",
  },
];

export {
  NavItems,
  TeamNavItems,
  skillsData,
  gameBgImages,
  TrustSignals,
  ServicesOverview,
  SuccessStoryImages,
  Testimonials,
  GameTeams,
  PortfolioGames,
  Games,
  services
};
