import React from "react";
import ColorInput from "./ColorInput";

const ColorInputs = ({ colors }) => {
  console.log(colors);
  return (
    <>
      <div className=" mt-5 flex items-center justify-start gap-2">
        <p className="  text-sm font-semibold text-gray-700">Color:</p>

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

      {colors.map((color) => (
          <input
            type="checkbox"
            name="checkbox"
            className={` focus:ring-0 cursor-pointer border  border-[${color}] text-[${color}] bg-[${color}] w-4 h-4 rounded-full`}
          />
     ) )} 
      {/* {colors.map((color)=>(
         <button className={`bg-[${color}]  w-4 h-4 rounded-full border border-[${color}]`}></button>
      ))} */}
    </>
  );
};

export default ColorInputs;
