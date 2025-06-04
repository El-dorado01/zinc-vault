import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const GamePageSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-5">
      <div className="flex flex-col lg:flex-row gap-4 h-fit">
        {/* Mobile Card (visible on mobile, hidden on desktop) */}
        <Card className="block lg:hidden rounded-lg relative w-full shadow-sm dark:border-0">
          <CardContent className="p-2 flex flex-col space-y-2">
            <div className="flex items-start justify-start space-x-3">
              <Skeleton className="h-15 w-15 rounded-full" />
              <div className="flex flex-col items-start justify-start space-y-2 flex-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* ScrollArea with sections */}
        <ScrollArea className="flex-1 lg:flex-1/3 flex flex-col items-center justify-start lg:max-h-[80vh] overflow-y-auto lg:mr-2">
          {/* GameDetails Section */}
          <Card className="rounded-lg w-full shadow-sm dark:border-0 mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="px-3 lg:px-4 flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          {/* GameProblem Section */}
          <Card className="rounded-lg w-full shadow-sm dark:border-0 mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="px-3 lg:px-4 flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          {/* GameApproach Section */}
          <Card className="rounded-lg w-full shadow-sm dark:border-0 mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="px-3 lg:px-4 flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          {/* GameResult Section */}
          <Card className="rounded-lg w-full shadow-sm dark:border-0 mb-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="px-3 lg:px-4 flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
};

export default GamePageSkeleton;
