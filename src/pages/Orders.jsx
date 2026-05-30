import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Package, ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

export default function Orders() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    apiFetch("/orders/my")
      .then((data) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
            BambooAnna
          </Link>
          <span className="text-muted-foreground">→</span>
          <span className="font-semibold">My Orders</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">No orders yet</p>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b bg-gray-50">
                  <div>
                    <p className="font-mono font-bold text-emerald-700">{order.orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-mono text-lg">₹{order.total.toLocaleString()}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> {order.status}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <p className="font-bold font-mono text-sm">
                        ₹{(Number(item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl text-sm">
                    <Package className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}