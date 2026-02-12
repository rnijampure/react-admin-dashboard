//src\components\feature\products\hooks\useProductAction.tsx
import type { DataType } from "../../../../types/types";
import useTanQueryGET from "../../../common/queryWrapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is defined in your .env file

export const useProductsData = (endpoint = "/products") => {
  const url = `${API_BASE_URL}${endpoint}`;

  const { data, isPending, error, isFetching } = useTanQueryGET<DataType[]>(
    ["products"],
    url,
  );

  return { data, isLoading: isPending || isFetching, error };
};
