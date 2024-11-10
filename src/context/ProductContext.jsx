 import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";
import data from '../../public/data.json'
const AppContext = createContext();

<<<<<<< Updated upstream
const API = data; // Using the proxy path
=======
const API = "https://api.pujakaitem.com/api/products";
// const API = "https://api.jsonbin.io/v3/b/65b617171f5677401f27494b";
>>>>>>> Stashed changes

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
<<<<<<< Updated upstream
      // const response = await axios.get(url);
      // console.log('Full response:', response); // Log the full response object
      const products = url // Access the expected data property
      console.log('Products:', products); // Log the extracted products array
=======
      const response = await axios.get(url);
      const products = await response.data
      console.log(response);
>>>>>>> Stashed changes
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const response = await axios.get(url);
<<<<<<< Updated upstream
      const singleProduct = response.data; // Corrected line
=======
      const singleProduct = await response.data
>>>>>>> Stashed changes
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  const getColorBaseProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(url);
      const products = response.data.record;
      dispatch({ type: "SET_COLOR_BASE_PRODUCT", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct, getColorBaseProducts }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useProductContext };
