import Image from 'next/image';
import React from 'react'
import { TrustSignals } from './items';
import { TrendingUp } from 'lucide-react';

export const TrustSignalsComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-16 space-y-6 bg-accent-foreground dark:bg-background text-white">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-3xl">Trust Signals</h1>
        <Image
          src={"/game-bg/steam.gif"}
          alt="Steam Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {TrustSignals.map((signal, index) => (
          <div
            key={index}
            className="flex flex-col flex-1 md:flex-1/3 space-y-2 items-center justify-center border border-foreground dark:border-sidebar-border rounded-sm hover:shadow-sm shadow-foreground p-4 my-3 w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="font-semibold text-xl mb-2">{signal.name}</h2>
            <Image
              src={signal.image}
              alt={signal.alt}
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div
              className={`font-semibold text-md ${
                signal.comment && "text-green-500"
              }  flex items-center justify-center space-x-2`}
            >
              <span>
                {signal.comment ? signal.comment : "Saved our launch!"}
              </span>{" "}
              {signal.comment && <TrendingUp className="h-5 w-5" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustSignals