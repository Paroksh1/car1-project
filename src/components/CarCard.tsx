
import React from "react";
import { Heart, Calendar, Fuel, Users, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { Link } from "react-router-dom";
import { WishlistManager } from "@/lib/wishlist";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    <Card className="overflow-hidden group card-hover bg-card border rounded-xl">
      <Link to={`/car/${car.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
              isInWishlist ? "text-red-500" : "text-muted-foreground"
            } shadow-md z-10`}
            onClick={toggleWishlist}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
            />
          </Button>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end z-10">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {car.year}
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1">
                <Fuel className="w-3 h-3" /> {car.fuel}
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1">
                <Users className="w-3 h-3" /> {car.seating}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <h3 className="font-bold text-lg line-clamp-1 hover:text-primary transition-colors cursor-pointer">{car.brand} {car.model}</h3>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-lg">{car.brand} {car.model}</h4>
                  <p className="text-sm text-muted-foreground">{car.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {car.year}
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" /> {car.transmission}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {car.color}
                    </Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-lg font-bold text-primary">{formatPrice(car.price)}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
            {car.transmission} · {car.mileage.toLocaleString()} miles
          </p>
          
          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm">
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CarCard;
