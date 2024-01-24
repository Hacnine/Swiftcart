import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();
const initialState = {
  allProducts: [],
  cartProducts: [],
  quantity: 1,
  color: "",
};
const CartContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getQuantity = (quantity, condition, stock) => {
    dispatch({ type: "SET_QUANTITY", payload: { quantity, condition, stock } });
  };

  const getColor = (color) => {
    dispatch({ type: "SET_COLOR", payload: color });
  };

  const addCartItem = (name, image, amount, check, price) => {
    console.log(name);
  
    // Dispatch an action to update the state based on your requirements
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        name,
        image,
        amount,
        check,
        price,
      },
    });
  };

  

  return (
    <CartContext.Provider
      value={{
        ...state,
        getColor,
        getQuantity,
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
