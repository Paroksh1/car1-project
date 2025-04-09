
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Search, Heart, Sun, Moon, Menu, X, Github, Facebook, Twitter, Instagram } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navLinks = [
    { name: "Home", path: "/", icon: <Search className="w-4 h-4" /> },
    { name: "Wishlist", path: "/wishlist", icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      {/* Header */}
      <header className={`border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Car size={24} strokeWidth={2} />
            </div>
            <span className="text-gradient hidden sm:inline">CarSeekerHub</span>
            <span className="sm:hidden text-gradient">CSH</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.name === "Wishlist" ? (
                  <div className="relative">
                    {link.icon}
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-primary text-[10px] text-primary-foreground badge-glow">
                        {wishlistCount}
                      </Badge>
                    )}
                  </div>
                ) : (
                  link.icon
                )}
                <span>{link.name}</span>
              </Link>
            ))}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-full hover:bg-muted/50"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link 
              to="/wishlist" 
              className="p-2 rounded-full transition-colors relative text-muted-foreground hover:text-foreground"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-[10px] text-primary-foreground badge-glow">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-muted/50"
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
                        className="rounded-full hover:bg-muted/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <nav className="space-y-3">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path}
                          to={link.path} 
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            location.pathname === link.path 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-muted/50"
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                          {link.name === "Wishlist" && wishlistCount > 0 && (
                            <Badge className="ml-auto bg-primary text-primary-foreground">
                              {wishlistCount}
                            </Badge>
                          )}
                        </Link>
                      ))}
                      <button 
                        className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50"
                        onClick={() => {
                          toggleDarkMode();
                          closeMobileMenu();
                        }}
                      >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
      <footer className="border-t py-12 bg-muted/30 mt-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                  <Car size={18} strokeWidth={2} />
                </div>
                <span className="font-semibold text-lg">CarSeekerHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Find your perfect vehicle with our comprehensive car search platform.
              </p>
              <div className="flex space-x-4 pt-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">Wishlist</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Car Brands</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Toyota</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Honda</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">BMW</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mercedes-Benz</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><button onClick={toggleDarkMode} className="text-muted-foreground hover:text-primary transition-colors">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2025 CarSeekerHub. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Designed with 💙 for car enthusiasts everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
