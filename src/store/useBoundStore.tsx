// src/store/useBoundStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  createNotificationSlice,
  type NotificationSlice,
} from "./slices/notificationSlice";
import { createDrawerSlice, type DrawerSliceType } from "./slices/drawerSlice";
import { createEditSlice, type EditSlice } from "./slices/createEditSlice";

// 1. Define the unified State type
export type BoundStoreState = DrawerSliceType & NotificationSlice & EditSlice;
// 2. Create the store
export const useBoundStore = create<BoundStoreState>()(
  immer((...a) => ({
    // Use the spread operator (...a) to pass set, get, and store api automatically
    ...createDrawerSlice(...a),
    ...createNotificationSlice(...a),
    ...createEditSlice(...a),
  })),
);

export default useBoundStore;
