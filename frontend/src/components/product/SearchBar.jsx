import { FiSearch } from "react-icons/fi";
import { useFilterContext } from "../../context/filterContext";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  const {
    allProducts,
    filterProducts,
    searchedProducts,
    sortByCategoryForSearchBar,
    searchResultProducts,
    getUniqueData,
    filter: { text },
    updateFilterValue,
  } = useFilterContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const menuRefSearch = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAnchorElSearch(null);
  };

  const handleClose = (category2) => {
    setCategory(category2);
    sortByCategoryForSearchBar(category2)
    setAnchorEl(null);
  };

  const handleClickSearch = (event) => {
    setAnchorElSearch(event.currentTarget);
    setAnchorEl(null);
  };

  const handleCloseSearch = () => {


    setAnchorElSearch(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    }

    function handleClickOutsideSearch(event) {
      if (
        menuRefSearch.current &&
        !menuRefSearch.current.contains(event.target)
      ) {
        setAnchorElSearch(null);
      }
    }

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("click", handleClickOutsideSearch);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("click", handleClickOutsideSearch);
    };
  }, []);

  function handleFocus(event) {
    event.preventDefault();
  }

  const categoryOnlyData = getUniqueData(allProducts, "category");
  const [category, setCategory] = useState("All");

  return (
    <div
      className="relative w-full md:w-[50%] rounded-md bg-white"
      ref={menuRefSearch}
    >
      <form action="" onSubmit={(e) => e.preventDefault()} className="">
        <div className="flex items-center border ring-transparent outline-none rounded-md">
          <div className="relative pr-2 border-r" ref={menuRef}>
            <button
              onClick={handleClick}
              className="font-semibold capitalize text-slate-600 pl-2 center w-[92px] "
            >
              {category}
            </button>

            {anchorEl && (
              <div className="absolute left-0 w-40 z-40 py-2 top-10 bg-white rounded-md">
                {categoryOnlyData.map((category, index) => (
                  <p
                    key={index}
                    className="cursor-pointer text-gray-600 hover:bg-darkpurple hover:text-white px-3 my-0.5 capitalize font-normal"
                    onClick={() => {
                      handleClose(category);
                    }}>
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            name="text"
            value={text}
            autoComplete="off"
            onChange={updateFilterValue}
            className="w-[100%] flex-1 relative border-transparent focus:border-transparent bg-white focus:ring-transparent rounded-md"
            placeholder="Search..."
            onClick={handleClickSearch}
          />

          <FiSearch className="text-darkpurple w-10 font-extrabold mr-2 text-3xl rounded p-1 bg-gray-200" />

          {anchorElSearch && (
            <div className="absolute top-14 rounded-md py-3 bg-white z-40 w-full shadow-md transition-transform duration-700">
              {searchResultProducts.length === 0? (
                <div className="px-6 my-0.5 text-gray-600 font-semibold">No matching is found.</div>
              ) : (
                <>
                  {searchResultProducts.map((product) => (
                    <NavLink to={`/singleproduct/${product.id}`}>
                      <p
                        className="font-semibold cursor-pointer text-gray-600   hover:bg-darkpurple hover:text-white px-6 my-0.5"
                        key={product.id}
                        onClick={handleCloseSearch}
                      >
                        {product.name}
                      </p>
                    </NavLink>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
