import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import logo from "../assets/logo2.jpeg";
import MiniProductCard from "../components/MiniProductCard";
const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const { id } = useParams();
  console.log(id);

  const {
    id: alias,
    company,
    name,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);
  console.log(id);
  return (
    <div>
      <div className="center wrapper md:flex-row flex-col mt-20">
        <div className="md:w-1/2 w-full">
          <div className="center md:flex-row flex-col gap-6 w-full border border-black">
            <div className="md:block sm:hidden">
              <MiniProductCard />
            </div>

            <div className="">
              <img
                src={logo}
                alt="Product Image"
                className=" md:w-[100%] w-full rounded"
              />
            </div>
            <div className="sm:block md:hidden">
              <MiniProductCard />
            </div>
          </div>
        </div>
        <div className="w-1/2 "></div>
      </div>
    </div>
  );
};

export default SingleProduct;
