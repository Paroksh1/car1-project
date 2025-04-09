
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star, Image as ImageIcon, Info, Shield, Calendar, Gauge, Fuel, MapPin, Phone, Inbox, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < car.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(car.images[newIndex]);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(car.images[newIndex]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-xl animate-scale-in">
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
                className="rounded-full hover:bg-muted/50"
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
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden img-hover-zoom">
                <img
                  src={selectedImage}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                
                {car.images.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
                      onClick={nextImage}
                      disabled={currentImageIndex === car.images.length - 1}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                      <div className="bg-black/30 rounded-full px-3 py-1 text-white text-xs">
                        {currentImageIndex + 1} / {car.images.length}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {car.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 h-16 w-24 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === image
                          ? "border-primary"
                          : "border-transparent hover:border-primary/30"
                      }`}
                      onClick={() => {
                        setSelectedImage(image);
                        setCurrentImageIndex(index);
                      }}
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
                <div className="text-2xl font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl">
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
                  <Info className="w-4 h-4 text-primary" /> Description
                </h4>
                <p className="text-muted-foreground text-sm">{car.description}</p>
              </div>
              
              {car.features && car.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" /> Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/30 font-normal">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm button-shine group font-medium flex justify-center items-center">
                  <Phone className="w-4 h-4 mr-2" /> Contact Seller
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex justify-center items-center">
                    <Inbox className="w-4 h-4 mr-2" /> Message
                  </Button>
                  <Button variant="outline" className="flex justify-center items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Get Directions
                  </Button>
                </div>
                
                <WishlistButton 
                  car={car} 
                  variant="button" 
                  onWishlistChange={onWishlistChange} 
                  className="w-full"
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
