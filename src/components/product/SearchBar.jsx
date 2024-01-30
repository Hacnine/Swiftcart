import { FiSearch } from 'react-icons/fi';
import { useFilterContext } from '../../context/filterContext'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
const SearchBar = () => {
  const {filter:{text},updateFilterValue} = useFilterContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className=" relative md:w-[50%] rounded-md  bg-white ">
    <form action="" onSubmit={(e) => e.preventDefault()} className=''>
      <div className="flex items-center border border-gray-300 px-4  focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200 rounded-md ">
       
       
        <div>
      <Button
        onClick={handleClick}
      >
        <p className=" font-semibold capitalize text-slate-900">All Categories</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
    <FiSearch className="text-gray-500 mr-2 " />
        <input
          type="text"
          name="text"
          value={text}
          onChange={updateFilterValue}
          className="w-[100%] flex-1 focus:border-transparent border-transparent focus:ring-transparent focus:outline-none rounded-md "
          placeholder="Search..."
        />
      </div>
    </form>
  </div>
  )
}

export default SearchBar
