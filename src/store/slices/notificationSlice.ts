//src\store\slices\notificationSlice.ts
import { type StateCreator } from "zustand";
import type { BoundStoreState } from "../useBoundStore";

export interface NotificationSlice {
  notification?: {
    isOpen: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  };
  notify: (message: string, severity?: "success" | "error" | "info") => void;
  closeNotification: () => void;
}

export const createNotificationSlice: StateCreator<
  BoundStoreState,
  [["zustand/immer", never]],
  [],
  NotificationSlice
> = (set, get) => ({
  // Initial Notification State
  notification: {
    isOpen: false,
    message: "",
    severity: "info",
  },
  // Notification Actions
  notify: (message, severity = "info") => {
    set({
      notification: { isOpen: true, message, severity },
    });
  },
  closeNotification: () => {
    set({
      notification: { isOpen: false, message: "", severity: "info" },
    });
  },
});
