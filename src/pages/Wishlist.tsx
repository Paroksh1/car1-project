
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CarCard from "@/components/CarCard";
import CarListItem from "@/components/CarListItem";
import ViewToggle from "@/components/ViewToggle";
import EmptyState from "@/components/EmptyState";
import { carsAPI } from "@/lib/car-data";
import { WishlistManager } from "@/lib/wishlist";
import { Car } from "@/types/car";
import { Heart, Loader2 } from "lucide-react";

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchWishlistCars();
  }, [refreshKey]);

  const fetchWishlistCars = async () => {
    setLoading(true);
    
    try {
      // Get all car IDs from wishlist
      const wishlistIds = WishlistManager.getWishlist();
      
      // Get all cars
      const { cars } = carsAPI.getCars({ limit: 100 });
      
      // Filter cars by wishlist IDs
      const wishlistedCars = cars.filter(car => wishlistIds.includes(car.id));
      
      setWishlistCars(wishlistedCars);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistChange = () => {
    // Force component to re-render by updating refresh key
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
        <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground mb-8">
          Cars you've saved for later
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading wishlist...</span>
          </div>
        ) : (
          <>
            {wishlistCars.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    {wishlistCars.length} {wishlistCars.length === 1 ? "car" : "cars"} in wishlist
                  </p>
                  <ViewToggle view={view} onChange={handleViewChange} />
                </div>
                
                {view === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        onWishlistChange={handleWishlistChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {wishlistCars.map((car) => (
                      <CarListItem
                        key={car.id}
                        car={car}
                        onWishlistChange={handleWishlistChange}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon={<Heart className="w-full h-full" />}
                title="Your wishlist is empty"
                description="Save cars you like to your wishlist to view them later."
                actionLabel="Browse Cars"
                actionLink="/"
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
