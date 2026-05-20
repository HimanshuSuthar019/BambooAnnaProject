import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id");
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("bamboo-orders") || "[]");
      const found = orders.find((o) => o.id === orderId);
      setOrder(found);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for shopping with BambooAnna 🌿
        </p>

        {order && (
          <div className="bg-emerald-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-bold text-emerald-700">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span className="font-semibold">{order.items.length} products</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold font-mono text-emerald-700">₹{order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-semibold">Cash on Delivery</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mb-6 text-left">
          <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            Your order will be delivered in <strong>3-5 business days</strong>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/orders">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View My Orders
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full rounded-xl h-11">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}