const NavItems = [
  { title: "Home", key: "home", href: "/" },
  { title: "About", key: "about", href: "/about" },
  { title: "Skills", key: "skills", href: "/" },
  { title: "Teams", key: "teams", href: "/" },
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

export { NavItems, TeamNavItems };
