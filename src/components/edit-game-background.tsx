// src/components/edit-game-background.tsx
import { Props, TiptapJson } from "@/types";
import { useState, useEffect } from "react";
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
import { Edit3, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ImageUpload } from "@/components/game-background-imageUpload";
import {
  fetchGameBackground,
  saveGameBackground,
} from "@/lib/game-background/gameUtils";

const EditGameBackground = ({ section }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [contentJson, setContentJson] = useState<TiptapJson | undefined>(
    undefined
  );
  const [companyImage, setCompanyImage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGameBackground();
      setRecordId(data.id);
      setContentJson(data.content);
      setCompanyImage(data.company_image);
    };
    loadData();
  }, []);

  // Handle save
  const handleSubmit = async () => {
    setIsSaving(true);
    const success = await saveGameBackground(
      {
        id: recordId || undefined,
        content: contentJson,
        company_image: companyImage,
      },
      setRecordId
    );
    if (success) {
      setHasUnsavedChanges(false);
      setIsSheetOpen(false);
    }
    setIsSaving(false);
  };

  // Handle discard changes
  const handleDiscardChanges = () => {
    setIsDialogOpen(false);
    setIsSheetOpen(false);
    setHasUnsavedChanges(false);
  };

  // Handle save and close
  const handleSaveAndClose = async () => {
    await handleSubmit();
    setIsDialogOpen(false);
  };

  // Handle sheet open/close
  const handleOpenChange = (open: boolean) => {
    if (!open && hasUnsavedChanges && !isSaving) {
      setIsDialogOpen(true);
    } else {
      setIsSheetOpen(open);
    }
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
            <div className="grid gap-4 w-full p-4">
              {/* Company Image */}
              <ImageUpload
                imageUrl={companyImage}
                images={[]}
                setImage={setCompanyImage}
                setImages={() => {}}
                path="company"
                onChange={() => setHasUnsavedChanges(true)}
              />
              {/* Tiptap Editor */}
              <div className="flex flex-col relative">
                <h3 className="font-semibold">Main {section} Text</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This is the text that appears in the{" "}
                  <strong>{section.toLowerCase()}</strong> section.
                </p>
                <SimpleEditor
                  initialContent={contentJson}
                  onUpdate={(json) => {
                    setContentJson(json);
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button type="button" onClick={handleSubmit} disabled={isSaving}>
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

export default EditGameBackground;
