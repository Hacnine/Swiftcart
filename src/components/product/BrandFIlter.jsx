import React, { useEffect, useState } from 'react'
import SelectBox from '../SelectBox'
import { useFilterContext } from "../../context/filterContext.jsx";


const sort = [
    { name: "Default" },
    { name: "Price-High to Low" },
    { name: "Price-Low to High" },
    { name: "Name(A-Z)" },
    { name: "Name(Z-A)" },
  ];

const BrandFIlter = () => {
    
    const {sortingData} = useFilterContext();


    const { allProducts, getUniqueData } = useFilterContext();
  
    const companyOnlyData = getUniqueData(allProducts, "company");
    const [selected, setSelected] = useState ('Default');

    useEffect(()=>{
        sortingData(selected);
      }, [selected])
  return (
    <div className='mt-2'>
      <p className='text-lg font-bold mb-2 text-gray-800'>Brand</p>
      <SelectBox selected={selected} setSelected={setSelected} sort={companyOnlyData}/>
    </div>
  )
}

export default BrandFIlter
