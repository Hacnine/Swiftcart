import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import CustomIconButton from "../components/cart/CustomIconButton";
import CartCard from "../components/cart/CartCard";
import { useCartContext } from "../context/cartContext";
import PurpleBtn from "../components/PurpleBtn";
import emptycart from "../assets/emptycart.svg";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Process from "../components/cart/Process";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  const { cartProducts, calculateTotalPrice } = useCartContext();
  const [active, setActive] = useState(1);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartProducts]);

  if (cartProducts.length === 0) {
    return (
      <div className="center flex-col my-20">
        {" "}
        <img src={emptycart} alt="" />
        <Link to={"/product"}>
          <PurpleBtn
            className="mt-3 "
            bg={" bg-orange-600 hover:bg-orange-500"}
          >
            Shop Now
          </PurpleBtn>
          {/* <Button sx={{bgcolor:"orangered", color:"white", mt:2}}></Button> */}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="  relative">
        
          <Process active={active} title={'Cart'} />
     

        {/*  flex flex-row md:flex-col */}

        <div className=" wrapper flex items-start justify-start md:flex-row flex-col absolute top-80 gap-5 fill-zinc-500 z-50 w-full">
          {/* md:w-[70%] w-full */}


          
          <table className="table-auto border-separate border-spacing-2 rounded-lg text-xs bg-white shadow-md shadow-slate-300 w-full relative">
        <thead className="">
          <tr className="text-gray-600 flex flex-col sm:table-row w-[29%] rounded-lg border border-black">
            <th className="px-4 py-2 rounded-lg">Product Name</th>
            <th className="px-4 py-2 rounded-md text-center">Quantity</th>
            <th className="px-4 py-2 rounded-md">Unit Price</th>
            <th className="px-4 py-2 rounded-md">Sub Total</th>
            <th className="px-4 py-2 rounded-md">Delete</th>
          </tr>
        </thead>
    
            
            {cartProducts.map((cartProduct) => (
              <CartCard cartProduct={cartProduct} />
            ))}
          </table>
          <OrderSummary setActive={setActive} btnName={'PROCEED TO CHECKOUT'} linkName={'checkout'}/>
          
        </div>
      </div>
    </>
  );
};

export default Cart;
