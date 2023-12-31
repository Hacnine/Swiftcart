import React from 'react'
import { useProductContext } from '../context/ProductContex'

const About = () => {
  const {start} = useProductContext();
  return (
     <div>
      {start}
    </div>
  )
}

export default About
