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
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(true); // Track role and user data loading state

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoadingData(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setRole(data.role || "Role not set");
          setUserData(data); // Store user data in state
        } else {
          console.error("User data not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || loadingData) {
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
      <div className="flex flex-1 flex-col gap-4 p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <p>
            <strong>Name:</strong> {userData.name || "Not provided"}
          </p>
          <p>
            <strong>Surname:</strong> {userData.surname || "Not provided"}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>

          {role === "agent" && (
            <>
              <h3 className="text-lg font-semibold mt-4">Agent Details</h3>
              <p>
                <strong>Agency:</strong> {userData.agency || "Not provided"}
              </p>
              <p>
                <strong>RERA n°:</strong> {userData.rera || "Not provided"}
              </p>
            </>
          )}

          {role === "owner" && (
            <>
              <h3 className="text-lg font-semibold mt-4">Owner Details</h3>
              <p>
                <strong>Properties:</strong>{" "}
                {userData.properties && Array.isArray(userData.properties)
                  ? `${userData.properties.length} properties`
                  : "No properties listed"}
              </p>
            </>
          )}

          {role === "client" && (
            <>
              <h3 className="text-lg font-semibold mt-4">Client Details</h3>
              <p>
                <strong>Interested In:</strong> {userData.interests || "No interests specified"}
              </p>
            </>
          )}
        </div>
      </div>  

    </SidebarInset>
  );
}
