// src/lib/game-background/gameUtils.ts
import { getSupabaseClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { TiptapJson, TeamMember } from "@/types";

const supabase = getSupabaseClient();

export const fetchGameBackground = async (): Promise<{
  id: string | null;
  content: TiptapJson | undefined;
  company_image: string | null;
  team_members: TeamMember[];
}> => {
  const { data, error } = await supabase
    .from("game_background")
    .select("*")
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    toast.error("Failed to fetch game background: " + error.message);
    console.error("Fetch error:", error);
    return {
      id: null,
      content: undefined,
      company_image: null,
      team_members: [],
    };
  }

  return data
    ? {
        id: data.id,
        content: data.content || undefined,
        company_image: data.company_image || null,
        team_members: data.team_members || [],
      }
    : {
        id: null,
        content: undefined,
        company_image: null,
        team_members: [],
      };
};

export const uploadImage = async (
  file: File,
  path: string,
  bucket: string = "steam-background-images"
): Promise<string | null> => {
  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be under 5MB");
    return null;
  }

  const fileName = `${Date.now()}-${file.name}`;
  toast("Uploading image...");

  const { error } = await supabase.storage
    .from(bucket)
    .upload(`${path}/${fileName}`, file);

  if (error) {
    toast.error("Failed to upload image: " + error.message);
    console.error("Upload error:", error);
    return null;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${path}/${fileName}`);

  toast.success("Image uploaded successfully");
  return data.publicUrl;
};

export const removeImage = async (
  url: string,
  bucket: string = "steam-background-images"
): Promise<boolean> => {
  const filePath = url.split("/").slice(-2).join("/");

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    toast.error("Failed to remove image: " + error.message);
    console.error("Remove error:", error);
    return false;
  }

  toast.success("Image removed successfully");
  return true;
};

export const saveGameBackground = async (
  record: {
    id?: string;
    content?: TiptapJson | undefined;
    company_image?: string | null;
    team_members?: TeamMember[];
  },
  setRecordId: (id: string | null) => void
): Promise<boolean> => {

  const { data: existingRecord, error: fetchError } = await supabase
    .from("game_background")
    .select("id")
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    toast.error("Failed to check existing record: " + fetchError.message);
    console.error("Fetch error:", fetchError);
    return false;
  }

  let result;
  if (existingRecord) {
    result = await supabase
      .from("game_background")
      .update(record)
      .eq("id", existingRecord.id)
      .select("id, team_members")
      .single();
  } else {
    result = await supabase
      .from("game_background")
      .insert(record)
      .select("id, team_members")
      .single();
  }

  const { data, error } = result;

  if (error) {
    toast.error("Failed to save game background: " + error.message);
    console.error("Save error:", error);
    return false;
  }

  if (data?.id) {
    setRecordId(data.id);
  } else {
    toast.error("Failed to retrieve record ID");
    console.error("No ID returned");
    return false;
  }

  toast.success("Game background saved successfully");
  return true;
};
