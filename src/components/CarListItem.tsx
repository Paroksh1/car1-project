
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
      className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-all card-hover"
    >
      <div className="relative md:w-48 h-40 overflow-hidden rounded-md">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
            isInWishlist ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={toggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">
              {car.year} · {car.transmission} · {car.mileage.toLocaleString()} miles
            </p>
          </div>
          <p className="font-semibold text-lg">{formatPrice(car.price)}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{car.fuel}</Badge>
          <Badge variant="outline">{car.seating} seats</Badge>
          <Badge variant="outline">{car.color}</Badge>
        </div>
        
        <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
          {car.description}
        </p>
        
        <div className="mt-auto pt-4">
          <Button variant="outline" className="w-full sm:w-auto">View Details</Button>
        </div>
      </div>
    </Link>
  );
};

export default CarListItem;
