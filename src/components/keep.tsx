"use client";

import { useRef, useState } from "react";
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
import { Edit3, Loader2, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { deleteImage, uploadImage } from "@/actions/uploadImage";
import { getSupabaseClient } from "@/utils/supabase/client";
import { TiptapJson } from "@/types";
// import TiptapStandardEditor from "./tiptap-editor";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import Image from "next/image";
import { Progress } from "./ui/progress";

type Props = {
  section: string;
};

const EditOverview = ({ section }: Props) => {
  const [mainTextJson, setMainTextJson] = useState<TiptapJson | null>(null);
  const [subTextJson, setSubTextJson] = useState<TiptapJson | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<
    { fileName: string; progress: number }[]
  >([]); // Track progress for each file
  const [removingImage, setRemovingImage] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    if (imagePaths.length + newFiles.length > 5) {
      setError("Cannot upload more than 5 images");
      toast.error("Cannot upload more than 5 images");
      return;
    }

    // Initialize Supabase client
    const supabase = getSupabaseClient();

    // Initialize progress for each file
    setUploadProgress(
      newFiles.map((file) => ({ fileName: file.name, progress: 0 }))
    );

    const uploadedPaths: string[] = [];
    for (const file of newFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `user/${Date.now()}.${fileExt}`; // Adjust path as needed

      // Simulate progress start
      setUploadProgress((prev) =>
        prev.map((item) =>
          item.fileName === file.name ? { ...item, progress: 0 } : item
        )
      );

      // Simulate mid-progress (e.g., after 500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUploadProgress((prev) =>
        prev.map((item) =>
          item.fileName === file.name ? { ...item, progress: 50 } : item
        )
      );

      const { error, data } = await supabase.storage
        .from("hero-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        setUploadProgress([]);
        return;
      }

      // Simulate progress complete
      setUploadProgress((prev) =>
        prev.map((item) =>
          item.fileName === file.name ? { ...item, progress: 100 } : item
        )
      );

      const { data: publicUrlData } = supabase.storage
        .from("hero-images")
        .getPublicUrl(fileName);

      uploadedPaths.push(publicUrlData.publicUrl);
    }

    // Clear progress after a short delay to show 100%
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUploadProgress([]);
    setImagePaths([...imagePaths, ...uploadedPaths]);
    setError(null);
    toast.success("Images uploaded successfully");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return;

    setRemovingImage(imageUrl); // Set loading state
    const { error } = await deleteImage(fileName);
    setRemovingImage(null); // Clear loading state

    if (error) {
      toast.error(error);
      return;
    }

    setImagePaths(imagePaths.filter((path) => path !== imageUrl));
    toast.success("Image removed successfully");
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (section === "Hero" && (!mainTextJson || !subTextJson)) {
      setError("Please provide main and sub hero text");
      toast.error("Please provide main and sub hero text");
      return;
    }

    // Save to hero_content if section is Hero
    if (section === "Hero") {
      console.log("Saving hero content:", {
        mainTextJson,
        subTextJson,
        imagePaths,
      });

      const supabase = getSupabaseClient();
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
            <div className="flex flex-col relative">
              <h3 className="font-semibold">Main {section} Text</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This is the main text that appears in the{" "}
                <strong>{section.toLowerCase()} </strong>
                section.
              </p>

              <SimpleEditor
                initialContent={
                  "<p>Main content area, start typing to enter text.</p>"
                }
                onUpdate={(json) => setMainTextJson(json)}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <h3 className="text-lg font-semibold">Sub {section} Text</h3>
              <p className="text-sm text-muted-foreground">
                This is the sub text that appears in the {section.toLowerCase()}{" "}
                section.
              </p>
              <SimpleEditor
                initialContent={
                  "<p>Sub Hero Text, start typing to enter text.</p>"
                }
                onUpdate={(json) => setSubTextJson(json)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">
                {section} Background Images (Max 5)
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload up to 5 images for the {section.toLowerCase()} section
                background.
              </p>

              {/* Display uploaded images */}
              {imagePaths.length > 0 && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {imagePaths.map((url, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Image
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-30 object-cover rounded-md border"
                      />
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveImage(url)}
                        disabled={removingImage === url}
                      >
                        {removingImage === url ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Removing
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Display upload progress */}
              {uploadProgress.length > 0 && (
                <div className="mt-4">
                  {uploadProgress.map((item) => (
                    <div key={item.fileName} className="mb-2">
                      <p className="text-sm">{item.fileName}</p>
                      <Progress value={item.progress} className="w-full" />
                    </div>
                  ))}
                </div>
              )}

              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={imagePaths.length >= 5}
                className="mt-5 hidden"
              />
              {imagePaths.length < 5 && (
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {imagePaths.length < 1 ? "Add an image" : "Add another"}
                </Button>
              )}
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>

            {/* <div className="flex flex-col">
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
            )} */}
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
