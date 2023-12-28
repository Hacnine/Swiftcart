import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";

const Links = () => {
  const theme = {
    colors: {
      bg: "#F6F8FA",
      text:"rgba(29,29,29, .8)",
      white:"#fff",
      black:"#212529",
      helper:"#8490ff",
      footer_bg:"#8490ff"
    },
    media:{
      tab:"998px",
      mobile:"768px",
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleprodcut/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Links;
