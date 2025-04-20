import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  key: string;
  href: string;
}

export interface ListComponent {
  name: string;
  image: string;
  href: string;
  leader: boolean;
  role: string;
}

export interface SkillItem {
  id: number;
  icon: LucideIcon;
  title: string;
  image: string;
  href: string;
}
