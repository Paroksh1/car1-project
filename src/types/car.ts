
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: "Automatic" | "Manual";
  color: string;
  seating: number;
  description: string;
  images: string[];
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
