import ProductList from '../components/product/ProductList';
import Sidebar from '../components/product/Sidebar';
import { BiSolidChevronRightCircle } from "react-icons/bi";
import { useFilterContext } from '../context/filterContext';
import { useLocation} from "react-router-dom";
import React, { useEffect, useRef } from "react";

const Product = () => {
  const { sortByCategory} = useFilterContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedData = searchParams.get("title");
  // console.log(selectedData)
  let secondaryData = selectedData;
  const prevSelectedDataRef = useRef();
console.log(location)
  const setData = ()=>{
    
  }
  useEffect(() => {
 
      if (selectedData) {
        
        sortByCategory(selectedData);
      }

      else{
        sortByCategory("All")
      }
   
  }, 
  [location]
  // [selectedData,sortByCategory]
  );


  return (
    <>
      <div className='wrapper flex items-start justify-between'>
        <div className='w-[22%] gap-4 center shadow-'>
          <Sidebar />
          <BiSolidChevronRightCircle className='text-purple-950 h-7 w-7 cursor-pointer' />
        </div>
        <div className='w-[78%]'>
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Product;
