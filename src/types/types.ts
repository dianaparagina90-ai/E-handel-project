export type Product = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    description: string;
    imageUrl: string;
}

export type CartItem = {
    productId: number;
    quantity: number;
}