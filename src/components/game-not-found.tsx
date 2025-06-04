import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-5 flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Game Not Found
      </h1>
      <p className="text-muted-foreground mt-2">
        Sorry, we couldn't find the game you&apos;re looking for.
        <span className="hidden">
          {errorMessage ||
            "Sorry, we couldn't find the game you're looking for."}
        </span>
      </p>
      <Button asChild className="mt-4">
        <Link href="/steam-game-promotion/portfolio">Back to Portfolio</Link>
      </Button>
    </div>
  );
};

export default NotFound;
