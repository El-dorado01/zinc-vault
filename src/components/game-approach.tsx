import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigRightDash } from 'lucide-react';

const GameApproach = () => {
  return (
    <Card className="rounded-lg w-full shadow-sm dark:border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-bold text-xl">Our Approach</CardTitle>
      </CardHeader>
      <CardContent className="px-3 lg:px-4 flex flex-col space-y-2 text-muted-foreground">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, at?
        </p>
        <div className="flex flex-col items-start justify-start space-y-1">
          <div className="flex items-start justify-start gap-2">
            <div className="size-5 min-w-5">
              <ArrowBigRightDash className="h-full w-full" />
            </div>
            <span className="flex-1">Lorem ipsum dolor sit amet,</span>
          </div>
          <div className="flex items-start justify-start gap-2">
            <div className="size-5 min-w-5">
              <ArrowBigRightDash className="h-full w-full" />
            </div>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores placeat qui debitis possimus ipsum cupiditate.
            </span>
          </div>
          <div className="flex items-start justify-start gap-2">
            <div className="size-5 min-w-5">
              <ArrowBigRightDash className="h-full w-full" />
            </div>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores placeat qui debitis possimus ipsum cupiditate.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameApproach