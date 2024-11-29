"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase/firebase"; // Firestore config
import { doc, getDoc } from "firebase/firestore";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AgentProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true); // Track role loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setLoadingRole(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setRole(userSnap.data().role || "Role not set");
        } else {
          console.error("User data not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchUserRole();
  }, [user]);

  if (loading || loadingRole) {
    return <p>Loading...</p>;
  }

  if (!user) {
    alert("You must be logged in to access this page.");
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
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold mb-4">Agent Profile</h1>
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p>
            <strong>Name:</strong> {user.displayName || "Name not provided"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>
      </div>
    </SidebarInset>
  );
}
