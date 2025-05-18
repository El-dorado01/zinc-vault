// src/components/game-problem.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TiptapJson } from "@/types";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

interface GameProblemProps {
  content: TiptapJson | null;
}

const GameProblem = ({ content }: GameProblemProps) => {
  const html = content
    ? generateHTML(content, [StarterKit])
    : "<p>No problem description available.</p>";

  return (
    <Card className="rounded-lg w-full shadow-sm dark:border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-bold text-xl">The Problem</CardTitle>
      </CardHeader>
      <CardContent className="px-3 lg:px-4 flex flex-col space-y-2 text-muted-foreground">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </CardContent>
    </Card>
  );
};

export default GameProblem;
