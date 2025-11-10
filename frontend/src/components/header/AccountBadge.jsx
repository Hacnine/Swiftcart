import { Badge } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Navbutton from "../Navbutton";
import { MdMenu } from "react-icons/md";
import NavbarPopup from "../NavbarPopup";
import NavLinks from "../NavLinks";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

const AccountBadge = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  return (
    <div className="flex items-center justify-evenly gap-6">
      <NavLink to={"/cart"}>
        <Badge
          badgeContent={cartCount}
          color="error"
          sx={{ color: "MediumOrchid" }}
        >
          <BsCart4 className="text-2xl" />
        </Badge>
      </NavLink>

      <NavLink to={"/wishlist"}>
        <Badge
          badgeContent={wishlistCount}
          color="error"
          sx={{ color: "MediumOrchid" }}
        >
          <GrFavorite className="text-2xl" />
        </Badge>
      </NavLink>

      <NavLink to={isAuthenticated ? "/account" : "/signin"}>
        <IoPersonOutline
          style={{ color: "MediumOrchid" }}
          className="text-2xl"
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
