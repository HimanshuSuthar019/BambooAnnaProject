import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Leaf, ArrowLeft, ShoppingBag, Loader2, CreditCard, Truck } from "lucide-react";

const RAZORPAY_KEY = "rzp_test_Srzs400RimDaiT";

export default function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!user) { navigate("/login"); return null; }
  if (cartItems.length === 0) { navigate("/"); return null; }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    if (!form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast({ title: "Error", description: "Please fill all delivery details", variant: "destructive" });
      return false;
    }
    if (form.phone.length !== 10) {
      toast({ title: "Error", description: "Enter valid 10-digit phone number", variant: "destructive" });
      return false;
    }
    if (form.pincode.length !== 6) {
      toast({ title: "Error", description: "Enter valid 6-digit pincode", variant: "destructive" });
      return false;
    }
    return true;
  }

async function saveOrder(paymentInfo) {
  try {
    const token = localStorage.getItem("bamboo-token");
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        total: grandTotal,
        address: form,
        paymentMethod: paymentInfo.method,
        paymentId: paymentInfo.id,
      }),
    });
    const data = await res.json();
    clearCart();
    navigate("/order-success?id=" + data.orderId);
  } catch (err) {
    toast({ title: "Error", description: err.message, variant: "destructive" });
    setLoading(false);
  }
}

  function handleCOD() {
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      saveOrder({ method: "Cash on Delivery", id: "COD" });
    }, 800);
  }

  function handleRazorpay() {
    if (!validateForm()) return;
    setLoading(true);

    const options = {
      key: RAZORPAY_KEY,
      amount: grandTotal * 100, // Razorpay takes amount in paise
      currency: "INR",
      name: "BambooAnna",
      description: `Order of ${totalItems} item(s)`,
      image: "/public/favicon.png",
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#059669",
      },
      handler: function (response) {
        // Payment successful
        toast({ title: "Payment Successful! 🎉", description: "Your order has been placed" });
        saveOrder({
          method: "Razorpay",
          id: response.razorpay_payment_id,
        });
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment",
            variant: "destructive",
          });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      setLoading(false);
      toast({
        title: "Payment Failed",
        description: response.error.description,
        variant: "destructive",
      });
    });
    rzp.open();
    setLoading(false);
  }

  const shipping = totalPrice > 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
            <Leaf className="w-5 h-5" /> BambooAnna
          </Link>
          <span className="text-muted-foreground">→</span>
          <span className="font-semibold">Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to shopping
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Details */}
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
                  <Input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} className="h-11 rounded-xl" />
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
                  <Input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" maxLength={6} className="h-11 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <div
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === "razorpay" ? "border-emerald-600" : "border-gray-400"
                  }`}>
                    {paymentMethod === "razorpay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <CreditCard className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Pay Online</p>
                    <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking via Razorpay</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                </div>

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    paymentMethod === "cod" ? "border-emerald-600" : "border-gray-400"
                  }`}>
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold font-mono">
                      ₹{(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
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
                onClick={paymentMethod === "razorpay" ? handleRazorpay : handleCOD}
                disabled={loading}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl mt-4 text-base font-semibold"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                ) : paymentMethod === "razorpay" ? (
                  <><CreditCard className="w-4 h-4 mr-2" /> Pay ₹{grandTotal.toLocaleString()}</>
                ) : (
                  "Place Order (COD) →"
                )}
              </Button>

              {paymentMethod === "razorpay" && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  🔒 Secured by Razorpay
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
