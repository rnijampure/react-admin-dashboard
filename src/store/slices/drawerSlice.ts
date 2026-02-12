// src/store/slices/createEditSlice.ts
import { type StateCreator } from "zustand";
import type { BoundStoreState } from "../useBoundStore";

export type DrawerSliceType = {
  isDrawerOpen: boolean; // This is redundant but can be used for more complex logic if needed

  openDrawer: () => void;
  closeDrawer: () => void;
  // This handles the MUI event logic directly
  toggleDrawer?: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export const createDrawerSlice: StateCreator<
  BoundStoreState,
  [["zustand/immer", never]],
  [],
  DrawerSliceType
> = (set, get) => ({
  isDrawerOpen: true, // Default to open for testing
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  // This is a "Curried Function" to match MUI's expected signature
  toggleDrawer:
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      set({ isDrawerOpen: open });
    },
});
