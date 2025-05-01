"use client";

import { useState, useRef } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Edit3 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { uploadImage } from "@/actions/uploadImage";
import { createSupabaseClientClient } from "@/utils/supabase/client";
import { TiptapJson } from "@/types";
import TiptapStandardEditor from "./tiptap-editor";

type Props = {
  section: string;
};

const EditOverview = ({ section }: Props) => {
  const [mainTextJson, setMainTextJson] = useState<TiptapJson | null>(null);
  const [subTextJson, setSubTextJson] = useState<TiptapJson | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (imagePaths.length + newFiles.length > 5) {
      setError("Cannot upload more than 5 images");
      toast.error("Cannot upload more than 5 images");
      return;
    }

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("images", file));

    const { data, error } = await uploadImage(formData);
    if (error || !data) {
      setError(error || "Failed to upload images");
      toast.error(error || "Failed to upload images");
      return;
    }

    setImagePaths([...imagePaths, ...data]);
    setError(null);
    toast.success("Images uploaded successfully");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (section === "Hero" && (!mainTextJson || !subTextJson)) {
      setError("Please provide main and sub hero text");
      toast.error("Please provide main and sub hero text");
      return;
    }

    // Check user session via API
    const userResponse = await fetch("/api/v1/verify-session", {
      headers: {
        "x-session-token":
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("sessionToken="))
            ?.split("=")[1] || "",
      },
    });
    if (!userResponse.ok) {
      setError("Please log in");
      toast.error("Please log in");
      return;
    }

    const { success } = await userResponse.json();
    if (!success) {
      setError("Invalid or expired session");
      toast.error("Invalid or expired session");
      return;
    }

    // Save to hero_content if section is Hero
    if (section === "Hero") {
      const supabase = createSupabaseClientClient();
      const { error } = await supabase.from("hero_content").insert({
        hero_texts: {
          main: mainTextJson,
          sub: subTextJson,
        },
        image_paths: imagePaths,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }

      setImagePaths([]);
      setMainTextJson(null);
      setSubTextJson(null);
      setError("Content saved successfully!");
      toast.success("Content saved successfully!");
    } else {
      // Handle other sections (e.g., log JSON or save elsewhere)
      console.log(`Saving ${section} content:`, { mainTextJson, subTextJson });
      toast.success(`${section} content saved!`);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="absolute top-4 right-4 z-5 md:hidden"
          id="editButton"
        >
          <Edit3 className="size-3.5" /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[540px] p-2">
        <SheetHeader>
          <SheetTitle className="text-lg">Edit {section}</SheetTitle>
          <SheetDescription>
            Make changes to your <strong>{section}</strong> section. Click save
            when you are done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
          <div className="grid gap-4 w-full p-4">
            {/* Main Text Editor */}
            <div className="flex flex-col">
              <h3 className="font-semibold">Main {section} Text</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This is the main text that appears in the{" "}
                {section.toLowerCase()} section.
              </p>
              <TiptapStandardEditor
                initialContent={
                  section === "Hero"
                    ? "<h1>Main Hero Text</h1>"
                    : "<p>Start editing...</p>"
                }
                onUpdate={(json) => setMainTextJson(json)}
              />
            </div>

            {/* Sub Text Editor */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Sub {section} Text</h3>
              <p className="text-sm text-muted-foreground">
                This is the sub text that appears in the {section.toLowerCase()}{" "}
                section.
              </p>
              <TiptapStandardEditor
                initialContent={
                  section === "Hero"
                    ? "<p>Sub Hero Text</p>"
                    : "<p>Start editing...</p>"
                }
                onUpdate={(json) => setSubTextJson(json)}
              />
            </div>

            {/* Image Upload (Hero section only) */}
            {section === "Hero" && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">
                  Hero Background Images (Max 5)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload up to 5 images for the hero section background.
                </p>
                <Label htmlFor="image-upload">Upload Images</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={imagePaths.length >= 5}
                  className="mt-1"
                />
                {imagePaths.length < 5 && (
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mt-2"
                  >
                    Add another
                  </Button>
                )}
                {imagePaths.length > 0 && (
                  <div className="mt-4">
                    <p>Uploaded Images:</p>
                    <ul className="list-disc pl-5">
                      {imagePaths.map((path, index) => (
                        <li key={index}>
                          <a
                            href={path}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Image {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Error/Success Message */}
            {error && (
              <p
                className={
                  error.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {error}
              </p>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditOverview;
