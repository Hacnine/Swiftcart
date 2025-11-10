import React from "react";
import { Button } from "@mui/material";

import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";

const HeroImageContent = () => {
  return (
    <>
      <span className="   font-bold  leading-[146%]   font-open text-start text-slate-blue ">
        <span className="md:text-4xl text-base">SWIFT</span>{" "}
        <span className=" text-darkpurple md:text-4xl text-base   ">CART</span>
      </span>

      <p className="text-red-400 md:tracking-wider md:text-base text-xs mb-5"> Where shopping meets delight in every click!</p>
      <Link to={"/product"}>
        <button
          className=" w-[108px] md:w-[145px]  bg-darkpurple py-3 center text-sm md:text-base"
          style={{
            bgcolor: "#47244c",
            borderRadius: 25,
            color: "white",
          }}
        >
          <MdShoppingBasket className=" text-darkpurple bg-white rounded-full md:text-3xl text-xl p-0.5 mr-1" />
          Buy Now
        </button>
      </Link>
    </>
  );
};

export default HeroImageContent;
