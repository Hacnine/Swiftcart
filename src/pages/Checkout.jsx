import React, { useState } from "react";
import Process from "../components/cart/Process";
import BillingDetailsCard from "../components/checkout/BillingDetailsCard";
import OrderSummary from "../components/cart/OrderSummary";

const Checkout = () => {
  const [active, setActive] = useState(2);
  return (
    <div className=" h-[800px]">
      <div className="relative">
        <Process active={active} title={"Checkout"} />
        <div className=" wrapper absolute top-80 z-50">
          <div className="flex items-start md:justify-start md:flex-row flex-col  gap-10">
            <BillingDetailsCard />
            <OrderSummary
              setActive={setActive}
              btnName={"PROCEED TO PAYMENT"}
              linkName={'payment'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
