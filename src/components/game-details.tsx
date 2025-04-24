import React from "react";
import {
  Facebook,
  Inbox,
  Instagram,
  Linkedin,
  Twitter,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CloseGame from "./close-game";

const GameDetails = () => {
  return (
    <Card className="rounded-lg relative w-full shadow-sm dark:border-0">
      <CloseGame />
      <CardContent className="p-3 lg:p-4 flex flex-col space-y-2">
        <div className="hidden lg:flex items-start justify-start space-x-3">
          <Image
            src={"/games/thumbnail5.jpg"}
            alt=""
            width={100}
            height={100}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-start justify-start space-y-1">
            <h2 className="text-xl font-bold">League of Legends</h2>
            <p className="line-clamp-2 text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              dolore.
            </p>
            <a
              href={""}
              target="_blank"
              className="flex items-center justify-center space-x-2 text-sm mt-2 italic font-bold text-[#00C4FF] hover:underline hover:text-[#00C4FF]/50 transition-colors duration-300 ease-in-out"
            >
              <User className="size-4" />
              <span>CyberSmith Studio</span>
            </a>
          </div>
        </div>
        <h1 className="text-bold text-xl lg:text-2xl mb-5 lg:my-5">
          League of Legends - Noxus Arena
        </h1>
        <p className="text-muted-foreground">
          We had the amazing opportunity to work as the 3D Art Director for
          League of Legends Noxus-themed Arena map on behalf of Devoted
        </p>
        <p className="underline cursor-pointer">Show more</p>
        <div className="flex flex-wrap items-center justify-between gap-3 my-2">
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Facebook className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Instagram className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Twitter className="size-5" />
            <span>Share</span>
          </a>
          <a
            href={""}
            target="_blank"
            className="flex items-center justify-center space-x-2 hover:text-[#00C4FF] transition-colors duration-300 ease-in-out"
          >
            <Linkedin className="size-5" />
            <span>Share</span>
          </a>
        </div>
        <h2 className="text-bold text-xl my-5">Tools and Systems</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center justify-center py-1 px-2 space-x-2 bg-neutral-100 dark:bg-neutral-800 w-fit rounded-sm">
            <Instagram className="size-5" />
            <span>Social Influencer</span>
          </div>
          <div className="flex items-center justify-center py-1 px-2 space-x-2 bg-neutral-100 dark:bg-neutral-800 w-fit rounded-sm">
            <Inbox className="size-5" />
            <span>Email</span>
          </div>
          <div className="flex items-center justify-center py-1 px-2 space-x-2 bg-neutral-100 dark:bg-neutral-800 w-fit rounded-sm">
            <Image
              src={"/blender.png"}
              alt="Icon"
              width={30}
              height={30}
              className="size-5 object-contain"
            />
            <span>Blender</span>
          </div>
          <div className="flex items-center justify-center py-1 px-2 space-x-2 bg-neutral-100 dark:bg-neutral-800 w-fit rounded-sm">
            <Image
              src={"/Photoshop.png"}
              alt="Icon"
              width={30}
              height={30}
              className="size-5 object-contain"
            />
            <span>Photoshop</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameDetails;
