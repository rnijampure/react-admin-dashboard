export interface UserType {
  userType: string;
  currentWeek: number;
}
export type UserStatus =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "banned"
  | "deleted";
export type PaymentMethod = "Card" | "UPI" | "PayPal" | "Credit Card";

export type UserType2 = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  preferredPaymentMethod: PaymentMethod;
  totalOrders: number;
  totalRevenue: number;
};
export interface DataType {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
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

export type CardType = "productsSold" | "totalRevenue" | "lowStock";
