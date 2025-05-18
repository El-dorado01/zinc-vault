// src/components/game-approach.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TiptapJson } from "@/types";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

interface GameApproachProps {
  content: TiptapJson | null;
}

const GameApproach = ({ content }: GameApproachProps) => {
  const html = content
    ? generateHTML(content, [StarterKit])
    : "<p>No approach description available.</p>";

  return (
    <Card className="rounded-lg w-full shadow-sm dark:border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-bold text-xl">Our Approach</CardTitle>
      </CardHeader>
      <CardContent className="px-3 lg:px-4 flex flex-col space-y-2 text-muted-foreground">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </CardContent>
    </Card>
  );
};

export default GameApproach;
