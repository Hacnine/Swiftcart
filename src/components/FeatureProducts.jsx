import { NavLink } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();
  return (
    <>
      
      <div className="wrapper bg-slate-200 py-20 ">
        <div>
          <p className="text-xs font-medium text-purple-600">CHECK NOW!</p>
          <h1 className="mb-8 font-bold text-xl text-slate-900">Our Feature Services</h1>
          <div className="  gap-6 grid grid-cols-3 ">
            {featureProducts.map((product) => (
              <NavLink to={`/singleproduct/${product.id}`}>
              <div className=" cursor-pointer" key={product.id}>
                <div className="relative">
                <img src={product.image} alt={product.category} />
                <span className=" absolute right-2 top-2 bg-purple-400 text-white text-xs py-1 px-4 flex items-center justify-center capitalize rounded-full">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <p className=" font-bold text-purple-950">{product.name}</p>
                  <p className=" font-semibold text-sm text-red-600">
                    {" "}
                    <span className="  text-xl font-bold ">৳</span>
                    {Math.trunc(product.price / 100)}
                  </p>
                </div>
              </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
