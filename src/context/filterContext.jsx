import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import filterReducer from "../reducer/filterReducer";

const FilterContext = createContext();
const initialState = {
  allProducts: [],
  filterProducts: [],
  gridView: true,
  sortedValue: "lowest",
  filter: {
    text: "",
  },
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setGridView = () => {
    dispatch({ type: "SET_GRID_VIEW" });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filter]);

  const sortingData = (data) => {
    switch (data.name) {
      case "Price-High to Low":
        console.log("data", data.name);
        dispatch({
          type: "GET_HIGH_TO_LOW_PRICE",
          payload: state.filterProducts,
        });

        break;
      case "Price-Low to High":
        console.log("data", data.name);
        dispatch({
          type: "GET_LOW_TO_HIGH_PRICE",
          payload: state.filterProducts,
        });
        break;

      case "Name(A-Z)":
        console.log("data", data.name);
        dispatch({ type: "GET_Price(A-Z)", payload: state.filterProducts });
        break;
      case "Name(Z-A)":
        console.log("data", data.name);
        dispatch({ type: "GET_Price(Z-A)", payload: state.filterProducts });
        break;
      default:
      // code block
    }
    dispatch({ type: "GET_SORT_VALUE", payload: data });
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
        payload: { currentColor, filterProducts: state.filterProducts }
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        sortingData,
        sortByCategory,
        updateFilterValue,
        getUniqueData,
        getColor,
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
