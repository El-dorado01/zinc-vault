// src/lib/games/gameUtils.ts
import { getSupabaseClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Game } from "@/types";

const supabase = getSupabaseClient();

export const fetchGames = async (
  page: number,
  itemsPerPage: number = 16
): Promise<{ games: Game[]; total: number }> => {
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from("games")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    toast.error("Failed to fetch games: " + error.message);
    console.error("Fetch games error:", error);
    return { games: [], total: 0 };
  }

  return { games: data, total: count || 0 };
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
  console.log("Removing image:", filePath);

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    toast.error("Failed to remove image: " + error.message);
    console.error("Remove error:", error);
    return false;
  }

  toast.success("Image removed successfully");
  return true;
};

export const saveGame = async (game: Partial<Game>): Promise<boolean> => {
  console.log("Saving game with payload:", JSON.stringify(game, null, 2));

  if (game.id) {
    const { error } = await supabase
      .from("games")
      .update(game)
      .eq("id", game.id);

    if (error) {
      toast.error("Failed to update game: " + error.message);
      console.error("Update error:", error);
      return false;
    }
  } else {
    const { error } = await supabase.from("games").insert(game);

    if (error) {
      toast.error("Failed to create game: " + error.message);
      console.error("Insert error:", error);
      return false;
    }
  }

  toast.success("Game saved successfully");
  return true;
};

export const deleteGame = async (
  id: string,
  thumbnail: string | null,
  carouselImages: string[] | null
): Promise<boolean> => {
  // Delete thumbnail and carousel images
  if (thumbnail) {
    await removeImage(thumbnail);
  }
  if (carouselImages) {
    for (const image of carouselImages) {
      await removeImage(image);
    }
  }

  const { error } = await supabase.from("games").delete().eq("id", id);

  if (error) {
    toast.error("Failed to delete game: " + error.message);
    console.error("Delete error:", error);
    return false;
  }

  toast.success("Game deleted successfully");
  return true;
};

export const addToSpecialList = async (gameId: string): Promise<boolean> => {
  const { error } = await supabase
    .from("special_games")
    .insert({ game_id: gameId });

  if (error) {
    if (error.message.includes("Maximum of 7")) {
      toast.error("Cannot add more than 7 games to special list");
    } else {
      toast.error("Failed to add game to special list: " + error.message);
    }
    console.error("Special list error:", error);
    return false;
  }

  toast.success("Game added to special list");
  return true;
};
