import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";

export function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        // alert('Clicked!'); // this is tempororly
        setIsCartOpen(true);
      }}
      style={{
        position: "relative",
        padding: "8px",
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ShoppingCart style={{ width: 24, height: 24, color: "#059669" }} />
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            background: "#059669",
            color: "white",
            fontSize: "0.7rem",
            fontWeight: 700,
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {

  const [, navigate] = useLocation();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        pointerEvents: isCartOpen ? "all" : "none",
      }}
    >
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          opacity: isCartOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          maxWidth: "420px",
          height: "100vh",
          background: "white",
          display: "flex",
          flexDirection: "column",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag style={{ width: 20, height: 20, color: "#059669" }} />
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Your Cart</h2>
            {totalItems > 0 && (
              <span style={{ background: "#d1fae5", color: "#065f46", fontSize: "0.8rem", fontWeight: 600, padding: "2px 10px", borderRadius: 999 }}>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            style={{ padding: "8px", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {cartItems.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px", textAlign: "center" }}>
              <div style={{ width: 80, height: 80, background: "#ecfdf5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShoppingCart style={{ width: 40, height: 40, color: "#6ee7b7" }} />
              </div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Your cart is empty</p>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>Add some bamboo products!</p>
              <Button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "12px", padding: "16px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "8px", flexShrink: 0, background: "white" }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                  <p style={{ color: "#059669", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 8px", fontFamily: "monospace" }}>₹{item.price}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Minus style={{ width: 12, height: 12 }} />
                    </button>
                    <span style={{ width: 28, textAlign: "center", fontWeight: 600, fontSize: "0.9rem" }}>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus style={{ width: 12, height: 12 }} />
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "#9ca3af" }}
                  >
                    <Trash2 style={{ width: 16, height: 16 }} />
                  </button>
                  <p style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.9rem", margin: 0 }}>
                    ₹{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "24px", borderTop: "1px solid #e5e7eb", background: "white", flexShrink: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#6b7280" }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: "1.3rem", fontFamily: "monospace" }}>
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.75rem", margin: 0 }}>
              Taxes and shipping calculated at checkout
            </p>
            <Button
              type="button"
              onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-base font-semibold"
            >
              Proceed to Checkout →
            </Button>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "0.9rem", padding: "4px" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}