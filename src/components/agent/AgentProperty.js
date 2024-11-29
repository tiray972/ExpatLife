"use client";

import { PropertyCard } from "@/components/properties/PropertyCard";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchAgentProperties } from "@/lib/firebase/properties";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AddPropertyDialog from "@/components/properties/AddPropertyDialog";
import { useTriggerRefresh } from "@/providers/TriggerRefreshprovider";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid); // Assuming "users" collection
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.name || user.displayName || "No name provided");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    alert("You must log in to access this page.");
    router.push("/auth/login");
    return null;
  }

  return (
    <SidebarInset>
      {/* Header with sidebar trigger and breadcrumb */}
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
              <BreadcrumbPage>Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>

        {/* Dialog to add property */}
        <AddPropertyDialog />

        {/* Agent properties component */}
        <AgentProperties />
      </div>
    </SidebarInset>
  );
}

function AgentProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const { refresh } = useTriggerRefresh();

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return;

      try {
        const agentProperties = await fetchAgentProperties();
        setProperties(Array.isArray(agentProperties) ? agentProperties : []);
      } catch (error) {
        console.error("Error fetching agent properties:", error);
      }
    };

    fetchProperties();
  }, [user, refresh]);

  if (!Array.isArray(properties) || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Agent Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
