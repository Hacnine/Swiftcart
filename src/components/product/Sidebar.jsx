import React from "react";
import { category } from "../../constants/index.jsx";
import CategorySidebar from "./CategorySidebar";
import SearchBar from "./SearchBar.jsx";
import ColorFilter from "./ColorFilter.jsx";
import { useFilterContext } from "../../context/filterContext.jsx";
import BrandFIlter from "./BrandFIlter.jsx";
import PriceSlider from "./PriceSlider.jsx";

const Sidebar = () => {
  const { allProducts, getUniqueData } = useFilterContext();

  const categoryOnlyData = getUniqueData(allProducts, "category");

  return (
    <div className=" space-y-4">
      <div className=" ">
        <h1 className=" text-lg font-bold mb-5 text-gray-800">Category</h1>
        {categoryOnlyData.map((item) => (
          <div className="start font-semibold text-slate-950 p-2 rounded-sm w-full  cursor-pointer ">
            <CategorySidebar title={item} />
          </div>
        ))}
      </div>
      <ColorFilter />
      <BrandFIlter/>
      <PriceSlider/>
    </div>
  );
};

export default Sidebar;
