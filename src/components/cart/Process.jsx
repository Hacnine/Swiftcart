import {
  ContentPaste,
  Payment,
  ShoppingBasket,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa6";

const Process = ({ active, title }) => {
  return (
    <div className="wrapper bg-[#322b3c] center flex-col pb-40">
      <p className=" text-6xl font-bold text-white font-serif my-20">{title}</p>
      <div className=" relative w-full center flex-col">
        <div className="w-full flex items-center justify-between">
          <div
            className={`border-b ${
              active === 2 ? "border-orange-500" : "border-gray-600"
            } w-1/2`}
          ></div>
          <div
            className={`border-b ${
              active === 3 ? "border-orange-500" : "border-gray-600"
            } w-1/2`}
          ></div>
        </div>
        <div className=" absolute -top-9 flex items-center justify-between gap-4  w-full">
          <div
            className={`  text-white rounded-full p-4 center ${
              active === 1 ? " w-20 h-20 " : " "
            }   ${active >= 1 ? "  bg-orange-500" : " bg-gray-500"}`}
          >
            <ContentPaste fontSize={`${active === 1 ? "large" : "small"}`} />
          </div>

          <div
            className={` bg-orange-500 text-white rounded-full p-4 center ${
              active === 2 ? " w-20 h-20" : "h-16 w-16"
            }
            ${active >= 2 ? "  bg-orange-500" : " bg-gray-500"}
            `}
          >
            <ShoppingCart fontSize={`${active === 2 ? "large" : "small"}`} />
          </div>

          <div
            className={` bg-orange-500 text-white rounded-full p-4 center ${
              active === 3 ? " w-20 h-20" : ""
            }
            ${active >= 3 ? "  bg-orange-500" : " bg-gray-500"}
            `}
          >
            <Payment fontSize={`${active === 1 ? "large" : "small"}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
