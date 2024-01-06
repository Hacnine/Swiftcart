import React, { useState } from 'react'
import { useProductContext } from '../../context/ProductContext';
import { useFilterContext } from '../../context/filterContext';
import ProductCard from '../ProductCard';
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";

const ProductList = () => {
  const { isLoading, products } = useProductContext();
  const {allProducts, filterProducts} = useFilterContext();
  // console.log('products', filterProducts)

  const [gridView, setGridView] = useState(true);
  
  return (
    <div className=' bg-white'>
      <div className="flex items-center justify-between text-purple-950  mb-10 px-2">
      <BsGridFill className=' hover:cursor-pointer' onClick={()=>setGridView(true)}/>
      <FaThList className=' hover:cursor-pointer' onClick={()=>setGridView(false)}/>
      </div>
       <div className={`gap-4 grid ${gridView? 'grid-cols-3': 'grid-cols-1 md:px-80'}`}>
            {filterProducts.map((product) => (
              <div key={product.id} className="">
                <ProductCard {...product}/>
              </div>
            ))}
          </div>
    </div>
  )
}

export default ProductList
