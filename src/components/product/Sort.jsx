import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { GoChevronUp } from "react-icons/go";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import SelectBox from "../SelectBox";

const sort = [
  "Default" ,
  "Price-High to Low" ,
  "Price-Low to High" ,
  "Name(A-Z)" ,
  "Name(Z-A)" ,
];

const Sort = ({ setGridView, gridView, products, sortingData }) => {
  const [selected, setSelected] = useState(sort[0]);
  // const setData = () => {
  //   sortingData(selected);
  // };

  useEffect(()=>{
    sortingData(selected);
  }, [selected])

  return (
    <div>
      <div className="flex items-center justify-between   mb-10 px-2">
        <div className="center gap-2">
          <BsGridFill
            className={`${
              gridView
                ? "bg-purple-950 text-purple-400 w-6 h-6 p-1"
                : "text-purple-400"
            } hover:cursor-pointer`}
            onClick={() => setGridView(true)}
          />
          <FaThList
            className={`${
              gridView
                ? "text-purple-400"
                : "bg-purple-950 text-purple-400 w-6 h-6 p-1"
            } hover:cursor-pointer`}
            onClick={() => setGridView(false)}
          />
        </div>

        <div className=" text-gray-600 font-semibold text-sm center gap-1   border-b-2 md:w-40 p-1.5">
          Total <p className=" text-red-400"> {products.length} </p> Products
        </div>

        <div className=" md:w-72 w-[40%]">

          <SelectBox selected={selected} setSelected={setSelected} sort={sort}/>
         
        </div>
      </div>
    </div>
  );
};

export default Sort;
