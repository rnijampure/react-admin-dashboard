//src/components/feature/products/utils/utils.ts

import { type Product, type ProductStatus } from "../../../../types/types";
// 1. Helper to validate status (The "Gatekeeper")
const isValidStatus = (status: any): status is ProductStatus => {
  return ["active", "inactive"].includes(status);
};
// We define what we expect the "Raw" API data to look like
interface RawProductRow {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
}

export const mapRowToProduct = (row: RawProductRow): Product => ({
  id: row._id || row.id || "", // Added a fallback for safety
  name: row.name,
  category: row.category,
  stock: row.stock,
  price: row.price,
  // 2. Apply the logic that the test expects
  status: isValidStatus(row.status) ? row.status : "inactive",
});
