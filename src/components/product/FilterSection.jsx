import React from 'react'
import { useProductContext } from '../../context/ProductContext';

const FilterSection = () => {
  const { isLoading, mobile,laptop, watch, accessories,whiteColor } = useProductContext();
  console.log('mobile', whiteColor)

  return (
    <div>
      
    </div>
  )
}

export default FilterSection
