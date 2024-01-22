import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CustomIconButton from "../components/cart/CustomIconButton";
import CartCard from "../components/cart/CartCard";

const Cart = () => {
  const [count, setCount] = useState(0);

  
  return (
    <>
    <CartCard/>
    </>
  );
};

export default Cart;
