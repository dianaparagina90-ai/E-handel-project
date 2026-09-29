import type { Category } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta kategorier");
  }
  return res.json();
}

export async function fetchSingleCategory(id: number): Promise<Category> {
  const res = await fetch(`${API_URL}/category/${id}`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta kategorier");
  }
  return res.json();
}