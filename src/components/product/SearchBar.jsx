import React from 'react'
import { useFilterContext } from '../../context/filterContext'

const SearchBar = () => {
  const {filter:{text},updateFilterValue} = useFilterContext();
  return (
    <div>
      <form action="" onSubmit={(e)=> e.preventDefault()}>
        <input type="text"
        name='text'
        value={text}
        onChange={updateFilterValue} />
      </form>
    </div>
  )
}

export default SearchBar
