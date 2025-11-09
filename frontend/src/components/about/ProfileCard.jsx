import React from "react";
import CustomIconButton from "../signinandup/CustomIconButton";
import { Apple, Email, Facebook, X } from "@mui/icons-material";
import { GiMailbox } from "react-icons/gi";

const ProfileCard = ({ name, designation, image }) => {
  return (
    <div className=" center flex-col mt-5 ">
      <div className=" translate-y-20 top-0 z-20 overflow-clip w-40 h-40 rounded-2xl shadow-md shadow-slate-300">
        <img src={image} alt="" />
      </div>
      <div className=" top-20 z-10  bg-[#150022] h-64 rounded-2xl w-64 center flex-col shadow-md shadow-slate-300">
        <p className=" text-slate-200 mt-20 text-center">{name}</p>

        <p className=" text-slate-200 font-normal text-sm mt-5 my-3">
          {designation}
        </p>
        <div className="center gap-3">
          <CustomIconButton Icon={<Apple />} color={"white"} />
          <CustomIconButton Icon={<Facebook />} color={"white"} />
          <CustomIconButton Icon={<X />} color={"white"} />
          <CustomIconButton Icon={<Email />} color={"white"} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
