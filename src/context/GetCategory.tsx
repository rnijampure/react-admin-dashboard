// src/context/CategoryContext.tsx
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../components/feature/summary/types";

// Define context type
const CategoryContext = createContext<string[]>([]);

// Provider
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  // Subscribe to products cache
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    enabled: false, // Don't refetch, just use cache
  });

  // Derive unique categories
  const categories = useMemo(() => {
    // Flatten categories and remove duplicates
    const allCategories = products.flatMap((p) =>
      Array.isArray(p.category) ? p.category : [p.category],
    );

    const uniqueCategories = Array.from(new Set(allCategories));

    return ["All", ...uniqueCategories]; // Add "All" option
  }, [products]);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to use categories
export const useCategories = () => useContext(CategoryContext);
