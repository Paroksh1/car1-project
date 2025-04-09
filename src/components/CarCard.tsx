
import React from "react";
import { Calendar, Fuel, Users, Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import WishlistButton from "./WishlistButton";

interface CarCardProps {
  car: Car;
  onWishlistChange?: () => void;
  onClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onWishlistChange, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card className="overflow-hidden group card-float bg-card border rounded-xl shadow-md">
      <div className="block cursor-pointer" onClick={handleCardClick}>
        <div className="relative h-48 overflow-hidden img-hover-zoom">
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          <WishlistButton 
            car={car} 
            onWishlistChange={onWishlistChange} 
            className="absolute top-3 right-3 z-10"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end z-10">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1 font-normal">
                <Calendar className="w-3 h-3" /> {car.year}
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1 font-normal">
                <Fuel className="w-3 h-3" /> {car.fuel}
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white border-0 flex items-center gap-1 font-normal">
                <Users className="w-3 h-3" /> {car.seating}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">{car.brand} {car.model}</h3>
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
            <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 group shadow-sm button-shine font-medium">
              View Details
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
