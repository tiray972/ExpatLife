"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import AgentProfile from "@/components/agent/AgentProfile";
import AgentSupport from "@/components/agent/AgentSupport";
import AgentProperties from "@/components/agent/AgentProperty";
import { useParams, useRouter } from "next/navigation"; // Pour redirection
import { auth } from "@/lib/firebase/firebase"; // Firebase Auth instance
import { signOut } from "firebase/auth"; // Déconnexion Firebase
import ManageProperties from "@/components/admin/ManageProperties";



export default function Dashboard() {
  const params = useParams();
  const role = params.role
  // console.log("dfkffkf",role);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("profile");
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirection vers l'accueil après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

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
      case "dashboard":
        return <ManageProperties/>
      case "logout":
        handleLogout()
        return <p>Logout...</p>; // Gérer la déconnexion
      default:
        return <p>Bienvenue dans votre espace Agent.</p>;
    }
  };

  return (
    <SidebarProvider> {/* SidebarProvider encapsule ici */}
      <div className="flex">
        <AppSidebar activeKey={activeKey} setActiveKey={setActiveKey} className="w-64" />
        <div className="flex-1 p-4 w-full">{renderContent()}</div>
      </div>
    </SidebarProvider>
  );
}
