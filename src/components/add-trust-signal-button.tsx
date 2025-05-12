import { Button } from "@/components/ui/button";

type AddTrustSignalButtonProps = {
  trustSignalsCount: number;
  onClick: () => void;
};

export function AddTrustSignalButton({
  trustSignalsCount,
  onClick,
}: AddTrustSignalButtonProps) {
  if (trustSignalsCount >= 3) return null;
  return (
    <Button onClick={onClick} className="w-full max-w-xs mx-auto">
      Add Trust Signal
    </Button>
  );
}
