import React from "react";

const BigImage = ({ images = [{ url: "" }] }) => {
  return (
    <>
    {/* {images.slice(0, 1).map((image)=>( */}
        <div>
        <img
          src={images[0].url}
          alt="Product Image"
          className=" md:w-[100%] w-full hover:cursor-pointer rounded"
        />
      </div>
    {/* ))} */}
    </>
  );
};

export default BigImage;

 