import type {
  CreateProductRequest,
  Product,
  ProductCategory,
} from "../types/product";
import axiosInstance from "./axiosInstance";
import { throwAsServiceError } from "./theowAsServiceError";

export class ProductServices {
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get("/products");
      const products: Product[] = response.data.map((val: any) => {
        return {
          ...val,
          id: val._id,
        };
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductsByCategory(
    category: ProductCategory
  ): Promise<Product[]> {
    try {
      const response = await this.getProducts();
      const products = response.filter(
        (product) => product.category === category
      );
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(productId: string): Promise<Product> {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(
    productData: CreateProductRequest
  ): Promise<Product> {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", String(productData.price));
      formData.append("category", productData.category!);
      formData.append("stock", String(productData.stock));

      // Attach image if it’s a File
      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      } else {
        formData.append("image", productData.image!); // fallback if it's a URL
      }

      const response = await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.product;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(
    id: string,
    productData: CreateProductRequest
  ): Promise<Product> {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", String(productData.price));
      formData.append("category", productData.category!);
      formData.append("stock", String(productData.stock));

      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      } else {
        formData.append("image", productData.image!);
      }

      const response = await axiosInstance.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.product;
    } catch (error) {
      throw error;
    }
  }
  static async deleteProduct(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/products/${id}`);
    } catch (error) {
      throwAsServiceError(error);
    }
  }
}
