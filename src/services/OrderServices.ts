import type { CreateOrderRequest, Order, OrderWithUserDetails } from "../types/order";
import axiosInstance from "./axiosInstance";

export class OrderServices {
  // Place a new order
  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data.order;
    } catch (error) {
      throw error;
    }
  }

  // Get all orders for a specific user
  static async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const response = await axiosInstance.get(`/orders?userId=${userId}`);
      return response.data.orders;
    } catch (error) {
      throw error;
    }
  }

  static async getOrders(): Promise<OrderWithUserDetails[]> {
    try {
      const response = await axiosInstance.get(`/orders/all`);
      return response.data.orders;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<any> {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/status`, {
        status,
        id:orderId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // (Optional) Get a specific order
  static async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data.order;
    } catch (error) {
      throw error;
    }
  }
}
