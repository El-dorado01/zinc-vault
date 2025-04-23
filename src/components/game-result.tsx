import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GameResult = () => {
  return (
    <Card className="rounded-lg w-full shadow-sm dark:border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-bold text-xl">The Result</CardTitle>
      </CardHeader>
      <CardContent className="px-3 lg:px-4 flex flex-col space-y-2"></CardContent>
    </Card>
  );
}

export default GameResult