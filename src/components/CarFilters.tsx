
import React, { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { carsAPI } from "@/lib/car-data";
import { CarFilters as CarFiltersType } from "@/types/car";
import { Search, SlidersHorizontal, X, Filter } from "lucide-react";
import { debounce } from "@/lib/utils";

interface CarFiltersProps {
  filters: CarFiltersType & { sortOrder?: "default" | "price-asc" | "price-desc" };
  onFilterChange: (filters: Partial<CarFiltersType & { sortOrder?: "default" | "price-asc" | "price-desc" }>) => void;
}

const CarFilters: React.FC<CarFiltersProps> = ({ filters, onFilterChange }) => {
  const [maxPrice, setMaxPrice] = useState(100000);
  const [brands, setBrands] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [seatingOptions, setSeatingOptions] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  
  const debouncedSearch = useRef(
    debounce((value: string) => {
      onFilterChange({ ...filters, search: value, page: 1 });
    }, 500)
  ).current;

  useEffect(() => {
    // Fetch filter options
    setBrands(carsAPI.getBrands());
    setFuelTypes(carsAPI.getFuelTypes());
    setSeatingOptions([2, 4, 5, 7, 8]);
    
    const apiMaxPrice = carsAPI.getMaxPrice();
    setMaxPrice(apiMaxPrice);
    setPriceRange([filters.minPrice || 0, filters.maxPrice || apiMaxPrice]);
  }, []);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSeatingChange = (value: string) => {
    const seating = value ? Number(value) : undefined;
    onFilterChange({ ...filters, seating, page: 1 });
  };

  const applyFilters = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search: searchTerm,
      page: 1 // Reset to first page when filters change
    });
    
    // Close mobile filters if open
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSearchTerm("");
    onFilterChange({
      brand: "all",
      fuel: "all",
      minPrice: 0,
      maxPrice: maxPrice,
      seating: undefined,
      sortOrder: "default",
      page: 1,
      search: ""
    });
    
    // Close mobile filters if open
    setMobileFiltersOpen(false);
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="w-full mb-6">
      {/* Search bar - visible on all screens */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={toggleMobileFilters}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Desktop filters - hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 items-end animate-fade-in">
        <div className="col-span-4 space-y-2">
          <Label htmlFor="price-range">Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</Label>
          <Slider
            id="price-range"
            min={0}
            max={maxPrice}
            step={1000}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="py-4"
          />
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="brand">Brand</Label>
          <Select
            value={filters.brand || "all"}
            onValueChange={(value) => onFilterChange({ ...filters, brand: value, page: 1 })}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select
            value={filters.fuel || "all"}
            onValueChange={(value) => onFilterChange({ ...filters, fuel: value, page: 1 })}
          >
            <SelectTrigger id="fuel">
              <SelectValue placeholder="All Fuel Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fuel Types</SelectItem>
              {fuelTypes.map((fuel) => (
                <SelectItem key={fuel} value={fuel}>
                  {fuel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="seating" className="mb-2 block">Seating</Label>
          <ToggleGroup type="single" value={filters.seating?.toString()} onValueChange={handleSeatingChange} className="justify-start">
            {seatingOptions.map(seats => (
              <ToggleGroupItem key={seats} value={seats.toString()} aria-label={`${seats} seats`} className="h-8 w-8">
                {seats}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={filters.sortOrder || "default"}
            onValueChange={(value: "default" | "price-asc" | "price-desc") => onFilterChange({ ...filters, sortOrder: value, page: 1 })}
          >
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile filters - shown in a modal */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-50 overflow-auto p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filters
            </h2>
            <Button variant="ghost" size="icon" onClick={toggleMobileFilters}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile-price-range">Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</Label>
              <Slider
                id="mobile-price-range"
                min={0}
                max={maxPrice}
                step={1000}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-brand">Brand</Label>
              <Select
                value={filters.brand || "all"}
                onValueChange={(value) => onFilterChange({ ...filters, brand: value, page: 1 })}
              >
                <SelectTrigger id="mobile-brand">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-fuel">Fuel Type</Label>
              <Select
                value={filters.fuel || "all"}
                onValueChange={(value) => onFilterChange({ ...filters, fuel: value, page: 1 })}
              >
                <SelectTrigger id="mobile-fuel">
                  <SelectValue placeholder="All Fuel Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel Types</SelectItem>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel}>
                      {fuel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-seating" className="mb-2 block">Seating</Label>
              <ToggleGroup 
                type="single" 
                value={filters.seating?.toString()} 
                onValueChange={handleSeatingChange} 
                className="flex flex-wrap gap-2"
              >
                {seatingOptions.map(seats => (
                  <ToggleGroupItem key={seats} value={seats.toString()} aria-label={`${seats} seats`} className="h-9 w-10">
                    {seats}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-sort">Sort By</Label>
              <Select
                value={filters.sortOrder || "default"}
                onValueChange={(value: "default" | "price-asc" | "price-desc") => onFilterChange({ ...filters, sortOrder: value, page: 1 })}
              >
                <SelectTrigger id="mobile-sort">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
              <Button onClick={resetFilters} variant="outline" className="flex-1">Reset</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarFilters;
