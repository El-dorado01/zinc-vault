// src/components/EditGameOverview.tsx
"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Plus, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TiptapJson, Props } from "@/types";
import { Progress } from "./ui/progress";
import { fetchHeroContent } from "@/actions/heroContent";
import { deleteUnsavedImages, handleFileChange } from "@/lib/client/imageHandlers";
import { handleSubmit } from "@/lib/client/contentHandlers";
import { HeroContentDisplay } from "./hero-content-display";

const EditGameOverview = ({ section }: Props) => {
  const [mainTextJson, setMainTextJson] = useState<TiptapJson | null>(null);
  const [subTextJson, setSubTextJson] = useState<TiptapJson | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [initialMainTextJson, setInitialMainTextJson] =
    useState<TiptapJson | null>(null);
  const [initialSubTextJson, setInitialSubTextJson] =
    useState<TiptapJson | null>(null);
  const [initialImagePaths, setInitialImagePaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<
    { fileName: string; progress: number }[]
  >([]);

  // Memoize the promise to prevent re-creation
  const heroContentPromise = useMemo(() => fetchHeroContent(), [section]);

  // Initialize initial state from fetched content
  useEffect(() => {
    heroContentPromise
      .then((heroContents) => {
        if (heroContents.length > 0) {
          const latestContent = heroContents[0];
          setInitialMainTextJson(latestContent.hero_texts.main);
          setInitialSubTextJson(latestContent.hero_texts.sub);
          setInitialImagePaths(latestContent.image_paths);
          setMainTextJson(latestContent.hero_texts.main);
          setSubTextJson(latestContent.hero_texts.sub);
          setImagePaths(latestContent.image_paths);
        }
      })
      .catch((error) => {
        console.error("Failed to initialize content:", error);
        setError("Failed to load content");
      });
  }, [heroContentPromise]);

  // Check for unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    const mainChanged =
      JSON.stringify(mainTextJson) !== JSON.stringify(initialMainTextJson);
    const subChanged =
      JSON.stringify(subTextJson) !== JSON.stringify(initialSubTextJson);
    const imagesChanged =
      JSON.stringify(imagePaths) !== JSON.stringify(initialImagePaths);
    return mainChanged || subChanged || imagesChanged;
  }, [
    mainTextJson,
    subTextJson,
    imagePaths,
    initialMainTextJson,
    initialSubTextJson,
    initialImagePaths,
  ]);

  // Handle sheet open/close
  const handleOpenChange = (open: boolean) => {
    if (!open && hasUnsavedChanges && !isSaving) {
      setIsDialogOpen(true);
    } else {
      setIsSheetOpen(open);
    }
  };

  // Handle save and close from dialog
  const handleSaveAndClose = async () => {
    await handleSubmit({
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
    });
    if (!error) {
      setIsDialogOpen(false);
      setIsSheetOpen(false);
    }
  };

  // Handle discard changes
  const handleDiscardChanges = async () => {
    // Delete unsaved images from Supabase
    await deleteUnsavedImages(imagePaths, initialImagePaths, setError);

    // Revert to initial state
    setMainTextJson(initialMainTextJson);
    setSubTextJson(initialSubTextJson);
    setImagePaths(initialImagePaths);
    setUploadProgress([]);
    setError(null);
    setSuccess(null);

    // Close dialog and sheet
    setIsDialogOpen(false);
    setIsSheetOpen(false);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
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
              Make changes to your <strong>{section}</strong> section. Click
              save when you are done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
            <HeroContentDisplay
              promise={heroContentPromise}
              section={section}
              mainTextJson={mainTextJson}
              subTextJson={subTextJson}
              imagePaths={imagePaths}
              setMainTextJson={setMainTextJson}
              setSubTextJson={setSubTextJson}
              setImagePaths={setImagePaths}
            />
            {imagePaths.length < 5 && (
              <div className="flex flex-col gap-2 p-4">
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
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      imagePaths,
                      setImagePaths,
                      setUploadProgress,
                      setError,
                      fileInputRef
                    )
                  }
                  disabled={imagePaths.length >= 5}
                  className="mt-5 hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {imagePaths.length < 1 ? "Add an image" : "Add another"}
                </Button>

                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                {success && (
                  <p className="text-sm text-green-500 mt-2 hidden">{success}</p>
                )}
              </div>
            )}
          </ScrollArea>
          <SheetFooter>
            <Button
              type="button"
              onClick={() =>
                handleSubmit({
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
                })
              }
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes in the {section} section. Do you want to
              save them before closing?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDiscardChanges}
              disabled={isSaving}
            >
              Discard
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAndClose} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditGameOverview;
