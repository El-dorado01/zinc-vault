"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import GameForm from "./GameForm";
import { Game } from "@/types";
import { useState } from "react";
import { removeImage } from "@/lib/games/gameUtils";

interface AddGameModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  game: Partial<Game>;
  setGame: (game: Partial<Game>) => void;
  onSave: () => void;
  isSaving: boolean;
  isFormValid: boolean; // Add to interface
  setIsFormValid: (valid: boolean) => void; // Add to interface
}

const AddGameModal = ({
  isOpen,
  setIsOpen,
  game,
  setGame,
  onSave,
  isSaving,
  isFormValid,
  setIsFormValid,
}: AddGameModalProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newImages, setNewImages] = useState<{
    thumbnail?: string;
    carousel: string[];
  }>({ carousel: [] });

  const handleSave = () => {
    if (!isFormValid) {
      return;
    }
    onSave();
  };

  const handleSaveAndClose = () => {
    if (!isFormValid) {
      return;
    }
    onSave();
    setIsDialogOpen(false);
    setIsOpen(false);
  };

  const handleDiscardChanges = async () => {
    if (newImages.thumbnail) {
      await removeImage(newImages.thumbnail, "steam-background-images");
    }
    for (const url of newImages.carousel) {
      await removeImage(url, "steam-background-images");
    }

    setGame({
      name: "",
      description: undefined,
      thumbnail: "",
      studio: "",
      problem: undefined,
      approach: undefined,
      tools: [],
      carousel_images: [],
    });
    setIsDialogOpen(false);
    setIsOpen(false);
    setHasUnsavedChanges(false);
    setNewImages({ carousel: [] });
    setIsFormValid(false); // Reset form validity
  };

  const handleClose = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setIsDialogOpen(true);
    } else {
      setIsOpen(false);
      setGame({
        name: "",
        description: undefined,
        thumbnail: "",
        studio: "",
        problem: undefined,
        approach: undefined,
        tools: [],
        carousel_images: [],
      });
      setHasUnsavedChanges(false);
      setNewImages({ carousel: [] });
      setIsFormValid(false); // Reset form validity
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Game</DialogTitle>
            <DialogDescription>
              Enter details for the new game. All fields are required, and at
              least two carousel images must be provided.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] p-4">
            <GameForm
              game={game}
              setGame={setGame}
              isSaving={isSaving}
              onValidation={setIsFormValid} // Use prop
              panel="Dialog"
              onUnsavedChanges={(hasChanges, images) => {
                setHasUnsavedChanges(hasChanges);
                setNewImages(images);
              }}
            />
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSave();
              }}
              disabled={isSaving || !isFormValid}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Game"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes in the Add Game section. Do you want to
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

export default AddGameModal;
