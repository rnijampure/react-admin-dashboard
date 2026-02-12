//src\store\useDrawerStore.ts
import React from "react";
import { create } from "zustand";

import { type ExtractState } from "zustand";
import { type Product } from "../types/types"; // Adjust the import path based on where Product is defined
import {
  timercontrol,
  type TimerControl,
} from "../components/feature/products/utils/utils";
//import { timercontrol } from "../components/feature/products/utils/utils";
export type DrawerState = {
  isDrawerOpen: boolean; // This is redundant but can be used for more complex logic if needed

  openDrawer: () => void;
  closeDrawer: () => void;
  // This handles the MUI event logic directly
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};
export interface UiState extends DrawerState {
  isDrawerOpen: boolean;
  notification: {
    isOpen: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
    undoClicked: boolean;
    editData: Product[];
    timerValue?: number;
    timer?: TimerControl;
    pendingCommit?: () => void;
  };
  // Actions at the top level
  notify: (message: string, severity?: "success" | "error" | "info") => void;
  closeNotification: () => void;
  onUndo: () => void;
  setEditData: (editData: Product[]) => void;
}

// Extract the type of the whole store state
export type DrawerStateType = ExtractState<typeof useDrawerNotificationStore>;

const useDrawerNotificationStore = create<UiState>((set, get) => ({
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
  // Initial Notification State
  notification: {
    isOpen: false,
    message: "",
    severity: "info",
    undoClicked: false,
    editData: [],
    timerValue: 0,
    timer: undefined,
  },
  // Notification Actions
  notify: (message, severity = "info", onCommit?: () => void) => {
    const timer = timercontrol(
      30,
      (value) =>
        set((state) => ({
          notification: {
            ...state.notification,
            timerValue: value,
          },
        })),
      () => {
        const { undoClicked, pendingCommit } = get().notification;

        if (!undoClicked) {
          pendingCommit?.(); // ✅ auto-commit
        }

        set((state) => ({
          notification: {
            ...state.notification,
            isOpen: false,
          },
        }));
      },
    );
    set((state) => ({
      notification: {
        ...state.notification,
        isOpen: true,
        message,
        severity,
        timerValue: 30,
        timer: timer,
        undoClicked: false,
        pendingCommit: onCommit,
      },
    }));

    timer.start();
  },

  // Optimization: Just flip the boolean, don't worry about spreading functions
  closeNotification: () =>
    set((state) => ({
      notification: { ...state.notification, isOpen: false },
    })),

  onUndo: () => {
    const { timer, pendingCommit } = get().notification;

    timer?.stop(); // ⛔ stop countdown

    set((state) => ({
      notification: { ...state.notification, undoClicked: true, isOpen: false },
    }));
  },

  setEditData: (editData) =>
    set((state) => ({
      notification: { ...state.notification, editData },
    })),
}));
export default useDrawerNotificationStore;
