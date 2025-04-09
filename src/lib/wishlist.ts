
import { Car } from "@/types/car";
import { toast } from "@/hooks/use-toast";

export const WishlistManager = {
  getWishlist: (): number[] => {
    try {
      const wishlist = localStorage.getItem('car-wishlist');
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error("Error getting wishlist from localStorage:", error);
      return [];
    }
  },
  
  addToWishlist: (carId: number): void => {
    try {
      const wishlist = WishlistManager.getWishlist();
      if (!wishlist.includes(carId)) {
        wishlist.push(carId);
        localStorage.setItem('car-wishlist', JSON.stringify(wishlist));
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast({
        title: "Error",
        description: "Could not add car to wishlist",
        variant: "destructive"
      });
    }
  },
  
  removeFromWishlist: (carId: number): void => {
    try {
      const wishlist = WishlistManager.getWishlist();
      const updatedWishlist = wishlist.filter(id => id !== carId);
      localStorage.setItem('car-wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Could not remove car from wishlist",
        variant: "destructive"
      });
    }
  },
  
  isInWishlist: (carId: number): boolean => {
    try {
      const wishlist = WishlistManager.getWishlist();
      return wishlist.includes(carId);
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return false;
    }
  },
  
  getWishlistItems: (cars: Car[]): Car[] => {
    try {
      const wishlistIds = WishlistManager.getWishlist();
      return cars.filter(car => wishlistIds.includes(car.id));
    } catch (error) {
      console.error("Error getting wishlist items:", error);
      return [];
    }
  },
  
  getWishlistCount: (): number => {
    try {
      return WishlistManager.getWishlist().length;
    } catch (error) {
      console.error("Error getting wishlist count:", error);
      return 0;
    }
  },
  
  clearWishlist: (): void => {
    try {
      localStorage.setItem('car-wishlist', JSON.stringify([]));
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    }
  }
};
