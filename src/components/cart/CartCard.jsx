import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, {  useState } from "react";
import CartAmountToggle from "../CartAmountToggle";
import { useCartContext } from "../../context/cartContext";

const CartCard = ({
  cartProduct: { id, name, image, amount, check, price, stock },
  onDelete,
}) => {
  let subTotal = Math.round((price * amount) / 100);
  let total = 0;
  total = total + subTotal;
  const { updateCartItemQuantity, deleteCartItem, deleteAllCartItem } =
    useCartContext();

  const [quantity, setQuantity] = useState(amount);

  const setDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItemQuantity(id, quantity - 1, subTotal);
    } else {
      setQuantity(1);
      // updateCartItemQuantity(id, quantity)
    }
  };

  const setIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      updateCartItemQuantity(id, quantity + 1, subTotal);
    }
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };



  const deleteProduct = () => {
    deleteCartItem(id);
  };

  const deleteAllProduct = () => {
    deleteAllCartItem();
  };

  return (
    <tbody className="">
      <tr className="border-b table-row">
        <td className="  border-b-2 text-center">
          <div className="flex items-center">
          <IconButton
            sx={{ color: "red", "&:hover": { color: "OrangeRed" } }}
            onClick={deleteProduct}
          >
            <Delete fontSize="small" />
          </IconButton>
            <img
              src={image}
              alt={name}
              style={{ width: 70, marginRight: 20 }}
            />

            <div>
              <a href="#" className="text-blue-500 hover:underline capitalize">
                {name}
              </a>
              <div
                className={`w-3 h-3 mt-2 rounded-full`}
                style={{ backgroundColor: `${check}` }}
              ></div>
            </div>
          </div>
        </td>

        <td className="px-4 py-7 border-b-2 text-center flex items-center justify-center">
          <CartAmountToggle
            amount={quantity}
            setIncrease={setIncrease}
            setDecrease={setDecrease}
          />
        </td>
        <td className="px-4 py-2 border-b-2 text-center">
          {Math.round(price / 100)}
        </td>
        <td className="px-4 pb-10 border-b-2 text-center lg:block hidden">{subTotal}</td>
      </tr>
    </tbody>

    
  );
};

export default CartCard;
