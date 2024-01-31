import { FiSearch } from 'react-icons/fi';
import { useFilterContext } from '../../context/filterContext'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { MobileOffSharp } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
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
        <p className=" font-semibold capitalize text-slate-600">All Categories</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
         
            ".MuiMenu-root": {
              width:800,
            },
         }}
        className=' w-52'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem inset onClick={handleClose}
          sx={{
         
            ".MuiMenuItem-root": {
              width:800,
            },
         }}
        >
          
          <ListItemIcon>
            <MobileOffSharp />
          </ListItemIcon>
        </MenuItem>
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
          className="w-[100%] flex-1 border-transparent focus:border-transparent   focus:ring-transparent rounded-md "
          placeholder="Search..."
        />
      </div>
    </form>
  </div>
  )
}

export default SearchBar
