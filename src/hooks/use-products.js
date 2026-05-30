// import { useQuery } from "@tanstack/react-query";
// import { apiFetch } from "@/lib/api";

// export function useProducts() {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: () => apiFetch("/products"),
//   });
// }

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch("/products"),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
