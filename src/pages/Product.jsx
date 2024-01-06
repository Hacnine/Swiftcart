import ProductCard from '../components/ProductCard';
import FilterSection from '../components/product/FilterSection';
import ProductList from '../components/product/ProductList';
import Sort from '../components/product/Sort';
import { useFilterContext } from '../context/filterContext';

const Product = () => {
  const {filterProducts} = useFilterContext();
  console.log('filterProducts',filterProducts);
  return (
    <div className=' wrapper flex items-start justify-between'>
      <div>
        <FilterSection/>
      </div>
      <div>
        <Sort />
      </div>
      <div className="">
        <ProductList/>
      </div>

      {/* <div className="  gap-4 grid grid-cols-3">
            {filterProducts.map((product) => (
              <div key={product.id} className="">
                <ProductCard {...product}/>
              </div>
            ))}
          </div> */}

      
    </div>
  )
}

export default Product
