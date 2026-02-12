//src\components\feature\products\hooks\useProductAction.tsx
import { useState } from "react";
import type { Product, DataType } from "../../../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapRowToProduct } from "../utils/utils";

export async function updateProduct(product: Product): Promise<Product> {
  const response = await fetch(
    `http://localhost:3000/api/products/add/${product.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    },
  );

  if (!response.ok) {
    throw new Error("Update failed");
  }

  return response.json();
}
export function useUpdateProductMutation(onHighlight?: (id: string) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    // Optimistic Update: Update UI before server responds
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);

      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p,
        ),
      );

      return { previousProducts };
    },

    onSuccess: (serverProduct) => {
      const normalized = mapRowToProduct(serverProduct);

      // Update the cache with the real server data
      queryClient.setQueryData<Product>(["product", normalized.id], normalized);

      // Force a background refetch to ensure everything is in sync
      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (onHighlight) onHighlight(normalized.id);
    },

    onError: (err, newTodo, context) => {
      // Rollback if server fails
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
  });
}
// 1. The API Call function
export async function bulkUpdateProducts(payload: { updates: any[] }) {
  console.log("here payload", payload);
  const response = await fetch(`http://localhost:3000/api/products/bulk`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Bulk update failed");
  return response.json(); // Returns { success, failed }
}
export function useBulkUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUpdateProducts,
    onSuccess: (data) => {
      // Invalidate the products list to pull fresh data for all updated items
      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (data.failed?.length > 0) {
        console.error("Some items failed to update:", data.failed);
      }
    },
  });
}

export const useProductsAction = () => {
  const queryClient = useQueryClient();

  const [highlightedRowId, setHighlightedRowId] = useState<string | undefined>(
    undefined,
  );

  const updateProductMutation = useUpdateProductMutation((id) => {
    // Ensure list stays in sync (optional if optimistic is correct)
    queryClient.invalidateQueries({ queryKey: ["products"] });

    // Highlight the updated row
    setHighlightedRowId(id);
  });
  const onClickDelete = (row: DataType) => {
    setHighlightedRowId(row.id);
    // console.log("Delete row:", row);
  };
  // 2. The Mutation Hook

  return {
    onClickDelete,
    updateProductMutation,
    highlightedRowId,
    setHighlightedRowId,
    useBulkUpdateMutation,
  };
};
