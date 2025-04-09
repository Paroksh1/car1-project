
import { Car } from "@/types/car";

export const WishlistManager = {
  getWishlist: (): number[] => {
    const wishlist = localStorage.getItem('car-wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },
  
  addToWishlist: (carId: number): void => {
    const wishlist = WishlistManager.getWishlist();
    if (!wishlist.includes(carId)) {
      wishlist.push(carId);
      localStorage.setItem('car-wishlist', JSON.stringify(wishlist));
    }
  },
  
  removeFromWishlist: (carId: number): void => {
    const wishlist = WishlistManager.getWishlist();
    const updatedWishlist = wishlist.filter(id => id !== carId);
    localStorage.setItem('car-wishlist', JSON.stringify(updatedWishlist));
  },
  
  isInWishlist: (carId: number): boolean => {
    const wishlist = WishlistManager.getWishlist();
    return wishlist.includes(carId);
  },
  
  getWishlistItems: (cars: Car[]): Car[] => {
    const wishlistIds = WishlistManager.getWishlist();
    return cars.filter(car => wishlistIds.includes(car.id));
  }
};
