import React, { useState } from "react";
import { colors } from "../../constants/index";
import ColorButton from "../ColorButton";
import { useFilterContext } from "../../context/filterContext";

const ColorFilter = () => {
  const [check, setCheck] = useState(colors[null]);
  const {getColor} = useFilterContext();
  return (
     <div>
      <h1 className=" text-lg font-bold mb-2 text-gray-800">Colors</h1>

      <div className=" center gap-2 ml-3 bg-gray-100 pb-1 pt-2 px-1 rounded-full w-32">
        {colors.map((currentColor, index) => (
          <div key={index} onClick={()=>getColor(currentColor)}>
          <ColorButton currentColor={currentColor} check={check} setCheck={setCheck} index={index} colors={colors}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
