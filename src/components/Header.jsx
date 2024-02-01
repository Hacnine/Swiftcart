import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import logo from "../assets/logo.svg";
import minilogo from "../assets/minilogo-2.svg";
import SearchBar from "./product/SearchBar";
import Headroom from "react-headroom";
import { Badge, Link } from "@mui/material";
import {
  FavoriteBorderOutlined,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { useCartContext } from "../context/cartContext";
import Navbutton from "./Navbutton";

const Header = () => {
  let { cartProducts } = useCartContext();
  return (
    <div className="relative ">
      <div className="flex  items-center justify-center md:flex-row flex-col gap-7 shadow-md bg-header bg-center bg-no-repeat  shadow-slate-600  wrapper pt-10 pb-20 ">
        <div className="between md:w-fit w-full">
          <NavLink to="/">
            {/* <img src={logo} alt="" className="hidden lg:block h-12 py-1 " /> */}
            <img src={minilogo} alt="" className=" w-40 p-2" />
          </NavLink>
          <div className="block  md:hidden">
            <Navbutton />
          </div>
        </div>
        <SearchBar />

        <div className=" flex items-center justify-evenly gap-6">
          <NavLink to={"/cart"}>
            <Badge
              badgeContent={cartProducts.length}
              color="error"
              sx={{ color: "MediumOrchid" }}
            >
              <ShoppingCart />
            </Badge>
          </NavLink>

          <NavLink to={"/"}>
            <Badge
              badgeContent={4}
              color="error"
              sx={{ color: "MediumOrchid" }}
            >
              <FavoriteBorderOutlined />
            </Badge>
          </NavLink>

          <NavLink to={"/cart"}>
            <Person sx={{ color: "MediumOrchid" }} />
          </NavLink>

          <div className="min-lg:block md:block lg:hidden sm: hidden">
            <Navbutton />
          </div>
        </div>
      </div>

      <div className="  absolute -bottom-12 left-0 right-0 hidden min-lg:hidden lg:block ">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
