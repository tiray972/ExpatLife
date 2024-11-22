"use client"
import { PropertyCard } from "@/components/properties/PropertyCard"
import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import {  fetchAgentProperties } from "@/lib/firebase/properties"
import { AppSidebar } from "@/components/app-sidebar"
import { useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AddPropertyDialog from "@/components/properties/AddPropertyDialog"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter();

  if (loading) {
    return <p>Chargement...</p>
  }

  if (!user) {
    alert("Connecte toi batard");
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
                <BreadcrumbPage>Propriétés</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Contenu principal */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Bienvenue, {user.email}!</h1>

          {/* Dialog pour ajouter une propriété */}
          <AddPropertyDialog/>
          {/* Composant des propriétés de l'agent */}
          <AgentProperties />
        </div>
      </SidebarInset>
  )
}

function AgentProperties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return

      try {
        const agentProperties = await fetchAgentProperties()
        setProperties(Array.isArray(agentProperties) ? agentProperties : [])
      } catch (error) {
        console.error("Error fetching agent properties:", error)
      }
    }

    fetchProperties()
  }, [user])

  if (!Array.isArray(properties) || properties.length === 0) {
    return <p>Aucune propriété trouvée.</p>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Propriétés de l'Agent</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
