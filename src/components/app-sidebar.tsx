"use client";

import React, { useEffect, useState } from "react";
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
import { getUserRole } from "@/lib/firebase/getUserRole";

export function AppSidebar({ activeKey, setActiveKey, ...props }) {
  const [role, setRole] = useState("client");
  const router = useRouter();

  // Récupérer le rôle de l'utilisateur
  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };

    fetchRole();
  }, []);

  // Navigation dynamique basée sur le rôle
  const navData = {
    admin: [
      { title: "Dashboard", url: "/en/dashboard//admin", key: "dashboard" },
      { title: "My Properties", url: "/en/dashboard//admin", key: "properties" },
      { title: "BLOGS", url: "/en/dashboard//admin", key: "blog" },
      { title: "Manage Users", url: "/en/dashboard//admin", key: "users" },
      { title: "Reports", url: "/en/dashboard//admin", key: "reports" },
      { title: "Logout", url: "#", key: "logout" },
    ],
    agent: [
      { title: "My Profile", url: "/en/dashboard//agent", key: "profile" },
      { title: "My Properties", url: "/en/dashboard//agent", key: "properties" },
      { title: "Support", url: "/en/dashboard//agent", key: "support" },
      { title: "Logout", url: "#", key: "logout" },
    ],
    owner: [
      { title: "My Profile", url: "/en/dashboard//agent", key: "profile" },
      { title: "My Properties", url: "/en/dashboard//agent", key: "properties" },
      { title: "Support", url: "/en/dashboard//agent", key: "support" },
      { title: "Logout", url: "#", key: "logout" },
    ],
    client: [
      { title: "Browse Properties", url: "/en/dashboard//client", key: "properties" },
      { title: "Contact Support", url: "/en/dashboard//client", key: "support" },
      { title: "Logout", url: "#", key: "logout" },
    ],
  };

  const handleNavigation = (url, key) => {
    setActiveKey(key);
    if (url) router.push(url);
  };

  const currentNav = navData[role] || navData.client; // Récupère les données de navigation pour le rôle

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
        <SidebarGroup>
          <SidebarGroupLabel>{`Espace ${role.charAt(0).toUpperCase() + role.slice(1)}`}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentNav.map((item) => (
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
      </SidebarContent>

      {/* Optional Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
