import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();
const initialState = {
  allProducts: [],
  cartProducts: [],
  quantity: 1,
  color: "",
  total:0,
  totalItem:0
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

  const addCartItem = (id, name, image, amount, check, price, stock) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        image,
        amount,
        check,
        price,
        stock,
      },
    });
  };

  const updateCartItemQuantity = (productId, amount) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, amount },
    });
  };

  const calculateTotalPrice = () => {
    dispatch({
      type: "CALCULATE_TOTAL_PRICE",
    });
  };

  const deleteCartItem = (productId) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: productId,
    });
  };

  const deleteAllCartItem = () => {
    dispatch({
      type: "DELETE_ALL_ITEMS",
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        getColor,
        getQuantity,
        addCartItem,
        updateCartItemQuantity,
        calculateTotalPrice,
        deleteCartItem,
        deleteAllCartItem,
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
