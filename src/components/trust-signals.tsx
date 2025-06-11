// import Image from 'next/image';
// import React from 'react'
// import { TrustSignals } from './items';
// import { TrendingUp } from 'lucide-react';

// export const TrustSignalsComponent = () => {
//   return (
//     <div className="flex flex-col items-start justify-start w-full max-w-6xl xl:max-w-full mx-auto px-4 xl:px-38 py-16 space-y-6 bg-sidebar">
//       <div className="flex items-center justify-between w-full">
//         <h1 className="font-bold text-3xl">Trust Signals</h1>
//         <Image
//           src={"/game-bg/steam.gif"}
//           alt="Steam Logo"
//           width={100}
//           height={100}
//           unoptimized
//         />
//       </div>
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
//         {TrustSignals.map((signal, index) => (
//           <div
//             key={index}
//             className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-105 bg-sidebar"
//           >
//             <h2 className="font-semibold text-xl mb-2">{signal.name}</h2>
//             <Image
//               src={signal.image}
//               alt={signal.alt}
//               width={48}
//               height={48}
//               className="h-12 w-12"
//             />
//             <div
//               className={`font-semibold text-md ${
//                 signal.comment && "text-green-500"
//               }  flex items-center justify-center space-x-2`}
//             >
//               <span>
//                 {signal.comment ? signal.comment : "Saved our launch!"}
//               </span>{" "}
//               {signal.comment && <TrendingUp className="h-5 w-5" />}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TrustSignals

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchTrustSignals } from "@/lib/trust-signals/trustSignalUtils";
import { TrustSignal } from "@/lib/trust-signals/formSchema";

export const TrustSignalsComponent = () => {
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trust signals
  useEffect(() => {
    const loadTrustSignals = async () => {
      try {
        setIsLoading(true);
        const fetchedSignals = await fetchTrustSignals();
        setTrustSignals(fetchedSignals);
      } catch (error) {
        console.error("Failed to fetch trust signals:", error);
        toast.error("Failed to load trust signals");
      } finally {
        setIsLoading(false);
      }
    };
    loadTrustSignals();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-6xl xl:max-w-full mx-auto px-4 xl:px-38 py-16 space-y-6 bg-sidebar">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-3xl">Trust Signals</h1>
        <Image
          src="/game-bg/steam.gif"
          alt="Steam Logo"
          width={100}
          height={100}
          unoptimized
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm p-4 my-3 w-full bg-sidebar"
            >
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
      ) : trustSignals.length === 0 ? (
        <div className="text-center py-6 text-gray-600 w-full">
          No trust signals available
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {trustSignals.map((signal) => (
            <div
              key={signal.id}
              className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-105 bg-sidebar"
            >
              <h2 className="font-semibold text-xl mb-2 line-clamp-1">
                {signal.game_name || "Unnamed Signal"}
              </h2>
              <Image
                src={signal.image_path || "/placeholder.jpg"}
                alt={`${signal.game_name || "Signal"} logo`}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div
                className={`font-semibold text-md ${
                  signal.comment ? "text-green-500" : ""
                } flex items-center justify-center space-x-2`}
              >
                <span>{signal.comment || "Saved our launch!"}</span>
                {signal.comment && <TrendingUp className="h-5 w-5" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrustSignalsComponent;