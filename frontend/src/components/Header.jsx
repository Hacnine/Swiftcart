import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import minilogo from "../assets/minilogo-2.svg";
import SearchBar from "./product/SearchBar";
import { selectCartItemCount } from "../store/slices/cartSlice";
import { selectWishlist } from "../store/slices/wishlistSlice";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { fetchCart } from "../store/slices/cartSlice";
import { fetchWishlist } from "../store/slices/wishlistSlice";
import AccountBadge from "./header/AccountBadge";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItems = useSelector(selectWishlist);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="max-w-[1368px] mx-auto relative">
      <div className="flex bg-darkpurple items-center justify-center md:flex-row flex-col gap-7 shadow-md shadow-slate-600 wrapper pt-10 pb-16">
        <div className="between md:w-fit w-full">
          <NavLink to="/">
            <img src={minilogo} alt="" className="md:w-40 w-24 p-2" />
          </NavLink>

          <div className="md:hidden block">
            <AccountBadge 
              cartCount={cartItemCount} 
              wishlistCount={wishlistItems.length} 
            />
          </div>
        </div>
        <SearchBar />

        <div className="hidden md:block">
          <AccountBadge 
            cartCount={cartItemCount} 
            wishlistCount={wishlistItems.length} 
          />
        </div>
      </div>

      <div className="absolute -bottom-12 left-0 right-0 hidden min-lg:hidden lg:block">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
