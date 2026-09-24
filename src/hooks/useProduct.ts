import { useQuery } from "@tanstack/react-query";

type Product = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    image: string;
    description: string;
};

type Category = {
    id: number;
    name: string;
};

type ProductWithCategory = {
    product: Product;
    category: Category;
};

export const useProduct = (id: number) => {

    const query = useQuery<ProductWithCategory>({
        queryKey: ["product", id],

        queryFn: async () => {
            const response = await fetch(
                `http://localhost:3000/products/${id}`
            );

            const product = await response.json();

            const categoryResponse = await fetch(
                `http://localhost:3000/categories/${product.categoryId}`
            );
            const category = await categoryResponse.json();

                return {
                    product,
                    category
            };
        },
    });

    return query;

};