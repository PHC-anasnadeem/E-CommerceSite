// src/app/models/product.model.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string; // Assuming you have an image path field
  description: string;
  discountedPrice?: number; // Optional field
}
