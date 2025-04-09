
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star, Image as ImageIcon, Info, Shield, Calendar, Gauge, Fuel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/types/car";
import WishlistButton from "./WishlistButton";

interface CarDetailsModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  onWishlistChange?: () => void;
}

const CarDetailsModal = ({ car, isOpen, onClose, onWishlistChange }: CarDetailsModalProps) => {
  const [selectedImage, setSelectedImage] = useState(car.images[0]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{car.brand} {car.model}</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                {car.year} • {car.mileage.toLocaleString()} miles
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <WishlistButton 
                car={car} 
                onWishlistChange={onWishlistChange} 
              />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {car.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 h-16 w-24 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === image
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${car.brand} ${car.model} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                  <p className="text-muted-foreground">{car.year} • {car.transmission}</p>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(car.price)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                  <Fuel className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{car.fuel}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Year</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mileage</p>
                    <p className="font-medium">{car.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Description
                </h4>
                <p className="text-muted-foreground text-sm">{car.description}</p>
              </div>
              
              {car.features && car.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" /> Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/30">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm button-shine">
                  Contact Seller
                </Button>
                <WishlistButton 
                  car={car} 
                  variant="button" 
                  onWishlistChange={onWishlistChange} 
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
