import React, { useEffect, useState } from "react";
import ColorButton from "./ColorButton";
import CartAmountToggle from "./CartAmountToggle";
import PurpleBtn from "./PurpleBtn";
import { useCartContext } from "../context/cartContext";

const AddToCart = ({ product }) => {
  const { getColor, addCartItem, cartProducts } = useCartContext();
  const {
    id,
    name,
    colors,
    price,
    stock,
    image
  } = product;
  const [check, setCheck] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    getColor(check);
  }, [check]);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  const sentCartItem = () => {
    const existingProduct = cartProducts.find((item) => item.id === id);

    if (existingProduct) {
    } else {
      // If product is not in the cart, add it
      addCartItem(id, name, image[0].url, amount, check, price, stock);
    }
  };

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
      <CartAmountToggle
        amount={amount}
        setIncrease={setIncrease}
        setDecrease={setDecrease}
      />

      {/* <CartAmountToggle
        stock={stock}
      /> */}

      <div onClick={sentCartItem}>
      <PurpleBtn children={"Add To Cart"} />
      </div>
    </div>
  );
};

export default AddToCart;
