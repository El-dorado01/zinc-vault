"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TrustSignalsContentDisplay from "./trust-signals-content-display";

const EditTrustSignals = ({ section }: { section: string }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
              Manage your <strong>{section}</strong> section. Max 3 trust
              signals allowed.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
            <TrustSignalsContentDisplay />
          </ScrollArea>
          <SheetFooter>
            <Button variant={"outline"} type="button" onClick={() => setIsSheetOpen(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTrustSignals;
