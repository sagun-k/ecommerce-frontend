import type { CreateOrUpdateUserRequest } from "../../pages/admin/CreateOrEditUserModal";
import axiosInstance from "../axiosInstance";
import { throwAsServiceError } from "../theowAsServiceError";

export class UserServices {
  static async createUser(request: CreateOrUpdateUserRequest) {
    try {
      await axiosInstance.post("/users", request);
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  static async updateUser(request: CreateOrUpdateUserRequest) {
    try {
      await axiosInstance.put(`/users/${request._id}`, request);
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  static async deleteUser(id: string) {
    try {
      await axiosInstance.delete(`/users/${id}`);
    } catch (err) {
      throwAsServiceError(err);
    }
  }
}
