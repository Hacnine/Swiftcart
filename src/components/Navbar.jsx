import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { FiArrowDown, FiMenu, FiShoppingCart } from "react-icons/fi";
import Navbutton from "./Navbutton";
import { MdArrowDropDown, MdMenu } from "react-icons/md";
import NavLinks from "./NavLinks";
import { Search } from "@mui/icons-material";
import { IoMdArrowDropdown } from "react-icons/io";
import Headroom from "react-headroom";
import { FaHeadphones } from "react-icons/fa";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Headroom>
        <div className="wrapper">
          <div className="bg-slate-200 between px-4 rounded-b-3xl shadow-md shadow-slate-600">
            <div className=" pr-2 border-r border-gray-300">
              <Button
                startIcon={<FiMenu className=" font-bold text-lg text-white" />}
                endIcon={<MdArrowDropDown className=" text-white text-4xl" />}
                className="bg-chocolate hover:bg-gray-500 text-white"
                sx={{
                  backgroundColor: "#47244c",
                  px: 3,
                  py: 2,
                  width: 225,
                  borderBottomLeftRadius: 15,
                  "&:hover": {
                    backgroundColor: "#47244c",
                  },
                }}
                onClick={handleClick}
              >
                <span className=" font-semi text-sm text-white ">
                  ALL CATEGORIES
                </span>
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            <div className=" center   ">
              <NavLinks />
            </div>
          

            <div className="center gap-2 border-l pl-2 border-gray-300">
              <FaHeadphones className=" text-5xl text-fuchsia-950 hover:scale-110 transition-transform duration-300" />
              <div className="">
                <p className="text-lg font-bold">Call us now</p>
                <p className="text-sm">+91123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default Navbar;
