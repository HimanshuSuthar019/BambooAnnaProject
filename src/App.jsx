
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartDrawer } from "./components/CartDrawer";
const Admin = lazy(() => import("@/pages/Admin"));

const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const Orders = lazy(() => import("@/pages/Orders"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-success" component={OrderSuccess} />
        <Route path="/orders" component={Orders} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
        <CartProvider>
          <Toaster />
          <Router />
          <CartDrawer />
        </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


// import { Switch, Route } from "wouter";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./lib/queryClient";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Home from "@/pages/Home";
// import NotFound from "@/pages/NotFound";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;
