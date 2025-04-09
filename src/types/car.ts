
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: "Automatic" | "Manual" | "CVT";
  color: string;
  seating: number;
  description: string;
  images: string[];
  features: string[];
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuel?: string;
  seating?: number;
  sortBy?: "default" | "price-asc" | "price-desc";
  page?: number;
  limit?: number;
  search?: string;
}
