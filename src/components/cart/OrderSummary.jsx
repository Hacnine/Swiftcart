import { Button, Typography } from "@mui/material";
import React from "react";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import OrderSummaryItems from "./OrderSummaryItems";
import PurpleBtn from "../PurpleBtn";

const OrderSummary = ({ setActive, btnName, linkName }) => {
  const { total, totalItem, deleteAllCartItem } = useCartContext();

  const handleClick = () => {
    if (btnName === "CONFIRM ORDER") {
      deleteAllCartItem();
    }
  };
  return (
    <div className="rounded-lg  text-xs text-white font-semibold tracking-wide  md:w-[30%]  w-full  bg-white shadow-lg shadow-gray-400 py-6 px-6 ">
      <p className="text-start text-xl text-slate-800 font-bold">Cart Totals</p>

      <OrderSummaryItems title={"TOTAL ITEMS"} amount={totalItem} />

      <OrderSummaryItems title={"DELIVERY FEE"} amount={100} />

      <OrderSummaryItems title={"SUBTOTAL"} amount={Math.round(total / 100)} />

      <OrderSummaryItems
        title={"TOTAL"}
        amount={Math.round(total / 100) + 100}
      />

      <div className="center" onClick={handleClick}>
        <Link
          onClick={() => setActive(2)}
          to={`/${linkName}`}
          className="w-[90%]"
        >
          <PurpleBtn
            children={btnName}
            className={"text-xs text-white "}
            bg={
              "font-semibold tracking-wide py-3 bg-[#08c451] rounded-md w-[90%]"
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
