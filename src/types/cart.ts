import type { Product } from "./product";

export type AddCartRequest = {
  productId: string;
  quantity: number;
  userId: string;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
