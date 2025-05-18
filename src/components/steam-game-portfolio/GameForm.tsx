// src/components/steam-game-portfolio/GameForm.tsx
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Game, TiptapJson } from "@/types";
import { uploadImage } from "@/lib/games/gameUtils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface GameFormProps {
  game: Partial<Game>;
  setGame: (game: Partial<Game>) => void;
  isSaving: boolean;
}

const GameForm = ({ game, setGame, isSaving }: GameFormProps) => {
  const carouselInputRef = useRef<HTMLInputElement>(null);

  const handleCarouselUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "games/carousel");
      if (url) {
        newImages.push(url);
      }
    }

    setGame({
      ...game,
      carousel_images: [...(game.carousel_images || []), ...newImages],
    });
  };

  const removeCarouselImage = (url: string) => {
    setGame({
      ...game,
      carousel_images: game.carousel_images?.filter((img) => img !== url) || [],
    });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={game.name || ""}
          onChange={(e) => setGame({ ...game, name: e.target.value })}
          placeholder="Enter game name"
          disabled={isSaving}
        />
      </div>
      <div className="grid gap-2 relative">
        <Label>Description</Label>
        <SimpleEditor
          initialContent={game.description ?? undefined}
          onUpdate={(json: TiptapJson) =>
            setGame({ ...game, description: json })
          }
          panel="Dialog"
          disabled={isSaving}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="studio">Studio</Label>
        <Input
          id="studio"
          value={game.studio || ""}
          onChange={(e) => setGame({ ...game, studio: e.target.value })}
          placeholder="Enter studio name"
          disabled={isSaving}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await uploadImage(file, "games");
              if (url) {
                setGame({ ...game, thumbnail: url });
              }
            }
          }}
          disabled={isSaving}
        />
        {game.thumbnail && (
          <Image
            src={game.thumbnail}
            alt="Thumbnail preview"
            width={120}
            height={120}
            className="mt-2 rounded-md"
          />
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="carousel_images">Carousel Images</Label>
        <Input
          id="carousel_images"
          type="file"
          accept="image/*"
          multiple
          ref={carouselInputRef}
          onChange={handleCarouselUpload}
          disabled={isSaving}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {game.carousel_images?.map((url, index) => (
            <div key={index} className="relative">
              <Image
                src={url}
                alt={`Carousel image ${index + 1}`}
                width={80}
                height={80}
                className="rounded-md"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-0 right-0"
                onClick={() => removeCarouselImage(url)}
                disabled={isSaving}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-2 relative">
        <Label>Problem</Label>
        <SimpleEditor
          initialContent={game.problem ?? undefined}
          onUpdate={(json: TiptapJson) => setGame({ ...game, problem: json })}
          panel="Dialog"
          disabled={isSaving}
        />
      </div>
      <div className="grid gap-2 relative">
        <Label>Approach</Label>
        <SimpleEditor
          initialContent={game.approach ?? undefined}
          onUpdate={(json: TiptapJson) => setGame({ ...game, approach: json })}
          panel="Dialog"
          disabled={isSaving}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tools">Tools (comma-separated)</Label>
        <Input
          id="tools"
          value={game.tools?.join(", ") || ""}
          onChange={(e) =>
            setGame({
              ...game,
              tools: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          placeholder="e.g., Blender, Photoshop"
          disabled={isSaving}
        />
      </div>
    </div>
  );
};

export default GameForm;
