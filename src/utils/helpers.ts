import type { Product, CartItem } from "../types/types";

// Kategorier
export function getCategoryIds(categoryId: number | number[]): number[] {
  return Array.isArray(categoryId) ? categoryId : [categoryId];
}

// Prissättning
const SALE_DISCOUNT_PERCENT = 20;

export function isOnSale(product: Product): boolean {
  return product.onSale === true;
}

export function getDisplayPrice(product: Product): number {
  if (!isOnSale(product)) return product.price;
  return Math.round(product.price * (1 - SALE_DISCOUNT_PERCENT / 100));
}

// Stock
export function isOutOfStock(product: Product, cartItems: CartItem[]): boolean {
  const currentInCart =
    cartItems.find((item) => item.productId === product.id)?.quantity ?? 0;
  return currentInCart >= product.stock;
}
