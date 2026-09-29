import { useQuery } from "@tanstack/react-query";
import type { ProductWithCategory } from "../types/types";
import { fetchSingleProduct } from "../api/products";
import { fetchSingleCategory } from "../api/category";


export const useProduct = (id: number) => {

    const query = useQuery<ProductWithCategory>({
        queryKey: ["product", id],

        queryFn: async () => {
            
            const product = await fetchSingleProduct(id);

            const category = await fetchSingleCategory (product.categoryId);

                return {
                    product,
                    category
            };
        },
    });

    return query;

};