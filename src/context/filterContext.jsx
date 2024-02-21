import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import filterReducer from "../reducer/filterReducer";

const FilterContext = createContext();
const initialState = {
  allProducts: [],
  filterProducts: [],
  searchedProducts:[],
  searchResultProducts:[],
  sortedValue: "lowest",
  filter: {
    text: "",
  },

  searchFilter: {
    text2: "",
  },
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.filter]);

  // useEffect(() => {
  //   dispatch({ type: "SEARCHED_PRODUCTS" });
  // }, [state.filter]);


  const sortingData = (data) => {
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

  const getProductById = (productId) => {
    return state.allProducts.find((product) => product.id === productId);
  };

  const filterByCategory = (categoryName) => {
    return state.allProducts.filter((currentElement) => {
      return currentElement.category === categoryName;
    });
  };

  const sortByCategory = (data) => {
    dispatch({ type: "SORT_BY_CATEGORY", payload: data });
  };

  const sortByCategoryForSearchBar = (data) => {
    console.log('data', data)
    dispatch({ type: "SORT_BY_CATEGORY_FOR_SEARCH_BAR", payload: data });
  };

  const getColor = (currentColor) => {
    if (currentColor) {
      dispatch({
        type: "GET_COLORED_FILTERS",
        payload: { currentColor, allProduct: state.filterProducts },
      });
    }
  };

  const getMaxMinPrice = (price) => {
    if (price) {
      dispatch({
        type: "GET_PRICE_FILTERS",
        payload: price,
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
        sortingData,
        sortByCategory,
        sortByCategoryForSearchBar,
        updateFilterValue,
        getUniqueData,
        getColor,
        getMaxMinPrice,
        
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
