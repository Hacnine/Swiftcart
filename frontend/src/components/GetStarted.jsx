import React from "react";
import PurpleBtn from "./PurpleBtn";
import { NavLink } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="rounded-md bg-slate-200 px-6 py-8 flex items-center justify-between md:flex-row flex-col gap-4 max-w-[1220px]">
      <p className=" text-lg font-bold text-purple-950">What are you waiting for?</p>
      <PurpleBtn>
        <NavLink to="/contact">Get Started</NavLink>
      </PurpleBtn>
    </div>
  );
};

export default GetStarted;
