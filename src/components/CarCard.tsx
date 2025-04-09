
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { Link } from "react-router-dom";
import { WishlistManager } from "@/lib/wishlist";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CarCardProps {
  car: Car;
  onWishlistChange?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onWishlistChange }) => {
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
    <Card className="overflow-hidden card-hover">
      <Link to={`/car/${car.id}`}>
        <div className="relative h-48 overflow-hidden">
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
            <Heart
              className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
            />
          </Button>
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Badge variant="secondary" className="bg-black/70 text-white">
              {car.year}
            </Badge>
            <Badge variant="secondary" className="bg-black/70 text-white">
              {car.fuel}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
              <p className="text-sm text-muted-foreground">
                {car.transmission} · {car.mileage.toLocaleString()} miles
              </p>
            </div>
            <p className="font-semibold text-lg">{formatPrice(car.price)}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {car.seating} seats
            </Badge>
            <Badge variant="outline" className="text-xs">
              {car.color}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default CarCard;
