// src/components/feature/products/hooks/__tests__/useProductsData.test.tsx
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProductsData } from "./useProductsData";
import useTanQueryGET from "../../../common/queryWrapper";

// Mock the custom query hook
vi.mock("../../../common/queryWrapper");

describe("useProductsData", () => {
  const mockData = [{ id: "1", name: "Test Product" }];

  it("should return data correctly", () => {
    (useTanQueryGET as any).mockReturnValue({
      data: mockData,
      isPending: false,
      error: null,
      isFetching: false,
    });

    const { result } = renderHook(() => useProductsData());

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should return loading state correctly", () => {
    (useTanQueryGET as any).mockReturnValue({
      data: null,
      isPending: true,
      error: null,
      isFetching: true,
    });

    const { result } = renderHook(() => useProductsData());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it("should return error correctly", () => {
    const error = new Error("Failed");
    (useTanQueryGET as any).mockReturnValue({
      data: null,
      isPending: false,
      error,
      isFetching: false,
    });

    const { result } = renderHook(() => useProductsData());
    expect(result.current.error).toBe(error);
  });
});
