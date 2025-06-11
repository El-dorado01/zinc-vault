//src/lib/youtube-services/serviceUtils.ts
import { getSupabaseClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { TiptapJson } from "@/types";

const supabase = getSupabaseClient();

export interface Service {
  id: string;
  name: string;
  description: TiptapJson | null;
  graphic: string;
  sub_services: string[];
  created_at: string;
  updated_at: string;
}

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("service-graphics")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("service-graphics")
      .getPublicUrl(fileName);

    toast.success("Image uploaded successfully");
    return data.publicUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    toast.error("Failed to upload image");
    return null;
  }
};

export const deleteImage = async (publicUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the public URL
    const urlParts = publicUrl.split(
      "/storage/v1/object/public/service-graphics/"
    );
    if (urlParts.length < 2) {
      throw new Error("Invalid public URL");
    }
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from("service-graphics")
      .remove([filePath]);

    if (error) {
      toast.error("Failed to delete image");
      throw error;
    }

    toast.success("Image deleted successfully");
    return true;
  } catch (error) {
    console.error("Image deletion error:", error);
    toast.error("Failed to delete image");
    return false;
  }
};

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from("youtube_services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to fetch services");
      throw error;
    }

    return data as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const insertService = async (
  service: Omit<Service, "id" | "created_at" | "updated_at">
): Promise<boolean> => {
  try {
    const { error } = await supabase.from("youtube_services").insert({
      name: service.name,
      description: service.description,
      graphic: service.graphic,
      sub_services: service.sub_services,
    });

    if (error) {
      toast.error("Failed to save service");
      throw error;
    }

    toast.success("Service saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving service:", error);
    toast.error("Failed to save service");
    return false;
  }
};

export const updateService = async (
  id: string,
  updates: Partial<Service>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("youtube_services")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update service");
      throw error;
    }

    toast.success("Service updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating service:", error);
    toast.error("Failed to update service");
    return false;
  }
};

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    // Fetch the service to get the graphic URL
    const { data: service, error: fetchError } = await supabase
      .from("youtube_services")
      .select("graphic")
      .eq("id", id)
      .single();

    if (fetchError || !service) {
      toast.error("Failed to fetch service for deletion");
      throw fetchError || new Error("Service not found");
    }

    // Delete the associated image if it exists
    if (service.graphic) {
      const imageDeleted = await deleteImage(service.graphic);
      if (!imageDeleted) {
        throw new Error("Failed to delete associated image");
      }
    }

    // Delete the service
    const { error: deleteError } = await supabase
      .from("youtube_services")
      .delete()
      .eq("id", id);

    if (deleteError) {
      toast.error("Failed to delete service");
      throw deleteError;
    }

    toast.success("Service deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    toast.error("Failed to delete service");
    return false;
  }
};
