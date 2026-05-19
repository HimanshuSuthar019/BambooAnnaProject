import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "@/lib/schema";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => PRODUCTS,
  });
}
