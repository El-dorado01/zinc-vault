import React from "react";

import { NavItem } from "@/types";
import ClientBreadcrumb from "./client-breadcrumb";
import Link from "next/link";
import { Separator } from "./ui/separator";

type BreadcrumbsProps = {
  skillNavItems?: NavItem[];
  iconColor?: string;
};

const PageBreadcrumbs = ({ skillNavItems, iconColor }: BreadcrumbsProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between w-full text-foreground border-b">
      <ClientBreadcrumb />
      <div className="hidden md:flex h-5 items-center space-x-4 text-sm">
        {skillNavItems?.map((item, index) => (
          <React.Fragment key={item.key}>
            <Link
              href={item.href}
              className={`hover:text-[${iconColor}] duration-300 transition-colors`}
            >
              {item.title}
            </Link>
            {index < skillNavItems.length - 1 && (
              <Separator orientation="vertical" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageBreadcrumbs;
