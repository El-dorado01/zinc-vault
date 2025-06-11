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
  text?: string;
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
  attrs?: Record<string, any>;
  content?: TiptapJson[];
  marks?: { type: string; attrs?: Record<string, any> }[];
  text?: string;
}

export interface HeroContent {
  id: string;
  hero_texts: {
    main: TiptapJson; // Tiptap JSON
    sub: TiptapJson; // Tiptap JSON
  };
  image_paths: string[];
  created_at: string;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
}

export interface HeroContentDisplayProps {
  promise?: Promise<HeroContent[]>;
  section: string;
  mainTextJson: TiptapJson | null;
  subTextJson: TiptapJson | null;
  imagePaths: string[];
  setMainTextJson: (json: TiptapJson | null) => void;
  setSubTextJson: (json: TiptapJson | null) => void;
  setImagePaths: (paths: string[]) => void;
}

export interface handleSubmitProps {
  section: string;
  mainTextJson: TiptapJson | null;
  subTextJson: TiptapJson | null;
  imagePaths: string[];
  setMainTextJson: (json: TiptapJson | null) => void;
  setSubTextJson: (json: TiptapJson | null) => void;
  setImagePaths: (paths: string[]) => void;
  setError: (error: string | null) => void;
  setSuccess: (message: string | null) => void;
  setIsSaving: (isSaving: boolean) => void;
  setInitialMainTextJson: (json: TiptapJson | null) => void;
  setInitialSubTextJson: (json: TiptapJson | null) => void;
  setInitialImagePaths: (paths: string[]) => void;
}

export interface Props {
  section: string;
}

export type TeamMember = {
  name: string;
  role: string;
  image: string | null;
};
export interface Game {
  id: string;
  name: string;
  description: TiptapJson;
  thumbnail: string;
  studio: string;
  problem: TiptapJson;
  approach: TiptapJson;
  tools: string[];
  carousel_images: string[];
  created_at: string;
  updated_at: string;
}

export interface SimpleEditorProps {
  content: TiptapJson | undefined;
  onChange: (content: TiptapJson) => void;
  disabled?: boolean;
}