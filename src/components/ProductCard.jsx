import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = (product) => {
  const { id, name, image, category, price, hideTag } = product;
  return (
    <div>
      <NavLink to={`/singleproduct/${id}`}>
        <div className=" cursor-pointer bg-purple-100 p-2 shadow-md" key={id}>
          <div className="group relative group-hover:scale-110 z-0 ">
            <img src={image} alt={category} className="" />

            <div className=" product-effect group-hover:scale-105 " />
            <div className="  hidden absolute right-2 top-2 bg-purple-700 font-semibold text-white text-xs py-2 px-4 md:flex items-center justify-center capitalize rounded-full">
              {category}
            </div>
          </div>
          <div className="flex md:items-center start gap-2 md:justify-between  md:flex-row flex-col">
            <p className=" sm:text-sm text-xs font-bold text-purple-950 capitalize">
              {name}
            </p>
            <p className=" font-semibold sm:text-sm text-xs text-red-600">
              {" "}
              <span className="  text-xl font-bold ">৳</span>
              {Math.trunc(price / 100)}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
