import { FiSearch } from 'react-icons/fi';
import { useFilterContext } from '../../context/filterContext'

const SearchBar = () => {
  const {filter:{text},updateFilterValue} = useFilterContext();
  return (
    <div className=" relative md:w-[40%] px-3">
    <form action="" onSubmit={(e) => e.preventDefault()} className=''>
      <div className="flex items-center border border-gray-300 px-4  focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200 rounded-2xl  w-">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          name="text"
          value={text}
          onChange={updateFilterValue}
          className="w-[100%] flex-1 focus:border-transparent border-transparent focus:ring-transparent focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </form>
  </div>
  )
}

export default SearchBar
