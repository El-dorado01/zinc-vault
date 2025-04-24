"use client"

import { X } from 'lucide-react';
import React from 'react'
import { useRouter } from "next/navigation";

const CloseGame = () => {
    const router = useRouter();
  return (
    <X
      className="absolute top-3 right-3 size-4 lg:size-6 text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={() => router.push("/steam-game-promotion/portfolio")}
    />
  );
}

export default CloseGame