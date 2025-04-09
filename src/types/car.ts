
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  seating: number;
  mileage: number;
  transmission: string;
  color: string;
  images: string[];
  description: string;
  features: string[];
}

export type CarFilters = {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuel?: string;
  seating?: number;
  sortBy?: 'default' | 'price-asc' | 'price-desc';
  page?: number;
  limit?: number;
  search?: string;
};
