import React from 'react'

const CartAmountToggle = ({amount, setIncrease, setDecrease}) => {
  return (
    <div>
      <div className="flex items-center justify-start  mb-3 font-bold text-gray-600">
        <button onClick={()=>setDecrease(amount)}>-</button>
        <input
          type="text"
          className=" border-transparent w-10  focus:border-transparent focus:ring-0 "
          value={amount}
        />
        
        <button onClick={()=>setIncrease(amount)}>+</button>
      </div>
    </div>
  )
}

export default CartAmountToggle
