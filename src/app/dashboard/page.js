"use client"
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const user = useAuth();

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Bienvenue, {user.email}!</h1>
    </div>
  );
}
