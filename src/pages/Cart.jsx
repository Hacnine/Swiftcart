import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CustomIconButton from "../components/cart/CustomIconButton";
import CartCard from "../components/cart/CartCard";
import { useCartContext } from "../context/cartContext";
import emptycart from '../assets/emptycart.svg'

const Cart = () => {
  const { cartProducts } = useCartContext();

  if (cartProducts.length === 0){
    return <div className="center mt-10"> <img src={emptycart} alt="" /></div>
  }

  console.log(cartProducts);
  return (
    <table className="wrapper table-auto border-separate border-spacing-2 border border-slate-200 w-full ">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border-2">Product Name</th>

          <th className="td-qty px-4 py-2 border-2 text-center">Quantity</th>
          <th className="px-4 py-2 border-2">Unit Price</th>
          <th className="px-4 py-2 border-2">Sub Total</th>
          <th className="px-4 py-2 border-2">Remove</th>
        </tr>
      </thead>
      {cartProducts.map((cartProduct) => (
        <CartCard cartProduct={cartProduct} />
      ))}
    </table>
  );
};

export default Cart;
