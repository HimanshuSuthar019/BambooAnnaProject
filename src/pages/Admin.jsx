
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, Link } from "wouter";
import {
  ShoppingBag, Users, Package, TrendingUp,
  Plus, Edit, Trash2, X, Check, ArrowLeft,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API = "http://localhost:5000/api";

export default function Admin() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", description: "", imageUrl: "", category: ""
  });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (user.role !== "admin") { navigate("/"); return; }
    loadData();
  }, [user]);

  async function loadData() {
    try {
      const token = localStorage.getItem("bamboo-token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [ordersRes, productsRes, usersRes] = await Promise.all([
        fetch(`${API}/orders/all`, { headers }),
        fetch(`${API}/products`),
        fetch(`${API}/auth/users`, { headers }),
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const usersData = usersRes.ok ? await usersRes.json() : [];

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setUsers(Array.isArray(usersData) ? usersData.filter((u) => u.role !== "admin") : []);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }

  async function handleDeleteProduct(id) {
    const token = localStorage.getItem("bamboo-token");
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast({ title: "Product deleted" });
    loadData();
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      toast({ title: "Error", description: "Fill all required fields", variant: "destructive" });
      return;
    }
    const token = localStorage.getItem("bamboo-token");
    await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: "", price: "", description: "", imageUrl: "", category: "" });
    setShowAddProduct(false);
    toast({ title: "Product added! ✅" });
    loadData();
  }

  async function handleUpdateProduct() {
    const token = localStorage.getItem("bamboo-token");
    await fetch(`${API}/products/${editingProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingProduct),
    });
    setEditingProduct(null);
    toast({ title: "Product updated! ✅" });
    loadData();
  }

  async function updateOrderStatus(orderId, status) {
    const token = localStorage.getItem("bamboo-token");
    await fetch(`${API}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    toast({ title: `Order marked as ${status}` });
    loadData();
  }

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "bg-emerald-500" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Total Users", value: totalUsers, icon: Users, color: "bg-purple-500" },
    { label: "Total Products", value: totalProducts, icon: Package, color: "bg-orange-500" },
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex-col fixed h-full z-10 hidden md:flex">
        <div className="p-6 border-b border-emerald-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">B</div>
            <span className="font-bold text-lg">BambooAnna</span>
          </Link>
          <p className="text-emerald-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-300 hover:bg-emerald-800 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-800">
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-300 hover:bg-emerald-800 hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
              Back to Store
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-foreground capitalize">{activeTab}</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
              A
            </div>
            <span className="text-sm font-medium hidden sm:block">Admin</span>
          </div>
        </div>

        <div className="p-6">

          {/* Mobile Tabs */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-muted-foreground border"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm">
                    <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="p-5 border-b flex items-center justify-between">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-sm text-emerald-600 hover:underline">
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Order ID</th>
                        <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                        <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Payment</th>
                        <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="border-t hover:bg-gray-50">
                          <td className="px-5 py-3 font-mono text-sm text-emerald-700">{order.orderId}</td>
                          <td className="px-5 py-3 font-bold font-mono">₹{order.total.toLocaleString()}</td>
                          <td className="px-5 py-3 text-sm">{order.paymentMethod}</td>
                          <td className="px-5 py-3">
                            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No orders yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between p-5 border-b bg-gray-50 gap-3">
                      <div>
                        <p className="font-mono font-bold text-emerald-700">{order.orderId}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric"
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold font-mono">₹{order.total.toLocaleString()}</p>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-3 items-center">
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <p className="text-sm flex-1">{item.name} × {item.quantity}</p>
                          <p className="text-sm font-bold font-mono">₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                      <div className="pt-2 text-xs text-muted-foreground border-t">
                        📍 {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </div>

              {showAddProduct && (
                <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Add New Product</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Name *</Label>
                      <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product name" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="499" className="rounded-xl" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Description *</Label>
                      <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} placeholder="https://..." className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Kitchen, Bathroom..." className="rounded-xl" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={handleAddProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
                      <Check className="w-4 h-4" /> Add Product
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)} className="rounded-xl gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    {editingProduct?._id === product._id ? (
                      <div className="p-4 space-y-3">
                        <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="rounded-xl" placeholder="Name" />
                        <Input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="rounded-xl" placeholder="Price" />
                        <Input value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="rounded-xl" placeholder="Description" />
                        <Input value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} className="rounded-xl" placeholder="Image URL" />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdateProduct} className="flex-1 bg-emerald-600 text-white rounded-xl text-sm gap-1">
                            <Check className="w-3 h-3" /> Save
                          </Button>
                          <Button variant="outline" onClick={() => setEditingProduct(null)} className="flex-1 rounded-xl text-sm gap-1">
                            <X className="w-3 h-3" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <p className="font-bold truncate">{product.name}</p>
                          <p className="text-emerald-600 font-mono font-bold">₹{product.price}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                          <div className="flex gap-2 mt-3">
                            <Button onClick={() => setEditingProduct(product)} variant="outline" className="flex-1 rounded-xl text-sm gap-1 h-9">
                              <Edit className="w-3 h-3" /> Edit
                            </Button>
                            <Button onClick={() => handleDeleteProduct(product._id)} variant="outline" className="flex-1 rounded-xl text-sm gap-1 h-9 text-red-500 hover:text-red-700 hover:border-red-300">
                              <Trash2 className="w-3 h-3" /> Delete
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg">Registered Users ({users.length})</h3>
              </div>
              {users.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">No users registered yet</div>
              ) : (
                <div className="divide-y">
                  {users.map((u) => (
                    <div key={u._id} className="flex items-center gap-4 p-5">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{u.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {u.role || "user"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useLocation, Link } from "wouter";
// import { PRODUCTS } from "@/lib/schema";
// import {
//   ShoppingBag, Users, Package, TrendingUp,
//   Plus, Edit, Trash2, X, Check, ArrowLeft,
//   IndianRupee, Eye
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// export default function Admin() {
//   const { user } = useAuth();
//   const [, navigate] = useLocation();
//   const { toast } = useToast();

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: "", price: "", description: "", imageUrl: "", category: ""
//   });

//   useEffect(() => {
//     if (!user) { navigate("/login"); return; }
//     if (user.role !== "admin") { navigate("/"); return; }
//     loadData();
//   }, [user]);

//  async function loadData() {
//   try {
//     const token = localStorage.getItem("bamboo-token");
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };

//     const [ordersRes, productsRes] = await Promise.all([
//       fetch("http://localhost:5000/api/orders/all", { headers }),
//       fetch("http://localhost:5000/api/products"),
//     ]);

//     const ordersData = await ordersRes.json();
//     const productsData = await productsRes.json();
//     const allUsers = JSON.parse(localStorage.getItem("bamboo-users") || "[]");

//     setOrders(Array.isArray(ordersData) ? ordersData : []);
//     setProducts(Array.isArray(productsData) ? productsData : []);
//     setUsers(allUsers.filter((u) => u.role !== "admin"));
//   } catch (err) {
//     console.error("Error loading data:", err);
//   }
// }

//   function saveProducts(updated) {
//     localStorage.setItem("bamboo-products", JSON.stringify(updated));
//     setProducts(updated);
//   }

//   function handleDeleteProduct(id) {
//     const updated = products.filter((p) => p.id !== id);
//     saveProducts(updated);
//     toast({ title: "Product deleted" });
//   }

//   function handleAddProduct() {
//     if (!newProduct.name || !newProduct.price || !newProduct.description) {
//       toast({ title: "Error", description: "Fill all required fields", variant: "destructive" });
//       return;
//     }
//     const product = {
//       ...newProduct,
//       id: Date.now(),
//       price: newProduct.price.toString(),
//     };
//     const updated = [...products, product];
//     saveProducts(updated);
//     setNewProduct({ name: "", price: "", description: "", imageUrl: "", category: "" });
//     setShowAddProduct(false);
//     toast({ title: "Product added! ✅" });
//   }

//   function handleUpdateProduct() {
//     const updated = products.map((p) =>
//       p.id === editingProduct.id ? editingProduct : p
//     );
//     saveProducts(updated);
//     setEditingProduct(null);
//     toast({ title: "Product updated! ✅" });
//   }

//   function updateOrderStatus(orderId, status) {
//     const all = JSON.parse(localStorage.getItem("bamboo-orders") || "[]");
//     const updated = all.map((o) => o.id === orderId ? { ...o, status } : o);
//     localStorage.setItem("bamboo-orders", JSON.stringify(updated));
//     loadData();
//     toast({ title: `Order marked as ${status}` });
//   }

//   // Stats
//   const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
//   const totalOrders = orders.length;
//   const totalUsers = users.length;
//   const totalProducts = products.length;

//   const stats = [
//     { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "bg-emerald-500" },
//     { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "bg-blue-500" },
//     { label: "Total Users", value: totalUsers, icon: Users, color: "bg-purple-500" },
//     { label: "Total Products", value: totalProducts, icon: Package, color: "bg-orange-500" },
//   ];

//   const tabs = [
//     { id: "dashboard", label: "Dashboard", icon: TrendingUp },
//     { id: "orders", label: "Orders", icon: ShoppingBag },
//     { id: "products", label: "Products", icon: Package },
//     { id: "users", label: "Users", icon: Users },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Sidebar */}
//       <aside className="w-64 bg-emerald-900 text-white flex flex-col fixed h-full z-10 hidden md:flex">
//         <div className="p-6 border-b border-emerald-800">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">B</div>
//             <span className="font-bold text-lg">BambooAnna</span>
//           </Link>
//           <p className="text-emerald-400 text-xs mt-1">Admin Panel</p>
//         </div>

//         <nav className="flex-1 p-4 space-y-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                 activeTab === tab.id
//                   ? "bg-emerald-600 text-white"
//                   : "text-emerald-300 hover:bg-emerald-800 hover:text-white"
//               }`}
//             >
//               <tab.icon className="w-5 h-5" />
//               {tab.label}
//             </button>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-emerald-800">
//           <Link href="/">
//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-300 hover:bg-emerald-800 hover:text-white transition-all">
//               <ArrowLeft className="w-5 h-5" />
//               Back to Store
//             </button>
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 md:ml-64">
//         {/* Top Bar */}
//         <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
//           <h1 className="text-xl font-bold text-foreground capitalize">{activeTab}</h1>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
//               A
//             </div>
//             <span className="text-sm font-medium hidden sm:block">Admin</span>
//           </div>
//         </div>

//         <div className="p-6">

//           {/* Mobile Tabs */}
//           <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
//                   activeTab === tab.id
//                     ? "bg-emerald-600 text-white"
//                     : "bg-white text-muted-foreground border"
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Dashboard Tab */}
//           {activeTab === "dashboard" && (
//             <div className="space-y-6">
//               {/* Stats Grid */}
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 {stats.map((stat) => (
//                   <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm">
//                     <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
//                       <stat.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                     <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Recent Orders */}
//               <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
//                 <div className="p-5 border-b flex items-center justify-between">
//                   <h3 className="font-bold text-lg">Recent Orders</h3>
//                   <button onClick={() => setActiveTab("orders")} className="text-sm text-emerald-600 hover:underline">
//                     View all
//                   </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Order ID</th>
//                         <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
//                         <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Payment</th>
//                         <th className="text-left px-5 py-3 text-sm font-semibold text-muted-foreground">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.slice(0, 5).map((order) => (
//                         <tr key={order.id} className="border-t hover:bg-gray-50">
//                           <td className="px-5 py-3 font-mono text-sm text-emerald-700">{order.id}</td>
//                           <td className="px-5 py-3 font-bold font-mono">₹{order.total.toLocaleString()}</td>
//                           <td className="px-5 py-3 text-sm">{order.paymentMethod}</td>
//                           <td className="px-5 py-3">
//                             <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
//                               {order.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                       {orders.length === 0 && (
//                         <tr>
//                           <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No orders yet</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Orders Tab */}
//           {activeTab === "orders" && (
//             <div className="space-y-4">
//               {orders.length === 0 ? (
//                 <div className="bg-white rounded-2xl p-12 text-center border">
//                   <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
//                   <p className="text-xl font-semibold text-muted-foreground">No orders yet</p>
//                 </div>
//               ) : (
//                 orders.map((order) => (
//                   <div key={order.id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
//                     <div className="flex flex-wrap items-center justify-between p-5 border-b bg-gray-50 gap-3">
//                       <div>
//                         <p className="font-mono font-bold text-emerald-700">{order.id}</p>
//                         <p className="text-sm text-muted-foreground">
//                           {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric", month: "long", year: "numeric"
//                           })}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <p className="font-bold font-mono">₹{order.total.toLocaleString()}</p>
//                         <select
//                           value={order.status}
//                           onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                           className="text-sm border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                         >
//                           <option value="confirmed">Confirmed</option>
//                           <option value="processing">Processing</option>
//                           <option value="shipped">Shipped</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="p-5 space-y-2">
//                       {order.items.map((item) => (
//                         <div key={item.id} className="flex gap-3 items-center">
//                           <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
//                           <p className="text-sm flex-1">{item.name} × {item.quantity}</p>
//                           <p className="text-sm font-bold font-mono">₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
//                         </div>
//                       ))}
//                       <div className="pt-2 text-xs text-muted-foreground border-t">
//                         📍 {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}

//           {/* Products Tab */}
//           {activeTab === "products" && (
//             <div className="space-y-4">
//               <div className="flex justify-end">
//                 <Button
//                   onClick={() => setShowAddProduct(true)}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
//                 >
//                   <Plus className="w-4 h-4" /> Add Product
//                 </Button>
//               </div>

//               {/* Add Product Form */}
//               {showAddProduct && (
//                 <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm">
//                   <h3 className="font-bold text-lg mb-4">Add New Product</h3>
//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label>Product Name *</Label>
//                       <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product name" className="rounded-xl" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Price (₹) *</Label>
//                       <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="499" className="rounded-xl" />
//                     </div>
//                     <div className="space-y-2 sm:col-span-2">
//                       <Label>Description *</Label>
//                       <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description" className="rounded-xl" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Image URL</Label>
//                       <Input value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} placeholder="https://..." className="rounded-xl" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Category</Label>
//                       <Input value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Kitchen, Bathroom..." className="rounded-xl" />
//                     </div>
//                   </div>
//                   <div className="flex gap-3 mt-4">
//                     <Button onClick={handleAddProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
//                       <Check className="w-4 h-4" /> Add Product
//                     </Button>
//                     <Button variant="outline" onClick={() => setShowAddProduct(false)} className="rounded-xl gap-2">
//                       <X className="w-4 h-4" /> Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {/* Products Grid */}
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {products.map((product) => (
//                   <div key={product.id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
//                     {editingProduct?.id === product.id ? (
//                       <div className="p-4 space-y-3">
//                         <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="rounded-xl" placeholder="Name" />
//                         <Input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="rounded-xl" placeholder="Price" />
//                         <Input value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="rounded-xl" placeholder="Description" />
//                         <Input value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} className="rounded-xl" placeholder="Image URL" />
//                         <div className="flex gap-2">
//                           <Button onClick={handleUpdateProduct} className="flex-1 bg-emerald-600 text-white rounded-xl text-sm gap-1">
//                             <Check className="w-3 h-3" /> Save
//                           </Button>
//                           <Button variant="outline" onClick={() => setEditingProduct(null)} className="flex-1 rounded-xl text-sm gap-1">
//                             <X className="w-3 h-3" /> Cancel
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
//                         <div className="p-4">
//                           <p className="font-bold truncate">{product.name}</p>
//                           <p className="text-emerald-600 font-mono font-bold">₹{product.price}</p>
//                           <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
//                           <div className="flex gap-2 mt-3">
//                             <Button onClick={() => setEditingProduct(product)} variant="outline" className="flex-1 rounded-xl text-sm gap-1 h-9">
//                               <Edit className="w-3 h-3" /> Edit
//                             </Button>
//                             <Button onClick={() => handleDeleteProduct(product.id)} variant="outline" className="flex-1 rounded-xl text-sm gap-1 h-9 text-red-500 hover:text-red-700 hover:border-red-300">
//                               <Trash2 className="w-3 h-3" /> Delete
//                             </Button>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Users Tab */}
//           {activeTab === "users" && (
//             <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
//               <div className="p-5 border-b">
//                 <h3 className="font-bold text-lg">Registered Users ({users.length})</h3>
//               </div>
//               {users.length === 0 ? (
//                 <div className="p-12 text-center text-muted-foreground">No users registered yet</div>
//               ) : (
//                 <div className="divide-y">
//                   {users.map((u) => (
//                     <div key={u.id} className="flex items-center gap-4 p-5">
//                       <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
//                         {u.name?.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-semibold truncate">{u.name}</p>
//                         <p className="text-sm text-muted-foreground truncate">{u.email}</p>
//                       </div>
//                       <div className="text-right flex-shrink-0">
//                         <p className="text-xs text-muted-foreground">
//                           {new Date(u.createdAt).toLocaleDateString("en-IN")}
//                         </p>
//                         <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
//                           {u.role || "user"}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }