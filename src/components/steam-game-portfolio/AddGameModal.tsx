// src/components/steam-game-portfolio/AddGameModal.tsx
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

interface AddGameModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  game: Partial<Game>;
  setGame: (game: Partial<Game>) => void;
  onSave: () => void;
  isSaving: boolean;
}

const AddGameModal = ({
  isOpen,
  setIsOpen,
  game,
  setGame,
  onSave,
  isSaving,
}: AddGameModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
          <DialogDescription>
            Enter details for the new game. All fields are optional except the
            name.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] p-4">
          <GameForm game={game} setGame={setGame} isSaving={isSaving} />
        </ScrollArea>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              setGame({
                name: "",
                description: null,
                thumbnail: null,
                studio: "",
                problem: null,
                approach: null,
                tools: [],
                carousel_images: [],
              });
            }}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
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
  );
};

export default AddGameModal;
