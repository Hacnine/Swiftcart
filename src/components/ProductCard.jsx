import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ id, name, image, category, price, hideTag }) => {
  return (
    <div>
      <NavLink to={`/singleproduct/${id}`}>
        <div className=" cursor-pointer bg-purple-100 p-2 " key={id}>
          <div className="relative ">
            <img src={image} alt={category} className=" " />

            {hideTag ? null : (
              <div className=" md:block hidden absolute right-2 top-2 bg-purple-700 font-semibold text-white text-xs py-1 px-4 flex items-center justify-center capitalize rounded-full">
                {category}
              </div>
            )}

            <div className=" product-effect "/>

            <div className="right-0 product-effect "/>
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
