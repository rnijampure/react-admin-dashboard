//src\components\main\ProductTable\editTableHelper.tsx
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import type { Product } from "../../../../../types/types";
import { mapRowToProduct } from "../../utils/utils";
// generate the list of categories
export const useProductCategories = () => {
  const queryClient = useQueryClient();

  // Get the actual data to watch it
  const products = queryClient.getQueryData<Product[]>(["products"]) ?? [];
  //category: Array.isArray(p.category) ? p.category : [p.category?.toString()].filter(Boolean)
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products.map((p) =>
          Array.isArray(p.category)
            ? p.category
            : [p.category?.toString()].filter(Boolean),
        ),
      ),
    );
  }, [products]); // ✅ Now it updates when products change!

  return categories;
};

export const useProductDetails = (product: Product) => {
  const queryClient = useQueryClient();

  // 1. Get the raw cache data
  const cachedData = queryClient.getQueryData<Product>(["product", product.id]);

  // 2. ✅ Memoize the result!
  // This ensures we return the EXACT same object reference unless the data actually changes.

  return useMemo(() => {
    const dataToMap = product;
    return mapRowToProduct(dataToMap);
  }, [cachedData, product.id]); // Only re-map if cache changes or ID changes
};

export const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
