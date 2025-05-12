import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  FormSchema,
  FormData,
} from "@/lib/trust-signals/formSchema";
import { TrustSignal } from "@/lib/trust-signals/formSchema";

type TrustSignalFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSignal: TrustSignal | null;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
  trustSignalsCount: number;
};

export function TrustSignalFormDialog({
  open,
  onOpenChange,
  editingSignal,
  onSubmit,
  isLoading,
  trustSignalsCount,
}: TrustSignalFormDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      game_name: editingSignal?.game_name || "",
      comment: editingSignal?.comment || "",
      image: undefined,
    },
  });

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingSignal ? "Edit Trust Signal" : "Add Trust Signal"}
          </DialogTitle>
          <DialogDescription>
            {editingSignal
              ? "Update the trust signal details. Image is optional."
              : `Add a new trust signal (${trustSignalsCount}/3). Image is required.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="game_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter comment" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image {editingSignal ? "(Optional)" : "(Required)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/svg+xml"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : editingSignal ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
