import { useState } from 'react'
import Process from '../components/cart/Process';
import OrderSummary from '../components/cart/OrderSummary'
import PaymentMethodCard from '../components/paymentmethodcard/PaymentMethodCard';
import rocket from '../assets/rocket.png'
import bkash from '../assets/bkash.png'
import nagad from '../assets/nagad.png'
import cashon from '../assets/cashon.png'


const PaymentMethod = () => {
    const [active, setActive] = useState(3);
  return (
    <div className=" h-[800px]">
      <div className="relative">
        <Process active={active} title={"Checkout"} />
        <div className=" wrapper absolute top-80 z-50">
          <div className="flex items-start md:justify-start md:flex-row flex-col  gap-10">
            <div className="center gap-2 bg-white p-8 rounded-xl shadow-lg shadow-gray-400 ">
            <PaymentMethodCard icon={cashon}/>
            <PaymentMethodCard icon={bkash}/>
            <PaymentMethodCard icon={nagad}/>
            <PaymentMethodCard icon={rocket}/>
            </div>

            <OrderSummary
              setActive={setActive}
              btnName={"CONFIRM ORDER"}
              linkName={'product'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
