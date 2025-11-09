import React from "react";

const filterReducer = (state, action) => {

  const filterByCategory = (categoryName) => {
    if (categoryName === "All") {
      return state.allProducts;
    } else {
      const temporaryData = state.allProducts.filter((currentElement) => {
        return currentElement.category === categoryName;
      });
      return temporaryData;
    }
  };

  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        allProducts: [...action.payload],
        filterProducts: [...action.payload],
        searchedProducts:  [...action.payload],
        searchResultProducts:  [...action.payload],
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
            return {
              ...state,
              filterProducts: sortedProductsHighToLow,
            };

          case "Price-Low to High":
            const sortedProductsLowToHigh = state.filterProducts
              .slice()
              .sort((a, b) => a.price - b.price);
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

    case "SORT_BY_CATEGORY":
   
      const categorizedData = filterByCategory(action.payload);
      console.log(categorizedData);
      return {
        ...state,
        filterProducts: categorizedData,
      };

      case "SORT_BY_CATEGORY_FOR_SEARCH_BAR":
   
      const categorizedDataForSearchBar = filterByCategory(action.payload);
      console.log('categorizedDataForSearchBar', categorizedDataForSearchBar);
      return {
        ...state,
        searchedProducts: categorizedDataForSearchBar,
        searchResultProducts:categorizedDataForSearchBar,
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

    case "FILTER_PRODUCTS":
      let { searchedProducts } = state;
      let tempFilterProducts = [...searchedProducts];
      const { text } = state.filter;
      let lowerText = text.toLowerCase();

      if (text) {
        tempFilterProducts = tempFilterProducts.filter((currentElement) => {
          return currentElement.name.includes(lowerText);
        });
      }

      return {
        ...state,
        searchResultProducts: tempFilterProducts,
      };


      // case " SEARCHED_PRODUCTS":
      //   // let { allProducts } = state;
      //   // let tempFilterProducts = [...allProducts];
      //   const { text2 } = state.searchFilter;
      //   let lowerCaseText = text.toLowerCase();
  
      //   if (text2) {
      //     tempFilterProducts = tempFilterProducts.filter((currentElement) => {
      //       return currentElement.name.includes(lowerCaseText);
      //     });
      //   }
  
      //   return {
      //     ...state,
      //     searchedProducts: tempFilterProducts,
      //   };


    case "GET_COLORED_FILTERS":
      const { currentColor, allProduct } = action.payload;
      const tempColorFilter = state.allProducts;

      const getColor = (targetColor) => {
        const products = tempColorFilter.filter((product) => {
          return product.colors.includes(targetColor);
        });
        return products;
      };

      const getProducts = getColor(currentColor);

      return {
        ...state,
        filterProducts: getProducts,
      };

    case "GET_PRICE_FILTERS":
      let price = action.payload;
      const minPrice = price[0] * 100;
      const maxPrice = price[1] * 100;
      // Filter products based on the price range
      const productsInPriceRange = state.allProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );

      return {
        ...state,
        filterProducts: productsInPriceRange,
      };
  }
  return state;
};

export default filterReducer;
