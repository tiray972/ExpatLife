import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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

const sampleData = {
  navMain: [
    {
      title: "Espace Agent",
      url: "",
      items: [
        { title: "Mon Profil", url: "", key: "profile" },
        { title: "Mes Annonces", url: "", key: "annonces" },
        { title: "Assistance", url: "", key: "support" },
        { title: "Déconnexion", url: "", key: "logout" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeKey, setActiveKey] = React.useState("profile"); // Suivre l'élément actif
  const [navData, setNavData] = React.useState(sampleData); // Données de navigation dynamiques

  // Exemple d'appel API pour charger les données dynamiques
  React.useEffect(() => {
    async function fetchData() {
      // Simulez un appel API ici
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(sampleData), 1000)
      );
      setNavData(response);
    }
    fetchData();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo ExpatLife sur banner"
            width={300}
            height={250}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* Dynamically create groups based on navData */}
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
                      onClick={() => setActiveKey(item.key)} // Mise à jour de l'élément actif
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
