"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import AgentProfile from "@/components/agent/AgentProfile";
import AgentSupport from "@/components/agent/AgentSupport";
import AgentProperties from "@/components/agent/AgentProperty";

export default function Dashboard() {
  const [activeKey, setActiveKey] = useState("profile");

  const renderContent = () => {
    switch (activeKey) {
      case "properties":
        return <AgentProperties />;
      case "profile":
        return <AgentProfile />;
      case "annonces":
        return <p>Mes Annonces</p>; // Composant à venir
      case "support":
        return <AgentSupport />;
      case "logout":
        return <p>Déconnexion...</p>; // Gérer la déconnexion
      default:
        return <p>Bienvenue dans votre espace Agent.</p>;
    }
  };

  return (
    <SidebarProvider> {/* SidebarProvider encapsule ici */}
      <div className="flex">
        <AppSidebar activeKey={activeKey} setActiveKey={setActiveKey} />
        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
    </SidebarProvider>
  );
}
