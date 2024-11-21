"use client"

import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { addPropertyForAgent, fetchAgentProperties } from "@/lib/firebase/properties"
import { AppSidebar } from "@/components/app-sidebar"
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

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Chargement...</p>
  }

  if (!user) {
    return <p>Veuillez vous connecter pour accéder à ce tableau de bord.</p>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
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

          {/* Bouton pour ajouter une propriété */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() =>
              addPropertyForAgent({ name: "Nouvelle Propriété", price: 250000 })
            }
          >
            Ajouter une propriété
          </button>

          {/* Composant des propriétés de l'agent */}
          <AgentProperties />
        </div>
      </SidebarInset>
    </SidebarProvider>
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
      <ul className="space-y-2">
        {properties.map((property) => (
          <li
            key={property.id}
            className="p-4 border rounded shadow-sm bg-white"
          >
            {property.name} - {property.price.toLocaleString()} €
          </li>
        ))}
      </ul>
    </div>
  )
}
