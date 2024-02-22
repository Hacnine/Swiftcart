import { Badge } from "@mui/material";
import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Navbutton from "../Navbutton";
import { MdMenu } from "react-icons/md";
import NavbarPopup from "../NavbarPopup";
import NavLinks from "../NavLinks";
import { useCartContext } from "../../context/cartContext";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const AccountBadge = () => {
  let { cartProducts, wishlistProducts } = useCartContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex  items-center justify-evenly gap-6">
      {/* <FiSearch
        className=" font-extrabold  text-2xl mt-1 rounded cursor-pointer "
        style={{ color: "MediumOrchid" }}
      /> */}
      <NavLink to={"/cart"}>
        <Badge
          badgeContent={cartProducts.length}
          color="error"
          sx={{ color: "MediumOrchid" }}
        >
          <BsCart4 className=" text-2xl" />
        </Badge>
      </NavLink>

      <NavLink to={"/wishlist"}>
        <Badge
          badgeContent={wishlistProducts.length}
          color="error"
          sx={{ color: "MediumOrchid" }}
        >
          <GrFavorite className=" text-2xl" />
        </Badge>
      </NavLink>

      <NavLink to={"/account"}>
        <IoPersonOutline
          style={{ color: "MediumOrchid" }}
          className=" text-2xl"
        />
      </NavLink>

      <MdMenu
        className="block md:hidden text-2xl text-[#BA55D3] cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <NavbarPopup open={open} onClose={() => setOpen(false)}>
        <NavLinks className={"flex-col gap-10 "} />
      </NavbarPopup>
    </div>
  );
};

export default AccountBadge;
