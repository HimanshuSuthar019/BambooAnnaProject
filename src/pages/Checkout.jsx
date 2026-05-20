import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Leaf, ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";

export default function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // Redirect if cart empty
  if (cartItems.length === 0) {
    navigate("/");
    return null;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePlaceOrder() {
    if (!form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("bamboo-orders") || "[]");
    const newOrder = {
      id: "ORD" + Date.now(),
      userId: user.id,
      items: cartItems,
      total: totalPrice,
      address: form,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      paymentMethod: "COD",
    };
    orders.push(newOrder);
    localStorage.setItem("bamboo-orders", JSON.stringify(orders));

    setTimeout(() => {
      clearCart();
      navigate("/order-success?id=" + newOrder.id);
    }, 1000);
  }

  const shipping = totalPrice > 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-emerald-700">
            <Leaf className="w-5 h-5" />
            <span className="font-bold text-lg">BambooAnna</span>
          </Link>
          <span className="text-muted-foreground">→</span>
          <span className="font-semibold text-foreground">Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to shopping
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Delivery Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Delivery Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Phone Number</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Full Address</Label>
                  <Input name="address" value={form.address} onChange={handleChange} placeholder="House no, Street, Area" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input name="city" value={form.city} onChange={handleChange} placeholder="City" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input name="state" value={form.state} onChange={handleChange} placeholder="State" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" className="h-11 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>
              <div className="flex items-center gap-3 p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Cash on Delivery</p>
                  <p className="text-sm text-emerald-700">Pay when your order arrives</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                💳 Online payment (Razorpay) coming soon
              </p>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold font-mono">₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-emerald-600">🎉 Free shipping on orders above ₹999!</p>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span className="font-mono text-emerald-700">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl mt-4 text-base font-semibold"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Placing Order...</>
                ) : "Place Order →"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}