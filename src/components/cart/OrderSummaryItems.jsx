import React from 'react'

const OrderSummaryItems = ({title, amount}) => {
  return (
    <div>
       <div className=" flex justify-between items-start gap-10 my-5 uppercase text-xs">
        <p className="text-xs text-gray-400 font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{amount}</p>
      </div>
    </div>
  )
}

export default OrderSummaryItems
