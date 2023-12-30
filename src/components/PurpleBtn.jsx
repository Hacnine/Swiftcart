import React from 'react'

const PurpleBtn = ({className, children, type}) => {
  return (
    <div>
      <button className={`${className} bg-purple-950 rounded p-3 text-white text-lg`} type={type}>{children}</button>
    </div>
  )
}

export default PurpleBtn
