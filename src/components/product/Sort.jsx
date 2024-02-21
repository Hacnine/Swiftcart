import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { GoChevronUp } from "react-icons/go";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import SelectBox from "../SelectBox";
import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const sort = [
  "Default",
  "Price-High to Low",
  "Price-Low to High",
  "Name(A-Z)",
  "Name(Z-A)",
];

const Sort = ({ setGridView, gridView, products, sortingData }) => {
  const [selected, setSelected] = useState(sort[0]);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (openStatus) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(openStatus);
  };
  useEffect(() => {
    sortingData(selected);
  }, [selected]);

  return (
    <>
      <div className="flex items-center justify-between   mb-10 px-2">
  

        <GiHamburgerMenu onClick={toggleDrawer(true)} className=" block md:hidden text-darkpurple cursor-pointer font-bold text-xl" />

        <div className="md:flex items-center hidden gap-2">
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

        <span className=" text-gray-600 font-semibold text-sm gap-1   border-b-2 md:w-40 p-1.5 hidden md:block">
          Total <span className=" text-red-400"> {products.length} </span> Products
        </span>

        <div className=" w-[190px]">
          <SelectBox
            selected={selected}
            setSelected={setSelected}
            sort={sort}
          />
        </div>
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            px: 7,
            py: 2,
          },
        }}
      >
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Sidebar />
        </div>
      </Drawer>
    </>
  );
};

export default Sort;
