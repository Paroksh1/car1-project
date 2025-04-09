
import React from "react";
import { Heart, Calendar, Fuel, Users, Check } from "lucide-react";
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
      className="flex flex-col md:flex-row gap-5 p-5 border rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-card relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative md:w-64 h-48 overflow-hidden rounded-lg">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
            isInWishlist ? "text-red-500" : "text-muted-foreground"
          } shadow-md z-10`}
          onClick={toggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
        
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {car.year}
          </Badge>
          <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1">
            <Fuel className="w-3 h-3" /> {car.fuel}
          </Badge>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {car.transmission}
              </span>
              <span>·</span>
              <span>{car.mileage.toLocaleString()} miles</span>
            </p>
          </div>
          <p className="font-bold text-xl text-primary bg-primary/5 px-3 py-1 rounded-full">
            {formatPrice(car.price)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" /> {car.fuel}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {car.seating} seats
          </Badge>
          <Badge variant="outline">{car.color}</Badge>
        </div>
        
        <p className="text-sm mt-3 line-clamp-2 text-muted-foreground">
          {car.description}
        </p>
        
        <div className="mt-auto pt-4">
          <Button 
            variant="default" 
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CarListItem;
