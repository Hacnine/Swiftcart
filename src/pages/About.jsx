import React from 'react'
import { useProductContext } from '../context/ProductContext'
import SearchParams from '../components/SearchParams';

const About = () => {
  const {start} = useProductContext();
  return (
     <div>
      {/* <SearchParams/> */}
      {start}
    </div>
  )
}

export default About
