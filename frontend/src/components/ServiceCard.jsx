import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { GiCheckedShield } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";

const ServiceCard = () => {
  return (
    <div className="  flex flex-col items-center justify-center">
      <div className=" grid sm:grid-cols-3 gap-5">
        <div className=" bg-slate-200 w-[350px] h-[220px] flex items-center justify-center rounded-md flex-col">
          <TbTruckDelivery className="w-12 h-12 p-2 text-purple-950 bg-white rounded-full" />
          <p className="text-base  text- font-bold text-gray-600">Fast Delivery</p>
        </div>

        <div className=" space-y-5">
          <div className=" bg-slate-200 w-[350px] h-[100px] flex items-center justify-center rounded-md flex-col">
            <GiCheckedShield className="w-12 h-12 p-2 text-purple-950 bg-white rounded-full" />
            <p className="text-base font-bold text-gray-600">Secure Delivery</p>
          </div>

          <div className=" bg-slate-200 w-[350px] h-[100px] flex items-center justify-center rounded-md flex-col">
            <GiReceiveMoney className="w-12 h-12 p-2 text-purple-950 bg-white rounded-full" />
            <p className="text-base font-bold text-gray-600">Money-Back Gurantee</p>
          </div>
        </div>

        <div className=" bg-slate-200 w-[350px] h-[220px] flex items-center justify-center rounded-md flex-col">
          <RiSecurePaymentFill className="w-12 h-12 p-2 text-purple-950 bg-white rounded-full" />
          <p className="text-base font-bold text-gray-600">Secure Payment</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
