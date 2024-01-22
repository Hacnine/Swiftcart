import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import filterReducer from "../reducer/filterReducer";

const FilterContext = createContext();
const initialState = {
  allProducts: [],
  filterProducts: [],
  sortedValue: "lowest",
  filter: {
    text: "",
  },
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);


  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filter]);

  const sortingData = (data) => {

    dispatch({ type: "GET_SORT_VALUE", payload:data });
    
  };

  // const setDispatch = (type, payload) =>{

  //   return dispatch({type: `SET_${type}_DATA`, payload: payload})
  // }

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(state.filter);
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  const getUniqueData = (products, property) => {
    let newValue = products.map((currentElement) => {
      return currentElement[property];
    });
    return (newValue = ["All", ...new Set(newValue)]);
  };

  const sortByCategory = (data) => {
    switch (data) {
      case "All":
        dispatch({ type: "ALL", payload: state.allProducts });
        break;

      case "mobile":
        dispatch({ type: "SET_MOBILE_DATA", payload: state.allProducts });
        break;

      case "laptop":
        dispatch({ type: "SET_LAPTOP_DATA", payload: state.allProducts });
        break;
      case "computer":
        dispatch({ type: "SET_COMPUTER_DATA", payload: state.allProducts });
        break;

      case "accessories":
        dispatch({
          type: "SET_ACCESSORIES_DATA",
          payload: state.allProducts,
        });
        break;

      case "watch":
        console.log(data);
        dispatch({ type: "SET_WATCH_DATA", payload: state.allProducts });
        break;
    }
  };


  const getColor = (currentColor) => {
    if (currentColor) {
      dispatch({
        type: "GET_COLORED_FILTERS",
        payload: { currentColor, allProduct: state.filterProducts }
      });
    }
  };

  const getMaxMinPrice = (price) =>{
    if (price) {
      dispatch({
        type: "GET_PRICE_FILTERS",
        payload:  price 
      });
    }

  }

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        sortingData,
        sortByCategory,
        updateFilterValue,
        getUniqueData,
        getColor,
        getMaxMinPrice
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export default FilterContextProvider;
