'use client';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const STORAGE_KEY = "shoporia_users";

function loadUsers(): User[] {
  if (typeof window === "undefined") return []; // SSR guard
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getMockUsers(): User[] {
  return loadUsers();
}

export function addMockUser(user: Omit<User, "id">) {
  const newUser: User = {
    id: Date.now().toString(),
    ...user,
  };
  const users = loadUsers();
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
