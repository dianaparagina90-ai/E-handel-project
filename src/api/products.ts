import type { Product } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return res.json();
}

export async function fetchSingleProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return res.json();
}
export async function updateProductStock(
  productId: number,
  newStock: number,
): Promise<void> {
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: newStock }),
  });
  if (!res.ok) {
    throw new Error("Kunde inte uppdatera lagersaldo");
  }
}
