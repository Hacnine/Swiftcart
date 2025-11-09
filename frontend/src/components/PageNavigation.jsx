import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoCaretForwardSharp } from "react-icons/io5";

const PageNavigation = ({ name }) => {
  return (
    <div className=" bg-slate-200 flex items-center  px-7 text-purple-950 font-semibold gap-1.5 pb-3 pt-16 max-w-screen-2xl mx-auto">
      <div className="center gap-1">
        <NavLink to={"/"}>
          <IoHome className="mb-1" />
        </NavLink>{" "}
        <IoCaretForwardSharp />
        <NavLink to={"/product"}>Products</NavLink>
        <IoCaretForwardSharp />
        <p className=" capitalize">{name}</p>
      </div>
    </div>
  );
};

export default PageNavigation;
