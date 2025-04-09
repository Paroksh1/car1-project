
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
  performance?: {
    horsepower?: number;
    acceleration?: number; // 0-60 mph in seconds
    topSpeed?: number; // mph
  };
  dimensions?: {
    length?: number; // in mm
    width?: number; // in mm
    height?: number; // in mm
    wheelbase?: number; // in mm
    weight?: number; // in kg
  };
  fuelEconomy?: {
    city?: number; // mpg
    highway?: number; // mpg
    combined?: number; // mpg
  };
  warranty?: {
    basic?: string; // e.g. "3 years / 36,000 miles"
    powertrain?: string; // e.g. "5 years / 60,000 miles"
    corrosion?: string; // e.g. "7 years / 100,000 miles"
  };
  safetyRating?: number; // 1-5
  condition?: "New" | "Used" | "Certified Pre-Owned";
  exteriorColor?: string;
  interiorColor?: string;
  vin?: string;
  stockNumber?: string;
  availability?: "In Stock" | "Coming Soon" | "Sold Out";
  location?: string;
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuel?: string;
  seating?: number;
  sortBy?: "price-asc" | "price-desc";
  page?: number;
  limit?: number;
  search?: string;
  condition?: "New" | "Used" | "Certified Pre-Owned";
  year?: number | [number, number]; // Single year or range
  mileage?: number; // Max mileage
  transmission?: "Automatic" | "Manual" | "CVT";
  color?: string;
  features?: string[];
}

export interface CarSortOptions {
  label: string;
  value: "default" | "price-asc" | "price-desc" | "year-desc" | "year-asc" | "mileage-asc" | "mileage-desc";
}

export interface CarBrandOption {
  label: string;
  value: string;
  logo?: string;
}

export interface FuelTypeOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface CarStats {
  totalListings: number;
  averagePrice: number;
  priceRange: [number, number];
  popularBrands: { brand: string; count: number }[];
  fuelTypes: { type: string; count: number }[];
}
