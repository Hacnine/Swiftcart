import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();
const initialState = {
  allProducts: [],
  cartProducts: [],

};
const CartContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addCartItem = (name, image, price, quantity) => {
    console.log(name);
    // Dispatch an action to update the state based on your requirements
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        name,
        image,
        price,
        quantity
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export default CartContextProvider;