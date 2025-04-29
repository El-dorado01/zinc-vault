import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Edit3 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import TiptapStandardEditor from "./tiptap-editor";

type Props = {
  section: string;
};

const EditOverview = ({ section }: Props) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="absolute top-4 right-4 z-5">
            <Edit3 className="size-3.5" /> Edit
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="w-full sm:w-[540px] p-2">
          <SheetHeader>
            <SheetTitle>Edit {section}</SheetTitle>
            <SheetDescription>
              Make changes to your <strong>{section}</strong> section. Click
              save when you're done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto">
            <div className="grid gap-4 border border-amber-500 w-full min-h-6">
              <TiptapStandardEditor />
            </div>
          </ScrollArea>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditOverview;
