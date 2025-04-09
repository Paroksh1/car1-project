
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Search, Heart, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

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
          
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className={`p-2 rounded-full transition-colors ${
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link 
              to="/wishlist" 
              className={`p-2 rounded-full transition-colors ${
                location.pathname === "/wishlist" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
