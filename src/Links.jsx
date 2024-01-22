import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
// import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";

const Links = () => {

  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
};

export default Links;
