import { create } from "zustand";
import { type GridRowSelectionModel } from "@mui/x-data-grid";
import { type Product } from "../../../../types/types";

export interface ProductStoreState {
  selectionModel: GridRowSelectionModel;
  highlightedId?: string;
  editingProducts: Product[];
  isDialogOpen: boolean;
}

export interface ProductStoreActions {
  setSelectionModel: (model: GridRowSelectionModel) => void;
  setHighlightedId: (id?: string) => void;
  setEditingProducts: (products: Product[]) => void;
  setDialogOpen: (open: boolean) => void;
  flashRow: (id: string, duration?: number) => void;
  resetSelection: () => void;
}

export type ProductStore = ProductStoreState & { actions: ProductStoreActions };

// Default selection model
const defaultSelectionModel: GridRowSelectionModel = {
  type: "include",
  ids: new Set(),
};

export const useProductStore = create<ProductStore>((set) => ({
  // State
  selectionModel: defaultSelectionModel,
  highlightedId: undefined,
  editingProducts: [],
  isDialogOpen: false,

  // Actions
  actions: {
    setSelectionModel: (selectionModel) => set({ selectionModel }),

    setHighlightedId: (id) => set({ highlightedId: id }),

    setEditingProducts: (products) => set({ editingProducts: products }),

    setDialogOpen: (open) => set({ isDialogOpen: open }),

    flashRow: (id, duration = 2500) => {
      set({ highlightedId: id });
      setTimeout(() => {
        set((state) =>
          state.highlightedId === id ? { highlightedId: undefined } : {},
        );
      }, duration);
    },

    resetSelection: () => set({ selectionModel: defaultSelectionModel }),
  },
}));
