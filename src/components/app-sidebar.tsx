"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ activeKey, setActiveKey, ...props }) {
  const router = useRouter();

  // Navigation dynamique
  const navData = {
    navMain: [
      {
        title: "Espace Agent",
        items: [
          { title: "Mon Profil", url: "/dashboard/agent", key: "profile" },
          { title: "Mes Proprieté", url: "/dashboard/agent", key: "properties" },
          { title: "Mes Annonces", url: "/dashboard/agent", key: "annonces" },
          { title: "Assistance", url: "/dashboard/agent", key: "support" },
          { title: "Déconnexion", url: "#", key: "logout" },
        ],
      },
    ],
  };

  const handleNavigation = (url, key) => {
    setActiveKey(key);
    if (url) router.push(url);
  };

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo ExpatLife"
            width={300}
            height={250}
          />
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {navData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeKey === item.key}
                      onClick={() => handleNavigation(item.url, item.key)}
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Optional Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
