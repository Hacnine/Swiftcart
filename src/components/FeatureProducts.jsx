import { NavLink } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();
  return (
    <>
      <div className="wrapper bg-slate-200 py-20 ">
        <div>
          <p className="text-xs font-medium text-purple-600">CHECK NOW!</p>
          <h1 className="mb-8 font-bold text-xl text-slate-900">
            Our Feature Services
          </h1>
          <div className="  gap-4 grid grid-cols-3 ">
            {featureProducts.map((product) => {
              return <ProductCard {...product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
