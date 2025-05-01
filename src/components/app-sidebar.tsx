"use client"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import { SiteLogo } from "@/components/site-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { data } from "./dashboard-nav-items"
import { NavMain } from "./nav-main"
import { NavPortfolio } from "./nav-portfolio"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SiteLogo logo={data.logo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} header="Platform" />
        <NavPortfolio items={data.navPortfolio} header="Portfolio" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
