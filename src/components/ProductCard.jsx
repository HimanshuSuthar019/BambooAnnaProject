import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Card className="group overflow-hidden border-border/50 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden relative bg-secondary/20">
        <img
          src={imgError ? "/images/products/bamboo-default.jpg" : product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="font-mono font-semibold text-primary">₹{product.price}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className={`w-full gap-2 transition-all duration-300 ${
            added
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-secondary text-foreground hover:bg-primary hover:text-white"
          }`}
          onClick={handleAddToCart}
        >
          {added ? (
            <><Check className="w-4 h-4" /> Added!</>
          ) : (
            <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}