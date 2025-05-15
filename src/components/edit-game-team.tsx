// src/components/edit-game-team.tsx
import { Props, TeamMember } from "@/types";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3, Loader2, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "@/components/game-background-imageUpload";
import {
  fetchGameBackground,
  saveGameBackground,
  removeImage,
} from "@/lib/game-background/gameUtils";
import { toast } from "sonner";

const EditGameTeam = ({ section }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [initialTeamMembers, setInitialTeamMembers] = useState<TeamMember[]>(
    []
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGameBackground();
      setRecordId(data.id);
      setTeamMembers(data.team_members);
      setInitialTeamMembers(data.team_members);
    };
    loadData();
  }, []);

  // Add new team member
  const addTeamMember = () => {
    if (teamMembers.length >= 3) {
      toast.error("Maximum of 3 team members allowed");
      return;
    }
    setTeamMembers([...teamMembers, { name: "", role: "", image: null }]);
    setHasUnsavedChanges(true);
  };

  // Update team member field
  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string | null
  ) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Initiate team member deletion
  const confirmRemoveTeamMember = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  // Remove team member
  const removeTeamMember = async () => {
    if (deleteIndex === null) return;

    setIsDeleting(true);
    const member = teamMembers[deleteIndex];
    let success = true;

    // Delete image from bucket
    if (member.image) {
      success = await removeImage(member.image);
    }

    if (success) {
      // Update local state
      const updatedMembers = teamMembers.filter((_, i) => i !== deleteIndex);
      setTeamMembers(updatedMembers);

      // Save updated team_members to database
      const saveSuccess = await saveGameBackground(
        {
          id: recordId || undefined,
          team_members: updatedMembers,
        },
        setRecordId
      );

      if (saveSuccess) {
        setInitialTeamMembers(updatedMembers);
        setHasUnsavedChanges(false);
        toast.success("Team member deleted successfully");
      } else {
        toast.error("Failed to update team members in database");
        success = false;
      }
    }

    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  // Handle save
  const handleSubmit = async () => {
    // Validate team members
    for (const member of teamMembers) {
      if (!member.name.trim() || !member.role.trim()) {
        toast.error("Name and role are required for all team members");
        return;
      }
    }

    setIsSaving(true);
    const success = await saveGameBackground(
      {
        id: recordId || undefined,
        team_members: teamMembers,
      },
      setRecordId
    );
    if (success) {
      setInitialTeamMembers(teamMembers);
      setHasUnsavedChanges(false);
      setIsSheetOpen(false);
      toast.success("Team members saved successfully");
    }
    setIsSaving(false);
  };

  // Handle discard changes
  const handleDiscardChanges = async () => {
    // Identify images to delete (in teamMembers but not initialTeamMembers)
    const imagesToDelete = teamMembers
      .filter((member) => member.image)
      .filter(
        (member) =>
          !initialTeamMembers.some((initial) => initial.image === member.image)
      )
      .map((member) => member.image!);

    // Delete unsaved images
    for (const image of imagesToDelete) {
      const success = await removeImage(image);
      if (!success) {
        toast.error(`Failed to delete image: ${image}`);
      }
    }

    // Reset to initial state
    setTeamMembers(initialTeamMembers);
    setHasUnsavedChanges(false);
    setIsDialogOpen(false);
    setIsSheetOpen(false);
    toast.success("Changes discarded");
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
              Manage your <strong>{section}</strong> section. Add up to 3 team
              members with name, role, and image.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
            <div className="grid gap-6 w-full p-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="border p-4 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Team Member {index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => confirmRemoveTeamMember(index)}
                      disabled={isSaving || isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={member.name}
                      onChange={(e) =>
                        updateTeamMember(index, "name", e.target.value)
                      }
                      placeholder="Enter name"
                      disabled={isSaving || isDeleting}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`role-${index}`}>Role</Label>
                    <Input
                      id={`role-${index}`}
                      value={member.role}
                      onChange={(e) =>
                        updateTeamMember(index, "role", e.target.value)
                      }
                      placeholder="Enter role"
                      disabled={isSaving || isDeleting}
                    />
                  </div>
                  <ImageUpload
                    imageUrl={member.image}
                    images={[]}
                    setImage={(url) => updateTeamMember(index, "image", url)}
                    setImages={() => {}}
                    path="team"
                    isTeam={true}
                    onChange={() => setHasUnsavedChanges(true)}
                  />
                </div>
              ))}
              {teamMembers.length < 3 && (
                <Button
                  variant="outline"
                  onClick={addTeamMember}
                  disabled={isSaving || isDeleting}
                >
                  Add Team Member
                </Button>
              )}
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || isDeleting}
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
              disabled={isSaving || isDeleting}
            >
              Discard
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveAndClose}
              disabled={isSaving || isDeleting}
            >
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team member? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeleteIndex(null);
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={removeTeamMember}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Deleting
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditGameTeam;
