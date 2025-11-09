import React, { useEffect, useState,  } from "react";
import { Link, useLocation, useNavigate , } from "react-router-dom";

const imageUrls = {
  black:
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=100",
  white:
    "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-2.png%3Fv%3D1689798965&w=750&q=100",
  blue: "https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-circles-blue.png%3Fv%3D1689798965&w=750&q=100",
};
const colorVariants = ["black", "white", "blue"];
const sizeVariants = ["xs", "s", "md", "l", "xl"];

const SearchParams = () => {
    const location = useLocation();
  const history = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");

  const handleColorClick = (color) => {
    // Update the URL with the selected color
    searchParams.set("color", color);
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleSizeClick = (size) => {
    // Update the URL with the selected size
    searchParams.set("size", size);
    history.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center flex-row justify-center">
      <div className="bg-white flex items-center rounded">
        <div className="flex-[2] flex justify-center">
                 <img src={imageUrls[selectedColor]} alt="" width={622} height={550} />

        </div>
      </div>

      <div className=" p-3">
      <section className="mb-5">
        <h2 className="text-md uppercase mb-2">Color</h2>

        <div className="flex gap-2">
          {colorVariants.map((color, index) => (
             <Link
             key={index}
             to={`?color=${color}&size=${selectedSize}`}
             className={`bg-gray-100 px-4 py-1 rounded-full border-2 ${
               selectedColor === color ? "border-blue-500" : "border-gray-200"
             }`}
             onClick={() => handleColorClick(color)}
           >
            
           </Link>
         ))}
        </div>
      </section>

      <section>
        <h2 className="text-md uppercase mb-2">Sizes</h2>

        {/* <div className="flex gap-2">
          {sizeVariants.map((size, index) => (
            <Link
              key={index}
              href={`?color=${selectedColor}&size=${size}`}
              className={`bg-gray-100 px-4 py-1 rounded-full border-2 ${
                selectedSize === size ? " border-blue-500" : "border-gray-200"
              }`}
              // onClick={() => setSelectedSize(size)}
            >
              {size.toUpperCase()}
            </Link>
          ))}
        </div> */}
      </section>
      </div>
    </div>
  );
};

export default SearchParams;
