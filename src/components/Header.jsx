import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import logo from '../assets/logo.svg'
import minilogo from '../assets/minilogo.svg'

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-slate-200  wrapper md:mb-14 mb-10">
      <NavLink to="/">
        {/* <span className=" rounded-tl-3xl bg-purple-950 px-4 py-1 font-bold md:text-2xl text-xl text-white  ">
          {" "}
          SWIFT{" "}
        </span>{" "}
        <span className=" rounded-br-3xl bg-black md:text-2xl text-xl font-bold text-purple-950 py-1 px-5">
          CART
        </span> */}
        <img src={logo} alt=""
        className="hidden md:block h-20 py-2" />
        <img src={minilogo} alt=""
        className="block md:hidden h-16 py-2" />
      </NavLink>

      <Navbar />
    </div>
  );
};

const MainHeader = styled.header`
  padding: 0 0.4rem;
  height: 10rem;
  backgorund-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;

export default Header;
