// src/components/HeroContentDisplay.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { HeroContentDisplayProps } from "@/types";
import { handleRemoveImage } from "@/lib/client/imageHandlers";

export function HeroContentDisplay({
  promise,
  section,
  mainTextJson,
  subTextJson,
  imagePaths,
  setMainTextJson,
  setSubTextJson,
  setImagePaths,
}: HeroContentDisplayProps) {
  const [removingImage, setRemovingImage] = useState<string | null>(null);

  // Memoize initialContent to prevent unnecessary re-renders
  const mainInitialContent = useMemo(
    () =>
      mainTextJson || "<p>Main content area, start typing to enter text.</p>",
    [mainTextJson]
  );

  const subInitialContent = useMemo(
    () => subTextJson || "<p>Sub Hero Text, start typing to enter text.</p>",
    [subTextJson]
  );

  return (
    <div className="grid gap-4 w-full p-4">
      <div className="flex flex-col relative">
        <h3 className="font-semibold">Main {section} Text</h3>
        <p className="text-sm text-muted-foreground mb-2">
          This is the main text that appears in the{" "}
          <strong>{section.toLowerCase()} </strong>
          section.
        </p>
        <SimpleEditor
          initialContent={mainInitialContent}
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
          initialContent={subInitialContent}
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
        {imagePaths.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {imagePaths.map((url, index) => (
              <div key={url} className="flex items-start gap-2">
                <Image
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-30 object-cover rounded-md border"
                />
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleRemoveImage(
                      url,
                      imagePaths,
                      setImagePaths,
                      setRemovingImage
                    )
                  }
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
      </div>
    </div>
  );
}
