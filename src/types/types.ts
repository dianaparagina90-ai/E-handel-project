export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number | number[];
  image: string;
  description: string;
  onSale: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export type ProductWithCategory = {
  product: Product;
  categories: Category[];
};

export type CartItem = {
  productId: number;
  quantity: number;
};

export interface Order {
  id: number;
  items: OrderItem[];
  totalAmount: number;
  customerDetails: string;
  shippingMethod: string;
  paymentMethod: string;
  orderDate: string;
}
export type OrderItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export interface CartItemProps {
  product: Product;
  quantity: number;
  editable?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}
