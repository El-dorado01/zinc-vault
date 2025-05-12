import { getSupabaseClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { FormData } from "./formSchema";
import { TrustSignal } from "@/lib/trust-signals/formSchema";

const supabase = getSupabaseClient();

// Map Supabase response to TrustSignal type to avoid extra fields
const mapToTrustSignal = (data: any): TrustSignal => ({
  id: data.id,
  game_name: data.game_name,
  comment: data.comment,
  image_path: data.image_path,
});

export async function fetchTrustSignals(): Promise<TrustSignal[]> {
  const { data, error } = await supabase
    .from("trust_signals")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Fetch error:", error);
    toast.error("Failed to load trust signals");
    return [];
  }
  return (data || []).map(mapToTrustSignal); // Map to TrustSignal type
}

export async function addTrustSignal(
  data: FormData,
  setTrustSignals: React.Dispatch<React.SetStateAction<TrustSignal[]>>
): Promise<void> {
  if (!data.image) {
    throw new Error("Image is required for new trust signals.");
  }

  const fileExt = data.image.name.split(".").pop();
  const fileName = `trust-signal-${Date.now()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from("trust-signals")
    .upload(fileName, data.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/trust-signals/${fileName}`;

  const { data: newSignalData, error } = await supabase
    .from("trust_signals")
    .insert({
      game_name: data.game_name,
      comment: data.comment || null,
      image_path: imagePath,
    })
    .select()
    .single();

  if (error) {
    console.error("Add error:", error);
    throw new Error(`Failed to add trust signal: ${error.message}`);
  }

  const newSignal = mapToTrustSignal(newSignalData);
  setTrustSignals((prev) => [...prev, newSignal]);
  toast.success("Trust signal added successfully");
}

export async function updateTrustSignal(
  data: FormData,
  editingSignal: TrustSignal,
  setTrustSignals: React.Dispatch<React.SetStateAction<TrustSignal[]>>
): Promise<void> {
  let imagePath = editingSignal.image_path;

  if (data.image) {
    const fileExt = data.image.name.split(".").pop();
    const fileName = `trust-signal-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("trust-signals")
      .upload(fileName, data.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/trust-signals/${fileName}`;

    // Delete old image
    const oldFileName = editingSignal.image_path.split("/").pop();
    if (oldFileName) {
      const { error: deleteError } = await supabase.storage
        .from("trust-signals")
        .remove([oldFileName]);
      if (deleteError) {
        console.error("Failed to delete old image:", deleteError);
        toast.warning("Updated trust signal, but failed to delete old image.");
      } else {
        console.log(`Deleted old image: ${oldFileName}`);
      }
    }
  }

  const { error } = await supabase
    .from("trust_signals")
    .update({
      game_name: data.game_name,
      comment: data.comment || null,
      image_path: imagePath,
    })
    .eq("id", editingSignal.id);

  if (error) {
    console.error("Update error:", error);
    throw new Error(`Failed to update trust signal: ${error.message}`);
  }

  setTrustSignals((prev) =>
    prev.map((signal) =>
      signal.id === editingSignal.id
        ? {
            id: editingSignal.id,
            game_name: data.game_name,
            comment: data.comment,
            image_path: imagePath,
          }
        : signal
    )
  );
  toast.success("Trust signal updated successfully");
}

export async function deleteTrustSignal(
  signal: TrustSignal,
  setTrustSignals: React.Dispatch<React.SetStateAction<TrustSignal[]>>
): Promise<void> {
  const { error: dbError } = await supabase
    .from("trust_signals")
    .delete()
    .eq("id", signal.id);
  if (dbError) {
    console.error("Delete error:", dbError);
    throw new Error(`Failed to delete trust signal: ${dbError.message}`);
  }

  const fileName = signal.image_path.split("/").pop();
  if (fileName) {
    const { error: storageError } = await supabase.storage
      .from("trust-signals")
      .remove([fileName]);
    if (storageError) {
      console.error("Failed to delete image:", storageError);
      toast.warning("Deleted trust signal, but failed to delete image.");
    } else {
      console.log(`Deleted image: ${fileName}`);
    }
  } else {
    console.warn("No file name extracted from image_path:", signal.image_path);
  }

  setTrustSignals((prev) => prev.filter((s) => s.id !== signal.id));
  toast.success("Trust signal deleted successfully");
}
