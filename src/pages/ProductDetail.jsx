import { useParams, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShoppingBag, Check, ArrowLeft, Leaf } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { data: products = [], isLoading } = useProducts();

  // Find by MongoDB _id or numeric id
  const product = products.find((p) =>
    p._id === id || String(p.id) === id
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-muted-foreground">Product not found.</p>
        <Button onClick={() => navigate("/")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          ← Back to Home
        </Button>
      </div>
    );
  }

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  // Related products (same category, exclude current)
  const related = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-emerald-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-secondary/20 aspect-square">
            <img
              src={imgError ? "/images/products/bamboo-default.jpg" : product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 pt-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full w-fit">
              <Leaf className="w-3.5 h-3.5" />
              {product.category || "Eco Friendly"}
            </span>

            <h1 className="text-4xl font-display font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            <p className="text-3xl font-mono font-bold text-emerald-600">
              ₹{Number(product.price).toLocaleString()}
            </p>

            <p className="text-muted-foreground leading-relaxed text-base">
              {product.description}
            </p>

            <ul className="space-y-2">
              {["100% Natural Bamboo", "Eco-friendly & Sustainable", "Durable & Long-lasting", "Biodegradable"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="border-t pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className={`h-14 text-base font-semibold rounded-xl gap-2 transition-all duration-300 ${
                  added
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Add to Cart — ₹{(Number(product.price) * quantity).toLocaleString()}</>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="cursor-pointer group rounded-2xl overflow-hidden border border-border/50 bg-white hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary/20">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="font-mono font-bold text-emerald-600">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}