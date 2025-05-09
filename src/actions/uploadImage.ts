"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function uploadImage(
  formData: FormData,
  onProgress?: (fileName: string, progress: number) => void
) {
  const supabase = await createSupabaseServerClient();
  const sessionToken = (await cookies()).get("sessionToken")?.value;

  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const user = await verifySessionToken(sessionToken);
  console.log("Authenticated user:", user);
  if (!user) {
    return { error: "Invalid or expired session" };
  }

  const files = formData.getAll("images") as File[];
  if (files.length > 5) {
    return { error: "Cannot upload more than 5 images" };
  }

  const uploadedPaths: string[] = [];
  for (const file of files) {
    if (file.size === 0) continue;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.email}/${Date.now()}.${fileExt}`;
    console.log("Uploading file:", fileName);

    // Simulate progress (since server-side upload doesn't support progress)
    if (onProgress) {
      onProgress(file.name, 0); // Start
      onProgress(file.name, 50); // Midpoint (simulated)
    }

    const { error } = await supabase.storage
      .from("hero-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("Upload error:", error);
      return { error: error.message };
    }

    if (onProgress) {
      onProgress(file.name, 100); // Complete
    }

    const { data: publicUrlData } = supabase.storage
      .from("hero-images")
      .getPublicUrl(fileName);

    uploadedPaths.push(publicUrlData.publicUrl);
  }

  return { data: uploadedPaths };
}

export async function deleteImage(fileName: string) {
  const supabase = await createSupabaseServerClient();
  const sessionToken = (await cookies()).get("sessionToken")?.value;

  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const user = await verifySessionToken(sessionToken);
  if (!user) {
    return { error: "Invalid or expired session" };
  }

  const fullPath = `user/${fileName}`; // Match upload path
  const { error } = await supabase.storage
    .from("hero-images")
    .remove([fullPath]);

  if (error) {
    console.error("Delete error:", error);
    return { error: error.message };
  }

  return { data: true };
}
