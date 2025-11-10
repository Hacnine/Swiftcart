import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import Sidebar from "../components/product/Sidebar";
import { fetchProducts, selectFilters } from "../store/slices/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const filters = useSelector(selectFilters);
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const categoryFilter = selectedCategory || null;
    dispatch(fetchProducts({ ...filters, categoryId: categoryFilter }));
  }, [location, dispatch]);

  return (
    <>
      <div className="wrapper flex items-start justify-between mt-14 mb-36">
        <div className="w-[22%] gap-4 hidden md:block">
          <Sidebar />
        </div>
        <div className="md:w-[78%] w-full">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Product;
