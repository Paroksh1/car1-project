
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Search, Heart, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { WishlistManager } from "@/lib/wishlist";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Update wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      setWishlistCount(WishlistManager.getWishlistCount());
    };

    // Initial count
    updateWishlistCount();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'car-wishlist') {
        updateWishlistCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for internal updates
    const handleWishlistChange = () => {
      updateWishlistCount();
    };
    
    window.addEventListener('wishlistChange', handleWishlistChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, []);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast({
        title: "Light mode activated",
        description: "Your eyes will thank you during the day.",
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast({
        title: "Dark mode activated",
        description: "Your eyes will thank you at night.",
      });
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Car size={24} strokeWidth={2} />
            </div>
            <span className="text-gradient hidden sm:inline">CarSeekerHub</span>
            <span className="sm:hidden text-gradient">CSH</span>
          </Link>
          
          <div className="md:flex items-center gap-3 hidden">
            <Link 
              to="/" 
              className={`p-2 rounded-full transition-colors ${
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
              aria-label="Search cars"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link 
              to="/wishlist" 
              className={`p-2 rounded-full transition-colors relative ${
                location.pathname === "/wishlist" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-[10px] text-primary-foreground">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-full"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link 
              to="/wishlist" 
              className="p-2 rounded-full transition-colors relative text-muted-foreground"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-[10px] text-primary-foreground">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-6">
                      <Link to="/" className="flex items-center gap-2 text-xl font-bold" onClick={closeMobileMenu}>
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                          <Car size={18} strokeWidth={2} />
                        </div>
                        <span className="text-gradient">CarSeekerHub</span>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <nav className="space-y-4">
                      <Link 
                        to="/" 
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-muted/50"
                        onClick={closeMobileMenu}
                      >
                        <Search className="w-5 h-5" />
                        <span>Browse Cars</span>
                      </Link>
                      <Link 
                        to="/wishlist" 
                        className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-muted/50"
                        onClick={closeMobileMenu}
                      >
                        <Heart className="w-5 h-5" />
                        <span>Wishlist</span>
                        {wishlistCount > 0 && (
                          <Badge className="ml-auto bg-primary text-primary-foreground">
                            {wishlistCount}
                          </Badge>
                        )}
                      </Link>
                      <button 
                        className="w-full flex items-center gap-2 p-3 rounded-lg transition-colors hover:bg-muted/50"
                        onClick={() => {
                          toggleDarkMode();
                          closeMobileMenu();
                        }}
                      >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30 mt-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Car size={18} strokeWidth={2} />
              </div>
              <span className="font-semibold text-lg">CarSeekerHub</span>
            </div>
            
            <p className="text-muted-foreground text-sm">© 2025 CarSeekerHub. All rights reserved.</p>
            
            <div className="flex gap-6">
              <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
              <Link to="/wishlist" className="text-sm hover:text-primary transition-colors">Wishlist</Link>
              <button onClick={toggleDarkMode} className="text-sm hover:text-primary transition-colors">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
