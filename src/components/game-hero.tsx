"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { gameBgImages } from "./items";
import Link from "next/link";

export default function GameHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
      {/* Fixed Hero Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-3 md:px-5">
        <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Revive Your Steam Game with Smart Marketing
        </h1>
        <p className="hero-subtext text-lg md:text-xl mb-6">
          We turn struggling indie games into Steam success stories with small
          budgets and big results.
        </p>
        <Link
          href={"/steam-game-promotion/background"}
          className="mt-4 px-6 py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60"
        >
          Learn More
        </Link>
      </div>

      {/* Carousel for Background gameBgImages */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {gameBgImages.map((image, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="relative w-full h-screen">
                {/* <div className="absolute inset-0 bg-[#00C4FF]/20 z-0"> */}
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={2000}
                  height={1400}
                />
                {/* </div> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}



// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Image from "next/image";
// import Link from "next/link";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { fetchHeroContent } from "@/actions/heroContent";
// import { generateHTML } from "@tiptap/core";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import ListItem from "@tiptap/extension-list-item";
// import Heading from "@tiptap/extension-heading";
// import Bold from "@tiptap/extension-bold";
// import Italic from "@tiptap/extension-italic";
// import sanitizeHtml from "sanitize-html";

// interface HeroContent {
//   id: string;
//   hero_texts: {
//     main: any; // TiptapJson
//     sub: any; // TiptapJson
//   };
//   image_paths: string[];
//   created_at: string;
// }

// const tiptapToHTML = (tiptapJson: any): string => {
//   try {
//     if (!tiptapJson || typeof tiptapJson !== "object" || !tiptapJson.content) {
//       console.warn("Invalid Tiptap JSON structure:", tiptapJson);
//       return "";
//     }

//     const html = generateHTML(tiptapJson, [
//       Document,
//       Paragraph,
//       Text,
//       BulletList,
//       OrderedList,
//       ListItem,
//       Heading.configure({ levels: [1, 2, 3] }),
//       Bold,
//       Italic,
//     ]);

//     return sanitizeHtml(html, {
//       allowedTags: [
//         "p",
//         "br",
//         "strong",
//         "em",
//         "b",
//         "i",
//         "ul",
//         "ol",
//         "li",
//         "h1",
//         "h2",
//         "h3",
//       ],
//       allowedAttributes: {},
//     });
//   } catch (error) {
//     console.error("Error converting Tiptap JSON to HTML:", {
//       error,
//       tiptapJson,
//     });
//     return "";
//   }
// };

// export default function GameHero() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 4000, stopOnInteraction: false })
//   );
//   const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadHeroContent = async () => {
//       try {
//         setIsLoading(true);
//         const fetchedContent = await fetchHeroContent();
//         if (fetchedContent.length > 0) {
//           setHeroContent(fetchedContent[0]);
//         } else {
//           toast.info("No hero content found, using default values");
//         }
//       } catch (error) {
//         console.error("Failed to fetch hero content:", error);
//         toast.error("Failed to load hero content");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadHeroContent();
//   }, []);

//   const images = heroContent?.image_paths.length
//     ? heroContent.image_paths
//     : ["/game-bg/watchdogs.jpg"];

//   return (
//     <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden">
//       {/* Hero Text */}
//       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white bg-black/30 px-3 md:px-5">
//         {isLoading ? (
//           <div className="space-y-4">
//             <Skeleton className="h-12 w-3/4 mx-auto" />
//             <Skeleton className="h-6 w-full" />
//             <Skeleton className="h-6 w-5/6 mx-auto" />
//             <Skeleton className="h-10 w-32 mx-auto" />
//           </div>
//         ) : (
//           <>
//             <h1
//               className="hero-title text-4xl md:text-5xl font-bold mb-4 leading-tight"
//               dangerouslySetInnerHTML={{
//                 __html: heroContent?.hero_texts.main
//                   ? tiptapToHTML(heroContent.hero_texts.main)
//                   : "Revive Your Steam Game with Smart Marketing",
//               }}
//             />
//             <p
//               className="hero-subtext text-lg md:text-xl mb-6"
//               dangerouslySetInnerHTML={{
//                 __html: heroContent?.hero_texts.sub
//                   ? tiptapToHTML(heroContent.hero_texts.sub)
//                   : "We turn struggling indie games into Steam success stories with small budgets and big results.",
//               }}
//             />
//             <Link
//               href="/steam-game-promotion/background"
//               className="mt-4 px-6 py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60"
//             >
//               Learn More
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Carousel for Background Images */}
//       <Carousel
//         plugins={[plugin.current]}
//         className="w-full h-full"
//         opts={{ loop: true }}
//       >
//         <CarouselContent>
//           {isLoading ? (
//             <CarouselItem className="p-0">
//               <div className="relative w-full h-screen">
//                 <Skeleton className="w-full h-full" />
//               </div>
//             </CarouselItem>
//           ) : (
//             images.map((image, index) => (
//               <CarouselItem key={index} className="p-0">
//                 <div className="relative w-full h-screen">
//                   <Image
//                     src={image}
//                     alt={`Slide ${index + 1}`}
//                     className="w-full h-full object-cover"
//                     width={2000}
//                     height={1400}
//                   />
//                 </div>
//               </CarouselItem>
//             ))
//           )}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// }
