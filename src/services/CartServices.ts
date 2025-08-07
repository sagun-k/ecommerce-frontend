import type { CartItem } from "../types/cart";
import axiosInstance from "./axiosInstance";
import { throwAsServiceError } from "./theowAsServiceError";

export class CartServices {
  static async addToCart(
    productId: string,
    quantity: number,
    userId: string
  ): Promise<void> {
    try {
      await axiosInstance.post("/carts", { productId, quantity, userId });
    } catch (error) {
      throwAsServiceError(error);
    }
  }

  static mapToCartItem(cartItem: any): CartItem {
    return {
      id: cartItem._id,
      product: {
        id: cartItem.productId._id,
        name: cartItem.productId.name,
        price: cartItem.productId.price,
        image: cartItem.productId.image,
        category: cartItem.productId.category,
      },
      quantity: cartItem.quantity,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
    };
  }

  static async getCartItems(userId: string): Promise<CartItem[]> {
    try {
      const response = await axiosInstance.get("/carts", {
        params: { userId },
      });
      console.log("Response from getCartItems:", response.data.cartItems);
      const cartItems = response.data.cartItems.map((val: any) => {
        return this.mapToCartItem(val);
      });
      console.log("Cart items fetched:", cartItems);
      return cartItems;
    } catch (error) {
      throwAsServiceError(error);
    }
  }

  static async getCartCount(userId: string): Promise<number> {
    try {
      const response = await axiosInstance.get(`/carts/count`, {
        params: { userId }, // pass userId as query param to get count for that user
      });
      return response.data.cartCount;
    } catch (error) {
      throwAsServiceError(error);
    }
  }

  static async updateCartItem(
    cartItemId: string,
    quantity: number
  ): Promise<void> {
    try {
      await axiosInstance.put(`/carts/${cartItemId}`, { quantity });
    } catch (error) {
      throw error;
    }
  }

  static async removeFromCart(cartItemId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/carts/${cartItemId}`);
    } catch (error) {
      throw error;
    }
  }

  static async removeAllCartItems(userId: string): Promise<void> {
    try {
      await axiosInstance.delete("/carts/all", {
        data: { userId },
      });
    } catch (error) {
      throw error;
    }
  }
}
