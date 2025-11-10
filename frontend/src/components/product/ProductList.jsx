import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts, selectProductLoading } from "../../store/slices/productSlice";
import ProductCard from "../ProductCard";
import Sort from "./Sort";

const ProductList = () => {
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductLoading);
  const [gridView, setGridView] = useState(true);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <Sort
        setGridView={setGridView}
        gridView={gridView}
        products={products}
      />
      <div
        className={`gap-4 grid ${
          gridView ? "md:grid-cols-3 grid-cols-2" : "grid-cols-1 md:px-80"
        }`}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
