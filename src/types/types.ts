import type { useUpdateProductMutation } from "../components/feature/products/hooks/useProductAction";
//"../ProductTable/Product.Helper";

export interface UserType {
  userType: string;
  currentWeek: number;
}
export interface DataType {
  id: string;
  name: string;
  category: string | string[];
  stock: number;
  unitsSold: number;
  revenue: number;
  unitsSoldChangePct: number;
  revenueChangePct: number;
  userType: string;
  region: string;
  // {"id":"6970c12c0576869a149e11fe","productName":"Wireless Headphones","category":"Electronics","stockLevel":25,"unitsSold":13,"revenue":781,"unitsSoldChangePct":0,"revenueChangePct":0,"userType":"All","region":"All"}
}
export type CardLayoutProps = {
  id: number;
  description: string;
  title: string;
  amount: number;
};
export interface UseTanQueryGETResult {
  data: any;
  isPending: boolean;
  error: any;
  isFetching: boolean;
}
// src/components/feature/products/types/productsTypes.ts

export type ProductStatus = "active" | "inactive" | "pending"; // Add all possible values

export interface Product {
  id?: string; // ⬅️ use `string`, not `String`
  name: string;
  category: string | string[];
  price: number;
  stock: number;
  status?: ProductStatus; // No longer just a string
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
}

export interface EditProductFormProps_1 {
  data: Product | null | DataType;
}
export type CardType = "productsSold" | "totalRevenue" | "lowStock";
export interface EditProductFormValues {
  name: string;
  category: string[]; // always array in UI
  price: number;
  stock: number;
  description?: string;
}
export interface EditProductFormProps {
  product: Product;
  formId?: number;
  mutation: ReturnType<typeof useUpdateProductMutation>;
  onClose: () => void;
}
export interface UserType {
  userType: string;
  currentWeek: number;
}
export interface DataType {
  id: string;
  name: string;
  category: string | string[];
  stock: number;
  unitsSold: number;
  revenue: number;
  unitsSoldChangePct: number;
  revenueChangePct: number;
  userType: string;
  region: string;
  // {"id":"6970c12c0576869a149e11fe","productName":"Wireless Headphones","category":"Electronics","stockLevel":25,"unitsSold":13,"revenue":781,"unitsSoldChangePct":0,"revenueChangePct":0,"userType":"All","region":"All"}
}

export interface UseTanQueryGETResult {
  data: any;
  isPending: boolean;
  error: any;
  isFetching: boolean;
}
export interface EditProductFormProps_1 {
  data: Product | null | DataType;
}
export interface EditProductFormValues {
  name: string;
  category: string[]; // always array in UI
  price: number;
  stock: number;
  description?: string;
}
export interface EditProductFormProps {
  product: Product;
  formId?: number;
  mutation: ReturnType<typeof useUpdateProductMutation>;
  onClose: () => void;
}
