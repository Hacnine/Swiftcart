import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import logo from "../assets/logo.svg";
import minilogo from "../assets/minilogo.svg";
import SearchBar from "./product/SearchBar";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-slate-200  wrapper py-2">
      <NavLink to="/">
        <img src={logo} alt="" className="hidden lg:block h-12 py-1 " />
        <img src={minilogo} alt="" className="block lg:hidden h-16 p-2" />
      </NavLink>
      <SearchBar />
      <Navbar />
    </div>
  );
};

export default Header;
