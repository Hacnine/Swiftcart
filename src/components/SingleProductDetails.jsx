import { FaStar, FaStarHalf } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";

import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaTruckFront } from "react-icons/fa6";
import PurpleBtn from "./PurpleBtn";
import ColorInput from "./ColorInput";
import { useState } from "react";
import StarRating from "./StarRating";
const SingleProductDetails = ({
  id: alias,
  company,
  name,
  price,
  description,
  category,
  stock,
  stars,
  reviews,
  image,
  colors,
  singleProduct,
}) => {
  console.log(singleProduct);
  return (
    <div>
      <div className="flex items-start justify-start flex-col gap-4 w-full">
        <h1 className="capitalize text-2xl font-semibold">{name}</h1>
        <div className="center gap-3">
          
          <StarRating stars={stars} reviews={reviews} />
          <p className="text-sm text-gray-400 ">({reviews} Customer reviews)</p>
          
        </div>
        <del className=" font-semibold text-sm">৳ {Math.trunc(price / 100)}</del>
        <p className=" font-semibold text-sm">
          Deal Of The Day ৳ {Math.trunc(price / 100 - 500)}
        </p>

        <p className=" font-bold text-gray-600">Description</p>
        <p className="text-sm text-gray-700 tracking-wide">{description}</p>

        <div className="flex items-center justify-between gap-6 border-b border-gray-300  pb-3">
          <div className=" flex items-start justify-start  flex-col">
            <FaTruckFast className=" text-3xl bg-gray-300 rounded-full p-1 text-purple-950 mb-2" />
            <p className="text-xs font-bold text-gray-600">Fast Delivery</p>
          </div>
          <div className=" flex items-start justify-start  flex-col">
            <GiReturnArrow className=" text-3xl bg-gray-300 rounded-full p-1 text-purple-950 mb-2" />
            <p className="text-xs font-bold text-gray-600">
              30 Days Replacement
            </p>
          </div>

          <div className=" flex items-start justify-start  flex-col">
            <FaShieldAlt className=" text-3xl bg-gray-300 rounded-full p-1 text-purple-950 mb-2" />
            <p className="text-xs font-bold text-gray-600">
              Two Years Warranty
            </p>
          </div>

          <div className=" flex items-start justify-start flex-col">
            <FaTruckFront className=" text-3xl bg-gray-300 rounded-full p-1 text-purple-950 mb-2" />
            <p className="text-xs font-bold text-gray-600">Swift Delivery</p>
          </div>
        </div>
        <div>
          <div className=" space-y-3">
            <div>
              <span className="text-sm font-semibold text-gray-700">
                Available:
              </span>
              <span className=" font-bold text-gray-600 ml-2 text-sm">
                {stock ? `${stock} In Stock` : "Not Available"}
              </span>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-700">
                Brand:
              </span>
              <span className=" font-bold text-gray-600 ml-2 text-sm capitalize">
                {company}
              </span>
            </div>
          </div>
          <div className=" mt-5 flex items-center justify-start gap-2">
            <p className="  text-sm font-semibold text-gray-700">Color:</p>

            <ColorInput colors={colors} />
          </div>
          <div className="flex items-center justify-start  mb-3 font-bold text-gray-600">
            <button>-</button>
            <input
              type="text"
              className=" border-transparent w-10  focus:border-transparent focus:ring-0 "
              value={"1"}
            />
            <button>+</button>
          </div>
          <PurpleBtn children={"ADD TO CART"} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
