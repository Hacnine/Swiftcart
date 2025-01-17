import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useFilterContext } from "../../context/filterContext";
import ProductCard from "../ProductCard";
import Sort from "./Sort";

const ProductList = () => {
  const { isLoading, products } = useProductContext();
  const { allProducts, filterProducts, sortingData } = useFilterContext();
  const [gridView, setGridView] = useState(true);

  return (
    <div className=" ">


      <Sort
        setGridView={setGridView}
        gridView={gridView}
        products={filterProducts}
        sortingData={sortingData}
      />
      <div
        className={`gap-4 grid ${
          gridView ? "md:grid-cols-3 grid-cols-2" : "grid-cols-1 md:px-80"
        }`}
      >
        {filterProducts.map((product) => (
          <div key={product.id} className="">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
