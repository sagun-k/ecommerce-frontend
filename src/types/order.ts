import type { Product } from "./product";
import type { User } from "./user";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Cancelled = "Cancelled",
  Delivered = "Delivered",
}

export interface OrderWithUserDetails {
  userId: User;
  _id: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Order {
  _id: string;
  userId: string;
  products: {
    productId: Product;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  products: CreateOrderItem[];
  totalAmount: number;
}
