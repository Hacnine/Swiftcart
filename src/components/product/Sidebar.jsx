import React from 'react'
import {category} from '../../constants/index.jsx'
import CategorySidebar from './CategorySidebar'
import SearchBar from './SearchBar.jsx'

const Sidebar = () => {

  return (
    <div>
      <SearchBar/>
      
      <div className=" ">
        
        <h1 className=' text-lg font-bold mb-5 text-gray-800'>Category</h1>
        {category.map((item)=>(
            <div className="start font-semibold text-slate-950 p-2 rounded-sm w-full hover:text-gray-800 hover:bg-purple-300 cursor-pointer ">
            <CategorySidebar {...item}/>

            </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
