import React, { useEffect, useState } from "react";
import { useFilterContext } from "../../context/filterContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const CategorySidebar = ({ title }) => {
  // const { sortByCategory } = useFilterContext();

  const location = useLocation();
  const history = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleLinkClick = () => {
    // Update the URL with the selected title
    searchParams.set("title", title);
    history(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleCategoryClick = () => {
    // sortByCategory(selectedData);
  };

  // useEffect(() => {
  //   handleLinkClick();
  //   handleCategoryClick();
  //   console.log('object')
  // }, []);

  return (
    <div>
      <Link
        to={`?title=${title}`}
        className={`bg-gray-100 px-4 py-1 rounded-full 
      hover:text-gray-800 hover:bg-purple-300
      border-2 border-transparent hover:border-purple-300
      active:ring-2
      active:border-purple-500 active:ring-purple-800 capitalize
    `}
        onClick={() => {
          handleLinkClick();
        }}
      >
        {title}
      </Link>
    </div>
  );
};

export default CategorySidebar;
