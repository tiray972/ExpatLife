"use client";

import React, { useEffect, useState } from "react";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
  toggleBlockUser,
} from "@/lib/firebase/users";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleUpdate = async (userId) => {
    const newEmail = prompt("Entrez le nouvel email de l'utilisateur :");
    if (newEmail) {
      try {
        await updateUser(userId, { email: newEmail });
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, email: newEmail } : user
          )
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
    }
  };

  const handleDelete = async (userId) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        await deleteUser(userId);
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const handleBlock = async (userId, isBlocked) => {
    try {
      await toggleBlockUser(userId, !isBlocked);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Erreur lors du blocage/déblocage :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Gérer les utilisateurs</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nom</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Date d'ajout</th>
            <th className="py-3 px-6 text-center">Statut</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {user.name || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-center">
                {new Date(user.createdAt?.seconds * 1000).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                {user.isBlocked ? "Bloqué" : "Actif"}
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleUpdate(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleBlock(user.id, user.isBlocked)}
                  className={`${
                    user.isBlocked ? "bg-green-500" : "bg-yellow-500"
                  } text-white px-3 py-1 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 mr-2`}
                >
                  {user.isBlocked ? "Débloquer" : "Bloquer"}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
