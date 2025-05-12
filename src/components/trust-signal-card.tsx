import Image from "next/image";
import { TrendingUp, Trash2, Edit3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustSignal } from "@/lib/trust-signals/formSchema";

type TrustSignalCardProps = {
  signal: TrustSignal;
  onEdit: (signal: TrustSignal) => void;
  onDelete: (signal: TrustSignal) => void;
  isDeleting: boolean;
};

export function TrustSignalCard({
  signal,
  onEdit,
  onDelete,
  isDeleting,
}: TrustSignalCardProps) {
  return (
    <div className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-101 bg-sidebar">
      <h2 className="font-semibold text-xl mb-2 line-clamp-1">
        {signal.game_name}
      </h2>
      <Image
        src={signal.image_path}
        alt={signal.game_name}
        width={48}
        height={48}
        className="h-12 w-12"
      />
      <div className="font-semibold text-md text-green-500 flex items-center justify-center space-x-2">
        <span>{signal.comment || "Saved our launch!"}</span>
        <TrendingUp className="h-5 w-5" />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(signal)}
          disabled={isDeleting}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(signal)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
