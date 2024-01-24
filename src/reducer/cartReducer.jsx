const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
      };

    case "SET_QUANTITY":
      let { quantity, condition, stock } = action.payload;
      console.log(action.payload);
      if (condition === "increase") {
        if (quantity < stock) quantity = quantity += 1;
      } else {
        if (quantity > 1) {
          quantity -= 1;
        }
      }
      return {
        ...state,
        quantity: quantity,
      };

    case "SET_COLOR":
      console.table(action.payload);
      return {
        ...state,
        color: action.payload,
      };

    case "ADD_TO_CART":
      console.log(action.payload);
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
  }
};
export default cartReducer;
