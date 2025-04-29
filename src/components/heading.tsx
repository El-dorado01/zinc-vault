import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  description?: string;
  classname?: string;
};

const Heading = ({ title, description, classname }: Props) => {
  return (
    <div className={cn('flex flex-col space-y-1', classname)}>
      <h1 className="font-bold text-xl">{title}</h1>
      <p className="text-muted-foreground text-sm">
        {description || "No description provided."}
      </p>
    </div>
  );
};

export default Heading;
