"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import WishlistChart from "./wishlist-chart";
import { SuccessStoryImages } from "./items";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SuccessStory = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-10 space-y-3 border-dashed border-t border-b border-r-0 border-l-0">
      <h1 className="font-bold text-3xl mb-13">
        Success Story: CyberSmith’s BattleForge
      </h1>
      <div className="flex flex-col w-full xl:flex-row items-center justify-center md:justify-between gap-5">
        {/* Carousel */}
        <div className="flex-1 md:flex-1/2 w-full flex flex-col space-y-4 items-center justify-center  min-h-[55vh]">
          <div className="w-full border rounded-md">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {SuccessStoryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt="Image"
                      width={400}
                      height={300}
                      className="w-full min-h-[35vh] object-cover rounded-md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="w-fit line-clamp-3 leading-snug text-muted-foreground font-semibold">
            Struggling with only 300 units sold, we optimized... Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Cupiditate dolor dicta
            id consequatur pariatur corporis a, labore repellat illo, omnis
            voluptates debitis magni molestiae cumque quia mollitia reiciendis
            molestias. Ullam!
          </div>
        </div>
        <WishlistChart />
      </div>
      <Link href={"/"} className="mt-6 text-[#00C4FF] flex items-center justify-center space-x-1 font-semibold">
        <span>View Full Case Study</span> <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default SuccessStory;
