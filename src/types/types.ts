export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  image: string;
  description: string;
}


export interface Category {
  id: string;
  name: string;
}

export type CartItem = {
    productId: number;
    quantity: number;
}