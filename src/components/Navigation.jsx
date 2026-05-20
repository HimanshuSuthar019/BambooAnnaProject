import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { User, LogOut, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  function handleLogout() {
  logout();
  navigate("/");
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-emerald-200 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-emerald-500/20 rounded-full group-hover:bg-emerald-500/30 transition-colors">
              <Leaf
                className={cn("w-6 h-6", isScrolled ? "text-emerald-700" : "text-emerald-300")}
              />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight",
                isScrolled ? "text-emerald-900" : "text-white"
              )}
            >
              BambooAnna
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors underline-offset-4 decoration-2",
                  isScrolled
                    ? "text-emerald-700 hover:text-emerald-900 decoration-emerald-400"
                    : "text-white/90 hover:text-emerald-200 decoration-emerald-300"
                )}
              >
                {link.label}
              </a>
            ))}

            <CartIcon />

            {user ? (
    <div className="flex items-center gap-3">
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
        isScrolled ? "bg-emerald-50 text-emerald-800" : "bg-white/10 text-white"
      )}>
        <User className="w-4 h-4" />
        <span>{user.name.split(" ")[0]}</span>
      </div>
      <button
        onClick={handleLogout}
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          isScrolled ? "text-red-500 hover:text-red-700" : "text-white/70 hover:text-white"
        )}
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  ) : (
    <Button
      onClick={() => navigate("/login")}
      className={cn(
        "rounded-full px-6 font-semibold",
        isScrolled
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : "bg-white/90 text-emerald-800 hover:bg-white"
      )}
    >
      Login
    </Button>
  )}

            <Button
              className={cn(
                "rounded-full px-6 font-semibold",
                isScrolled
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-white/90 text-emerald-800 hover:bg-white"
              )}
            >
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-emerald-800 hover:bg-emerald-100" : "text-white hover:bg-white/20"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-200 shadow-xl">
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-emerald-800 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <CartIcon />
            <Button
              className="w-full max-w-xs mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
