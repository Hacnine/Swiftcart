import React, { useState } from "react";
import ColorInputs from "./ColorInputs";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import PurpleBtn from "./PurpleBtn";
import { NavLink } from "react-router-dom";

const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <div>
      <div className=" mt-5 flex items-center justify-start gap-2">
        <p className="   text-sm font-semibold text-gray-700 ">Color:</p>
        {/* {stock > 0 &&
          <ColorInputs product={singleProduct} />} */}

        {colors.map((currentColor, index) => {
          return (
            <button
              className={` bg-[${currentColor}] border border-[${currentColor}]  w-4 h-4 rounded-full
               overflow-clip`}
              key={index}
              onClick={() => setColor(colors[index])}
            >
              {color === currentColor ? (
                <FaCheck className=" text-blue-500 p-0.5" />
              ) : null}
            </button>
          );
        })}
      </div>
      {/* <ColorInputs colors={colors} /> */}
      <CartAmountToggle
        amount={amount}
        setIncrease={setIncrease}
        setDecrease={setDecrease}
      />

      <NavLink to="/cart">
        <PurpleBtn children={"Add To Cart"} />
      </NavLink>
    </div>
  );
};

export default AddToCart;
