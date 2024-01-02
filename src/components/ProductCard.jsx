import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ id, name, image, category, price }) => {

  return (
    <div>
      <NavLink to={`/singleproduct/${id}`}>
        <div className=" cursor-pointer bg-purple-100 p-2 " key={id}>
          <div className="relative ">
            <img src={image} 
            alt={category}
         
            className=" " />
            <span className=" absolute right-2 top-2 bg-purple-700 font-semibold text-white text-xs py-1 px-4 flex items-center justify-center capitalize rounded-full">
              {category}
            </span>
            <div className=" z-30  absolute top-0   w-28  hover:w-[100%] h-[100%] bg-transparent hover:bg-purple-950/35 transition-all translate duration-1000">
          </div>

          <div className=" z-30  absolute top-0 right-0   w-16 hover:w-[100%] h-[100%] bg-transparent hover:bg-purple-950/35 transition-all translate duration-1000">
          </div>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <p className=" sm:text-sm text-xs font-bold text-purple-950 capitalize">{name}</p>
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
