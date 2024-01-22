const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      const featureData = action.payload.filter((currentElement) => {
        return currentElement.featured === true;
      });

      const laptopData = action.payload.filter((currentElement) => {
        return currentElement.category === "laptop";
      });

      const watchData = action.payload.filter((currentElement) => {
        return currentElement.category === "watch";
      });

      const accessoriesData = action.payload.filter((currentElement) => {
        return currentElement.category === "accessories";
      });

      const mobileData = action.payload.filter((currentElement) => {
        return currentElement.category === "mobile";
      });

      const targetBlackColor = "#000000";

      // Filter products with the specified color
      const blackProducts = action.payload.filter((product) => {
        return product.colors.includes(targetBlackColor);
      });

      const targetBlueColor = "#22D3EF";

      const blueProducts = action.payload.filter((product) => {
        return product.colors.includes(targetBlueColor);
      });

      const targetRedColor = "#ff0000";

      const redProducts = action.payload.filter((product) => {
        return product.colors.includes(targetRedColor);
      });

      const targetGreyColor = "#CDD0D0";

      const greyProducts = action.payload.filter((product) => {
        return product.colors.includes(targetGreyColor);
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
        mobile: mobileData,
        laptop: laptopData,
        accessories: accessoriesData,
        watch: watchData,
        grayColors: greyProducts,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    case "SET_QUANTITY":
      let { quantity, condition,stock } = action.payload;
      console.log(action.payload)
        if(condition === 'increase'){
          if(quantity<stock)
          quantity =  quantity += 1;
        }
       else {
        if(quantity>1)
            {quantity -= 1;}
      }
      return {
        ...state,
        quantity: quantity,
      };
  }
  return state;
};

export default ProductReducer;
