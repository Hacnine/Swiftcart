import React from "react";
import { quickLinks } from "../constants";

const FooterLinks = () => {
  return (
    <div className="bg-[#4d425b] p-10 flex items-start justify-between gap-10 sm:flex-row flex-col wrapper">
      <div className=" flex items-start justify-between  gap-1 md:w-[60%] w-full">
        {quickLinks.map((item, index) => (
          <div
            className=" w-1/3 flex items-start justify-evenly flex-col text-white text-xs gap-2"
            key={index+1}>
            <p className="text-base  font-semibold">{item.title}</p>
            {item.links.map((items) => (
              <div key={item.name}>
                <a href={items.link} className=" text-gray-300" >
                {items.name}
              </a>
              </div>
            ))}
          </div>
        ))}

        
      </div>
      <div className="flex items-center justify-center flex-col">
          <span className=" text-lg font-bold text-white">
            SWIFT<span className=" text-purple-950">CART</span>
            <p className=" text-gray-400 text-xs font-light">Copyright | 2023 All rights reserved  </p>
          </span>
        </div>
    </div>
  );
};

export default FooterLinks;
