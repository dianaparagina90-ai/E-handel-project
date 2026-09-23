import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
