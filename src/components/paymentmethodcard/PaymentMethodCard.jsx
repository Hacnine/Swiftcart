import React, { useState } from 'react'

const PaymentMethodCard = ({icon}) => {
    const [border, setBorder] = useState(true)
  return (
    <div>
      <button className={`${border? 'border-orange-500 border-4 p-1 rounded-2xl': null}`}>
        <img src={icon} alt="" width={100} />
      </button>
    </div>
  )
}

export default PaymentMethodCard
