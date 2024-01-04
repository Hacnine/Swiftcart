import React from "react";

const ColorInput = ({ colors = [""] }) => {
  {colors.map((color) => {
  console.log(`border-[${color}]`, color);})}
  return (
    <div className=" center gap-1">
      {colors.map((color) => (
          <input
            type="checkbox"
            name="checkbox"
            className={`text-deep-green  focus:ring-0 cursor-pointer border  border-[${color}] text-[${color}] bg-[${color}] w-4 h-4 rounded-full`}
          />
     ) )}
    </div>
  );
};

export default ColorInput;
