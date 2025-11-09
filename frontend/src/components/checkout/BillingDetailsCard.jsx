import React from "react";
import InputForm from "../InputForm";

const BillingDetailsCard = () => {
  return (
    <div className=" shadow-lg shadow-gray-400 px-6 py-8 rounded-xl bg-white ">
      <p className=" text-xl text-yellow-400 font-bold"> Billing Details</p>

      <div className=" center gap-10">
        <div>
          <InputForm label={"First Name *"} visibleLabel hidePlaceHolder />

          <InputForm label={"Last Name *"} visibleLabel hidePlaceHolder />

          <InputForm label={"Company Name *"} visibleLabel hidePlaceHolder />

          <InputForm label={"Country/Region *"} visibleLabel hidePlaceHolder />
        </div>
        <div>
          <InputForm label={"Street Address *"} visibleLabel hidePlaceHolder />

          <InputForm label={"Zip code *"} visibleLabel hidePlaceHolder />

          <InputForm label={"Phone *"} visibleLabel hidePlaceHolder />

          <InputForm label={"email "} visibleLabel hidePlaceHolder />
        </div>
      
      </div>
    </div>
  );
};

export default BillingDetailsCard;
