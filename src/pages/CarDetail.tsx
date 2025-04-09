import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Fuel, Users, Calendar, Gauge, Zap } from "lucide-react";
import { Car } from "@/types/car";
import { carsAPI } from "@/lib/car-data";
import { WishlistManager } from "@/lib/wishlist";
import { useToast } from "@/hooks/use-toast";

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        if (!id) return;
        
        const carId = parseInt(id);
        const carData = carsAPI.getCarById(carId);
        
        if (carData) {
          setCar(carData);
          setIsInWishlist(WishlistManager.isInWishlist(carData.id));
        } else {
          // Car not found
          toast({
            title: "Car not found",
            description: "The car you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast({
          title: "Error",
          description: "Failed to load car details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate, toast]);

  const toggleWishlist = () => {
    if (!car) return;
    
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
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-48 bg-muted rounded mb-8"></div>
            <div className="h-72 w-full bg-muted rounded-lg mb-6"></div>
            <div className="h-4 w-full bg-muted rounded mb-2"></div>
            <div className="h-4 w-full bg-muted rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <p className="text-muted-foreground mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")}>Back to Cars</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back to cars
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={car.images[activeImage]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-16 rounded overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
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
          
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">
                  {car.brand} {car.model}
                </h1>
                <p className="text-lg text-muted-foreground">{car.year}</p>
              </div>
              <div className="text-2xl font-bold">
                {formatPrice(car.price)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{car.fuel}</Badge>
              <Badge variant="secondary">{car.transmission}</Badge>
              <Badge variant="secondary">{car.color}</Badge>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel</p>
                  <p className="font-medium">{car.fuel}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Seating</p>
                  <p className="font-medium">{car.seating} People</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{car.mileage.toLocaleString()} mi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{car.description}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button className="flex-1">Contact Seller</Button>
              <Button
                variant={isInWishlist ? "destructive" : "outline"}
                onClick={toggleWishlist}
                className="flex items-center gap-2"
              >
                <Heart className={isInWishlist ? "fill-current" : ""} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetail;
