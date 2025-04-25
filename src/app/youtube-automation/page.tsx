import { Construction } from "lucide-react";
import React from "react";

const YouTubeAutomationPage = () => {
  return (
    <>
      <div className="h-[calc(100vh-72px)] flex flex-col items-center justify-center space-y-1 w-full max-w-6xl mx-auto px-4 text-center">
        <Construction className="size-12 animate-pulse" />
        <h1 className="font-bold text-3xl"> Under Construction </h1>
        <p className="text-muted-foreground">
          We are working hard to bring this page to life. Please check back soon!
        </p>
      </div>
    </>
  );
};

export default YouTubeAutomationPage;
