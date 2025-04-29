"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  //useSidebar,
} from "@/components/ui/sidebar";

export function SiteLogo({
  logo,
}: {
  logo: {
    name: string;
    logo: React.ElementType;
    plan: string;
  };
}) {
  //const { isMobile } = useSidebar();
  const LogoIcon = logo.logo

  if (!logo) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <LogoIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{logo.name}</span>
            <span className="truncate text-xs">{logo.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
