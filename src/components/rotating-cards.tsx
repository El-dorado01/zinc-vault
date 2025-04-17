"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"; // Adjusted import
import Image from "next/image";
import { ArrowBigRightDash } from "lucide-react";
import { skillsData } from "@/components/items";

const RotatingCards = () => {
  const [largeCardIndex, setLargeCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setLargeCardIndex((prevIndex) => (prevIndex + 1) % skillsData.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const cards = skillsData.map((card, index) => {
    if (index === largeCardIndex) {
      return {
        ...card,
        isLarge: true,
        stackOrder: 0,
        row: 0,
      };
    }
    const smallCardOffset =
      (index - largeCardIndex + skillsData.length) % skillsData.length;
    let row, stackOrder;
    if (smallCardOffset === 1) {
      row = 1;
      stackOrder = 3;
    } else if (smallCardOffset === 2) {
      row = 2;
      stackOrder = 2;
    } else {
      row = 3;
      stackOrder = 1;
    }
    return {
      ...card,
      isLarge: false,
      stackOrder,
      row,
    };
  });

  return (
    <div
      className="h-[90vh] min-h-fit w-[90vw] p-0 gap-1 sm:w-[95vw] sm:p-4 sm:gap-3 md:w-[90vw] md:p-6 md:gap-4 lg:w-[85vw] lg:p-8 lg:gap-5 xl:w-[80vw] xl:p-10 xl:gap-6 grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-2 md:grid-rows-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {cards.map(({ id, icon: Icon, image, title, isLarge, stackOrder, row }) => (
        <Card
          key={id}
          className={`rounded-sm shadow-md transition-[transform,opacity,grid-row,grid-column,z-index] duration-700 ease-in-out h-full overflow-hidden ${
            isLarge
              ? "row-span-1 sm:row-span-3 col-start-1 row-start-1 md:row-span-3 md:col-start-1 md:row-start-1 opacity-100 scale-100"
              : `row-span-1 col-start-1 sm:col-start-2 row-start-${
                  row + 1
                } sm:row-start-${row} md:col-start-2 md:row-start-${row} opacity-90 scale-95`
          }`}
          style={{
            zIndex: isLarge ? 10 : stackOrder,
          }}
        >
          <CardContent className="h-full py-2 px-6 sm:py-3 md:py-4 flex flex-col">
            {isLarge ? (
              <div className="flex flex-col gap-2 h-full">
                <div className="relative w-full flex-1">
                  <Image
                    src={image}
                    alt={title}
                    width={200}
                    height={150}
                    className="object-cover w-full h-full min-h-[120px] sm:min-h-[180px] md:min-h-[200px] max-h-[200px] sm:max-h-[350px] md:max-h-[400px]"
                  />
                </div>
                <div className="flex flex-col space-y-2 mt-2 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
                  <div className="rounded-full size-8 sm:size-9 md:size-10 bg-accent flex items-center justify-center">
                    <Icon className="size-4 sm:size-4.5 md:size-4.5" />
                  </div>
                  <div className="flex flex-col space-y-1 sm:space-y-1.5 md:space-y-2">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base">
                      {title}
                    </h3>
                    <div className="flex space-x-2 sm:space-x-3 md:space-x-4 items-end">
                      <p className="line-clamp-3 leading-snug text-muted-foreground text-[0.65rem] sm:text-xs md:text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Assumenda placeat soluta repellat voluptatum illo
                        quod nihil omnis, reprehenderit aspernatur cupiditate.
                      </p>
                      <ArrowBigRightDash className="size-12 md:size-16 self-end" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 sm:space-x-3 md:space-x-4 h-full items-start">
                <div className="flex items-center justify-center bg-accent p-1 sm:p-1.5 md:p-2 rounded-full">
                  <Icon className="size-4 sm:size-4.5 md:size-5" />
                </div>
                <div className="flex flex-col h-full space-y-1 sm:space-y-1.5 md:space-y-2">
                  <h3 className="font-medium leading-none text-xs sm:text-sm md:text-base">
                    {title}
                  </h3>
                  <div className="flex space-x-1 sm:space-x-1.5 md:space-x-2 items-center">
                    <p className="line-clamp-3 leading-snug text-muted-foreground text-[0.65rem] sm:text-xs md:text-sm">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Assumenda placeat soluta repellat voluptatum illo quod
                      nihil omnis, reprehenderit aspernatur cupiditate.
                    </p>
                    <ArrowBigRightDash className="size-12 md:size-16" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RotatingCards;
