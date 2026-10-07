"use client";

import { useState } from "react";
import { initialUsers } from "./data";
import { User, UserInput } from "./types";

export function useUsers() {
  const [users, setUsers] = useState(initialUsers);

  function addUser(input: UserInput) {
    setUsers((current) => [
      ...current,
      { ...input, id: `usr-${Date.now()}`, lastAccess: "No access yet" },
    ]);
  }

  function updateUser(id: string, input: UserInput) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...input } : user)),
    );
  }

  function toggleStatus(id: string) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user,
      ),
    );
  }

  function removeUser(id: string) {
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  return { users, addUser, updateUser, toggleStatus, removeUser };
}
