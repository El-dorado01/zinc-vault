// src/components/game-background-imageUpload.tsx
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { uploadImage, removeImage } from "@/lib/game-background/gameUtils";

type ImageUploadProps = {
  imageUrl: string | null;
  images: string[];
  setImage: (url: string | null) => void;
  setImages: (urls: string[]) => void;
  path: string;
  isTeam?: boolean;
  maxImages?: number;
  onChange: () => void;
};

export const ImageUpload = ({
  imageUrl,
  images,
  setImage,
  setImages,
  path,
  isTeam = false,
  maxImages = 3,
  onChange,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [removingImage, setRemovingImage] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (isTeam && images.length >= maxImages) {
      return;
    }

    setIsUploading(true);
    const url = await uploadImage(file, path);
    setIsUploading(false);

    if (url) {
      setImage(url);
      if (isTeam) {
        setImages([...images, url]);
      }
      onChange();
    }
  };

  const handleRemove = async (url: string) => {
    setRemovingImage(url);
    const success = await removeImage(url);
    setRemovingImage(null);

    if (success) {
      setImage(null);
      if (isTeam) {
        setImages(images.filter((img) => img !== url));
      }
      onChange();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {imageUrl && (
        <div className="flex items-start gap-2">
          <Image
            src={imageUrl}
            alt={isTeam ? "Team image" : "Company image"}
            width={120}
            height={120}
            className="w-30 h-30 object-cover rounded-md border"
            loading="lazy"
          />
          <Button
            variant="destructive"
            onClick={() => handleRemove(imageUrl)}
            disabled={removingImage === imageUrl || isUploading}
          >
            {removingImage === imageUrl ? (
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
      )}
      {!imageUrl && (
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="mt-2"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Uploading
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              {isTeam ? "Add Team Image" : "Add Company Image"}
            </>
          )}
        </Button>
      )}
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
