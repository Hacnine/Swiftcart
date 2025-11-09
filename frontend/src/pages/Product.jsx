import ProductList from "../components/product/ProductList";
import Sidebar from "../components/product/Sidebar";
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { useFilterContext } from "../context/filterContext";
import { useLocation } from "react-router-dom";
import React, { useEffect, useRef } from "react";

const Product = () => {
  const { sortByCategory } = useFilterContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedData = searchParams.get("title");

  useEffect(
    () => {
      if (selectedData) {
        sortByCategory(selectedData);
      } else {
        sortByCategory("All");
      }
    },
    [location]
    // [selectedData,sortByCategory]
  );

  return (
    <>
      <div className="wrapper flex items-start justify-between mt-14 mb-36 ">
        
        <div className="w-[22%] gap-4  hidden md:block">
          <Sidebar />
      
        </div>
        <div className="md:w-[78%]">
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Product;
