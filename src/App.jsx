import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import PaymentMethod from "./pages/PaymentMethod";
import WishList from "./pages/WishList";
import Profile from "./pages/Profile";
import Account from "./pages/Account";

function App() {
  return (
    <div className="max-w-[1368px] mx-auto py-">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />

          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
