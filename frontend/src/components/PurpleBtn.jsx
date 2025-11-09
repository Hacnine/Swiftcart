import React from "react";

const PurpleBtn = ({ className, bg, children, type }) => {
  return (
    <div>
      <button
        className={`${className} ${
          bg ? `${bg}` : "bg-purple-950 hover:bg-purple-900"
        }  rounded px-4 py-2 text-white text-base`}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default PurpleBtn;
