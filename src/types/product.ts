export interface Product {
  id: string;
  name: string;
  price: number;
  category?: ProductCategory;
  rating?: number; // optional
  reviews?: number; // optional
  image: string;
  stock: number;
}

export interface CreateProductRequest {
  id?:string;
  name: string;
  price: number;
  category?: ProductCategory;
  image: File | string | undefined; // for image upload
  stock: number;
}

export enum ProductCategory {
  Mens = "men",
  Womens = "women",
  Kids = "kids",
  Accessories = "accessories",
}
