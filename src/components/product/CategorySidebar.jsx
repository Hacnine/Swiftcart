import React, { useEffect } from "react";
import { useFilterContext } from "../../context/filterContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CategorySidebar = ({ title }) => {
  const { sortByCategory } = useFilterContext();

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
            className={`bg-gray-100 px-4 py-1 rounded-full border-2`}
            onClick={() => {
              handleLinkClick(title);
              handleCategoryClick();
            }}
          >
            {title}
          </Link>
    </div>
  );
};

export default CategorySidebar;
