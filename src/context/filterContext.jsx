import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import filterReducer from "../reducer/filterReducer";

const FilterContext = createContext();
const initialState = {
    allProducts:{},
    filterProducts:{},
    gridView: true,
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setGridView = ()=>{
    dispatch({type: "SET_GRID_VIEW"})
  };

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  },[products]);
  return (
    <FilterContext.Provider value={{ ...state,setGridView }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () =>{
    return useContext(FilterContext);
}

export default FilterContextProvider;
