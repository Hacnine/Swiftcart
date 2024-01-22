import React, { useState } from "react";
import ColorInputs from "./ColorInputs";
import CartAmountToggle from "./CartAmountToggle";
import PurpleBtn from "./PurpleBtn";
import ColorButton from "./ColorButton";
import { NavLink } from "react-router-dom";

const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;
  const [check, setCheck] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  // const setDecrease = () => {
  //   amount > 1 ? setAmount(amount - 1) : setAmount(1);
  // };

  // const setIncrease = () => {
  //   amount < stock ? setAmount(amount + 1) : setAmount(stock);
  // };

  return (
    <div>
      <div className=" mt-5 flex items-center justify-start gap-2">
        <p className="   text-sm font-semibold text-gray-700 ">Color:</p>
        {/* {stock > 0 &&
          <ColorInputs product={singleProduct} />} */}

        {colors.map((currentColor, index) => {
          return (
            <ColorButton
              currentColor={currentColor}
              index={index}
              colors={colors}
              check={check}
              setCheck={setCheck}
            />
          );
        })}
      </div>
      {/* <ColorInputs colors={colors} /> */}
      {/* <CartAmountToggle
        amount={amount}
        setIncrease={setIncrease}
        setDecrease={setDecrease}
      /> */}

      <CartAmountToggle
        stock={stock}
      />

      <NavLink to="/cart">
        <PurpleBtn children={"Add To Cart"} />
      </NavLink>
    </div>
  );
};

export default AddToCart;
