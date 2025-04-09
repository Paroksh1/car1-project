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
import { Search, Loader2, Car as CarIcon } from "lucide-react";

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
      // Filter out 'default' sort option when passing to API
      const apiFilters = {...filters};
      if (apiFilters.sortBy === 'default') {
        delete apiFilters.sortBy;
      }
      
      // Fetch cars with current filters
      const response = carsAPI.getCars(apiFilters);
      
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
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="relative overflow-hidden">
        {/* Hero section with background */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 px-4">
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-block p-2 bg-primary/10 rounded-xl mb-4">
              <CarIcon size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient">Find Your Perfect Car</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our extensive collection of quality vehicles and find your dream car today
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-card rounded-xl shadow-lg p-6 border mb-10">
            <CarFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <span className="text-lg">Loading your dream cars...</span>
            </div>
          ) : (
            <>
              {cars.length > 0 ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium text-foreground">{cars.length}</span> of <span className="font-medium text-foreground">{totalCars}</span> cars
                      </p>
                    </div>
                    <ViewToggle view={view} onChange={handleViewChange} />
                  </div>
                  
                  <div className="animate-fade-in">
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
                      <div className="flex flex-col gap-6">
                        {cars.map((car) => (
                          <CarListItem
                            key={car.id}
                            car={car}
                            onWishlistChange={handleWishlistChange}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-10">
                    <Pagination
                      currentPage={filters.page || 1}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
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
      </div>
    </Layout>
  );
};

export default Index;
