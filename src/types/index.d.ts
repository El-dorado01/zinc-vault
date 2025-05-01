import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  key: string;
  href: string;
  icon: LucideIcon;
}

export interface ListComponent {
  name: string;
  image: string;
  href: string;
  leader?: boolean;
  role: string;
}

export interface SkillItem {
  id: number;
  icon: LucideIcon;
  title: string;
  image: string;
  href: string;
}

export interface TrustSignal {
  name: string;
  image: string;
  alt: string;
  comment?: string;
}

export interface ServiceOverview {
  name: string;
  text: string;
  icon: LucideIcon;
  process?: {
    key: string;
    text: string;
  };
  extraText: {
    key: string;
    text: string;
  };
}

export interface Testimonial {
  name: string;
  image: string;
  message: string;
}

export interface PortfolioGame {
  name: string;
  image: string;
  description?: string;
  firstIcon?: string;
  secondIcon?: string;
}

export interface GameItem {
  thumbnail: string;
  name: string;
}

export interface TiptapJson {
  type: string;
  content?: TiptapJson[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, any> }[];
  attrs?: Record<string, any>;
}