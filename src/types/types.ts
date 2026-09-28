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

export interface Order {
  id: number;
  items: CartItem[];
  totalAmount: number;
  customerDetails:string;
  paymentMethod: string;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}