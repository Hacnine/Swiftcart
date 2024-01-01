import React from 'react'
import { useProductContext } from '../context/ProductContext'

const About = () => {
  const {start} = useProductContext();
  return (
     <div>
      {start}
    </div>
  )
}

export default About
