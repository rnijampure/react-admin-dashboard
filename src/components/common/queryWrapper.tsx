import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

type ValidQueryKeys = "products" | "orders" | "users";

// src/lib/normalizers.ts
export const normalizers = {
  products: (items: any[]) =>
    items.map((p) => ({
      id: p._id,
      ...p,
      _id: undefined, // optional cleanup
    })),
};

export default function useTanQueryGET<T>(
  queryKey: ValidQueryKeys[],
  queryFnURL: string,
  select?: any,
): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(queryFnURL);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json() as Promise<T>;
    },
    select: (data) => {
      // 🔑 normalize FIRST
      const rootKey = queryKey[0];
      const normalized = normalizers[rootKey as keyof typeof normalizers]
        ? normalizers[rootKey as keyof typeof normalizers](data as any[])
        : data;

      // optional extra select
      return select ? select(normalized) : normalized;
    },

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: false,
  });
}
