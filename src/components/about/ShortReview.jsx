import React from "react";

const ShortReview = ({ number, review }) => {
  return (
    <div className="center gap-1 p-2 bg-orange-100 rounded-full w-fit">
      <div className="p-2 bg-neutral-100 rounded-l-full center">
        <p className="text-3xl font-bold text-slate-900 w-24">{number}</p>
      </div>
      <div className="text-md bg-slate-200 rounded-r-full text-slate-600 font-bold center  w-40">
        <p className=" h-16 rounded-lg pt-4 ">{review}</p>
      </div>
    </div>
  );
};

export default ShortReview;
