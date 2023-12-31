import React from 'react'

const PurpleBtn = ({className, children, type}) => {
  return (
    <div>
      <button className={`${className} bg-purple-950 rounded px-4 py-2 text-white text-base`} type={type}>{children}</button>
    </div>
  )
}

export default PurpleBtn
