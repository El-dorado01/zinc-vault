import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GameProblem = () => {
  return (
    <Card className="rounded-lg w-full shadow-sm dark:border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-bold text-xl">The Problem</CardTitle>
      </CardHeader>
      <CardContent className="px-3 lg:px-4 flex flex-col space-y-2 text-muted-foreground">
        <p className="font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ipsam
          doloremque animi maiores quo ratione quasi ducimus officiis
          consectetur aspernatur.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta dicta
          cum quod, dolorum neque sit similique facere vero voluptates
          recusandae ipsum quo, natus quam doloremque nam et nesciunt itaque
          inventore?
        </p>
      </CardContent>
    </Card>
  );
}

export default GameProblem