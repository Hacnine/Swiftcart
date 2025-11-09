import React from "react";
import { FaCheck } from "react-icons/fa";

const ColorButton = ({ currentColor, index, colors, check, setCheck }) => {

  return (
    <div>
      <button
        key={index}
        className={` bg-[${currentColor}] border border-[${currentColor}]  w-5 h-5 rounded-full overflow-clip`}
        style={{backgroundColor: currentColor}}
        onClick={() => setCheck(colors[index])}
      >
        {check === currentColor ? (
          <FaCheck className=" text-white p-0.5" />
        ) : null}
      </button>
    </div>
  );
};

export default ColorButton;
