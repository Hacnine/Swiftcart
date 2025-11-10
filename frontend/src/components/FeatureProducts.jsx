import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchFeaturedProducts, selectFeaturedProducts, selectProductLoading } from "../store/slices/productSlice";
import ProductCard from "./ProductCard";

const FeatureProduct = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(selectFeaturedProducts);
  const isLoading = useSelector(selectProductLoading);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="wrapper bg-slate-200 py-20">
        <div className="text-center">Loading featured products...</div>
      </div>
    );
  }

  return (
    <>
      <div className="wrapper bg-slate-200 py-20">
        <div>
          <p className="text-xs font-medium text-purple-600">CHECK NOW!</p>
          <h1 className="mb-8 font-bold text-xl text-slate-900">
            Our Feature Services
          </h1>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => {
              return <ProductCard key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
