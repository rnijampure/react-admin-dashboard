// src/store/slices/createEditSlice.ts
import { type StateCreator } from "zustand";
import type { BoundStoreState } from "../useBoundStore";
import type { QueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/types";

export interface EditSlice {
  pendingMutation: {
    NewProduct: any | null;
    OldProduct: any | null;
    timerId: ReturnType<typeof setTimeout> | null;
  };
  // Action to stage an edit
  stageEdit: (
    data: any,
    execute: () => void,
    queryClient?: QueryClient,
  ) => void;
  // Action to cancel (Undo)
  cancelEdit: (queryClient?: QueryClient) => void;
}

export const createEditSlice: StateCreator<
  BoundStoreState,
  [["zustand/immer", never]],
  [],
  EditSlice
> = (set, get) => ({
  pendingMutation: {
    NewProduct: null,
    OldProduct: null,
    timerId: null,
  },

  stageEdit: async (data, execute, queryClient) => {
    // 1. Clear any existing pending timer
    const existingTimer = get().pendingMutation.timerId;
    if (existingTimer) clearTimeout(existingTimer);
    const qc = queryClient!;
    const PRODUCTS_QUERY_KEY = ["products"];
    // cancel any ongoing query to prevent cache overwrite
    qc.cancelQueries({ queryKey: PRODUCTS_QUERY_KEY });

    const products = qc.getQueryData<Product[]>(PRODUCTS_QUERY_KEY);
    if (!products) {
      return;
    }

    const previous = products.find((p) => p.id === data.id);
    if (!previous) return;

    // optimistic update
    qc.setQueryData<Product[]>(PRODUCTS_QUERY_KEY, (old) =>
      old?.map((p) => (p.id === data.id ? data : p)),
    );
    // 2. Start the new timer
    const id = setTimeout(() => {
      execute(); // Actually call mutation.mutate()
      set({
        pendingMutation: { NewProduct: null, OldProduct: null, timerId: null },
      });
    }, 10000); // 10s window

    set({
      pendingMutation: { NewProduct: data, OldProduct: previous, timerId: id },
    });
  },

  cancelEdit: (queryClient?: QueryClient) => {
    const qc = queryClient!;
    // 6️⃣ Rollback optimistic update
    const previous = get().pendingMutation.OldProduct;
    if (previous) {
      qc.setQueryData<any[]>(["products"], (old: any) =>
        old?.map((p: any) => (p.id === previous.id ? previous : p)),
      );
    }

    const id = get().pendingMutation.timerId;
    if (id) {
      clearTimeout(id);
    }
    set({
      pendingMutation: { NewProduct: null, OldProduct: null, timerId: null },
    });
  },
});
