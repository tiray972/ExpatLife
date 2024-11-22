"use client";

import { useAuth } from "@/hooks/useAuth";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { useRouter } from "next/navigation";

export default function AgentProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (loading) {
    return <p>Chargement...</p>
  }

  if (!user) {
    alert("");
    router.push("/auth/login");
    return ;
    
  }

  return (
    <SidebarInset>
        {/* Header avec barre latérale et fil d'Ariane */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Profil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Contenu principal */}
        <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Profil de l'Agent</h1>
      <div className="bg-white grid grid-cols-1 md:grid-cols-3 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Détails de l'utilisateur</h2>
        <p>
          <strong>Nom :</strong> {user.displayName || "Nom non fourni"}
        </p>
        <p>
          <strong>Email :</strong> {user.email}
        </p>
        <p>
          <strong>Rôle :</strong> Agent
        </p>
        <p>
          <strong>ID utilisateur :</strong> {user.uid}
        </p>
        <p>
          <strong>IDs properties :</strong> {user.properties}
        </p>
      </div>
    </div>
      </SidebarInset>
    
  );
}
