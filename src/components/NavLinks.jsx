import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
const NavLinks = ({className}) => {
  return (
    <div>
       <ul className={`${className} flex items-center justify-center gap-10 font-bold uppercase"`}>
        <li className=" ">
          <NavLink to="/">Home</NavLink>
        </li>
        <NavLink to="/about">About</NavLink>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li className=" relative">
          <NavLink to="/cart" className=" text-2xl">
            <FiShoppingCart className=" z-20" />
            <span className=" text-xs absolute bg-purple-800 w-5 h-6 rounded-lg -right-3 -top-3 items-center flex justify-center text-white  ">10</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavLinks
