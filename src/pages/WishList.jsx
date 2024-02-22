import React from "react";
import { useCartContext } from "../context/cartContext";

const WishList = () => {
  const { wishlistProducts } = useCartContext();
  console.log("wishListProducts", wishlistProducts);
  return (
    <div class="wrapper py-14 pb-40">
      <h1 class="text-3xl font-semibold text-center mb-6 w-full  ">
        My Wishlist
      </h1>
      {wishlistProducts.map((product) => (
        <div class=" between w-full gap-6 my-3">
          <div className=" w-full border p-1 max-h-[840px]">
            <img
              src={product.image}
              alt="Item 1"
              class="w-32 mb-4 rounded-md  "
            />
            <h2 class="capitalize font-semibold mb-2">{product.name}</h2>
            <p class="text-gray-600 line-clamp-2 w-full ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

                <div className="center gap-1"><img src="/public/images/taka.svg" className="w-3" alt="" />

<p className="text-sm font-semibold text-gray-600">{Math.round(product.price / 100)}</p></div>

              <button className="bg-blue-500 w-60 text-white  py-2 rounded-md hover:bg-blue-600">
              Add to Cart
            </button>


          
        </div>
      ))}
    </div>
  );
};

export default WishList;
