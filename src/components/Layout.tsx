
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Search, Heart, Settings, Sun, Moon } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-primary">
            <Car size={28} strokeWidth={2} />
            <span>CarSeekerHub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/" className={location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className={location.pathname === "/wishlist" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>
              <Heart className="w-5 h-5" />
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
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
      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 CarSeekerHub. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
