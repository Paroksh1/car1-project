
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { Link } from "react-router-dom";
import { WishlistManager } from "@/lib/wishlist";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CarListItemProps {
  car: Car;
  onWishlistChange?: () => void;
}

const CarListItem: React.FC<CarListItemProps> = ({ car, onWishlistChange }) => {
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = React.useState(
    WishlistManager.isInWishlist(car.id)
  );

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      WishlistManager.removeFromWishlist(car.id);
      setIsInWishlist(false);
      toast({
        title: "Removed from wishlist",
        description: `${car.brand} ${car.model} has been removed from your wishlist.`,
      });
    } else {
      WishlistManager.addToWishlist(car.id);
      setIsInWishlist(true);
      toast({
        title: "Added to wishlist",
        description: `${car.brand} ${car.model} has been added to your wishlist.`,
      });
    }
    
    if (onWishlistChange) {
      onWishlistChange();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      to={`/car/${car.id}`}
      className="flex flex-col md:flex-row gap-5 p-5 border rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-card"
    >
      <div className="relative md:w-64 h-48 overflow-hidden rounded-md">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
            isInWishlist ? "text-red-500" : "text-muted-foreground"
          } shadow-md`}
          onClick={toggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {car.year} · {car.transmission} · {car.mileage.toLocaleString()} miles
            </p>
          </div>
          <p className="font-semibold text-xl text-primary">{formatPrice(car.price)}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{car.fuel}</Badge>
          <Badge variant="outline">{car.seating} seats</Badge>
          <Badge variant="outline">{car.color}</Badge>
        </div>
        
        <p className="text-sm mt-3 line-clamp-2 text-muted-foreground">
          {car.description}
        </p>
        
        <div className="mt-auto pt-4">
          <Button variant="default" className="w-full sm:w-auto">View Details</Button>
        </div>
      </div>
    </Link>
  );
};

export default CarListItem;
