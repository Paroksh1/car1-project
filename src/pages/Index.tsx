
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CarFilters from "@/components/CarFilters";
import CarCard from "@/components/CarCard";
import CarListItem from "@/components/CarListItem";
import ViewToggle from "@/components/ViewToggle";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { carsAPI } from "@/lib/car-data";
import { Car, CarFilters as CarFiltersType } from "@/types/car";
import { Search, Loader2 } from "lucide-react";

const Index = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCars, setTotalCars] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [refreshKey, setRefreshKey] = useState(0); // Used to force re-render when wishlist changes
  
  const [filters, setFilters] = useState<CarFiltersType>({
    brand: "all",
    fuel: "all",
    minPrice: 0,
    maxPrice: 100000,
    page: 1,
    limit: 10,
    sortBy: "default"
  });

  useEffect(() => {
    fetchCars();
  }, [filters, refreshKey]);

  const fetchCars = async () => {
    setLoading(true);
    
    try {
      // Fetch cars with current filters
      const response = carsAPI.getCars(filters);
      
      setCars(response.cars);
      setTotalCars(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: CarFiltersType) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleWishlistChange = () => {
    // Force re-render to update all cards
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    // Save preference to localStorage
    localStorage.setItem("carView", newView);
  };

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("carView") as "grid" | "list" | null;
    if (savedView) {
      setView(savedView);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
        <p className="text-muted-foreground mb-8">
          Browse our extensive collection of quality vehicles
        </p>
        
        <CarFilters filters={filters} onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading cars...</span>
          </div>
        ) : (
          <>
            {cars.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {cars.length} of {totalCars} cars
                  </p>
                  <ViewToggle view={view} onChange={handleViewChange} />
                </div>
                
                {view === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        onWishlistChange={handleWishlistChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cars.map((car) => (
                      <CarListItem
                        key={car.id}
                        car={car}
                        onWishlistChange={handleWishlistChange}
                      />
                    ))}
                  </div>
                )}
                
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <EmptyState
                icon={<Search className="w-full h-full" />}
                title="No cars found"
                description="Try changing your search filters to find what you're looking for."
                actionLabel="Reset Filters"
                onAction={() => handleFilterChange({
                  brand: "all",
                  fuel: "all",
                  minPrice: 0,
                  maxPrice: 100000,
                  page: 1,
                  search: "",
                  sortBy: "default"
                })}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
