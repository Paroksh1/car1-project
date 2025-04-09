
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
        
        // Dispatch event to update other components
        window.dispatchEvent(new Event('wishlistChange'));
        
        // Play animation effect (could be extended)
        const heartIcon = document.querySelector('.wishlist-heart');
        if (heartIcon) {
          heartIcon.classList.add('scale-bounce');
          setTimeout(() => {
            heartIcon.classList.remove('scale-bounce');
          }, 500);
        }
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
      
      // Dispatch event to update other components
      window.dispatchEvent(new Event('wishlistChange'));
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
      
      // Dispatch event to update other components
      window.dispatchEvent(new Event('wishlistChange'));
      
      toast({
        title: "Wishlist cleared",
        description: "All cars have been removed from your wishlist",
      });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast({
        title: "Error",
        description: "Could not clear wishlist",
        variant: "destructive"
      });
    }
  },
  
  toggleWishlist: (carId: number): boolean => {
    try {
      const isInWishlist = WishlistManager.isInWishlist(carId);
      
      if (isInWishlist) {
        WishlistManager.removeFromWishlist(carId);
        return false;
      } else {
        WishlistManager.addToWishlist(carId);
        return true;
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      return WishlistManager.isInWishlist(carId);
    }
  },
  
  // New method to get last added item for toast messages
  getLastAddedItem: (cars: Car[]): Car | null => {
    try {
      const wishlist = WishlistManager.getWishlist();
      if (wishlist.length === 0) return null;
      
      const lastAddedId = wishlist[wishlist.length - 1];
      return cars.find(car => car.id === lastAddedId) || null;
    } catch (error) {
      console.error("Error getting last added item:", error);
      return null;
    }
  },
  
  // New method to save and retrieve wishlist with timestamps
  getWishlistWithTimestamps: (): Array<{ id: number, timestamp: number }> => {
    try {
      const wishlistWithTime = localStorage.getItem('car-wishlist-with-time');
      return wishlistWithTime ? JSON.parse(wishlistWithTime) : [];
    } catch (error) {
      console.error("Error getting wishlist with timestamps:", error);
      return [];
    }
  },
  
  addToWishlistWithTimestamp: (carId: number): void => {
    try {
      const wishlistWithTime = WishlistManager.getWishlistWithTimestamps();
      const existing = wishlistWithTime.find(item => item.id === carId);
      
      if (!existing) {
        wishlistWithTime.push({ id: carId, timestamp: Date.now() });
        localStorage.setItem('car-wishlist-with-time', JSON.stringify(wishlistWithTime));
      }
      
      // Also update regular wishlist
      WishlistManager.addToWishlist(carId);
    } catch (error) {
      console.error("Error adding to wishlist with timestamp:", error);
    }
  }
};
