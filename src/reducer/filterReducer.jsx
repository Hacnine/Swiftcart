import React from "react";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        allProducts: [...action.payload],
        filterProducts: [...action.payload],
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        gridView: true,
      };

    case "GET_SORT_VALUE":
      function filterProductsByCompany(products, companyName) {
        const filteredProducts = products.filter(
          (product) =>
            product.company.toLowerCase() === companyName.toLowerCase()
        );

        return filteredProducts;
      }

      if (
        action.payload === "All" ||
        action.payload === "Default" ||
        action.payload === "Price-High to Low" ||
        action.payload === "Price-Low to High" ||
        action.payload === "Name(A-Z)" ||
        action.payload === "Name(Z-A)"
      ) {
        switch (action.payload) {
          case "Price-High to Low":
            const sortedProductsHighToLow = state.filterProducts
              .slice()
              .sort((a, b) => b.price - a.price);
            console.log(sortedProductsHighToLow);
            return {
              ...state,
              filterProducts: sortedProductsHighToLow,
            };

          case "Price-Low to High":
            const sortedProductsLowToHigh = state.filterProducts
              .slice()
              .sort((a, b) => a.price - b.price);
            console.log(sortedProductsLowToHigh);
            return {
              ...state,
              filterProducts: sortedProductsLowToHigh,
            };

          case "Name(A-Z)":
            const accedingOrder = state.filterProducts
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name));

            return {
              ...state,
              filterProducts: accedingOrder,
            };

          case "Name(Z-A)":
            const descendingOrder = state.filterProducts
              .slice()
              .sort((a, b) => b.name.localeCompare(a.name));

            return {
              ...state,
              filterProducts: descendingOrder,
            };

          default: {
            return {
              ...state,
              filterProducts: state.allProducts,
            };
          }
        }
      }

      const sortedProducts = filterProductsByCompany(
        state.allProducts,
        action.payload
      );

      return {
        ...state,
        filterProducts: sortedProducts,
      };

    case "GET_HIGH_TO_LOW_PRICE":
      const sortedProductsHighToLow = action.payload
        .slice()
        .sort((a, b) => b.price - a.price);
      console.log(sortedProductsHighToLow);
      return {
        ...state,
        filterProducts: sortedProductsHighToLow,
      };

    case "GET_LOW_TO_HIGH_PRICE":
      const sortedProductsLowToHigh = action.payload
        .slice()
        .sort((a, b) => a.price - b.price);
      console.log(sortedProductsLowToHigh);
      return {
        ...state,
        filterProducts: sortedProductsLowToHigh,
      };

    case "GET_Price(A-Z)":
      const accedingOrder = action.payload
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...state,
        filterProducts: accedingOrder,
      };

    case "GET_Price(Z-A)":
      const descendingOrder = action.payload
        .slice()
        .sort((a, b) => b.name.localeCompare(a.name));

      return {
        ...state,
        filterProducts: descendingOrder,
      };

    case "ALL":
      return {
        ...state,
        filterProducts: action.payload,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };

    case "SET_MOBILE_DATA":
      const mobileData = action.payload.filter((currentElement) => {
        return currentElement.category === "mobile";
      });

      return {
        ...state,
        filterProducts: mobileData,
      };

    case "SET_LAPTOP_DATA":
      const laptopData = action.payload.filter((currentElement) => {
        return currentElement.category === "laptop";
      });

      return {
        ...state,
        filterProducts: laptopData,
      };

    case "SET_ACCESSORIES_DATA":
      const accessoriesData = action.payload.filter((currentElement) => {
        return currentElement.category === "accessories";
      });

      return {
        ...state,
        filterProducts: accessoriesData,
      };
    case "SET_WATCH_DATA":
      const watchData = action.payload.filter((currentElement) => {
        return currentElement.category === "watch";
      });

      return {
        ...state,
        filterProducts: watchData,
      };

    case "SET_COMPUTER_DATA":
      const computerData = action.payload.filter((currentElement) => {
        return currentElement.category === "computer";
      });

      return {
        ...state,
        filterProducts: computerData,
      };

    // case "sSorting":
    //   let newSortData;
    //   // let tempSortProduct = [...action.payload];

    //   const { filterProducts, sortingValue } = state;
    //   let tempSortProduct = [...filterProducts];

    //   const sortingProducts = (a, b) => {
    //     if (sortingValue === "lowest") {
    //       return a.price - b.price;
    //     }

    //     if (sortingValue === "highest") {
    //       return b.price - a.price;
    //     }

    //     if (sortingValue === "a-z") {
    //       return a.name.localeCompare(b.name);
    //     }

    //     if (sortingValue === "z-a") {
    //       return b.name.localeCompare(a.name);
    //     }
    //   };

    //   newSortData = tempSortProduct.sort(sortingProducts);

    //   return {
    //     ...state,
    //     filter_products: newSortData,
    //   };

    case "FILTER_PRODUCTS":
      let { allProducts } = state;
      let tempFilterProducts = [...allProducts];
      const { text } = state.filter;
      let lowerText = text.toLowerCase();

      if (text) {
        tempFilterProducts = tempFilterProducts.filter((currentElement) => {
          return currentElement.name.includes(lowerText);
        });
      }

      return {
        ...state,
        filterProducts: tempFilterProducts,
      };

    case "GET_COLORED_FILTERS":
      const { currentColor, allProduct } = action.payload;
      console.log(currentColor);
      const tempColorFilter = [...allProduct];

      const getColor = (targetColor) => {
        const products = tempColorFilter.filter((product) => {
          return product.colors.includes(targetColor);
        });
        return products;
      };

      const getProducts = getColor(currentColor);
      console.log(getProducts);

      const targetBlackColor = "#000000";

      // Filter products with the specified color
      // const blackProducts = action.payload.filter((product) => {
      //   return product.colors.includes(targetBlackColor);
      // });

      // const targetBlueColor = "#22D3EF";

      // const blueProducts = action.payload.filter((product) => {
      //   return product.colors.includes(targetBlueColor);
      // });

      // const targetRedColor = "#ff0000";

      // const redProducts = action.payload.filter((product) => {
      //   return product.colors.includes(targetRedColor);
      // });

      // const targetGreyColor = "#CDD0D0";

      // const greyProducts = action.payload.filter((product) => {
      //   return product.colors.includes(targetGreyColor);
      // });

      return {
        ...state,
        filterProducts: getProducts,
      };
  }
  return state;
};

export default filterReducer;
