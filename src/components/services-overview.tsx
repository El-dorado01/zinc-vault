import React from 'react'
import { ServicesOverview } from './items';
import Link from 'next/link';

const ServicesOverviewComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full px-4 md:px-8 xl:px-35 py-15 space-y-3">
      <h1 className="font-bold text-3xl mb-13">
        How We Help Your Game Succeed
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-5">
        {ServicesOverview.map(({ name, icon: Icon, text }, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-1/3 space-y-4 items-start justify-center py-4"
          >
            <Icon className="self-center h-8 w-8 mb-4" />
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="line-clamp-3 leading-snug">{text}</p>
          </div>
        ))}
      </div>
      <Link
        href={"/steam-game-promotion/services"}
        className="mt-6 px-6 py-3 bg-[#00C4FF] text-black rounded-full hover:bg-[#00C4FF]/60"
      >
        Explore Our Services
      </Link>
    </div>
  );
}

export default ServicesOverviewComponent