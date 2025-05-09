// src/actions/heroContent.ts
import { HeroContent } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/client";



export async function fetchHeroContent(): Promise<HeroContent[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching hero content:", error);
    throw new Error("Failed to fetch hero content");
  }

  return data;
}
