"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifySessionToken } from "@/lib/auth";

export async function uploadImage(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const sessionToken = (await cookies()).get("sessionToken")?.value;

  // Verify session token
  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const user = await verifySessionToken(sessionToken);
  if (!user) {
    return { error: "Invalid or expired session" };
  }

  // Validate user against approved_users
  const { data: approvedUser, error: approvedError } = await supabase
    .from("approved_users")
    .select("email")
    .eq("email", user.email)
    .single();

  if (approvedError || !approvedUser) {
    return { error: "Unauthorized" };
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
    const { error } = await supabase.storage
      .from("hero-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return { error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("hero-images")
      .getPublicUrl(fileName);

    uploadedPaths.push(publicUrlData.publicUrl);
  }

  revalidatePath("/hero");
  return { data: uploadedPaths };
}
