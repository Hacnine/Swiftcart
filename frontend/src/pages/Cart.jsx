import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems, selectCartTotal, fetchCart } from "../store/slices/cartSlice";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import CartCard from "../components/cart/CartCard";
import PurpleBtn from "../components/PurpleBtn";
import emptycart from "../assets/emptycart.svg";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  if (cartItems.length === 0) {
    return (
      <div className="center flex-col my-20 pb-7">
        <img src={emptycart} alt="Empty cart" />
        <Link to={"/product"}>
          <PurpleBtn
            className="mt-3"
            bg="bg-orange-600 hover:bg-orange-500"
          >
            Shop Now
          </PurpleBtn>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mt-36 -translate-y-10 mb-32 wrapper between md:flex-row flex-col gap-5 fill-zinc-500 z-50 w-full">
          <table className="table-auto border-separate border-spacing-2 rounded-lg text-xs bg-white shadow-md shadow-slate-300 w-full relative">
            <thead>
              <tr className="text-gray-600 table-row w-[29%] rounded-lg border border-black">
                <th className="pl-12 py-2 start">Product</th>
                <th className="px-2 py-2 text-center">Quantity</th>
                <th className="px-2 py-2">Unit Price</th>
                <th className="px-2 py-2 lg:block hidden">Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <CartCard key={cartItem.id} cartProduct={cartItem} />
              ))}
            </tbody>
          </table>
          <OrderSummary 
            total={cartTotal} 
            btnName="PROCEED TO CHECKOUT" 
            linkName="checkout"
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
