import { useQuery } from "@tanstack/react-query";
import type { ProductWithCategory } from "../types/types";
import { fetchSingleProduct } from "../api/products";
import { fetchCategories } from "../api/category";
import { getCategoryIds } from "../utils/helpers";

export const useProduct = (id: number) => {
  const query = useQuery<ProductWithCategory>({
    queryKey: ["product", id],

    queryFn: async () => {
      const product = await fetchSingleProduct(id);
      const categories = await fetchCategories();

      const matchedCategories = categories.filter((c) =>
        getCategoryIds(product.categoryId).includes(Number(c.id)),
      );

      return {
        product,
        categories: matchedCategories,
      };
    },
  });

  return query;
};
