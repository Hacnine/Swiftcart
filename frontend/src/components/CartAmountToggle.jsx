import React from 'react'
import { useCartContext } from '../context/cartContext'
import { useProductContext } from '../context/ProductContext';

const CartAmountToggle = ({amount, setIncrease, setDecrease,stock}) => {
// console.log(amount)
  const {getQuantity,quantity,addCartItem} = useCartContext();
  const increaseQuantity = (quantity,condition)=>(
    getQuantity(quantity,condition)
  )

  const sendQuantity = (quantity,condition)=>(
    getQuantity(quantity,condition, stock)
  )

  const sentCartItem = ()=>(
    addCartItem(id,name,image[0].url,amount,check , price ,)
  )
  return (
    <>
      <div className="flex items-center justify-start font-bold text-gray-600">
        {/* <button onClick={()=>sendQuantity(quantity,'decrease')}>-</button> */}
        <button onClick={()=>setDecrease(amount)}>-</button>

        <input
          type="text"
          className=" border-transparent w-11  focus:border-transparent focus:ring-0 "
          // value={quantity}
          value={amount}
        />
        <button onClick={()=>setIncrease(amount)}>+</button>
        
        {/* <button onClick={()=>sendQuantity(quantity,'increase')}>+</button> */}
      </div>
    </>
  )
}

export default CartAmountToggle
