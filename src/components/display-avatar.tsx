import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";

type avatarProps = {
  image: string;
  name: string;
};

const DisplayAvatar = ({ avatarProps }: { avatarProps: avatarProps }) => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={avatarProps.image}
        alt={avatarProps.name}
        className="object-cover"
      />
      <AvatarFallback>{getInitials(avatarProps.name)}</AvatarFallback>
    </Avatar>
  );
};

export default DisplayAvatar;
