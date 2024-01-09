import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Navbutton from "./Navbutton";
import { MdMenu } from "react-icons/md";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div>
      <div className="hidden sm:block bg-white">
        <NavLinks/>
      </div>
      <div className="block sm:hidden">
      <Navbutton/>
      </div>
    </div>
  );
};

export default Navbar;
