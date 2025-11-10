import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, selectIsAuthenticated, selectUserRole } from "./store/slices/authSlice";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import WishList from "./pages/WishList";
import Checkout from "./pages/Checkout";
import PaymentMethod from "./pages/PaymentMethod";
import Profile from "./pages/Profile";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorOrders from "./pages/vendor/VendorOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/singleproduct/:id",
    element: <SingleProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <WishList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-method",
    element: (
      <ProtectedRoute>
        <PaymentMethod />
      </ProtectedRoute>
    ),
  },
  // Vendor Routes
  {
    path: "/vendor/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['SELLER']}>
        <VendorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vendor/orders",
    element: (
      <ProtectedRoute allowedRoles={['SELLER']}>
        <VendorOrders />
      </ProtectedRoute>
    ),
  },
  // Admin Routes
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/vendors",
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminVendors />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Load user on app mount if token exists
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
