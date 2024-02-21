import React from "react";
import { NavLink } from "react-router-dom";
import PurpleBtn from "./PurpleBtn";
import { IconButton } from "@mui/material";
import {
  Favorite,
  HeartBrokenSharp,
  ShoppingBasket,
} from "@mui/icons-material";
import { useCartContext } from "../context/cartContext";
import { useProductContext } from "../context/ProductContext";

const ProductCard = (product) => {
  console.log("product", product);
  const { id, name, image, category, price, hideTag } = product;

  const { addCartItem, cartProducts } = useCartContext();
  const handleClick = () => {
    sentCartItem();
  };

  const sentCartItem = () => {
    const existingProduct = cartProducts.find((item) => item.id === id);

    if (existingProduct) {
    } else {
      const newProducts = cartProducts.find((item) => item.id === id);
      let amount = 1;
      let stock = 5;
      let check = 9;
      addCartItem(id, name, image, amount, check, price, stock);
    }
  };

  return (
    <div>
      <div className=" cursor-pointer bg-purple-100 p-2 shadow-md" key={id}>
        <div className="group relative group-hover:scale-110">
          <NavLink to={`/singleproduct/${id}`}>
            <img src={image} alt={category} className="" />
          </NavLink>
          <div className=" product-effect group-hover:scale-105   w-full    items-center hover:justify-center hidden md:flex">
            <div className=" ">
              <IconButton color="error" onClick={() => handleClick()}>
                <ShoppingBasket />
              </IconButton>
              <IconButton color="error" onClick={() => handleClick()}>
                <Favorite />
              </IconButton>
            </div>
          </div>

          <div className="  hidden absolute right-2 top-2 bg-purple-700 font-semibold text-white text-xs py-2 px-4 md:flex items-center justify-center capitalize rounded-full">
            {category}
          </div>
        </div>

        <NavLink to={`/singleproduct/${id}`}>
          <div className="flex md:items-center start gap-2 md:justify-between  md:flex-row flex-col">
            <p className=" sm:text-sm text-xs font-bold text-purple-950 capitalize">
              {name}
            </p>
            <p className=" font-semibold sm:text-sm text-xs text-red-600">
              {" "}
              <span className="  text-xl font-bold ">৳</span>
              {Math.round(price / 100)}
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
