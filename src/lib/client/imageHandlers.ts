// src/lib/client/imageHandlers.ts
"use client";

import { ChangeEvent } from "react";
import { toast } from "sonner";
import { getSupabaseClient } from "@/utils/supabase/client";

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export async function handleFileChange(
  event: ChangeEvent<HTMLInputElement>,
  imagePaths: string[],
  setImagePaths: (paths: string[]) => void,
  setUploadProgress: React.Dispatch<
    React.SetStateAction<{ fileName: string; progress: number }[]>
  >,
  setError: (error: string | null) => void,
  fileInputRef: React.RefObject<HTMLInputElement | null>
) {
  setError(null);
  const files = event.target.files;
  if (!files || files.length === 0) {
    setError("No files selected");
    return;
  }

  const newFiles = Array.from(files).filter(
    (file) =>
      ALLOWED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
  );

  if (newFiles.length === 0) {
    setError("Invalid file type or file size exceeds 5MB");
    return;
  }

  if (imagePaths.length + newFiles.length > 5) {
    setError("Cannot upload more than 5 images");
    return;
  }

  const supabase = getSupabaseClient();
  const uploadPromises = newFiles.map(async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `user/${fileName}`; // Store in user/ folder

    setUploadProgress((prev: { fileName: string; progress: number }[]) => [
      ...prev,
      { fileName: file.name, progress: 0 },
    ]);

    const { error } = await supabase.storage
      .from("hero-images") // Use hero-images bucket
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw new Error(`Failed to upload ${file.name}: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("hero-images").getPublicUrl(filePath);

    setUploadProgress((prev: { fileName: string; progress: number }[]) =>
      prev.map((item) =>
        item.fileName === file.name ? { ...item, progress: 100 } : item
      )
    );

    return publicUrl;
  });

  try {
    const newUrls = await Promise.all(uploadPromises);
    setImagePaths([...imagePaths, ...newUrls]);
    setUploadProgress([]);
    toast.success("Images uploaded successfully!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
      toast.error(error.message);
    } 
    setUploadProgress([]);
  } finally {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Safely reset if not null
    }
  }
}

export async function handleRemoveImage(
  url: string,
  imagePaths: string[],
  setImagePaths: (paths: string[]) => void,
  setRemovingImage: (url: string | null) => void
) {
  setRemovingImage(url);
  const supabase = getSupabaseClient();
  const filePath = url.split("/storage/v1/object/public/hero-images/")[1]; // Extract user/filename

  if (!filePath) {
    toast.error("Invalid image URL format");
    setRemovingImage(null);
    return;
  }

  try {
    const { error } = await supabase.storage
      .from("hero-images")
      .remove([filePath]);
    if (error) {
      throw new Error(`Failed to remove image: ${error.message}`);
    }
    setImagePaths(imagePaths.filter((path) => path !== url));
    toast.success("Image removed successfully!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } 
  } finally {
    setRemovingImage(null);
  }
}

export async function deleteUnsavedImages(
  currentImagePaths: string[],
  initialImagePaths: string[],
  setError: (error: string | null) => void
) {
  const imagesToDelete = currentImagePaths.filter(
    (path) => !initialImagePaths.includes(path)
  );
  if (imagesToDelete.length === 0) {
    return;
  }


  const supabase = getSupabaseClient();
  const filePaths = imagesToDelete
    .map((url) => {
      const parts = url.split("/storage/v1/object/public/hero-images/");
      if (parts.length < 2) {
        console.warn(`Invalid image URL format: ${url}`);
        return "";
      }
      return parts[1]; // Should be user/filename
    })
    .filter((path) => path !== "");

  if (filePaths.length === 0) {
    console.warn("No valid file paths extracted for deletion");
    setError("Failed to delete images: Invalid URL format");
    return;
  }

  try {
    const { error } = await supabase.storage
      .from("hero-images")
      .remove(filePaths);

    if (error) {
      throw new Error(`Failed to delete unsaved images: ${error.message}`);
    }

  } catch (error: any) {
    if (error instanceof Error) {
      setError(error.message);
      toast.error(error.message);
    } 
    console.error("Error deleting unsaved images:", error);
  }
}
