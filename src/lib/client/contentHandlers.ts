// src/lib/client/contentHandlers.ts
"use client";

import { toast } from "sonner";
import { getSupabaseClient } from "@/utils/supabase/client";
import { handleSubmitProps } from "@/types";

export async function handleSubmit({
  section,
  mainTextJson,
  subTextJson,
  imagePaths,
  setMainTextJson,
  setSubTextJson,
  setImagePaths,
  setError,
  setSuccess,
  setIsSaving,
  setInitialMainTextJson,
  setInitialSubTextJson,
  setInitialImagePaths,
}: handleSubmitProps) {
  setIsSaving(true);
  setError(null);
  setSuccess(null);

  if (section === "Hero" && (!mainTextJson || !subTextJson)) {
    setError("Please provide main and sub hero text");
    setIsSaving(false);
    toast.error("Please provide main and sub hero text");
    return;
  }

  if (section === "Hero") {

    const supabase = getSupabaseClient();

    // Fetch the latest record to get its ID (if it exists)
    const { data: existingRecords, error: fetchError } = await supabase
      .from("hero_content")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchError) {
      setError(fetchError.message);
      setIsSaving(false);
      toast.error(fetchError.message);
      return;
    }

    const newContent = {
      hero_texts: {
        main: mainTextJson,
        sub: subTextJson,
      },
      image_paths: imagePaths,
    };

    if (existingRecords && existingRecords.length > 0) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("hero_content")
        .update(newContent)
        .eq("id", existingRecords[0].id);

      if (updateError) {
        setError(updateError.message);
        setIsSaving(false);
        toast.error(updateError.message);
        return;
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from("hero_content")
        .insert(newContent);

      if (insertError) {
        setError(insertError.message);
        setIsSaving(false);
        toast.error(insertError.message);
        return;
      }
    }

    // Refetch content to ensure UI is in sync
    const { data: updatedRecords, error: refetchError } = await supabase
      .from("hero_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (refetchError) {
      setError(refetchError.message);
      setIsSaving(false);
      toast.error(refetchError.message);
      return;
    }

    if (updatedRecords && updatedRecords.length > 0) {
      const latestContent = updatedRecords[0];
      setMainTextJson(latestContent.hero_texts.main);
      setSubTextJson(latestContent.hero_texts.sub);
      setImagePaths(latestContent.image_paths);
      // Update initial states
      setInitialMainTextJson(latestContent.hero_texts.main);
      setInitialSubTextJson(latestContent.hero_texts.sub);
      setInitialImagePaths(latestContent.image_paths);
    }

    setError(null);
    setSuccess("Content saved successfully!");
    setIsSaving(false);
    toast.success("Content saved successfully!");
  } else {
    setError(null);
    setSuccess(`${section} content saved!`);
    setIsSaving(false);
    toast.success(`${section} content saved!`);
    // Update initial states for non-Hero sections
    setInitialMainTextJson(mainTextJson);
    setInitialSubTextJson(subTextJson);
    setInitialImagePaths(imagePaths);
  }
}
