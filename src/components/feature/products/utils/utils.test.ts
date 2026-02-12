// src/components/feature/products/utils/utils.test.ts
import { describe, it, expect } from "vitest";
import { mapRowToProduct } from "./utils";

describe("mapRowToProduct", () => {
  it("should map a raw product row to a Product object when _id is present", () => {
    const rawRow = {
      _id: "123",
      name: "Test Product",
      category: "Electronics",
      stock: 50,
      price: 99.99,
      status: "active" as const,
    };
    const expectedProduct = {
      id: "123",
      name: "Test Product",
      category: "Electronics",
      stock: 50,
      price: 99.99,
      status: "active" as const,
    };
    expect(mapRowToProduct(rawRow)).toEqual(expectedProduct);
  });

  it("should map a raw product row to a Product object when id is present", () => {
    const rawRow = {
      id: "123",
      name: "Test Product",
      category: "Electronics",
      stock: 50,
      price: 99.99,
      status: "active" as const,
    };
    const expectedProduct = {
      id: "123",
      name: "Test Product",
      category: "Electronics",
      stock: 50,
      price: 99.99,
      status: "active" as const,
    };
    expect(mapRowToProduct(rawRow)).toEqual(expectedProduct);
  });
  it('should default to "inactive" if the API provides an unrecognized status', () => {
    const dirtyRow = {
      id: "1",
      status: "something-weird-from-backend",
    };

    const result = mapRowToProduct(dirtyRow as any);

    expect(result.status).toBe("inactive");
  });
});
