import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useProductStore } from "./productStore";
import type { Product } from "../../../../types/types";

describe("ProductStore", () => {
  const product: Product = {
    id: "1",
    name: "Test Product",
    category: "Test Category",
    price: 100,
    stock: 10,
    status: "active",
  };

  beforeEach(() => {
    vi.useFakeTimers();
    useProductStore.setState({
      selectionModel: { type: "include", ids: new Set() },
      highlightedId: undefined,
      editingProducts: [],
      isDialogOpen: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have the correct initial state", () => {
    const store = useProductStore.getState();
    expect(store.selectionModel).toEqual({ type: "include", ids: new Set() });
    expect(store.highlightedId).toBeUndefined();
    expect(store.editingProducts).toEqual([]);
    expect(store.isDialogOpen).toBe(false);
  });

  it("should set highlightedId correctly", () => {
    const store = useProductStore.getState();
    store.actions.setHighlightedId("test-id");
    expect(store.highlightedId).toBe("test-id");
  });

  it("should set editingProducts correctly", () => {
    const store = useProductStore.getState();
    store.actions.setEditingProducts([product]);
    expect(store.editingProducts).toEqual([product]);
  });

  it("should open and close the dialog correctly", () => {
    const store = useProductStore.getState();
    store.actions.setDialogOpen(true);
    expect(store.isDialogOpen).toBe(true);

    store.actions.setDialogOpen(false);
    expect(store.isDialogOpen).toBe(false);
  });

  it("should flash a row correctly", () => {
    const store = useProductStore.getState();
    store.actions.flashRow("flash-id", 1000);

    expect(store.highlightedId).toBe("flash-id");

    vi.advanceTimersByTime(1000);
    expect(store.highlightedId).toBeUndefined();
  });

  it("should reset selection", () => {
    const store = useProductStore.getState();
    store.actions.resetSelection();
    expect(store.selectionModel).toEqual({ type: "include", ids: new Set() });
  });
});
