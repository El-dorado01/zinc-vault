"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Game, TiptapJson } from "@/types";
import { removeImage, uploadImage } from "@/lib/games/gameUtils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { isEqual } from "lodash";

interface GameFormProps {
  game: Partial<Game>;
  setGame: (game: Partial<Game>) => void;
  isSaving: boolean;
  onValidation?: (isValid: boolean) => void;
  panel?: "Sheet" | "Dialog";
  onUnsavedChanges?: (
    hasChanges: boolean,
    newImages: { thumbnail?: string; carousel: string[] }
  ) => void;
}

const GameForm = ({
  game,
  setGame,
  isSaving,
  onValidation,
  panel,
  onUnsavedChanges,
}: GameFormProps) => {
  const carouselInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [initialGameState, setInitialGameState] = useState<Partial<Game>>(game);
  const [newImages, setNewImages] = useState<{
    thumbnail?: string;
    carousel: string[];
  }>({ carousel: [] });

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!game.name?.trim()) {
      newErrors.name = "Game name is required";
    }
    if (!game.description || Object.keys(game.description).length === 0) {
      newErrors.description = "Description is required and cannot be empty";
    }
    if (!game.thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
    }
    if (!game.studio?.trim()) {
      newErrors.studio = "Studio name is required";
    }
    if (!game.problem || Object.keys(game.problem).length === 0) {
      newErrors.problem = "Problem description is required and cannot be empty";
    }
    if (!game.approach || Object.keys(game.approach).length === 0) {
      newErrors.approach =
        "Approach description is required and cannot be empty";
    }
    if (!game.tools || game.tools.length === 0) {
      newErrors.tools = "At least one tool is required";
    }
    if (!game.carousel_images || game.carousel_images.length < 2) {
      newErrors.carousel_images = "At least two carousel images are required";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidation?.(isValid);

    // Log form state and errors for debugging
    if (!isValid) {
      // console.log("Validation failed. Form state:", game);
      // console.log("Validation errors:", newErrors);
      // toast.error(
      //   `Please fill all required fields: ${Object.values(newErrors).join(", ")}`
      // );
    }

    return isValid;
  };

  // Detect unsaved changes
  useEffect(() => {
    const hasChanges = !isEqual(game, initialGameState);
    onUnsavedChanges?.(hasChanges, newImages);
    validateForm();
  }, [game, initialGameState, newImages, onUnsavedChanges]);

  // Update initial state when game prop changes (e.g., new/edit game)
  useEffect(() => {
    setInitialGameState(game);
    setNewImages({ carousel: [] });
  }, [game.id]);

  const handleInputChange = (field: keyof Game, value: any) => {
    setGame({ ...game, [field]: value });
  };

  const handleCarouselUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedImages: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "games/carousel");
      if (url) {
        uploadedImages.push(url);
      }
    }

    const updatedImages = [...(game.carousel_images || []), ...uploadedImages];
    setGame({ ...game, carousel_images: updatedImages });
    setNewImages({
      ...newImages,
      carousel: [...newImages.carousel, ...uploadedImages],
    });
  };

  const removeCarouselImage = async (url: string) => {
    const imageRemoved = await removeImage(
      url,
      "steam-background-images"
    );
    if (imageRemoved) {
      const updatedImages =
        game.carousel_images?.filter((img) => img !== url) || [];
      setGame({ ...game, carousel_images: updatedImages });
      setNewImages({
        ...newImages,
        carousel: newImages.carousel.filter((img) => img !== url),
      });
      validateForm();
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={game.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter game name"
          disabled={isSaving}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="grid gap-2 relative">
        <Label>Description *</Label>
        <SimpleEditor
          panel={panel}
          initialContent={game.description ?? undefined}
          onUpdate={(json: TiptapJson) =>
            handleInputChange("description", json)
          }
          disabled={isSaving}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="studio">Studio *</Label>
        <Input
          id="studio"
          value={game.studio || ""}
          onChange={(e) => handleInputChange("studio", e.target.value)}
          placeholder="Enter studio name"
          disabled={isSaving}
        />
        {errors.studio && (
          <p className="text-red-500 text-sm">{errors.studio}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail *</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await uploadImage(file, "games");
              if (url) {
                handleInputChange("thumbnail", url);
                setNewImages({ ...newImages, thumbnail: url });
              }
            }
          }}
          disabled={isSaving}
        />
        {game.thumbnail && (
          <div className="flex">
            <Image
              src={game.thumbnail}
              alt="Thumbnail preview"
              width={120}
              height={120}
              className="rounded-md w-full max-h-[200px] h-auto object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="max-w-min ml-2"
              onClick={() => {
                removeImage(
                  game.thumbnail!,
                  "steam-background-images"
                );
                handleInputChange("thumbnail", "");
                setNewImages({ ...newImages, thumbnail: undefined });
              }}
              disabled={isSaving}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        {errors.thumbnail && (
          <p className="text-red-500 text-sm">{errors.thumbnail}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="carousel_images">Carousel Images * (minimum 2)</Label>
        <Input
          id="carousel_images"
          type="file"
          accept="image/*"
          multiple
          ref={carouselInputRef}
          onChange={handleCarouselUpload}
          disabled={isSaving}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          {game.carousel_images?.map((url, index) => (
            <div key={index} className="relative border rounded-md">
              <Image
                src={url}
                alt={`Carousel image ${index + 1}`}
                width={200}
                height={200}
                className="rounded-md w-full max-h-[200px] h-auto object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeCarouselImage(url)}
                disabled={isSaving}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {errors.carousel_images && (
          <p className="text-red-500 text-sm">{errors.carousel_images}</p>
        )}
      </div>
      <div className="grid gap-2 relative">
        <Label>Problem *</Label>
        <SimpleEditor
          panel={panel}
          initialContent={game.problem ?? undefined}
          onUpdate={(json: TiptapJson) => handleInputChange("problem", json)}
          disabled={isSaving}
        />
        {errors.problem && (
          <p className="text-red-500 text-sm">{errors.problem}</p>
        )}
      </div>
      <div className="grid gap-2 relative">
        <Label>Approach *</Label>
        <SimpleEditor
          panel={panel}
          initialContent={game.approach ?? undefined}
          onUpdate={(json: TiptapJson) => handleInputChange("approach", json)}
          disabled={isSaving}
        />
        {errors.approach && (
          <p className="text-red-500 text-sm">{errors.approach}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tools">Tools * (comma-separated)</Label>
        <Input
          id="tools"
          value={game.tools?.join(", ") || ""}
          onChange={(e) =>
            handleInputChange(
              "tools",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          placeholder="e.g., Blender, Photoshop"
          disabled={isSaving}
        />
        {errors.tools && <p className="text-red-500 text-sm">{errors.tools}</p>}
      </div>
    </div>
  );
};

export default GameForm;
