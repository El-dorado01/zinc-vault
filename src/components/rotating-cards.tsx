"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigRightDash } from "lucide-react";
import { skillsData } from "@/components/items";

const RotatingCards = () => {
  return (
    <div className="min-h-fit w-[90vw] grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-3">
      {skillsData.map(({ id, icon: Icon, image, title }) => (
        <div className="relative p-1" key={id}>
          <Card className="relative min-h-[175px] bg-background border border-muted shadow-sm glowing-border">
            <CardContent className="h-full py-2 px-4 flex flex-col">
              <div className="flex space-x-3 h-full items-start">
                <div className="flex items-center justify-center bg-accent p-2 rounded-full">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-col h-full space-y-1.5 md:space-y-2">
                  <h3 className="font-medium leading-none text-base">
                    {title}
                  </h3>
                  <div className="flex space-x-1 items-center">
                    <p className="line-clamp-3 leading-snug text-muted-foreground">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Assumenda placeat soluta repellat voluptatum illo quod
                      nihil omnis, reprehenderit aspernatur cupiditate.
                    </p>
                    <div className="flex items-center justify-center p-2">
                      <ArrowBigRightDash className="size-4 lg:size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default RotatingCards;
