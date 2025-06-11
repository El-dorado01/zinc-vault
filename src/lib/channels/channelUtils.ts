import { getSupabaseClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { TiptapJson } from "@/types";

const supabase = getSupabaseClient();

export interface Channel {
  id: string;
  name: string;
  link: string;
  logo: string;
  service_name: string;
  service_description: TiptapJson | null;
  sub_services: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceOption {
  name: string;
  sub_services: string[];
}

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("channels-logo")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("channels-logo")
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
    const urlParts = publicUrl.split(
      "/storage/v1/object/public/channels-logo/"
    );
    if (urlParts.length < 2) {
      throw new Error("Invalid public URL");
    }
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from("channels-logo")
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

export const fetchServices = async (): Promise<ServiceOption[]> => {
  try {
    const { data, error } = await supabase
      .from("youtube_services")
      .select("name, sub_services");

    if (error) {
      toast.error("Failed to fetch services");
      throw error;
    }

    return data as ServiceOption[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const fetchChannels = async (): Promise<Channel[]> => {
  try {
    const { data, error } = await supabase
      .from("channels")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to fetch channels");
      throw error;
    }

    return data as Channel[];
  } catch (error) {
    console.error("Error fetching channels:", error);
    return [];
  }
};

export const addChannel = async (
  channel: Omit<Channel, "id" | "created_at" | "updated_at">
): Promise<boolean> => {
  try {
    const { error } = await supabase.from("channels").insert({
      name: channel.name,
      link: channel.link,
      logo: channel.logo,
      service_name: channel.service_name,
      service_description: channel.service_description,
      sub_services: channel.sub_services,
    });

    if (error) {
      toast.error("Failed to add channel");
      throw error;
    }

    toast.success("Channel added successfully");
    return true;
  } catch (error) {
    console.error("Error adding channel:", error);
    toast.error("Failed to add channel");
    return false;
  }
};

export const updateChannel = async (
  id: string,
  updates: Partial<Channel>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("channels")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update channel");
      throw error;
    }

    toast.success("Channel updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating channel:", error);
    toast.error("Failed to update channel");
    return false;
  }
};

export const deleteChannel = async (id: string): Promise<boolean> => {
  try {
    // Fetch the channel to get the logo URL
    const { data: channel, error: fetchError } = await supabase
      .from("channels")
      .select("logo")
      .eq("id", id)
      .single();

    if (fetchError || !channel) {
      toast.error("Failed to fetch channel for deletion");
      throw fetchError || new Error("Channel not found");
    }

    // Delete the associated logo if it exists
    if (channel.logo) {
      const imageDeleted = await deleteImage(channel.logo);
      if (!imageDeleted) {
        throw new Error("Failed to delete associated logo");
      }
    }

    // Delete the channel
    const { error: deleteError } = await supabase
      .from("channels")
      .delete()
      .eq("id", id);

    if (deleteError) {
      toast.error("Failed to delete channel");
      throw deleteError;
    }

    toast.success("Channel deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting channel:", error);
    toast.error("Failed to delete channel");
    return false;
  }
};
