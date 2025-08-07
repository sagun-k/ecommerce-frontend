import type { CreateUserRequest, User } from "../types/user";
import axiosInstance from "./axiosInstance";
import { throwAsServiceError } from "./theowAsServiceError";

export class AuthenticationServices {
  static async login(
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string }> {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      throwAsServiceError(error);
    }
  }
  static async register(userData: CreateUserRequest): Promise<void> {
    try {
      await axiosInstance.post("/register", userData);
    } catch (err) {
      throw err;
    }
  }

  static async refresh(): Promise<{ user: User; token: string }> {
    try {
      // The refresh endpoint usually requires credentials with cookie, so withCredentials:true
      const response = await axiosInstance.post("/refresh");
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUsers():Promise<User[]> {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
