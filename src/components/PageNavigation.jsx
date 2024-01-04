import { IoHome } from "react-icons/io5";
import { NavLink } from 'react-router-dom'
import { FaLongArrowAltLeft } from "react-icons/fa";

const PageNavigation = ({name}) => {
  return (
    <div className=' bg-slate-200 flex items-center px-7 text-purple-950 font-semibold gap-1.5 py-1 max-w-screen-2xl mx-auto'>
      <NavLink to={'/'}><IoHome /></NavLink>
      <FaLongArrowAltLeft  />
      <p className=" capitalize">{name}</p>
    </div>
  )
}

export default PageNavigation
