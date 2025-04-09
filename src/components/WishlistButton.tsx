
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistManager } from "@/lib/wishlist";
import { Car } from "@/types/car";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  car: Car;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
  className?: string;
  onWishlistChange?: () => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  car,
  variant = "icon",
  size = "md",
  className,
  onWishlistChange
}) => {
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Check if car is in wishlist
    setIsInWishlist(WishlistManager.isInWishlist(car.id));
  }, [car.id]);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Start animation
    setIsAnimating(true);
    
    // Set timeout to match animation duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
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
        variant: "default"
      });
    }
    
    // Notify parent component about the change
    if (onWishlistChange) {
      onWishlistChange();
    }
    
    // Dispatch global event for Layout to update wishlist count
    window.dispatchEvent(new Event('wishlistChange'));
  };

  // Icon sizes based on the size prop
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  
  // Button sizes based on variant and size props
  const buttonSizes = {
    icon: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12"
    },
    button: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-5"
    }
  };
  
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          `rounded-full bg-white/90 backdrop-blur-sm hover:bg-white 
          ${isInWishlist ? "text-red-500" : "text-muted-foreground"} 
          shadow-md transition-all`,
          isAnimating && isInWishlist ? "scale-110" : "",
          isAnimating && !isInWishlist ? "scale-90" : "",
          buttonSizes.icon[size],
          className
        )}
        onClick={toggleWishlist}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            iconSizes[size],
            isInWishlist ? "fill-current" : "",
            "transition-all"
          )}
        />
      </Button>
    );
  }
  
  return (
    <Button
      variant={isInWishlist ? "destructive" : "outline"}
      className={cn(
        "gap-2 transition-all",
        isAnimating && isInWishlist ? "scale-105" : "",
        isAnimating && !isInWishlist ? "scale-95" : "",
        buttonSizes.button[size],
        className
      )}
      onClick={toggleWishlist}
    >
      <Heart
        className={cn(
          iconSizes[size],
          isInWishlist ? "fill-current" : "",
          "transition-all"
        )}
      />
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default WishlistButton;
